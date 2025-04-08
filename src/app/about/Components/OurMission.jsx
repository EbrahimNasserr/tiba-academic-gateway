"use client"

import React from 'react'

export default function OurMission() {
  return (
    <section>
    <div className="custom-container mx-auto py-12  sm:py-16 lg:py-20">
    <div className="flex justify-center items-center md:flex-row flex-col-reverse py-12 px-4">
      <div className="flex mt-12 md:mt-0 md:w-2/3 justify-start items-center flex-col space-y-6 md:space-y-8 xl:space-y-10">
        <div className="flex justify-start items-start flex-col space-y-4">
          <h1 className="text-xl w-full md:text-start lg:text-start text-center md:text-2xl xl:text-4xl font-semibold leading-5 md:leading-6 xl:leading-9 ">
            Our Mission
          </h1>
          <p className="text-base leading-normal md:text-start lg:text-start text-center">
          To empower students by giving them seamless access to quality learning materials, expert lectures, and organized course structures. We believe education should be accessible, engaging, and structured for real success.

          </p>
        </div>
        
      </div>
      <div className="md:w-5/6 xl:w-2/3 m-3">
        <img className='rounded-lg w-5/6' src="https://img.freepik.com/free-vector/emotional-feedback-concept-illustration_114360-15383.jpg?t=st=1744054946~exp=1744058546~hmac=30af18bef8cc6c7e0171d69f6fd4f9d2f11260a1af1909f59ea5c0b351912d21&w=740" alt="students" />
      </div>
    </div>
  </div>
</section>
  )
}
