"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  Download,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

export default function LectureContent() {
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "Current User",
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r text-gray-100 from-blue-600 to-blue-800  py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/lectures"
            className="inline-flex items-center  hover:text-blue-200 mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to All Lectures
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            Introduction to Human Anatomy: The Skeletal System
          </h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              March 20, 2024
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              90 minutes
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Dr. Sarah Johnson
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
              <iframe
                className="w-full h-[400px] rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Topics Covered */}
            <div className=" rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Topics Covered</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Introduction to Human Skeletal System
                </li>
                <li className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Types of Bones and Their Functions
                </li>
                <li className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Common Skeletal Disorders
                </li>
              </ul>
            </div>

            {/* Comments Section */}
            <div className=" rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Discussion</h2>
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 border border-gray-300 bg-black dark:bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add to the discussion..."
                  rows={3}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post Comment
                </button>
              </form>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm ">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Materials */}
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Course Materials</h3>
              <button className="w-full flex items-center justify-center px-4 py-2 text-white  bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-5 w-5 mr-2 " />
                Download Lecture Notes
              </button>
            </div>

            {/* Related Lectures */}
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Related Lectures</h3>
              <div className="space-y-3">
                {[
                  "Muscular System Overview",
                  "Bone Development and Growth",
                  "Joint Types and Movement",
                ].map((lecture, index) => (
                  <Link
                    key={index}
                    href={`/lectures/${index + 1}`}
                    className="block p-3 border rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    {lecture}
                  </Link>
                ))}
              </div>
            </div>
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Related courses</h3>
              <div className="space-y-3">
                {[
                  "Muscular System Overview",
                  "Bone Development and Growth",
                  "Joint Types and Movement",
                ].map((lecture, index) => (
                  <Link
                    key={index}
                    href={`/lectures/${index + 1}`}
                    className="block p-3 border rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    {lecture}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
