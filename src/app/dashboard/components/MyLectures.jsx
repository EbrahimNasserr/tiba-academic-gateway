"use client";

import { FileText, BookOpen, Eye, Edit2, Trash2 } from "lucide-react";

export default function MyLectures({
  lectures,
  handleDelete,
  getYearNameById,
}) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Lectures</h1>
        <p className="text-gray-600">
          Manage and organize your uploaded lectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <div
            key={lecture.id}
            className="border rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                <FileText className="w-4 h-4" />
                <span>{lecture.type}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{lecture.title}</h3>
              <p className="text-sm mb-4">{lecture.description}</p>
              <div className="flex items-center gap-4 text-sm mb-4">
                <span>{getYearNameById(lecture.year)}</span>
                <span>{lecture.subject}</span>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {lecture.fileName && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    <span>Lecture: {lecture.fileName}</span>
                  </div>
                )}
                {lecture.bookName && (
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>Book: {lecture.bookName}</span>
                  </div>
                )}
                {lecture.url && (
                  <div className="flex items-center gap-2 text-sm">
                    <a
                      href={lecture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Related Course Link
                    </a>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  Uploaded on{" "}
                  {new Date(lecture.uploadDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(lecture.id)}
                  className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
