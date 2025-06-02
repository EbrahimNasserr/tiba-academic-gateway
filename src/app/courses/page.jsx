"use client";
import courses from "./matrial";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen,
  Clock,
  GraduationCap,
  Search,
  Star,
} from "lucide-react";

export default function CoursesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?from=/courses');
    }
  }, [user, router]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  const filteredCourses = courses
    .filter(
      (course) =>
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
      <section className="relative h-[500px] my-6 flex items-center justify-center text-white">
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

        {/* All Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
     
      </div>
    </main>
  );
}

function CourseCard({ course }) {
  return (
    <div className=" rounded-xl border shadow-sm overflow-hidden group hover:shadow-lg transition-all">
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
          <span>{course.category}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className=" text-sm mb-4">{course.description}</p>
        <div className="flex items-center gap-4 text-sm  mb-4">
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
            <span className="text-sm ">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>
        <a href={course.link} target='_blank'>
         <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          View Course
        </button></a>
      </div>
    </div>
  );
}


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


