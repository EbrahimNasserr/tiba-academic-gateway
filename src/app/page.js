import Hero from "@/components/Hero/Hero";
import { ScrollVelocity } from "@/components/ScrollVelocity/ScrollVelocity";
import InfiniteMenu from "@/components/InfiniteMenu/InfiniteMenu";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
import Aboutsec from "@/components/ِAboutsec/Aboutsec";
import Testimonial from "@/components/Testimomial/Testimonial";
import Courses from "@/components/Courses/Courses";
import Books from "@/components/Books/Books";
const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: '/courses/programming-fundamentals',
    title: 'Programming',
    description: 'Master coding basics with Python, Java, and JavaScript'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: '/courses/algorithms',
    title: 'Algorithms',
    description: 'Learn efficient problem-solving techniques and computational thinking'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: '/courses/algorithms',
    title: 'Data Science',
    description: 'Learn about data science fundamentals, data analysis, and data visualization'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: '/courses/algorithms',
    title: 'Data Structures',
    description: 'Learn about data structures and algorithms'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: '/courses/web-development',
    title: 'Web Development',
    description: 'Build modern websites with HTML, CSS, React and backend technologies'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: '/resources/projects',
    title: 'Project Portfolio',
    description: 'Create real-world applications to showcase your skills to employers'
  }
];



export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollVelocity
        texts={["Educational Journey", "Skill Development"]}
        velocity={50}
        className="custom-scroll-text"
      />
      <Aboutsec />
      <Courses />
      <Books />
      <div className=" custom-container py-12  sm:py-16 lg:py-20">
        <TiltedCard />
      </div>
      <div className="h-[600px] relative max-w-[90%] mx-auto py-12  sm:py-16 lg:py-20">
        <InfiniteMenu items={items} />
      </div>
      <Testimonial />
    </main>
  );
}
