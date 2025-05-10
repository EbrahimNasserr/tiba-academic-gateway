import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Initialize Google Drive client with service account
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
      ?.split('\\n')
      .join('\n')
      .replace(/"/g, ''),
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
  version: 'v3',
  auth,
});

// Helper function to find folder by name
async function findFolder(folderName, parentId = null) {
  const query = parentId
    ? `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and '${parentId}' in parents and trashed = false`
    : `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;

  const response = await drive.files.list({
    q: query,
    fields: "files(id, name)",
  });

  return response.data.files[0];
}

// GET /api/books - Fetch books
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');

    // Get the main folder ID from environment variable
    const mainFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!mainFolderId) {
      throw new Error('GOOGLE_DRIVE_FOLDER_ID is not configured');
    }

    let books = [];

    if (year) {
      // Find year folder
      const yearFolder = await findFolder(`Year ${year}`, mainFolderId);
      if (!yearFolder) {
        throw new Error(`Year ${year} folder not found`);
      }

      // Get PDFs from year folder
      const response = await drive.files.list({
        q: `'${yearFolder.id}' in parents and mimeType contains 'pdf'`,
        fields: 'files(id, name, mimeType, webViewLink, thumbnailLink)',
        orderBy: 'name',
      });

      // Process books with thumbnails
      books = await Promise.all(response.data.files.map(async (file) => {
        try {
          const thumbnail = await drive.files.get({
            fileId: file.id,
            fields: 'thumbnailLink',
          });

          return {
            ...file,
            thumbnailUrl: thumbnail.data.thumbnailLink || null
          };
        } catch (error) {
          console.error(`Error getting thumbnail for ${file.name}:`, error);
          return {
            ...file,
            thumbnailUrl: null
          };
        }
      }));
    } else {
      // Get all year folders
      const yearFolders = await drive.files.list({
        q: `'${mainFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        fields: 'files(id, name)',
      });

      // Get PDFs from all year folders
      for (const folder of yearFolders.data.files) {
        const response = await drive.files.list({
          q: `'${folder.id}' in parents and mimeType contains 'pdf'`,
          fields: 'files(id, name, mimeType, webViewLink, thumbnailLink)',
          orderBy: 'name',
        });

        const folderBooks = await Promise.all(response.data.files.map(async (file) => {
          try {
            const thumbnail = await drive.files.get({
              fileId: file.id,
              fields: 'thumbnailLink',
            });

            return {
              ...file,
              thumbnailUrl: thumbnail.data.thumbnailLink || null
            };
          } catch (error) {
            console.error(`Error getting thumbnail for ${file.name}:`, error);
            return {
              ...file,
              thumbnailUrl: null
            };
          }
        }));

        books = [...books, ...folderBooks];
      }
    }

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/books - Upload a new book
export async function POST(request) {
  try {
    console.log('Starting file upload process...');
    
    const formData = await request.formData();
    const file = formData.get("file");
    const year = formData.get("year");

    console.log('Received form data:', { 
      fileName: file?.name,
      fileType: file?.type,
      year: year 
    });

    if (!file) {
      console.error('No file provided in request');
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    if (!year) {
      console.error('No year provided in request');
      return NextResponse.json(
        { message: "Year is required" },
        { status: 400 }
      );
    }

    // Get the main folder ID from environment variable
    const mainFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!mainFolderId) {
      console.error('GOOGLE_DRIVE_FOLDER_ID is not configured');
      return NextResponse.json(
        { message: "GOOGLE_DRIVE_FOLDER_ID is not configured" },
        { status: 500 }
      );
    }

    console.log('Finding year folder...');
    // Find year folder
    const yearFolder = await findFolder(`Year ${year}`, mainFolderId);
    if (!yearFolder) {
      console.error(`Year ${year} folder not found`);
      return NextResponse.json(
        { message: `Year ${year} folder not found` },
        { status: 404 }
      );
    }

    console.log('Converting file to buffer...');
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Uploading file to Google Drive...');
    // Create a readable stream from the buffer
    const { Readable } = require('stream');
    const stream = Readable.from(buffer);

    // Upload file to Google Drive
    const uploadResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [yearFolder.id],
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: "id, name, webViewLink, mimeType",
    });

    console.log('File uploaded successfully:', uploadResponse.data.id);
    return NextResponse.json({
      message: "Book uploaded successfully",
      file: uploadResponse.data,
    });
  } catch (error) {
    console.error("Error uploading book:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    // Check if it's a Google API error
    if (error.response?.data) {
      return NextResponse.json(
        { 
          message: "Google Drive API error",
          details: error.response.data
        },
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      { 
        message: "Failed to upload book",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/books - Delete a book
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    await drive.files.delete({
      fileId: id,
    });

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { message: error.message || "Failed to delete book" },
      { status: 500 }
    );
  }
} 