import Image from "next/image";
import { IoBookOutline } from "react-icons/io5";

export default function BookCard({ book }) {
  return (
    <div className="  border border-gray-200 rounded-lg shadow-lg">
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
          <h5 className="mb-2 text-xl font-semibold tracking-tight  truncate">
            {book.title}
          </h5>
        </a>
        <p className="mb-3 font-normal ">
          {book.author}
        </p>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm  font-medium text-center border border-gray-300 rounded-md w-full justify-center hover:bg-gray-500 transition-all duration-300"
          >
            <IoBookOutline className="w-4 h-4 mr-2" />
            Read more
          </a>
      </div>
    </div>
  );
}
