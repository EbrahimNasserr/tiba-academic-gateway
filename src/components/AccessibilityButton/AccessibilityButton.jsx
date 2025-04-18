"use client";

import { useState } from "react";

const AccessibilityButton = ({ onScreenRead }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-black bg-opacity-70 text-white p-3 mb-2 rounded-lg text-sm animate-fadeIn">
          <button
            onClick={onScreenRead}
            className="w-full py-2 px-3 hover:bg-gray-700 rounded flex items-center gap-2"
            aria-label="Read page content"
          >
            <span role="img" aria-label="Speaker">
              🔊
            </span>
            <span>Read page content</span>
          </button>
          <div className="text-xs mt-2 p-2 bg-gray-800 rounded">
            <p>
              Keyboard shortcut:{" "}
              <kbd className="px-1 bg-gray-700 rounded">Alt+A</kbd>
            </p>
          </div>
        </div>
      )}
      <button
        onClick={toggleMenu}
        className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Accessibility options"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      </button>
    </div>
  );
};

export default AccessibilityButton;
