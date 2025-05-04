# Spelling Test Web App

A simple and interactive web application to help you practice and improve your spelling skills. The app reads words aloud and tests your ability to spell them correctly.

## Features

- **Word Pronunciation**: Hear the word spoken aloud using text-to-speech
- **Interactive Testing**: Type your answer and get immediate feedback
- **Score Tracking**: Keep track of correct and incorrect answers
- **Progress Monitoring**: See how many words you've attempted and how many remain
- **Incorrect Words List**: View a list of words you've misspelled with your incorrect attempts
- **Keyboard Shortcuts**:
  - `Enter`: Check your answer or move to the next word
  - `Space`: Hear the current word spoken aloud

## How to Use

1. **Setup**:
   - Place all files (`index.html`, `styles.css`, `script.js`, and `words.txt`) in the same directory
   - Open `index.html` in a web browser

2. **Taking the Test**:
   - Click the "Speak Word" button or press `Space` to hear the word
   - Type your answer in the text box
   - Press `Enter` or click "Check" to verify your answer
   - Press `Enter` or click "Next" to move to the next word

3. **Viewing Results**:
   - Your score is displayed at the top of the page
   - Click "Show Incorrect Words" to see words you've misspelled
   - Each incorrect word shows both the correct spelling and your attempt

## File Structure

- `index.html`: The main interface of the application
- `styles.css`: Styling for the application
- `script.js`: Core functionality and logic
- `words.txt`: List of words to practice (one word per line)

## Customization

You can customize the words to practice by editing the `words.txt` file:
- Add or remove words
- One word per line
- Words can be of any length
- Empty lines are ignored

## Browser Compatibility

The app works best in modern browsers that support:
- Web Speech API (for text-to-speech)
- Modern JavaScript features
- CSS Flexbox

## Keyboard Controls

- `Space`: Speak the current word
- `Enter`: 
  - When typing: Check your answer
  - After checking: Move to the next word

## Score Tracking

The app tracks:
- Correct answers: Shows as "Correct: X/Y"
- Incorrect answers: Shows as "Incorrect: X/Y"
- Remaining words: Shows how many words are left to practice

Where:
- X = Number of correct/incorrect answers
- Y = Total number of words attempted
