import React from 'react'

export default function WhyTiba() {
  return (
    <section className="px-6 py-12  sm:py-16 lg:py-20  max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-10">
      Why Choose <span className="text-blue-600">Tiba Academic Gateway?</span>
    </h2>
  
    <div className="grid gap-6 md:grid-cols-2 ">
      {[
        'All-in-one learning platform for your college',
        'Easy access to lectures, books, and resources',
        'Organized by academic year and subject',
        'Built for both students and instructors',
      ].map((text, index) => (
        <div key={index} className="flex items-start gap-4 p-5  rounded-xl border border-gray-200 hover:shadow-md transition">
          <span className="text-green-500 text-2xl">✅</span>
          <p className="text-lg font-medium">{text}</p>
        </div>
      ))}
    </div>
  </section>
  )
}
