import Image from "next/image";

export default function Hero() {
  return (
      <section className="relative h-[400px] my-6 flex items-center justify-center text-white  mb-16">
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3"
          alt="Lecture Hall"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Lectures for Every Level</h1>
          <p className="text-xl mb-8">
            Dive into a full archive of lecture videos organized by academic level. Whether you're in your first year or final year, we've got the content to keep you on track.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Start Watching
          </button>
        </div>
      </section>
  );
}
