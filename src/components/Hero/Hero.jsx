import Image from "next/image";
import BlurText from "./BlurText/BlurText";
export default function Hero() {
  return (
    <div className="">
      <section className="py-8">
        <div className="custom-container">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-lg font-bold tracking-wider text-secondary uppercase">
                tiba academic gateway,
              </h1>
              <p className="text-base font-semibold tracking-wider text-secondary uppercase">
                A social media for learners
              </p>
              <BlurText
                text="Connect & learn from the experts"
                delay={150}
                animateBy="words"
                direction="top"
                className="mt-4 text-4xl font-bold lg:mt-8 sm:text-6xl xl:text-8xl"
              />
              <p className="mt-4 text-base lg:mt-8 sm:text-xl">
                Grow your career fast with right mentor.
              </p>
            </div>
            <div>
              <Image
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                alt="hero"
                width={500}
                height={500}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
