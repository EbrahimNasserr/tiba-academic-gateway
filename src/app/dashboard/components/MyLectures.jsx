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
} from "lucide-react";
import { useGetLecturesQuery } from "../../../redux/api/apiSlice";
import Image from "next/image";

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

  // Fetch lectures from the API
  const {
    data: lecturesData,
    isLoading,
    isError,
    error,
  } = useGetLecturesQuery(searchParams);
  const lectures = lecturesData || [];

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
                <span>{typeof lecture.subject === 'object' ? lecture.subject.name : lecture.subject}</span>
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
                <button className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
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
    </>
  );
}
