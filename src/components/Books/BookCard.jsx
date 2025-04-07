import Image from "next/image";
import { IoBookOutline } from "react-icons/io5";

export default function BookCard({ book }) {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow-lg">
      <a href="#">
        <div className="aspect-[3/4] relative">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 truncate">
            {book.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {book.author}
        </p>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm text-black font-medium text-center border border-gray-300 rounded-md w-full justify-center hover:bg-gray-100 transition-all duration-300"
          >
            <IoBookOutline className="w-4 h-4 mr-2" />
            Read more
          </a>
      </div>
    </div>
  );
}
