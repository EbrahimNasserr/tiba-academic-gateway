"use client";
import React, { useState } from "react";

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      text: "This e-learning platform is a game-changer! The content is clear, interactive, and easy to follow. The quizzes and exercises really help reinforce key concepts. Highly recommend",
      name: "Leslie Alexander",
      image:
        "https://images.pexels.com/photos/3793238/pexels-photo-3793238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      text: "The platform stands out with its simple interface and flexible learning options. It's perfect for busy professionals like me. I love how I can learn at my own pace!",
      name: "Jacob Jones",
      image:
        "https://images.pexels.com/photos/1007066/pexels-photo-1007066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      text: "I love the hands-on approach! The course is practical and fun, and testing my knowledge right away made learning so much more effective.",
      name: "Jenny Wilson",
      image:
        "https://images.pexels.com/photos/3807735/pexels-photo-3807735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const StarRating = () => (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 text-[#FDB241]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="custom-container">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="mt-4 font-medium text-pretty capitalize text-2xl">
              Our happy Students say about us
            </h2>
          </div>

          <div className="relative mt-10 w-full max-w-5xl">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              />
            </div>

            <div className="relative flex items-center justify-center">
              {/* Desktop Arrows */}
              <button
                onClick={prev}
                className="hidden md:flex absolute left-0 z-10 w-10 h-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                ‹
              </button>

              <div className="w-full max-w-xl md:max-w-3xl px-4 sm:px-0">
                <div className="flex flex-col justify-between flex-1 p-6 shadow-xl rounded-3xl  lg:py-8 lg:px-7">
                  <div className="flex-1">
                    <StarRating />
                    <blockquote className="flex-1 mt-8">
                      <p className="text-lg leading-relaxed  font-pj">
                        "{testimonials[currentIndex].text}"
                      </p>
                    </blockquote>
                  </div>
                  <div className="flex items-center mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold  font-pj">
                        {testimonials[currentIndex].name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={next}
                className="hidden md:flex absolute right-0 z-10 w-10 h-10 items-center justify-center rounded-full border border-gray-300  hover:bg-gray-100 transition"
              >
                ›
              </button>
            </div>

            {/* Mobile Arrows Below */}
            <div className="flex justify-center gap-4 mt-6 md:hidden">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}







