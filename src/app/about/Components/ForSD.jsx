import React from 'react'

export default function ForSD() {
  return (
    <section className="px-6 py-12 sm:py-16 lg:py-20">
    <h2 className="text-xl md:text-2xl xl:text-4xl font-semibold leading-5 md:leading-6 xl:leading-9 text-center mb-12 ">For Students & Doctors</h2>
    <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
      {/* Students Card */}
      <div className=" hover:shadow-xl transition-shadow rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            🧑‍🎓
          </div>
          <h3 className="text-2xl font-semibold ">For Students</h3>
        </div>
        <ul className="list-disc list-inside space-y-3 ">
          <li>Browse and view lectures by level.</li>
          <li>Download books and study materials.</li>
          <li>Search by course or subject.</li>
        </ul>
      </div>
  
      {/* Doctors Card */}
      <div className=" hover:shadow-xl transition-shadow rounded-2xl p-8 border border-gray-100 ">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
            🧑‍🏫
          </div>
          <h3 className="text-2xl font-semibold ">For Doctors</h3>
        </div>
        <ul className="list-disc list-inside space-y-3 ">
          <li>Upload lectures for specific subjects and years.</li>
          <li>Manage your content from a personal dashboard.</li>
          <li>Connect directly with your students.</li>
        </ul>
      </div>
    </div>
  </section>
  )
}
