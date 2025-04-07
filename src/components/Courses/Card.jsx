import Image from "next/image";

export default function Card({ course }) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <a href="#">
        <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 truncate">
          {course.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500">{course.description}</p>
      <div className="flex items-center gap-2 mb-3">
        <Image
          src="/graduation-cap.svg"
          alt="graduationCap"
          width={20}
          height={20}
          loading="lazy"
        />
        <p className="text-gray-500">{course.instructor}</p>
      </div>
      <a
        href="#"
        className="flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#060606]/90 hover:bg-[#060606]/50 transition-all duration-300 rounded-lg"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}
