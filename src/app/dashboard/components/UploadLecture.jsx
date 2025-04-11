"use client";

import { Upload, BookOpen, ChevronDown } from "lucide-react";
import YearSelector from "@/components/YearSelector/YearSelector";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchSubjects,
  selectAllSubjects,
  selectSubjectsStatus,
} from "@/redux/features/subjectsSlice";
import { useEffect } from "react";

export default function UploadLecture({
  handleUpload,
  selectedYear,
  setSelectedYear,
  selectedSubject,
  setSelectedSubject,
  uploadType,
  setUploadType,
  uploadProgress,
  lectureFile,
  setLectureFile,
  bookFile,
  setBookFile,
}) {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(selectAllSubjects);
  const status = useAppSelector(selectSubjectsStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSubjects());
    }
  }, [dispatch, status]);
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload New Lecture</h1>
        <p className="">
          Share your knowledge with students. Upload lectures, materials, and
          resources.
        </p>
      </div>

      <form onSubmit={handleUpload} className="rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Lecture Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter lecture title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Academic Year
            </label>
            <YearSelector value={selectedYear} onChange={setSelectedYear} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <div className="relative">
              <select
                name="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 bg-black dark:bg-white text-white dark:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Content Type
            </label>
            <div className="relative">
              <select
                name="type"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 bg-black dark:bg-white text-white dark:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {["Video", "PDF", "Slides"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Enter lecture description"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Related Course URL / YouTube Link
          </label>
          <input
            type="url"
            name="url"
            className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course URL or YouTube link"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload File</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <input
              type="file"
              name="file"
              className="hidden"
              id="file-upload"
              accept=".pdf,.ppt,.pptx,.mp4"
              onChange={(e) => {
                const file = e.target.files[0];
                setLectureFile(file);
              }}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 mb-4" />
              <span className="">Click to upload or drag and drop</span>
              <span className="text-sm mt-1">
                Supported formats: MP4, PDF, PPT
              </span>
            </label>
          </div>
          {lectureFile && (
            <div className="mt-2">
              <span className="text-sm">
                Selected file: {lectureFile.name} (
                {(lectureFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload Related Book
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <input
              type="file"
              name="book"
              className="hidden"
              id="book-upload"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const book = e.target.files[0];
                setBookFile(book);
              }}
            />
            <label
              htmlFor="book-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <BookOpen className="w-12 h-12 mb-4" />
              <span className="">Click to upload or drag and drop</span>
              <span className="text-sm mt-1">
                Supported formats: PDF, DOC, DOCX
              </span>
            </label>
          </div>
          {bookFile && (
            <div className="mt-2">
              <span className="text-sm">
                Selected book: {bookFile.name} (
                {(bookFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}
        </div>

        {uploadProgress > 0 && (
          <div className="mb-6">
            <div className="h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 mt-2">
              Uploading... {uploadProgress}%
            </span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Upload Lecture
        </button>
      </form>
    </>
  );
}
