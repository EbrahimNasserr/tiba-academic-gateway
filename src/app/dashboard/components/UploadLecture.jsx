"use client";

import { useState } from "react";
import { Upload, BookOpen, ChevronDown, Loader2 } from "lucide-react";
import YearSelector from "@/components/YearSelector/YearSelector";
import {
  useGetSubjectsQuery,
  useGetDoctorsQuery,
  useCreateLectureMutation,
} from "@/redux/api/apiSlice";

export default function UploadLecture({
  selectedYear,
  setSelectedYear,
  selectedSubject,
  setSelectedSubject,
  uploadType,
  setUploadType,
  lectureFile,
  setLectureFile,
  pdf,
  setPdf,
  setNotification,
}) {
  // Local state for form handling
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingLecture, setIsCreatingLecture] = useState(false);
  const [lectureThumbnail, setLectureThumbnail] = useState(null);
  const [videoDuration, setVideoDuration] = useState("");

  // Use RTK Query to fetch data
  const { data: subjects = [], isLoading: isLoadingSubjects } =
    useGetSubjectsQuery({ year_id: selectedYear });
  const { data: doctors = [], isLoading: isLoadingDoctors } =
    useGetDoctorsQuery({});

  // Create lecture mutation
  const [createLecture, { isLoading: isCreatingLectureMutation }] =
    useCreateLectureMutation();

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsCreatingLecture(true);

    // Validate required fields
    if (!title.trim()) {
      setNotification({
        type: "error",
        message: "Lecture title is required",
      });
      setIsSubmitting(false);
      setIsCreatingLecture(false);
      return;
    }

    if (!selectedSubject) {
      setNotification({
        type: "error",
        message: "Please select a subject",
      });
      setIsSubmitting(false);
      setIsCreatingLecture(false);
      return;
    }

    if (!selectedDoctor) {
      setNotification({
        type: "error",
        message: "Please select a doctor",
      });
      setIsSubmitting(false);
      setIsCreatingLecture(false);
      return;
    }
    // Check if file type is valid (PDF, video, or audio)
    const validFileTypes = [
      'application/pdf',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/mp4'
    ];

    if ((!lectureFile || !validFileTypes.includes(lectureFile.type)) && uploadType === "PDF") {
      setNotification({
        type: "error",
        message: "Invalid file type. Please upload a PDF, video, or audio file",
      });
      setIsSubmitting(false);
      setIsCreatingLecture(false);
      return;
    }

    if (!lectureThumbnail) {
      setNotification({
        type: "error",
        message: "Please upload a lecture thumbnail image",
      });
      setIsSubmitting(false);
      setIsCreatingLecture(false);
      return;
    }

    if (!videoDuration) {
      setNotification({
        type: "error",
        message: "Please enter video duration",
      });
      setIsSubmitting(false);
      setIsCreatingLecture(false);
      return;
    }

    // Show simulated progress
    const simulateProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setUploadProgress(0);
        }
      }, 300);
      return interval;
    };

    const progressInterval = simulateProgress();

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      formData.append("name", title);
      formData.append("year_id", selectedYear);
      formData.append("subject_id", selectedSubject);
      formData.append("doctor_id", selectedDoctor);
      formData.append("description", description);
      formData.append("external_link", externalLink);

      // Always append video_duration (required field)
      formData.append("video_duration", videoDuration || "00:00:00");

      // Always append image (required field)
      if (lectureThumbnail) {
        formData.append("image", lectureThumbnail);
      } else {
        // Create a default empty file for image if not provided
        const emptyBlob = new Blob([""], { type: "image/png" });
        const emptyFile = new File([emptyBlob], "placeholder.png", {
          type: "image/png",
        });
        formData.append("image", emptyFile);
      }

      // Handle PDF field (required)
      if (
        lectureFile &&
        (uploadType === "PDF" || lectureFile.type === "application/pdf")
      ) {
        formData.append("pdf", lectureFile);
      } else {
        // Create a default empty file for PDF if not provided (required field)
        const emptyBlob = new Blob([""], { type: "application/pdf" });
        const emptyFile = new File([emptyBlob], "placeholder.pdf", {
          type: "application/pdf",
        });
        formData.append("pdf", emptyFile);
      }

      if (uploadType === "Video" && lectureFile) {
        formData.append("video", lectureFile);
        if (lectureFile.duration) {
          formData.append("video_duration", lectureFile.duration);
        }
      }

      if (pdf) {
        formData.append("pdf", pdf);
      }

      // Call API to create lecture using RTK Query
      await createLecture(formData).unwrap();

      // Reset form fields
      setTitle("");
      setDescription("");
      setExternalLink("");
      setLectureFile(null);
      setPdf(null);
      setLectureThumbnail(null);
      setVideoDuration("");

      setNotification({
        type: "success",
        message: "Lecture uploaded successfully!",
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: error?.data?.message || "Failed to upload lecture",
      });
    } finally {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setIsSubmitting(false);
      setIsCreatingLecture(false);
    }
  };

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter lecture title"
              required
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
                required
              >
                <option value="">Select a subject</option>
                {isLoadingSubjects ? (
                  <option disabled>Loading subjects...</option>
                ) : subjects.length === 0 ? (
                  <option disabled>No subjects available</option>
                ) : (
                  subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))
                )}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Doctor</label>
            <div className="relative">
              <select
                name="doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 bg-black dark:bg-white text-white dark:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                required
              >
                <option value="">Select a doctor</option>
                {isLoadingDoctors ? (
                  <option disabled>Loading doctors...</option>
                ) : doctors.length === 0 ? (
                  <option disabled>No doctors available</option>
                ) : (
                  doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))
                )}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* <div>
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
          </div> */}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            name="external_link"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course URL or YouTube link"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Video</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <input
              type="file"
              name="file"
              className="hidden"
              id="file-upload"
              accept="video/*,audio/*"
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
              <span className="">Click to upload file (required)</span>
              <span className="text-sm mt-1">Supported formats: PDF, Video, Audio</span>
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
            Video Duration (required)
          </label>
          <input
            type="text"
            name="videoDuration"
            value={videoDuration}
            onChange={(e) => setVideoDuration(e.target.value)}
            className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="HH:MM:SS format (e.g. 01:30:00)"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Lecture Thumbnail (required)
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <input
              type="file"
              name="thumbnail"
              className="hidden"
              id="thumbnail-upload"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setLectureThumbnail(file);
              }}
            />
            <label
              htmlFor="thumbnail-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 mb-4" />
              <span className="">Click to upload lecture thumbnail</span>
              <span className="text-sm mt-1">
                Supported formats: JPG, PNG, GIF
              </span>
            </label>
          </div>
          {lectureThumbnail && (
            <div className="mt-2">
              <span className="text-sm">
                Selected thumbnail: {lectureThumbnail.name} (
                {(lectureThumbnail.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload PDF
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <input
              type="file"
              name="pdf"
              className="hidden"
              id="pdf"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const pdf = e.target.files[0];
                setPdf(pdf);
              }}
            />
            <label
              htmlFor="pdf"
              className="cursor-pointer flex flex-col items-center"
            >
              <BookOpen className="w-12 h-12 mb-4" />
              <span className="">Click to upload or drag and drop</span>
              <span className="text-sm mt-1">
                Supported formats: PDF, DOC, DOCX
              </span>
            </label>
          </div>
          {pdf && (
            <div className="mt-2">
              <span className="text-sm">
                Selected pdf: {pdf.name} (
                {(pdf.size / 1024 / 1024).toFixed(2)} MB)
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
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <span>Upload Lecture</span>
          )}
        </button>
      </form>
    </>
  );
}
