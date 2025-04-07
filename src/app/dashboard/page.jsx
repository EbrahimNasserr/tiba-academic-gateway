"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  FileText,
  Upload,
  User,
  LogOut,
  ChevronDown,
  Trash2,
  Edit2,
  Eye,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedYear, setSelectedYear] = useState("1st");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [uploadType, setUploadType] = useState("Video");
  const [notification, setNotification] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [lectures, setLectures] = useState([
    {
      id: "1",
      title: "Introduction to Physiology",
      year: "2nd",
      subject: "Physiology",
      type: "Video",
      description: "Comprehensive introduction to human physiology systems.",
      uploadDate: "2025-04-07",
      fileUrl: "https://example.com/lecture1.mp4",
    },
    {
      id: "2",
      title: "Cellular Biology Basics",
      year: "1st",
      subject: "Biology",
      type: "PDF",
      description: "Fundamental concepts of cellular biology and structures.",
      uploadDate: "2025-04-06",
      fileUrl: "https://example.com/lecture2.pdf",
    },
  ]);

  const handleUpload = (e) => {
    e.preventDefault();
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setNotification({
          type: "success",
          message: "Lecture uploaded successfully!",
        });
        setTimeout(() => setNotification(null), 3000);
        setUploadProgress(0);
      }
    }, 500);
  };

  const handleDelete = (id) => {
    setLectures((prevLectures) => {
      if (!Array.isArray(prevLectures)) {
        return [];
      }
      return prevLectures.filter((lecture) => lecture.id !== id);
    });
    setNotification({
      type: "success",
      message: "Lecture deleted successfully!",
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen  flex">
      {/* Sidebar */}
      <aside className="w-64  border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <User className=" w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold">Dr. Sarah Johnson</h2>
              <p className="text-sm text-gray-600">Cardiologist</p>
            </div>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("upload")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "upload"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 hover:text-black"
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload Lecture
            </button>
            <button
              onClick={() => setActiveTab("lectures")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "lectures"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 hover:text-black"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              My Lectures
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 hover:text-black">
              <User className="w-5 h-5" />
              Edit Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-red-600">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg  ${
              notification.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {notification.message}
            <button
              onClick={() => setNotification(null)}
              className="ml-2 hover:opacity-80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {activeTab === "upload" ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Upload New Lecture</h1>
              <p className="">
                Share your knowledge with students. Upload lectures, materials,
                and resources.
              </p>
            </div>

            <form
              onSubmit={handleUpload}
              className=" rounded-xl p-6 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border bg-transparent  border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter lecture title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    Academic Year
                  </label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 bg-black dark:bg-white text-white dark:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      {["1st", "2nd", "3rd", "4th"].map((year) => (
                        <option key={year} value={year}>
                          {year} Year
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2  pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 bg-black dark:bg-white text-white dark:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option  value="">Select Subject</option>
                      {[
                        "Anatomy",
                        "Physiology",
                        "Pathology",
                        "Pharmacology",
                      ].map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2  pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    Content Type
                  </label>
                  <div className="relative">
                    <select
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
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2  pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium  mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border bg-transparent  border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Enter lecture description"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium  mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.ppt,.pptx,.mp4"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-12 h-12  mb-4" />
                    <span className="">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-sm  mt-1">
                      Supported formats: MP4, PDF, PPT
                    </span>
                  </label>
                </div>
              </div>

              {uploadProgress > 0 && (
                <div className="mb-6">
                  <div className="h-2  rounded-full overflow-hidden">
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
        ) : (
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
                  className=" border rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                      <FileText className="w-4 h-4" />
                      <span>{lecture.type}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {lecture.title}
                    </h3>
                    <p className=" text-sm mb-4">
                      {lecture.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm  mb-4">
                      <span>{lecture.year} Year</span>
                      <span>{lecture.subject}</span>
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
        )}
      </main>
    </div>
  );
}
