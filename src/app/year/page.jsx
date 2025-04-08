"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Book,
  Calendar,
  Clock,
  GraduationCap,
  Users,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const yearData = {
  1: {
    lectures: [
      {
        id: 1,
        name: "Anatomy 101",
        instructor: "Dr. Sarah Johnson",
        startDate: "March 1, 2024",
        endDate: "July 30, 2024",
        description: "Introduction to human anatomy and physiology.",
      },
      {
        id: 2,
        name: "Biochemistry Fundamentals",
        instructor: "Dr. Michael Chen",
        startDate: "March 15, 2024",
        endDate: "August 15, 2024",
        description: "Basic principles of biochemistry and cellular processes.",
      },
    ],
    books: [
      {
        id: 1,
        title: "Essential Anatomy & Physiology",
        author: "Dr. Emily Roberts",
        coverUrl:
          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300&h=400",
      },
      {
        id: 2,
        title: "Biochemistry: A Modern Approach",
        author: "Dr. James Wilson",
        coverUrl:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300&h=400",
      },
    ],
  },
  // Add data for other years similarly
};

export default function YearPage() {
  const [selectedYear, setSelectedYear] = useState("1");

  return (
    <div className="min-h-screen py-12 ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Dive Into Your Year</h1>
          <p className="text-xl text-blue-100 mb-8">
            Explore all the courses, books, and lectures for your current
            academic year.
          </p>

          {/* Year Selection */}
          <div className="flex space-x-4">
            {["1", "2", "3", "4"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`md:px-6 py-3 rounded-lg transition-colors px-3  ${
                  selectedYear === year
                    ? "bg-white text-blue-600"
                    : "bg-blue-700 text-white hover:bg-blue-600"
                }`}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Courses Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:3xl lg:text-3xl font-bold">Your Lectures</h2>
            <Link
              href="/lectures"
              className="flex text-sm md:text-lg items-center text-blue-600 hover:text-blue-700"
            >
              View All Lectures
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {yearData[selectedYear]?.lectures.map((lecture) => (
              <div
                key={lecture.id}
                className=" border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{lecture.name}</h3>
                <div className="flex items-center  mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  {lecture.instructor}
                </div>
                <div className="flex items-center  mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {lecture.startDate} - {lecture.endDate}
                </div>
                <p className=" mb-4">{lecture.description}</p>
                <Link
                  href={`/lectures/${lecture.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  View Materials
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Books Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:3xl lg:text-3xl font-bold">Recommended Books</h2>
            <Link
              href="/books"
              className="flex text-sm md:text-lg items-center text-blue-600 hover:text-blue-700"
            >
              View All Books
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {yearData[selectedYear]?.books.map((book) => (
              <div
                key={book.id}
                className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold ">{book.title}</h3>
                  <p className=" text-sm mb-4">{book.author}</p>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Book className="h-5 w-5 mr-2" />
                    View Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl md:3xl lg:text-3xl text-center md:text-start font-bold mb-8">Year-Specific Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/study-guides"
              className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <GraduationCap className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold mb-1">Study Guides</h3>
                <p className="">
                  Access comprehensive study materials
                </p>
              </div>
            </Link>

            <Link
              href="/practice-quizzes"
              className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <Clock className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold mb-1">Practice Quizzes</h3>
                <p className="">Test your knowledge</p>
              </div>
            </Link>

            <Link
              href="/study-groups"
              className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <Users className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold mb-1">Study Groups</h3>
                <p className="">Join or create study groups</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
