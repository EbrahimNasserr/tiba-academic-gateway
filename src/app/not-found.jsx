import Image from "next/image";

export default function NotFound() {
  return (
    <div className="w-full flex justify-center items-center">
      <Image
        src="/notFound.svg"
        alt="not found"
        className="w-full h-[500px]"
        width={250}
        height={250}
        loading="lazy"
      />
    </div>
  );
}
