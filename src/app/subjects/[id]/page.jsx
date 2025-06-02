"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useGetLecturesQuery } from "../../../redux/api/apiSlice";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Clock, Download, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";

const LecturesPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const year = searchParams.get('year') || "1";

  // Always call the query hook, but conditionally pass skip
  const {
    data: lectures,
    isLoading,
    isSuccess,
  } = useGetLecturesQuery({
    subject_id: id,
    year_id: year,
  }, {
    skip: !user // Skip the query when user is not available
  });

  useEffect(() => {
    if (!user) {
      router.push(`/auth/login?from=/subjects/${id}`);
    }
  }, [user, router, id]);

  // Early return after all hooks have been called
  if (!user) {
    return null; // Don't render anything while redirecting
  }

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

        {/* Year Display */}
        <h2 className="text-2xl font-semibold mb-6">
          {year === "1" ? "1st" : year === "2" ? "2nd" : year === "3" ? "3rd" : "4th"} Year Lectures
        </h2>

        {isLoading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin h-8 w-8 border-4 border-secondary rounded-full border-t-transparent"></div>
          </div>
        )}

        {isSuccess && lectures.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No lectures found for this subject.
            </p>
          </div>
        )}

        {/* Lectures Grid */}
        {isSuccess && lectures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="border rounded-xl shadow-sm overflow-hidden"
              >
                <Link
                  href={`/lectures/${lecture.id}`}
                  className="block"
                >
                  <div className="relative h-48">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_APP_URL_IMAGE}${lecture.image}`}
                      alt={lecture.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <div className="flex gap-2">
                    {lecture.video && (
                      <Link
                        href={`/lectures/${lecture.id}`}
                        rel="noopener noreferrer"
                        className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Watch Now
                      </Link>
                    )}
                    {lecture.pdf && (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_API_APP_URL_IMAGE}${lecture.pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        download
                      >
                        <Download className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LecturesPage;
