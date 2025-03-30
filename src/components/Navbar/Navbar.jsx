import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";

export default function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Lectures", href: "/lectures" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="max-w-screen-xl mx-auto mt-6">
      <div className="custom-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" title className="flex">
              <Image
                className="w-auto"
                src={logo}
                alt="logo"
                width={50}
                height={50}
                loading="lazy"
              />
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex p-2 transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            {/* Menu open: "hidden", Menu closed: "block" */}
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
            {/* Menu open: "block", Menu closed: "hidden" */}
            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="text-base transition-all duration-200 hover:text-opacity-80"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
