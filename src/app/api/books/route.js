import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');

    // Get the main folder ID from the environment variable
    const mainFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    // Log the folder ID (first few characters for security)
    console.log('Folder ID (first 10 chars):', mainFolderId?.substring(0, 10));

    // Initialize the Google Drive API client with API key
    const drive = google.drive({
      version: 'v3',
      params: {
        key: process.env.GOOGLE_API_KEY
      }
    });

    // First, verify we can access the main folder
    try {
      const mainFolder = await drive.files.get({
        fileId: mainFolderId,
        fields: 'id, name, mimeType'
      });
      console.log('Main folder found:', mainFolder.data.name);
    } catch (folderError) {
      console.error('Error accessing main folder:', {
        message: folderError.message,
        code: folderError.code
      });
      throw new Error(`Cannot access main folder: ${folderError.message}`);
    }

    let books = [];

    if (year) {
      // If year is specified, first find the year folder
      const yearFolders = await drive.files.list({
        q: `'${mainFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'Year ${year}'`,
        fields: 'files(id, name)',
      });

      console.log('Year folders found:', yearFolders.data.files.length);

      if (yearFolders.data.files.length > 0) {
        const yearFolderId = yearFolders.data.files[0].id;
        console.log('Using year folder:', yearFolders.data.files[0].name);
        
        // Get PDFs from the year folder
        const response = await drive.files.list({
          q: `'${yearFolderId}' in parents and mimeType contains 'pdf'`,
          fields: 'files(id, name, mimeType, webViewLink, thumbnailLink)',
          orderBy: 'name',
        });
        
        // Process each book to include thumbnail
        books = await Promise.all(response.data.files.map(async (file) => {
          try {
            // Get thumbnail for the file
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

        console.log('PDFs found in year folder:', books.length);
      }
    } else {
      // If no year specified, get all PDFs from all year folders
      const yearFolders = await drive.files.list({
        q: `'${mainFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        fields: 'files(id, name)',
      });

      console.log('All year folders found:', yearFolders.data.files.length);

      for (const folder of yearFolders.data.files) {
        console.log('Checking folder:', folder.name);
        const response = await drive.files.list({
          q: `'${folder.id}' in parents and mimeType contains 'pdf'`,
          fields: 'files(id, name, mimeType, webViewLink, thumbnailLink)',
          orderBy: 'name',
        });
        
        // Process each book to include thumbnail
        const folderBooks = await Promise.all(response.data.files.map(async (file) => {
          try {
            // Get thumbnail for the file
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
        console.log('PDFs found in', folder.name + ':', folderBooks.length);
      }
    }

    return NextResponse.json(books);
  } catch (error) {
    // Enhanced error logging
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      response: error.response?.data
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch books',
        details: error.message
      },
      { status: 500 }
    );
  }
} 