"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Book, Clock, Search } from "lucide-react";
import Select from "react-select";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchSubjects,
  selectAllSubjects,
  selectSubjectsStatus,
} from "../../../redux/features/subjectsSlice";

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "az", label: "A-Z" },
];

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "2px solid #060606",
    borderRadius: "10px",
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
    width: "140px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#060606",
    backgroundColor: state.isSelected ? "#060606" : "#fff",
  }),
};

const SubjectContent = () => {
  const [selectedYear, setSelectedYear] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const dispatch = useAppDispatch();
  const subjects = useAppSelector(selectAllSubjects);
  const status = useAppSelector(selectSubjectsStatus);

  useEffect(() => {
    dispatch(fetchSubjects({ q: searchQuery, year_id: selectedYear }));
  }, [dispatch, selectedYear, searchQuery]);

  // Sort subjects based on selected sort option
  const sortedSubjects = [...subjects].sort((a, b) => {
    if (sortBy === "recent") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return a.name.localeCompare(b.name); // A-Z sorting
  });

  return (
    <section className="pb-16">
      <div className="custom-container">
        <div className="">
          {/* Year Filter */}
          <div className="mb-12">
            {/* Desktop Button Group */}
            <div className="hidden gap-2 md:flex">
              {yearOptions.map((year) => (
                <button
                  key={year.value}
                  onClick={() => setSelectedYear(year.value)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedYear === year.value
                      ? "bg-secondary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {year.label}
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
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-white"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={sortOptions.find((option) => option.value === sortBy)}
                onChange={(selectedOption) => setSortBy(selectedOption.value)}
                options={sortOptions}
                styles={customStyles}
                isSearchable={false}
              />

              <div className="md:hidden">
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

          {/* Subjects List (if any) */}
          {status === "loading" && (
            <div className="flex justify-center my-12">
              <div className="animate-spin h-8 w-8 border-4 border-secondary rounded-full border-t-transparent"></div>
            </div>
          )}

          {status === "succeeded" && subjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">
                No subjects found for this year.
              </p>
            </div>
          )}

          {/* Subjects Grid */}
          {status === "succeeded" && subjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedSubjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.id}`}
                  className="border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <Book className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Year {subject.year_id}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-secondary to-secondary rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Looking for more study resources?
            </h2>
            <p className="text-lg mb-8">
              Enhance your learning journey with our comprehensive courses and
              books.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
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

export default SubjectContent;
