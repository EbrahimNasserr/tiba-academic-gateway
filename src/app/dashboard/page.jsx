"use client";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Notification from "./components/Notification";
import UploadLecture from "./components/UploadLecture";
import UploadBooks from "./components/UploadBooks";
import MyLectures from "./components/MyLectures";
import SubjectsManager from "./components/SubjectsManager";
import DoctorsManager from "./components/DoctorsManager";
import AdminsManager from "./components/AdminsManager";
import { useDeleteLectureMutation } from "../../redux/api/apiSlice";
import { useRouter } from "next/navigation";

const DashboardContent = () => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedYear, setSelectedYear] = useState("1");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [uploadType, setUploadType] = useState("Video");
  const [notification, setNotification] = useState(null);
  const [lectureFile, setLectureFile] = useState(null);
  const [pdf, setPdf] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    const localtoken = localStorage.getItem("token");
    if (!token && !localtoken) {
      router.push("/login");
    }
  }, [router, token]);

  // Delete lecture mutation
  const [deleteLecture, { isLoading: isDeleting }] = useDeleteLectureMutation();

  const handleDelete = async (id) => {
    try {
      await deleteLecture(id).unwrap();
      setNotification({
        type: "success",
        message: "Lecture deleted successfully!",
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: error?.data?.message || "Failed to delete lecture",
      });
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
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
      <main className="lg:ml-64 flex-1 p-8">
        {activeTab !== "subjects" &&
          activeTab !== "doctors" &&
          activeTab !== "admins" && (
            <Notification
              notification={notification}
              setNotification={setNotification}
            />
          )}

        {activeTab === "upload" ? (
          <UploadLecture
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            uploadType={uploadType}
            setUploadType={setUploadType}
            lectureFile={lectureFile}
            setLectureFile={setLectureFile}
            pdf={pdf}
            setPdf={setPdf}
            setNotification={setNotification}
          />
        ) : activeTab === "uploadBooks" ? (
          <UploadBooks setNotification={setNotification} />
        ) : activeTab === "subjects" ? (
          <SubjectsManager />
        ) : activeTab === "doctors" ? (
          <DoctorsManager />
        ) : activeTab === "admins" ? (
          <AdminsManager />
        ) : (
          <MyLectures
            handleDelete={handleDelete}
            getYearNameById={getYearNameById}
            isDeleting={isDeleting}
          />
        )}
      </main>
    </div>
  );
};

// Use dynamic import with ssr disabled for the dashboard
const DoctorDashboard = dynamic(() => Promise.resolve(DashboardContent), {
  ssr: false,
});

export default DoctorDashboard;
