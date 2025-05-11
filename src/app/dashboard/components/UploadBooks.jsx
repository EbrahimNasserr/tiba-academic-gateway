"use client";

import { useState, useEffect } from "react";
import { Upload, Loader2, Trash2, RefreshCw } from "lucide-react";
import DeleteBookModal from "./DeleteBookModal";

export default function UploadBooks({ setNotification }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("1");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, book: null });

  const fetchBooks = async () => {
    try {
      const response = await fetch(`/api/books?year=${selectedYear}`);
      const data = await response.json();
      if (response.ok) {
        setBooks(data);
      } else {
        setNotification({
          type: "error",
          message: "Failed to fetch books",
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setNotification({
        type: "error",
        message: "Failed to fetch books",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedYear]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setNotification({
        type: "error",
        message: "Please select a PDF file",
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setNotification({
        type: "error",
        message: "Please select a file first",
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("year", selectedYear);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          message: "Book uploaded successfully",
        });
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
        // Refresh the books list
        fetchBooks();
      } else {
        setNotification({
          type: "error",
          message: data.message || "Failed to upload book. Please check if the Google Drive folders are set up correctly.",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setNotification({
        type: "error",
        message: "An error occurred while uploading. Please check your internet connection and try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`/api/books?id=${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotification({
          type: "success",
          message: "Book deleted successfully",
        });
        // Refresh the books list
        fetchBooks();
      } else {
        const data = await response.json();
        setNotification({
          type: "error",
          message: data.message || "Failed to delete book",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setNotification({
        type: "error",
        message: "Failed to delete book",
      });
    } finally {
      setDeleteModal({ isOpen: false, book: null });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBooks();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Book Management</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          title="Refresh books list"
        >
          <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Year Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Year</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-2 border rounded-lg bg-white"
        >
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select PDF File</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-lg bg-white"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="w-full flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 disabled:opacity-50 transition-colors mb-6"
      >
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Upload className="h-5 w-5 mr-2" />
            Upload Book
          </>
        )}
      </button>

      {/* Selected File Info */}
      {selectedFile && (
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Selected: {selectedFile.name}
          </p>
          <p className="text-xs text-gray-500">
            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {/* Books List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Uploaded Books</h3>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : books.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No books found for this year</p>
        ) : (
          <div className="space-y-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{book.name}</h4>
                  <a
                    href={book.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View in Google Drive
                  </a>
                </div>
                <button
                  onClick={() => setDeleteModal({ isOpen: true, book })}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  title="Delete book"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteBookModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, book: null })}
        onConfirm={() => handleDelete(deleteModal.book?.id)}
        bookName={deleteModal.book?.name}
      />

      {/* Setup Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Setup Instructions</h3>
        <p className="text-sm text-blue-700 mb-2">
          Before uploading books, make sure:
        </p>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>A folder named "Books" exists in your Google Drive</li>
          <li>Inside the "Books" folder, there are folders named "Year 1", "Year 2", "Year 3", and "Year 4"</li>
          <li>Your Google Drive API key has write permissions</li>
        </ul>
      </div>
    </div>
  );
}
