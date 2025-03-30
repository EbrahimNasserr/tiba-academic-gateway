const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh]">
      <div className="custom-container">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">
            Your Gateway to Academic Excellence
          </h1>
          <p className="text-lg text-gray-400 text-left w-full md:w-[60%] md:text-center mt-4 dark:text-gray-800">
            Unlock a wealth of knowledge with our curated lectures for all four
            academic levels. Whether you're starting your journey or advancing
            your expertise, find the guidance and resources you need to succeed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
