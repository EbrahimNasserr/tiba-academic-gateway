"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import logo from "../../../public/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          </button>          {/* Desktop Links */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="text-base transition-all duration-200 hover:text-opacity-80"
              >
                {link.name}
              </Link>
            ))}            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center p-2 text-sm bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    aria-expanded={userDropdownOpen}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">Hi, {user.email?.split('@')[0] || 'User'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>        {/* Mobile Menu Links */}
        {menuOpen && (
          <div className="mt-4 space-y-2 lg:hidden absolute right-0 bg-[#060606] w-full z-40 text-center dark:bg-white">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="block text-base px-4 py-2 rounded hover:bg-gray-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile User Section */}
            {user ? (
              <div className="px-4 py-2 border-t border-gray-600">
                <div className="flex items-center justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-gray-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-left">
                    <p className="text-base font-medium">Hi, {user.email?.split('@')[0] || 'User'}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-sm px-3 py-1.5 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (              <div className="px-4 py-2 border-t border-gray-600">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center text-sm px-3 py-1.5 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
