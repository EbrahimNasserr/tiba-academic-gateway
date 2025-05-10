"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Book,
  Calendar,
  Clock,
  GraduationCap,
  Users,
  BookOpen,
  ChevronRight,
  FileText,
  Video,
  Download,
} from "lucide-react";
import { useGetSubjectsQuery } from "../../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/features/bookSlice";

export default function YearPage() {
  const searchParams = useSearchParams();
  const yearParam = searchParams.get('year');
  const [selectedYear, setSelectedYear] = useState(yearParam || "1");
  const dispatch = useDispatch();
  const { books, isLoading: isLoadingBooks } = useSelector((state) => state.books);
  const { data: subjects = [], isLoading } = useGetSubjectsQuery({
    year_id: selectedYear,
  });

  // Update selected year when URL parameter changes
  useEffect(() => {
    if (yearParam) {
      setSelectedYear(yearParam);
    }
  }, [yearParam]);

  useEffect(() => {
    dispatch(fetchBooks(selectedYear));
  }, [selectedYear, dispatch]);

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Computer Science Resources</h1>
          <p className="text-xl text-white/90 mb-8">
          Unlock a wealth of study materials, expert lectures, and curated resources to elevate your tech education journey. </p>

          {/* Year Selection */}
          <div className="flex space-x-4">
            {["1", "2", "3", "4"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`md:px-6 py-3 rounded-lg transition-colors px-3 ${
                  selectedYear === year
                    ? "bg-white text-secondary"
                    : "bg-secondary/80 text-white hover:bg-secondary/70"
                }`}
              >
                {year === "1" ? "1st" : year === "2" ? "2nd" : year === "3" ? "3rd" : "4th"} Year
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subjects Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:3xl lg:text-3xl font-bold">Available Subjects</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin h-8 w-8 border-4 border-secondary rounded-full border-t-transparent"></div>
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No subjects available for this year.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.id}?year=${selectedYear}`}
                  className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <Book className="h-6 w-6 text-secondary mr-3" />
                    <h3 className="text-xl font-semibold">{subject.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Access lectures, study materials, and resources for {subject.name}</p>
                  <div className="flex items-center text-secondary">
                    View Materials
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Books Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:3xl lg:text-3xl font-bold">Recommended Books</h2>
          </div>

          {isLoadingBooks ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin h-8 w-8 border-4 border-secondary rounded-full border-t-transparent"></div>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No books available for this year.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{book.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{book.mimeType}</p>
                    <a
                      href={book.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <Book className="h-5 w-5 mr-2" />
                      View Book
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Access Section */}
        <section>
          <h2 className="text-2xl md:3xl lg:text-3xl text-center md:text-start font-bold mb-8">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/lectures"
              className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <Video className="h-8 w-8 text-secondary mr-4" />
              <div>
                <h3 className="font-semibold mb-1">Video Lectures</h3>
                <p className="text-gray-600">Access recorded lectures and tutorials</p>
              </div>
            </Link>

            <Link
              href="/materials"
              className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <FileText className="h-8 w-8 text-secondary mr-4" />
              <div>
                <h3 className="font-semibold mb-1">Study Materials</h3>
                <p className="text-gray-600">Download PDFs and study guides</p>
              </div>
            </Link>

            <Link
              href="/resources"
              className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <Download className="h-8 w-8 text-secondary mr-4" />
              <div>
                <h3 className="font-semibold mb-1">Resources</h3>
                <p className="text-gray-600">Additional learning resources</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
