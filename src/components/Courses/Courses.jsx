"use client";
import Card from "./Card";
import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description:
      "Master complex mathematical concepts with our comprehensive course.",
    instructor: "Dr. Sarah Johnson",
    category: "mathematics",
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    description:
      "Learn the basics of web development and build your first website.",
    instructor: "Prof. Michael Chen",
    category: "programming",
  },
  {
    id: 3,
    title: "Data Science Essentials",
    description: "Introduction to data analysis and machine learning concepts.",
    instructor: "Dr. Emily Rodriguez",
    category: "programming",
  },
  {
    id: 4,
    title: "Calculus for Beginners",
    description:
      "A comprehensive introduction to calculus concepts and applications.",
    instructor: "Prof. James Wilson",
    category: "mathematics",
  },
];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="custom-container">
        <div className="flex justify-between items-center mb-8 flex-col text-center md:text-left md:flex-row gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Courses
            </h2>
            <p className="text-gray-500 text-lg font-medium mt-2">
              Explore our wide range of academic courses
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <form className="w-full">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 border text-white dark:text-black border-gray-300 rounded-lg bg-[#131313] dark:bg-white focus:ring-secondary focus:border-secondary"
                  placeholder="Search Courses..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-4 py-2 dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-secondary"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center md:justify-start">
          <div
            className="inline-flex rounded-md shadow-xs bg-[#101010] dark:bg-gray-100 p-2"
            role="group"
          >
            <button
              type="button"
              onClick={() => handleCategoryClick("all")}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize ${
                selectedCategory === "all"
                  ? "text-gray-900 bg-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white"
              }`}
            >
              all
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick("mathematics")}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize ${
                selectedCategory === "mathematics"
                  ? "text-gray-900 bg-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white"
              }`}
            >
              mathematics
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick("programming")}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize ${
                selectedCategory === "programming"
                  ? "text-gray-900 bg-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white"
              }`}
            >
              programming
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
