"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import AccessibilityButton from "../AccessibilityButton/AccessibilityButton";

const AudioDescription = () => {
  const audioRef = useRef(null);
  const [audioContent, setAudioContent] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const pathname = usePathname();

  // Function to get the page description based on pathname
  const getPageDescription = () => {
    // Default is home page
    let pageTitle = "You are on the home page.";
    let pageContent =
      "This page contains information about courses, subjects, and educational resources.";

    // Check different paths and assign appropriate descriptions
    if (pathname === "/courses") {
      pageTitle = "You are on the courses page.";
      pageContent =
        "This page displays available courses and educational content.";
    } else if (pathname === "/subjects") {
      pageTitle = "You are on the subjects page.";
      pageContent =
        "This page shows different subject categories and related materials.";
    } else if (pathname === "/about") {
      pageTitle = "You are on the about us page.";
      pageContent =
        "This page contains information about Tiba Academic Gateway.";
    } else if (pathname.startsWith("/dashboard")) {
      pageTitle = "You are on the dashboard page.";
      pageContent =
        "This page displays your personalized content and account information.";
    }

    return `${pageTitle} ${pageContent}`;
  };

  // Use the Web Speech API for text-to-speech
  const speakDescription = (text) => {
    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Set speaking state
    setIsPlaying(true);

    // Add event listener for when speech ends
    utterance.onend = () => {
      setIsPlaying(false);
    };

    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  // Manually trigger the audio description
  const handleManualTrigger = () => {
    const text = getPageDescription();
    setAudioContent(text);
    speakDescription(text);
  };

  // Handle click anywhere on the screen
  const handleScreenClick = (e) => {
    // Ignore clicks on buttons, links, and other interactive elements
    const tagName = e.target.tagName.toLowerCase();
    const isInteractive =
      tagName === "button" ||
      tagName === "a" ||
      tagName === "input" ||
      tagName === "select" ||
      tagName === "textarea" ||
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.role === "button";

    if (isInteractive) return;

    const text = getPageDescription();
    setAudioContent(text);
    speakDescription(text);
  };

  // Handle keyboard shortcut (Alt+A) for accessibility
  const handleKeyDown = (e) => {
    if (e.altKey && e.key === "a") {
      const text = getPageDescription();
      setAudioContent(text);
      speakDescription(text);
    }
  };

  useEffect(() => {
    // Add event listeners
    document.addEventListener("click", handleScreenClick);
    document.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      document.removeEventListener("click", handleScreenClick);
      document.removeEventListener("keydown", handleKeyDown);
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [pathname]);

  return (
    <>
      <AccessibilityButton onScreenRead={handleManualTrigger} />

      {isPlaying && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px 15px",
            borderRadius: "20px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <span className="animate-pulse">🔊</span>
          <span>Audio Description</span>
        </div>
      )}
    </>
  );
};

export default AudioDescription;
