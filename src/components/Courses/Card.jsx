import Image from "next/image";

export default function Card({ course }) {
  return (
    <div className="max-w-sm p-6  border rounded-lg shadow-sm">
      <a href="#">
        <h5 className="mb-2 text-xl font-medium tracking-tight  truncate">
          {course.title}
        </h5>
      </a>
      <p className="mb-3 font-normal ">{course.description}</p>
      <div className="flex items-center gap-2 mb-3">
        <Image
          src="/graduation-cap.svg"
          alt="graduationCap"
          width={20}
          height={20}
          loading="lazy"
        />
        <p className="">{course.instructor}</p>
      </div>
      <a
        href={course.link}
        target="_blank"
        className="flex justify-center items-center px-3 py-2 text-sm font-medium text-center border  hover:bg-gray-500 transition-all duration-300 rounded-lg"
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
