"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  BookOpen,
  Eye,
  Edit2,
  Trash2,
  Video,
  ExternalLink,
  Clock,
  X,
  Save,
  ChevronDown,
} from "lucide-react";
import {
  useGetLecturesQuery,
  useUpdateLectureMutation,
  useGetYearsQuery,
  useGetSubjectsQuery,
  useGetDoctorsQuery,
} from "../../../redux/api/apiSlice";
import Image from "next/image";
import Link from "next/link";

export default function MyLectures({
  handleDelete,
  getYearNameById,
  isDeleting,
}) {
  const [searchParams, setSearchParams] = useState({
    q: "",
    subject_id: "",
    year_id: "",
    doctor_id: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year_id: "",
    subject_id: "",
    doctor_id: "",
    external_link: "",
    video_duration: "",
  });
  const [lectureThumbnail, setLectureThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [lectureFile, setLectureFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  // Fetch lectures from the API
  const {
    data: lecturesData,
    isLoading,
    isError,
    error,
  } = useGetLecturesQuery(searchParams);
  const lectures = lecturesData || [];

  // Fetch years, subjects, and doctors for the form
  const { data: years = [] } = useGetYearsQuery();
  const { data: subjects = [] } = useGetSubjectsQuery({
    year_id: formData.year_id || "",
  });
  const { data: doctors = [] } = useGetDoctorsQuery({});

  // Edit lecture mutation
  const [updateLecture, { isLoading: isUpdating }] = useUpdateLectureMutation();

  // Handle opening the edit modal
  const handleEditClick = (lecture) => {
    setEditingLecture(lecture);
    setFormData({
      name: lecture.name || lecture.title || "",
      description: lecture.description || "",
      year_id: lecture.year_id || lecture.year || "",
      subject_id:
        lecture.subject_id ||
        (typeof lecture.subject === "object" ? lecture.subject.id : ""),
      doctor_id:
        lecture.doctor_id ||
        (typeof lecture.doctor === "object" ? lecture.doctor.id : ""),
      external_link: lecture.external_link || lecture.url || "",
      video_duration: lecture.video_duration || "",
    });

    // Set image preview if exists
    if (lecture.image) {
      setThumbnailPreview(
        `${process.env.NEXT_PUBLIC_API_APP_URL_IMAGE}${lecture.image}`
      );
    } else {
      setThumbnailPreview("");
    }

    setIsEditModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length === 0) return;

    if (name === "thumbnail") {
      setLectureThumbnail(files[0]);

      // Create URL preview
      const previewUrl = URL.createObjectURL(files[0]);
      setThumbnailPreview(previewUrl);
    } else if (name === "video") {
      setLectureFile(files[0]);
    } else if (name === "pdf") {
      setPdfFile(files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data object for API
      const lectureData = {
        name: formData.name,
        description: formData.description,
        subject_id: formData.subject_id,
        year_id: formData.year_id,
        doctor_id: formData.doctor_id,
        external_link: formData.external_link,
        video_duration: formData.video_duration || "00:00:00",
      };

      // Handle files if needed
      if (lectureThumbnail || lectureFile || pdfFile) {
        console.log("Files detected, would need to handle separately");
        // Note: To handle files, you would need to use FormData
        // This implementation focuses on sending JSON data
      }

      // Send the request directly to the API
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_APP_URL}/lectures/${editingLecture.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lectureData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lecture");
      }

      // Invalidate the lectures cache to refresh the data
      await updateLecture({ id: editingLecture.id }).unwrap();

      setIsEditModalOpen(false);
      setEditingLecture(null);
      setLectureThumbnail(null);
      setLectureFile(null);
      setPdfFile(null);
      setThumbnailPreview("");
    } catch (err) {
      console.error("Failed to update lecture:", err);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Lectures</h1>
        <p className="text-gray-600">
          Manage and organize your uploaded lectures.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          <p>
            Error loading lectures:{" "}
            {error?.data?.message || "Failed to fetch lectures"}
          </p>
        </div>
      )}

      {!isLoading && !isError && lectures.length === 0 && (
        <div className="bg-gray-50 text-gray-600 p-8 rounded-lg text-center">
          <p className="text-lg mb-2">No lectures found</p>
          <p>You haven't uploaded any lectures yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <div
            key={lecture.id}
            className="border rounded-xl shadow-sm overflow-hidden"
          >
            {lecture.image && (
              <div className="mb-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_APP_URL_IMAGE}${lecture.image}`}
                  alt={lecture.name || lecture.title}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  width={150}
                  height={150}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="p-6 pt-0">
              <h3 className="text-xl font-semibold mb-2">
                {lecture.name || lecture.title}
              </h3>
              <p className="text-sm mb-4">{lecture.description}</p>
              <div className="flex items-center gap-4 text-sm mb-4">
                <span>{getYearNameById(lecture.year_id || lecture.year)}</span>
                <span>
                  {typeof lecture.subject === "object"
                    ? lecture.subject.name
                    : lecture.subject}
                </span>
                <span>
                  {typeof lecture.doctor === "object"
                    ? lecture.doctor.name
                    : lecture.doctor}
                </span>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {lecture.video && (
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="w-4 h-4" />
                    <span>Video Lecture</span>
                  </div>
                )}
                {lecture.video_duration && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{lecture.video_duration}</span>
                  </div>
                )}
                {lecture.pdf && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    <span>PDF Lecture</span>
                  </div>
                )}
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
                {(lecture.external_link || lecture.url) && (
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4" />
                    <a
                      href={lecture.external_link || lecture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      External Link
                    </a>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  Uploaded on{" "}
                  {new Date(
                    lecture.created_at || lecture.uploadDate
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/lectures/${lecture.id}`}
                  className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Link>
                <button
                  onClick={() => handleEditClick(lecture)}
                  className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => handleDelete(lecture.id)}
                  className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="dark:bg-white bg-black p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Lecture</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Video Duration
                  </label>
                  <input
                    type="text"
                    name="video_duration"
                    value={formData.video_duration}
                    onChange={handleInputChange}
                    placeholder="HH:MM:SS"
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                </div>
              </div>

              {/* Academic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Academic Year
                  </label>
                  <div className="relative">
                    <select
                      name="year_id"
                      value={formData.year_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg appearance-none bg-transparent"
                      required
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year.id} value={year.id}>
                          {year.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-4 h-4" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      name="subject_id"
                      value={formData.subject_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg appearance-none bg-transparent"
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-4 h-4" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Doctor
                  </label>
                  <div className="relative">
                    <select
                      name="doctor_id"
                      value={formData.doctor_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg appearance-none bg-transparent"
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-transparent"
                  rows="3"
                />
              </div>

              {/* External Link */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  External Link
                </label>
                <input
                  type="url"
                  name="external_link"
                  value={formData.external_link}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-transparent"
                  placeholder="https://example.com/resource"
                />
              </div>

              {/* Files */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Thumbnail Image
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  {thumbnailPreview && (
                    <div className="mt-2">
                      <Image
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        width={100}
                        height={100}
                        className="h-20 w-auto object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Video File
                  </label>
                  <input
                    type="file"
                    name="video"
                    onChange={handleFileChange}
                    accept="video/*"
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  {lectureFile && (
                    <p className="text-xs mt-1 text-gray-500">
                      Selected: {lectureFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    PDF Document
                  </label>
                  <input
                    type="file"
                    name="pdf"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  {pdfFile && (
                    <p className="text-xs mt-1 text-gray-500">
                      Selected: {pdfFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
