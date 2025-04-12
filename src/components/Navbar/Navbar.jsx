"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Subjects", href: "/subjects" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="max-w-screen-xl mx-auto mt-6">
      <div className="custom-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" title="Tiba Academic Gateway" className="flex">
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

          {/* Mobile toggle button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex p-2 transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            <svg
              className={`${menuOpen ? "hidden" : "block"} w-6 h-6`}
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
            <svg
              className={`${menuOpen ? "block" : "hidden"} w-6 h-6`}
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

          {/* Desktop Links */}
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

        {/* Mobile Menu Links */}
        {menuOpen && (
          <div className="mt-4 space-y-2 lg:hidden">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="block text-base px-4 py-2 rounded hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
