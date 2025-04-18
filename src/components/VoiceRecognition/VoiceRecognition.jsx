"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const VoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [aiContext, setAiContext] = useState([]);
  const recognitionRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const processingRef = useRef(false);

  useEffect(() => {
    let recognition;

    // Initialize speech recognition
    const initializeSpeechRecognition = () => {
      // Check if browser supports SpeechRecognition
      if (
        "webkitSpeechRecognition" in window ||
        "SpeechRecognition" in window
      ) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.continuous = false;
        recognition.interimResults = false; // Changed to false for more reliable results
        recognition.maxAlternatives = 1;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsListening(true);
          setFeedback("Listening...");
          processingRef.current = false;
        };

        recognition.onresult = (event) => {
          if (processingRef.current) return;
          processingRef.current = true;

          const last = event.results.length - 1;
          const transcriptText = event.results[last][0].transcript;
          console.log("Recognized text:", transcriptText);
          setTranscript(transcriptText);

          // Process the command immediately
          handleCommand(transcriptText);
        };

        recognition.onend = () => {
          setIsListening(false);
          // Don't call handleCommand here again
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          setFeedback("Error: " + event.error);
          processingRef.current = false;
        };
      } else {
        setFeedback("Speech recognition not supported in this browser");
      }
    };

    initializeSpeechRecognition();

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error("Error stopping recognition:", error);
        }
      }
    };
  }, []);

  // Add to conversation context
  const updateAiContext = (userInput, aiResponse) => {
    setAiContext((prev) =>
      [
        ...prev,
        { role: "user", content: userInput },
        { role: "assistant", content: aiResponse },
      ].slice(-6)
    ); // Keep only last 3 exchanges
  };

  // Use global window actions if available
  const executeAction = (actionType, params) => {
    if (window.tibaVoiceActions && window.tibaVoiceActions[actionType]) {
      console.log(`Executing action: ${actionType}`, params);
      return window.tibaVoiceActions[actionType](params);
    }
    return false;
  };

  // Process the voice command
  const handleCommand = (command) => {
    if (!command) {
      processingRef.current = false;
      return;
    }

    const lowerCommand = command.toLowerCase().trim();

    // Log the command for debugging
    console.log("Processing voice command:", lowerCommand);

    // Check if this is a follow-up question referencing previous context
    const isFollowUp =
      lowerCommand.includes("what about") ||
      lowerCommand.startsWith("how about") ||
      lowerCommand.startsWith("and") ||
      lowerCommand.includes("tell me more");

    // Basic NLP intent detection
    const hasNavigationIntent =
      lowerCommand.includes("go to") ||
      lowerCommand.includes("navigate") ||
      lowerCommand.includes("open") ||
      lowerCommand.includes("page") ||
      lowerCommand === "home" ||
      lowerCommand === "courses" ||
      lowerCommand === "subjects" ||
      lowerCommand === "about";

    const hasReadIntent =
      lowerCommand.includes("read") ||
      lowerCommand.includes("describe") ||
      lowerCommand.includes("tell me about") ||
      lowerCommand.includes("what is");

    const hasThemeIntent =
      lowerCommand.includes("mode") ||
      lowerCommand.includes("theme") ||
      lowerCommand.includes("dark") ||
      lowerCommand.includes("light");

    // Check for greetings
    if (
      lowerCommand.includes("hello") ||
      lowerCommand.includes("hi") ||
      lowerCommand.includes("hey")
    ) {
      const response =
        "Hello! How can I help you today? You can ask me to navigate to different pages, read content, or change the theme.";
      setFeedback(response);
      speakFeedback(response);
      updateAiContext(command, response);
    }
    // Navigate to different pages
    else if (hasNavigationIntent) {
      let navigationTarget = null;

      if (lowerCommand.includes("home") || lowerCommand === "home") {
        navigationTarget = "/";
        const response = "Navigating to home page...";
        setFeedback(response);
        speakFeedback(response);
        updateAiContext(command, response);
      } else if (
        lowerCommand.includes("courses") ||
        lowerCommand === "courses"
      ) {
        navigationTarget = "/courses";
        const response = "Navigating to courses page...";
        setFeedback(response);
        speakFeedback(response);
        updateAiContext(command, response);
      } else if (
        lowerCommand.includes("subjects") ||
        lowerCommand === "subjects"
      ) {
        navigationTarget = "/subjects";
        const response = "Navigating to subjects page...";
        setFeedback(response);
        speakFeedback(response);
        updateAiContext(command, response);
      } else if (lowerCommand.includes("about") || lowerCommand === "about") {
        navigationTarget = "/about";
        const response = "Navigating to about page...";
        setFeedback(response);
        speakFeedback(response);
        updateAiContext(command, response);
      } else if (lowerCommand.includes("dashboard")) {
        navigationTarget = "/dashboard";
        const response = "Navigating to dashboard...";
        setFeedback(response);
        speakFeedback(response);
        updateAiContext(command, response);
      } else {
        const response =
          "I'm not sure which page you want to navigate to. You can say 'go to home', 'go to courses', 'go to subjects', or 'go to about'.";
        setFeedback(response);
        speakFeedback(response);
        updateAiContext(command, response);
      }

      // Use the global action if available, otherwise fallback to router
      if (navigationTarget) {
        setTimeout(() => {
          console.log("Navigating to:", navigationTarget);

          // Try global action first
          const success = executeAction("navigateTo", navigationTarget);

          // Fallback to router if global action failed or isn't available
          if (!success) {
            router.push(navigationTarget);
          }
        }, 1000);
      }
    }
    // Read the current page content
    else if (hasReadIntent || (isFollowUp && aiContext.length > 0)) {
      let response;

      if (isFollowUp) {
        response = "Let me tell you more about this page.";
      } else {
        response = "Reading the current page content...";
      }

      setFeedback(response);
      speakFeedback("I'll read the page content for you.");

      // Use setTimeout to ensure the event is dispatched after state updates
      setTimeout(() => {
        try {
          console.log("Dispatching readPageContent event");

          // Try global action first
          const success = executeAction("readPageContent");

          // Fallback to direct event dispatch
          if (!success) {
            const readPageEvent = new CustomEvent("readPageContent");
            document.dispatchEvent(readPageEvent);
          }
        } catch (error) {
          console.error("Error dispatching event:", error);
        }
      }, 500);

      updateAiContext(command, "I've read the page content for you.");
    }
    // Toggle dark/light mode
    else if (hasThemeIntent) {
      if (lowerCommand.includes("dark")) {
        const response = "Switching to dark mode...";
        setFeedback(response);
        speakFeedback(response);

        setTimeout(() => {
          // Try global action first
          const success = executeAction("setDarkMode", false);

          // Fallback to direct class manipulation
          if (!success) {
            document.documentElement.classList.add("dark");
          }
        }, 300);

        updateAiContext(command, response);
      } else if (lowerCommand.includes("light")) {
        const response = "Switching to light mode...";
        setFeedback(response);
        speakFeedback(response);

        setTimeout(() => {
          // Try global action first
          const success = executeAction("setDarkMode", true);

          // Fallback to direct class manipulation
          if (!success) {
            document.documentElement.classList.remove("dark");
          }
        }, 300);

        updateAiContext(command, response);
      } else {
        const response = "Do you want me to switch to dark mode or light mode?";
        setFeedback(response);
        speakFeedback(response);
        updateAiContext(command, response);
      }
    }
    // Help command
    else if (
      lowerCommand.includes("help") ||
      lowerCommand.includes("what can you do")
    ) {
      const response =
        'I can help you navigate the website, read page content, and change display settings. Try saying "go to home", "read page", "dark mode", or "light mode".';
      setFeedback(response);
      speakFeedback(response);
      updateAiContext(command, response);
    }
    // Thank you responses
    else if (
      lowerCommand.includes("thank") ||
      lowerCommand.includes("thanks")
    ) {
      const response =
        "You're welcome! Is there anything else I can help you with?";
      setFeedback(response);
      speakFeedback(response);
      updateAiContext(command, response);
    }
    // Contextual follow-up questions
    else if (isFollowUp && aiContext.length > 0) {
      // Try to determine intent from previous context
      const lastExchange = aiContext[aiContext.length - 1];

      if (lastExchange.content.includes("home")) {
        const response = "Navigating to the home page.";
        setFeedback(response);
        speakFeedback(response);

        setTimeout(() => {
          // Try global action first
          const success = executeAction("navigateTo", "/");

          // Fallback to router
          if (!success) {
            router.push("/");
          }
        }, 1000);

        updateAiContext(command, response);
      } else if (lastExchange.content.includes("course")) {
        const response = "Navigating to the courses page.";
        setFeedback(response);
        speakFeedback(response);

        setTimeout(() => {
          // Try global action first
          const success = executeAction("navigateTo", "/courses");

          // Fallback to router
          if (!success) {
            router.push("/courses");
          }
        }, 1000);

        updateAiContext(command, response);
      } else {
        const response =
          "I'm not sure what you're referring to. Could you be more specific?";
        setFeedback(response);
        speakFeedback(response);
        updateAiContext(command, response);
      }
    } else {
      const response =
        "I'm not sure how to help with that. Try saying 'help' for a list of commands I can understand.";
      setFeedback(response);
      speakFeedback(response);
      updateAiContext(command, response);
    }

    // Clear transcript after processing
    setTranscript("");

    // Reset processing flag after a delay
    setTimeout(() => {
      processingRef.current = false;
    }, 1500);
  };

  // Speak feedback using TTS
  const speakFeedback = (text) => {
    if ("speechSynthesis" in window) {
      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        // Ensure speech synthesis starts
        window.speechSynthesis.speak(utterance);
        console.log("Speaking:", text);
      } catch (error) {
        console.error("Error in speech synthesis:", error);
      }
    }
  };

  // Start listening for voice commands
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        // Reset any previous state
        setTranscript("");
        processingRef.current = false;

        // Cancel any ongoing speech synthesis to avoid interference
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }

        // Start listening
        recognitionRef.current.start();
        console.log("Started listening");
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setFeedback("Error starting voice recognition. Please try again.");
      }
    } else {
      setFeedback(
        "Voice recognition not available. Please try again or use a different browser."
      );
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
        console.log("Stopped listening");
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
      }
    }
  };

  // Manual trigger for testing commands
  const testCommand = (command) => {
    setTranscript(command);
    handleCommand(command);
  };

  return (
    <div className="fixed bottom-36 right-5 z-50 flex flex-col items-end">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-3 ${
          isListening ? "bg-red-600 animate-pulse" : "bg-green-600"
        } text-white rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500`}
        aria-label={isListening ? "Stop listening" : "Start voice commands"}
        title="Voice commands"
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
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      </button>

      {(isListening || feedback) && (
        <div className="bg-black bg-opacity-70 text-white p-3 mb-2 rounded-lg text-sm animate-fadeIn max-w-xs">
          {isListening && (
            <p className="font-medium">Listening... Say a command</p>
          )}
          {transcript && (
            <p className="text-gray-300 italic mt-1">{transcript}</p>
          )}
          {feedback && !isListening && <p>{feedback}</p>}
          <div className="text-xs mt-2 p-2 bg-gray-800 rounded">
            <p>Try saying: "Go to home", "Read page", or "Help"</p>
          </div>

          {/* Test buttons (remove in production) */}
          <div className="mt-2 flex flex-wrap gap-1">
            <button
              onClick={() => testCommand("Go to home")}
              className="text-xs bg-blue-600 px-1 rounded"
            >
              Test: Go to home
            </button>
            <button
              onClick={() => testCommand("Read page")}
              className="text-xs bg-blue-600 px-1 rounded"
            >
              Test: Read page
            </button>
            <button
              onClick={() => testCommand("Dark mode")}
              className="text-xs bg-blue-600 px-1 rounded"
            >
              Test: Dark mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecognition;
