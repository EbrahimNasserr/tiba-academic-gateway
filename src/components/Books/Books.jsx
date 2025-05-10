"use client";

import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(4);

  // Update books per page based on screen size
  useEffect(() => {
    const updateBooksPerPage = () => {
      if (window.innerWidth < 768) { // mobile
        setBooksPerPage(1);
      } else if (window.innerWidth < 1024) { // tablet
        setBooksPerPage(2);
      } else { // desktop
        setBooksPerPage(4);
      }
    };

    // Initial check
    updateBooksPerPage();

    // Add event listener for window resize
    window.addEventListener('resize', updateBooksPerPage);

    // Cleanup
    return () => window.removeEventListener('resize', updateBooksPerPage);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        if (response.ok) {
          setBooks(data);
        } else {
          setError('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const currentBooks = books.slice(
    currentPage * booksPerPage,
    (currentPage + 1) * booksPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="custom-container">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Academic Books</h2>
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="custom-container">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Academic Books</h2>
          <div className="text-center text-red-500">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="custom-container">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Academic Books</h2>
        {books.length === 0 ? (
          <div className="text-center text-gray-500">
            No books available at the moment
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {currentBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
