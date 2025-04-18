# Voice Recognition Component

This component adds voice command functionality to the website, allowing users to control navigation and features using their voice.

## Features

- **Voice-Activated Commands**: Control the website using natural language voice commands
- **Navigation**: Navigate to different pages by voice (e.g., "Go to home")
- **Content Reading**: Trigger audio descriptions of the current page
- **Theme Control**: Switch between dark and light modes using voice commands
- **Visual Feedback**: Shows the recognized speech and status in real-time
- **Help System**: Ask for available commands with "Help" or "What can you do?"

## Available Voice Commands

- **Navigation**:
  - "Go to home" or "Home page"
  - "Go to courses" or "Courses page"
  - "Go to subjects" or "Subjects page"
  - "Go to about" or "About page"
  - "Dashboard"
- **Content Reading**:
  - "Read page" or "Describe page"
- **Theme Control**:
  - "Dark mode"
  - "Light mode"
- **Help**:
  - "Help" or "What can you do?"

## How It Works

1. The component uses the Web Speech API's SpeechRecognition interface
2. Users activate voice recognition by clicking the microphone button
3. The system listens for commands and processes them
4. For page reading commands, it triggers the AudioDescription component through a custom event
5. The component provides visual feedback during the recognition process

## Technical Implementation

- Uses the Web Speech API (SpeechRecognition and SpeechSynthesis)
- Communicates with the AudioDescription component using custom events
- Supports Next.js navigation via the router
- Handles errors and fallbacks for unsupported browsers

## Browser Support

This component relies on the Web Speech API, which is supported in most modern browsers including Chrome, Edge, Safari, and Firefox. However, implementation might vary across browsers.
