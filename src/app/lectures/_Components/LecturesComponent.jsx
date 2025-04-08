"use client";
import { useState } from "react";
import Image from "next/image";
import { Clock, Download, Play, Search, TrendingUp } from "lucide-react";
import Select from "react-select";
import Link from "next/link";
const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "views", label: "Most Viewed" },
  { value: "az", label: "A-Z" },
];

const yearOptions = [
  { value: "1st", label: "1st Year" },
  { value: "2nd", label: "2nd Year" },
  { value: "3rd", label: "3rd Year" },
  { value: "4th", label: "4th Year" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "2px solid #060606",
    borderRadius: "10px",
    // padding: "10px",
    width: "200px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#060606",
    backgroundColor: state.isSelected ? "#060606" : "#fff",
  }),
};
const ncustomStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "2px solid #060606",
    borderRadius: "10px",
    // padding: "10px",
    width: "140px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#060606",
    backgroundColor: state.isSelected ? "#060606" : "#fff",
  }),
};

const LecturesComponent = () => {
  const [selectedYear, setSelectedYear] = useState("1st");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const filteredLectures = lectures
    .filter(
      (lecture) =>
        lecture.year === selectedYear &&
        (selectedSubject === "all" || lecture.subject === selectedSubject) &&
        (lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lecture.instructor.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "recent")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "views") return b.views - a.views;
      return a.title.localeCompare(b.title);
    });

  return (
    <section className="pb-16">
      <div className="custom-container">
        <div className="">
          {/* Year Filter */}
          <div className="mb-12">
            {/* Mobile Dropdown */}
            {/* <div className="md:hidden mb-4">
              <Select
                value={yearOptions.find(
                  (option) => option.value === selectedYear
                )}
                onChange={(selectedOption) =>
                  setSelectedYear(selectedOption.value)
                }
                options={yearOptions}
                styles={customStyles}
                isSearchable={false}
              />
            </div> */}

            {/* Desktop Button Group */}
            <div className="hidden gap-2 md:flex">
              {["1st", "2nd", "3rd", "4th"].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedYear === year
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {year} Year
                </button>
              ))}
            </div>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search lectures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white"
              />
            </div>
           <div className=" flex gap-2">
           <Select
              value={sortOptions.find((option) => option.value === sortBy)}
              onChange={(selectedOption) => setSortBy(selectedOption.value)}
              options={sortOptions}
              styles={customStyles}
              isSearchable={false}
            />

              <div className="md:hidden ">
              <Select
                value={yearOptions.find(
                  (option) => option.value === selectedYear
                )}
                onChange={(selectedOption) =>
                  setSelectedYear(selectedOption.value)
                }
                options={yearOptions}
                styles={ncustomStyles}
                isSearchable={false}
                
              />
            </div>
           </div>
          </div>
          

          {/* Subject Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {["all", "anatomy", "physiology", "chemistry", "biology"].map(
              (subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedSubject === subject
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Lectures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLectures.map((lecture) => (
              <Link
                key={lecture.id}
                href={`/lectures/${lecture.id}`}
                className=" border rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={lecture.thumbnail}
                    alt={lecture.title}
                    fill
                    className="object-cover"
                  />
                  {lecture.isTrending && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </div>
                  )}
                  {lecture.isNew && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full">
                      New
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {lecture.title}
                  </h3>
                  <div className="flex items-center gap-2  mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{lecture.duration} mins</span>
                  </div>
                  <p className=" mb-4">👨‍🏫 {lecture.instructor}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                      <Play className="w-4 h-4" />
                      Watch Now
                    </button>
                    {lecture.type === "PDF" && (
                      <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Looking for more study resources?
            </h2>
            <p className="text-lg mb-8">
              Enhance your learning journey with our comprehensive courses and
              books.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Courses
              </button>
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Download Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const lectures = [
  {
    id: 1,
    title: "Introduction to Anatomy",
    instructor: "Dr. Ahmed El-Masry",
    type: "Video",
    duration: 45,
    thumbnail:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    year: "1st",
    subject: "anatomy",
    date: "2024-03-15",
    views: 1500,
    isTrending: true,
    isNew: false,
  },
  {
    id: 2,
    title: "Cell Biology Fundamentals",
    instructor: "Dr. Sarah Johnson",
    type: "PDF",
    duration: 60,
    thumbnail:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    year: "1st",
    subject: "biology",
    date: "2024-03-14",
    views: 1200,
    isTrending: false,
    isNew: true,
  },
  {
    id: 3,
    title: "Chemical Bonding",
    instructor: "Prof. Michael Chen",
    type: "Video",
    duration: 55,
    thumbnail:
      "https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    year: "2nd",
    subject: "chemistry",
    date: "2024-03-13",
    views: 980,
    isTrending: false,
    isNew: false,
  },
  {
    id: 4,
    title: "Human Physiology",
    instructor: "Dr. Emily Brown",
    type: "Video",
    duration: 50,
    thumbnail:
      "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    year: "2nd",
    subject: "physiology",
    date: "2024-03-12",
    views: 2100,
    isTrending: true,
    isNew: false,
  },
  {
    id: 5,
    title: "Organic Chemistry",
    instructor: "Prof. David Lee",
    type: "PDF",
    duration: 65,
    thumbnail:
      "https://images.unsplash.com/photo-1576670159805-381ef99c1caa?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    year: "3rd",
    subject: "chemistry",
    date: "2024-03-11",
    views: 1800,
    isTrending: false,
    isNew: true,
  },
  {
    id: 6,
    title: "Advanced Biology",
    instructor: "Dr. Lisa Wilson",
    type: "Video",
    duration: 70,
    thumbnail:
      "https://images.unsplash.com/photo-1576670159896-6c7d3caac2f5?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    year: "4th",
    subject: "biology",
    date: "2024-03-10",
    views: 1600,
    isTrending: false,
    isNew: false,
  },
];

export default LecturesComponent;
