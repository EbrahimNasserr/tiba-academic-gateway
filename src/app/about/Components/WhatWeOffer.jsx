import React from 'react'

export default function WhatWeOffer() {
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
    <h2 className="text-xl md:text-2xl xl:text-4xl font-semibold leading-5 md:leading-6 xl:leading-9 text-center mb-10">What We Offer</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-center">
      <div className="shadow border rounded-lg p-6 hover:shadow-xl duration-200 transition-all">
        <div className="text-3xl mb-2">📚</div>
        <h3 className="font-semibold mb-2">Courses</h3>
        <p>Categorized by subject and year, with structured content.</p>
      </div>
      <div className=" shadow border rounded-lg p-6 hover:shadow-xl duration-200 transition-all">
        <div className="text-3xl mb-2">🎓</div>
        <h3 className="font-semibold mb-2">Lectures</h3>
        <p>Uploaded by your college's doctors for all academic levels.</p>
      </div>
      <div className=" shadow border rounded-lg p-6 hover:shadow-xl duration-200 transition-all">
        <div className="text-3xl mb-2">📖</div>
        <h3 className="font-semibold mb-2">Books</h3>
        <p>Academic books and references, organized and searchable.</p>
      </div>
      <div className=" shadow border rounded-lg p-6 hover:shadow-xl duration-200 transition-all">
        <div className="text-3xl mb-2">📈</div>
        <h3 className="font-semibold mb-2">Academic Growth Tools</h3>
        <p>Learn at your pace with reliable, organized materials.</p>
      </div>
    </div>
  </section>
  )
}
