"use client";
import { useState } from "react";
import Select from "react-select";
import Image from "next/image";
import Link from "next/link";
import Card from "./Card";
const options = [
  { value: "grade1", label: "Grade 1" },
  { value: "grade2", label: "Grade 2" },
  { value: "grade3", label: "Grade 3" },
  { value: "grade4", label: "Grade 4" },
  { value: "all", label: "All" },
];

const courses = [
  {
    id: 1,
    title: "information system",
    image: "/information.png",
    grades: ["grade1", "grade2"],
  },
  {
    id: 2,
    title: "statistics and probability",
    image: "/statistics.png",
    grades: ["grade1", "grade3"],
  },
  {
    id: 3,
    title: "database",
    image: "/Database.png",
    grades: ["grade2", "grade4"],
  },
  {
    id: 4,
    title: "linear algebra",
    image: "/linear.png",
    grades: ["grade1", "grade3"],
  },
  {
    id: 5,
    title: "computer science",
    image: "/computer-science.png",
    grades: ["grade1", "grade2", "grade4"],
  },
  {
    id: 6,
    title: "physics",
    image: "/physics.png",
    grades: ["grade2", "grade3", "grade4"],
  },
  {
    id: 7,
    title: "english",
    image: "/en.png",
    grades: ["grade1", "grade2", "grade3", "grade4"],
  },
  {
    id: 8,
    title: "differentiation and integration",
    image: "/calc.png",
    grades: ["grade3", "grade4"],
  },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "2px solid #060606",
    borderRadius: "10px",
    padding: "10px",
    width: "200px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#060606",
    backgroundColor: state.isSelected ? "#060606" : "#fff",
  }),
};

const LecturesComponent = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGradeChange = (selectedOption) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedGrade(selectedOption.value);
      if (selectedOption.value === "all") {
        setSelectedGrade(null);
      }
      setIsLoading(false);
    }, 500);
  };

  const filteredCourses = selectedGrade
    ? courses.filter((course) => course.grades.includes(selectedGrade))
    : courses;

  return (
    <section className="pb-16">
      <div className="custom-container">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold capitalize">
            choose your level
          </h1>
          <Select
            options={options}
            styles={customStyles}
            placeholder="Select Level"
            onChange={handleGradeChange}
            isDisabled={isLoading}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#455BB1]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <Card spotlightColor="rgba(0, 229, 255, 0.2)" key={course.id}>
                  <Link
                    href={`/lectures/${course.id}`}
                    key={course.id}
                    className=" rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-48 relative">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg capitalize">
                        {course.title}
                      </h3>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && selectedGrade && (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No courses available for this grade level.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LecturesComponent;
