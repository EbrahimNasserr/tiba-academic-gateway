"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchLectures,
  selectAllLectures,
  selectLecturesStatus,
} from "../../../redux/features/lecturesSlice";
import Image from "next/image";
import { Clock, Download, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";

const LecturesPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const lectures = useAppSelector(selectAllLectures);
  const status = useAppSelector(selectLecturesStatus);
  const [selectedYear, setSelectedYear] = useState("1");

  useEffect(() => {
    dispatch(fetchLectures({ subject_id: id, year_id: selectedYear }));
  }, [dispatch, id, selectedYear]);

  return (
    <section className="py-12">
      <div className="custom-container">
        <div className="mb-8">
          <Link
            href="/subjects"
            className="flex items-center text-secondary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Subjects
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Available Lectures</h1>

        {/* Year Filter */}
        <div className="mb-8">
          <div className="flex gap-2">
            {["1", "2", "3", "4"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedYear === year
                    ? "bg-secondary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {year === "1"
                  ? "1st"
                  : year === "2"
                  ? "2nd"
                  : year === "3"
                  ? "3rd"
                  : "4th"}{" "}
                Year
              </button>
            ))}
          </div>
        </div>

        {status === "loading" && (
          <div className="flex justify-center my-12">
            <div className="animate-spin h-8 w-8 border-4 border-secondary rounded-full border-t-transparent"></div>
          </div>
        )}

        {status === "succeeded" && lectures.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No lectures found for this subject.
            </p>
          </div>
        )}

        {/* Lectures Grid */}
        {status === "succeeded" && lectures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture) => (
              <Link
                key={lecture.id}
                href={`/lectures/${lecture.id}`}
                className="border rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={lecture.image}
                    alt={lecture.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{lecture.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{lecture.video_duration}</span>
                  </div>
                  <p className="mb-4 line-clamp-2">{lecture.description}</p>
                  <div className="flex gap-2">
                    {lecture.video && (
                      <Link
                        href={lecture.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Watch Now
                      </Link>
                    )}
                    {lecture.pdf && (
                      <Link
                        href={lecture.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LecturesPage;
