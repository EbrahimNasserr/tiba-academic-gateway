"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  Download,
  MonitorPlay,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useGetLectureByIdQuery,
  useGetLecturesQuery,
} from "../../../redux/api/apiSlice";

export default function LectureContent() {
  const params = useParams();

  // Get current lecture
  const {
    data: lecture,
    isLoading: isLectureLoading,
    isError: isLectureError,
    error: lectureError,
  } = useGetLectureByIdQuery(params.id);

  // Get all lectures for related lectures
  const {
    data: AllLectures = [],
    isLoading: isAllLecturesLoading,
    isError: isAllLecturesError,
    error: allLecturesError,
  } = useGetLecturesQuery({});

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content:
        "Great lecture! The explanation of skeletal structures was very clear.",
      timestamp: "2024-03-20 14:30",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  if (isLectureLoading || isAllLecturesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (isLectureError || isAllLecturesError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error: {lectureError?.message || allLecturesError?.message}
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Lecture not found
      </div>
    );
  }

  // Get related lectures (exclude current lecture)
  const relatedLectures =
    AllLectures && Array.isArray(AllLectures)
      ? AllLectures.filter((lec) => lec.id !== lecture.id).slice(0, 5)
      : [];

  // Get the full URL for video, PDF, and image
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_APP_URL_IMAGE;
  const videoUrl = lecture.video ? `${API_BASE_URL}${lecture.video}` : null;
  const pdfUrl = lecture.pdf ? `${API_BASE_URL}${lecture.pdf}` : null;
  const imageUrl = lecture.image ? `${API_BASE_URL}${lecture.image}` : null;
 console.log(lecture);
 
  // Summarize function (assuming API endpoint for extracting text from PDF)
  const handleSummarize = async () => {
    if (!pdfUrl) return alert("No lecture notes available to summarize.");

    setSummarizing(true);

    try {
      // First, extract text from PDF (you'll need an API endpoint for this)
      const extractRes = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfUrl }),
      });

      const extractData = await extractRes.json();
      console.log("Extract API response:", extractData);


      if (extractData.text) {
        setExtractedText(extractData.text);
        const res = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: extractData.text }),
        });

        const data = await res.json();
        setSummarizing(false);

        if (data.summary) {
          setSummaryText(data.summary);
        } else {
          alert("Failed to summarize");
        }
      } else {
        setSummarizing(false);
        alert("Failed to extract text from lecture notes");
      }
    } catch (error) {
      setSummarizing(false);
      alert("An error occurred while summarizing");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div
        className="bg-gradient-to-r text-gray-100 from-secondary to-secondary py-16"
        style={
          imageUrl
            ? {
                backgroundImage: `linear-gradient(to right, rgba(37, 99, 235, 0.9), rgba(30, 64, 175, 0.9)), url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/lectures"
            className="inline-flex items-center hover:text-secondary mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to All Lectures
          </Link>
          <h1 className="text-4xl font-bold mb-4">{lecture.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {new Date(lecture.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {lecture.video_duration}
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {"Dr. " + lecture.doctor_id}{" "}
              {/* Ideally, we would have the doctor's name */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="aspect-w-16 aspect-h-9 mb-8">
              {videoUrl ? (
                <iframe
                  className="w-full h-[400px] rounded-lg shadow-lg"
                  src={videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : lecture.external_link ? (
                <iframe
                  className="w-full h-[400px] rounded-lg shadow-lg"
                  src={lecture.external_link}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <iframe
                  className="w-full h-[400px] rounded-lg shadow-lg"
                  src={videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Description */}
            {lecture.description && (
              <div className="rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p>{lecture.description}</p>
              </div>
            )}

            {/* Topics Covered */}
            <div className="rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Topics Covered</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-secondary" />
                  Introduction to Human Skeletal System
                </li>
                <li className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-secondary" />
                  Types of Bones and Their Functions
                </li>
                <li className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-secondary" />
                  Common Skeletal Disorders
                </li>
              </ul>
            </div>

            {/* Summary Display */}
            {summaryText && (
              <div className="rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Summarized Lecture Notes
                </h2>
                <p className="whitespace-pre-wrap">{summaryText}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Materials */}
            {pdfUrl && (
              <div className="rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Course Materials</h3>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-2 text-white bg-secondary rounded-lg hover:bg-secondary transition-colors mb-2"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Lecture Notes
                </a>
                {lecture.external_link && (
                  <a
                    href={lecture.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors mb-2"
                  >
                    <MonitorPlay className="h-5 w-5 mr-2" />
                    Open related video
                  </a>
                )}
                <button
                  onClick={handleSummarize}
                  disabled={summarizing || !pdfUrl}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  {summarizing ? "Summarizing..." : "Summarize Notes"}
                </button>
              </div>
            )}

            {/* Related Lectures */}
            {relatedLectures.length > 0 && (
              <div className="rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Related Lectures</h3>
                <div className="space-y-3">
                  {relatedLectures.map((relatedLecture) => (
                    <Link
                      key={relatedLecture.id}
                      href={`/lectures/${relatedLecture.id}`}
                      className="block p-3 border rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      {relatedLecture.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}