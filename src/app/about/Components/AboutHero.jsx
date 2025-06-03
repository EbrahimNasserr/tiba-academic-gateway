import React from "react";
import Image from "next/image";

export default function Abouthero() {
  return (
    <section className="px-6 py-6 text-center ">
      <div className="custom-container">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9  pb-4">
              About Tiba Academic Gateway
            </h1>
            <p className="font-normal text-base leading-6  ">
              Bridging students and educators through accessible, high-quality
              academic resources for every stage of your college journey.
            </p>
          </div>
          <div className="w-full lg:w-8/12 ">
            <img
              className="w-full h-full"
              src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
              alt="A group of People"
            />
          </div>
        </div>
        {/* Who We Are */}
        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9  pb-4">
              Who We Are
            </h1>
            <p className="font-normal text-base leading-6  ">
              {" "}
              Tiba Academic Gateway is a student-centered platform dedicated to
              supporting academic growth and success. We provide organized
              access to courses, lectures, and essential academic books — all
              tailored for the four academic years of college. Whether you're
              just starting or preparing for graduation, Tiba is your trusted
              educational partner.
            </p>
          </div>
          <div className="w-full lg:w-8/12 lg:pt-8">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <Image
                  src="/joe.JPG"
                  width={450}
                  height={450}
                  alt="Yousef"
                  className=" rounded-sm"
                />
                <p className="font-medium text-xl leading-5  mt-4">Yousef</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <Image
                  className=" rounded-sm"
                  src="/3.jpg"
                  width={450}
                  height={450}
                  alt="Basel"
                />
                <p className="font-medium text-xl leading-5  mt-4">Basel</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <Image
                  className=" rounded-sm"
                  src="/4.jpg"
                  width={450}
                  height={450}
                  alt="tony"
                />
                <p className="font-medium text-xl leading-5  mt-4">Antonious</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <Image
                  className=" rounded-sm"
                  src="/hima.jpeg"
                  alt="hima featured img"
                  width={450}
                  height={450}
                />
                <p className="font-medium text-xl leading-5  mt-4">Hima</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
