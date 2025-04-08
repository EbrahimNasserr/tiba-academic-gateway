import Abouthero from "./Components/AboutHero";
import ForSD from "./Components/ForSD";
import OurMission from "./Components/OurMission";
import WhatWeOffer from "./Components/WhatWeOffer";
import WhyTiba from "./Components/WhyTiba";

export default function About() {
  return (
    <main className="">
      {/* Hero Section */}
    <Abouthero />
      {/* Our Mission */}
    <OurMission />
      {/* What We Offer */}
     <WhatWeOffer/>
    {/* For Students & Doctors */}
    <ForSD/>
      {/* Why Choose Tiba */}
     <WhyTiba/>
      {/* Our Vision */}
      <section className="px-6 py-12  sm:py-16 lg:py-20">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold  mb-6">
      Our <span className="text-blue-600">Vision</span>
    </h2>
    <p className="text-lg  leading-relaxed">
      To become the go-to academic platform in our college and beyond — building a digital learning space where students and educators collaborate, share, and thrive.
    </p>
  </div>
</section>
      {/* Contact / CTA */}
      <section className="px-6 py-12  sm:py-16 lg:py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Have questions or suggestions?</h2>
        <p className="mb-2">📧 Reach out to us: <a href="mailto:your-email@example.com" className="text-blue-600 underline">your-email@example.com</a></p>
        <p>📍 Location: Tiba College Campus</p>
      </section>
    </main>
  );
}








