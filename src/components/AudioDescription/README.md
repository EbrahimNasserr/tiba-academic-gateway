# Audio Description Component

This component provides an accessibility feature that reads the content of the current page aloud to users when activated.

## Features

- **Page Content Description**: Provides an audio description of the current page content based on the URL path.
- **Multiple Activation Methods**:
  - Click anywhere on the screen (except interactive elements)
  - Use keyboard shortcut `Alt+A`
  - Use the dedicated accessibility button in the bottom-right corner
- **Visual Feedback**: Shows an indicator when audio is playing
- **Automatic Speech Synthesis**: Uses the Web Speech API to provide text-to-speech functionality

## How It Works

1. The component attaches event listeners for clicks and keyboard shortcuts
2. When activated, it determines the current page based on the URL path
3. It generates an appropriate description for the current page
4. It uses the browser's Speech Synthesis API to read the description aloud

## Usage

The component is automatically included in the root layout and doesn't require any props or configuration. It's designed to be unobtrusive and not interfere with regular site interactions.

## Customization

To add descriptions for new pages, modify the `getPageDescription` function and add new path conditions and corresponding descriptions. 