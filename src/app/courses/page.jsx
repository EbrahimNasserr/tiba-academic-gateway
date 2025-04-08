"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  GraduationCap,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";

export default function CoursesPage() {
  const [selectedYear, setSelectedYear] = useState("1st");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const filteredCourses = courses
    .filter(
      (course) =>
        course.year === selectedYear &&
        (selectedSubject === "all" || course.subject === selectedSubject) &&
        (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "recent")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "popular") return b.enrolled - a.enrolled;
      return a.title.localeCompare(b.title);
    });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3"
          alt="Students Learning"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Explore Your Courses</h1>
          <p className="text-xl mb-8">
            Discover a curated collection of academic courses tailored for each
            grade level. Learn at your own pace with clear, structured content
            designed for success.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Start Learning
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  {benefits.map((benefit, index) => (
    <div
      key={index}
      className="border hover:bg-blue-500 duration-300 p-6 rounded-xl shadow-sm flex flex-col items-center md:items-start text-center"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        {benefit.icon}
      </div>
      <h3 className="font-semibold mb-2">{benefit.title}</h3>
      <p className=" text-center md:text-start text-sm">{benefit.description}</p>
    </div>
  ))}
</div>


        {/* Year Filter */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {["1st", "2nd", "3rd", "4th"].map((year, index) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                selectedYear === year
                  ? yearStyles[index]
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {year} Year
            </button>
          ))}
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border bg-white text-black border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl bg-white text-black"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        {/* Subject Categories */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() =>
                setSelectedSubject(
                  subject === "All Subjects" ? "all" : subject.toLowerCase()
                )
              }
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-colors ${
                (selectedSubject === "all" && subject === "All Subjects") ||
                selectedSubject === subject.toLowerCase()
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Featured Courses */}
        {selectedYear === "1st" && selectedSubject === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((course) => course.featured)
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </div>
        )}

        {/* All Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to take your learning to the next level?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students already learning with us.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors transform hover:scale-105">
            Enroll in a Course Now
          </button>
        </div>
      </div>
    </main>
  );
}

function CourseCard({ course }) {
  return (
    <div className="bg-white text-black rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all">
      <div className="relative h-48">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4" />
            Featured
          </div>
        )}
        {course.isNew && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">
            New
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>{course.subject}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lectures} lectures</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image
              src={course.instructorAvatar}
              alt={course.instructor}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm text-gray-600">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>
        <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          View Course
        </button>
      </div>
    </div>
  );
}

const yearStyles = [
  "bg-blue-600 text-white",
  "bg-green-600 text-white",
  "bg-yellow-500 text-white",
  "bg-red-500 text-white",
];

const subjects = [
  "All Subjects",
  "Anatomy",
  "Physiology",
  "Pathology",
  "Pharmacology",
  "Biochemistry",
  "Computer Science",
];

const benefits = [
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
    title: "Learn from Certified Lecturers",
    description: "Expert instructors with years of academic experience",
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    title: "Access Any Time",
    description: "Study at your own pace with lifetime access",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    title: "Practice Materials",
    description: "Comprehensive resources and assignments included",
  },
  {
    icon: <Star className="w-6 h-6 text-blue-600" />,
    title: "Structured Learning",
    description: "Content organized by academic year and subject",
  },
];

const courses = [
  {
    id: 1,
    title: "Fundamentals of Anatomy",
    description:
      "Comprehensive introduction to human anatomy with detailed 3D models and practical sessions.",
    instructor: "Dr. Samir Ali",
    instructorAvatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    duration: "6 Hours",
    lectures: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    rating: 4.8,
    enrolled: 1250,
    year: "1st",
    subject: "anatomy",
    date: "2024-03-15",
    featured: true,
    isNew: false,
  },
  {
    id: 2,
    title: "Clinical Physiology",
    description:
      "Learn about body functions and physiological processes with real-world clinical applications.",
    instructor: "Dr. Emily Chen",
    instructorAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    duration: "8 Hours",
    lectures: 12,
    thumbnail:
      "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    rating: 4.9,
    enrolled: 980,
    year: "2nd",
    subject: "physiology",
    date: "2024-03-14",
    featured: true,
    isNew: true,
  },
  {
    id: 3,
    title: "Advanced Pathology",
    description:
      "Explore disease mechanisms and diagnostic approaches in modern pathology.",
    instructor: "Prof. Michael Brown",
    instructorAvatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    duration: "10 Hours",
    lectures: 15,
    thumbnail:
      "https://images.unsplash.com/photo-1579165466991-467135ad3875?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    rating: 4.7,
    enrolled: 750,
    year: "3rd",
    subject: "pathology",
    date: "2024-03-13",
    featured: false,
    isNew: true,
  },
  {
    id: 4,
    title: "Clinical Pharmacology",
    description:
      "Understanding drug actions, interactions, and therapeutic applications.",
    instructor: "Dr. Sarah Johnson",
    instructorAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    duration: "12 Hours",
    lectures: 18,
    thumbnail:
      "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    rating: 4.9,
    enrolled: 1100,
    year: "4th",
    subject: "pharmacology",
    date: "2024-03-12",
    featured: true,
    isNew: false,
  },
  {
    id: 5,
    title: "Medical Biochemistry",
    description:
      "Essential biochemical processes and their relevance in clinical practice.",
    instructor: "Prof. David Lee",
    instructorAvatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    duration: "9 Hours",
    lectures: 14,
    thumbnail:
      "https://images.unsplash.com/photo-1576670159805-381ef99c1caa?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    rating: 4.6,
    enrolled: 890,
    year: "2nd",
    subject: "biochemistry",
    date: "2024-03-11",
    featured: false,
    isNew: true,
  },
  {
    id: 6,
    title: "Healthcare Informatics",
    description:
      "Modern computing applications in healthcare and medical practice.",
    instructor: "Dr. Lisa Wilson",
    instructorAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    duration: "7 Hours",
    lectures: 11,
    thumbnail:
      "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    rating: 4.8,
    enrolled: 670,
    year: "3rd",
    subject: "computer science",
    date: "2024-03-10",
    featured: false,
    isNew: false,
  },
];
