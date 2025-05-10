import Image from "next/image";
import { IoBookOutline } from "react-icons/io5";

export default function BookCard({ book }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg">
      <a href={book.webViewLink} target="_blank" rel="noopener noreferrer">
        <div className="aspect-[3/4] relative">
          {book.thumbnailUrl ? (
            <Image
              src={book.thumbnailUrl}
              alt={book.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <IoBookOutline className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>
      </a>
      <div className="p-5">
        <a href={book.webViewLink} target="_blank" rel="noopener noreferrer">
          <h5 className="mb-2 text-xl font-semibold tracking-tight truncate">
            {book.name}
          </h5>
        </a>
        <a
          href={book.webViewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-3 py-2 text-sm font-medium text-center border border-gray-300 rounded-md w-full justify-center hover:bg-gray-500 hover:text-white transition-all duration-300"
        >
          <IoBookOutline className="w-4 h-4 mr-2" />
          View Book
        </a>
      </div>
    </div>
    
  );
}
