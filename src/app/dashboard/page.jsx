"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Notification from "./components/Notification";
import UploadLecture from "./components/UploadLecture";
import MyLectures from "./components/MyLectures";
import SubjectsManager from "./components/SubjectsManager";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedYear, setSelectedYear] = useState("1");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [uploadType, setUploadType] = useState("Video");
  const [notification, setNotification] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [lectureFile, setLectureFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);

  const [lectures, setLectures] = useState([
    {
      id: "1",
      title: "Introduction to Physiology",
      year: "2",
      subject: "Physiology",
      type: "Video",
      description: "Comprehensive introduction to human physiology systems.",
      uploadDate: "2025-04-07",
      fileUrl: "https://example.com/lecture1.mp4",
      fileName: "Introduction to Physiology.mp4",
      bookName: "Physiology for Beginners.pdf",
    },
    {
      id: "2",
      title: "Cellular Biology Basics",
      year: "1",
      subject: "Biology",
      type: "PDF",
      description: "Fundamental concepts of cellular biology and structures.",
      uploadDate: "2025-04-06",
      fileUrl: "https://example.com/lecture2.pdf",
      fileName: "Cellular Biology Basics.pdf",
      bookName: "Biology for Beginners.pdf",
    },
  ]);
  const [uploadedLecture, setUploadedLecture] = useState([
    {
      title: "",
      year: "",
      subject: "",
      type: "",
      url: "",
      file: null,
      fileName: "",
      book: null,
      bookName: "",
    },
  ]);

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("file");
    const book = formData.get("book");

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

    const newLecture = {
      title: formData.get("title") || "",
      year: formData.get("year") || "",
      subject: formData.get("subject") || "",
      type: formData.get("type") || "",
      url: formData.get("url") || "",
      file: file,
      fileName: file ? file.name : "",
      book: book,
      bookName: book ? book.name : "",
    };

    setUploadedLecture([...uploadedLecture, newLecture]);
    console.log("Uploaded Lecture:", {
      ...newLecture,
      file: file
        ? {
            name: file.name,
            type: file.type,
            size: file.size,
          }
        : null,
      book: book
        ? {
            name: book.name,
            type: book.type,
            size: book.size,
          }
        : null,
    });
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

  // Helper function to get year name by ID
  const getYearNameById = (id) => {
    const yearMap = {
      1: "Year 1",
      2: "Year 2",
      3: "Year 3",
      4: "Year 4",
    };
    return yearMap[id] || id;
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {activeTab !== "subjects" && (
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
        )}

        {activeTab === "upload" ? (
          <UploadLecture
            handleUpload={handleUpload}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            uploadType={uploadType}
            setUploadType={setUploadType}
            uploadProgress={uploadProgress}
            lectureFile={lectureFile}
            setLectureFile={setLectureFile}
            bookFile={bookFile}
            setBookFile={setBookFile}
          />
        ) : activeTab === "subjects" ? (
          <SubjectsManager />
        ) : (
          <MyLectures
            lectures={lectures}
            handleDelete={handleDelete}
            getYearNameById={getYearNameById}
          />
        )}
      </main>
    </div>
  );
}
