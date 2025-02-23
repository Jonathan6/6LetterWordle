# 6 Letter Wordle

## Description

6 Letter Wordle is a twist on the popular New York Times minigame, Wordle. It follows the same gameplay mechanics but uses a word bank of six-letter words instead of five. This project was built using React and Vite to improve development efficiency and demonstrate proficiency in modern frontend development tools.


## Table of Contents
- [6 Letter Wordle](#6-letter-wordle)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [6 Letter Wordle Preview](#6-letter-wordle-preview)
  - [Overview](#overview)
  - [Features](#features)
  - [Word Data Source \& Processing](#word-data-source--processing)
  - [Technologies Used](#technologies-used)
    - [React](#react)
    - [Vite](#vite)
    - [Tailwind CSS](#tailwind-css)
    - [Recharts.js](#rechartsjs)
  - [Installation and Setup](#installation-and-setup)
  - [Future Improvements](#future-improvements)
  - [Conclusion](#conclusion)


## 6 Letter Wordle Preview

<details>
<summary>Click to Reveal</summary>

[![Screenshot of 6 Letter Wordle Application](./public/SixLetterWordlePreview.jpg)](https://jonathan6.github.io/6LetterWordle/)

Click the preview to be redirected to the website!

</details>


## Overview

This project was designed to enhance React state management, improve component-based UI design, and integrate efficient build tooling with Vite. The game logic follows the Wordle formula, where players guess a six-letter word and receive color-coded feedback based on letter correctness and positioning.


## Features

✅ Dynamic Game Board: A responsive UI that displays user input, validates guesses, and provides feedback.
<br /> ✅ Keyboard Input Handling: Users can type guesses using an on-screen or physical keyboard.
<br /> ✅ State Management: React hooks (useState) manage user input, game logic, and UI updates.
<br /> ✅ Fast Build and Hot Reloading: Uses Vite for quick development cycles.
<br /> ✅ Optimized Performance: Minimal re-renders and efficient state updates.

## Word Data Source & Processing

The word list used in this project was gathered from [word.tips](https://word.tips/) and is primarily designed for online word games like Words with Friends and Scrabble. Each word is associated with a point value based on its game scoring system.

To efficiently store and process the words, I used a script to extract the first six characters of each entry, convert them to uppercase, enclose them in quotes, and separate them with a space and comma. This formatting allowed for seamless integration into a JavaScript file.

Initially, I planned to validate user input through an online API. However, most free APIs for this purpose had slow response times, disrupting gameplay. By embedding the word list directly, the project ensures faster and more reliable word validation.

## Technologies Used

### [React](https://react.dev/)

- Component-based architecture: The application is built using reusable components, making it scalable and maintainable.
- State management: useState and useEffect hooks manage game progress, user input, and UI updates.

### [Vite](https://vite.dev/)

- Fast development server: Provides near-instant hot module replacement (HMR).
Optimized builds: Faster than traditional bundlers like Webpack.

### [Tailwind CSS](https://tailwindcss.com/)

- Utility-First Design: Tailwind’s utility classes allow for quick styling with minimal custom CSS.
- Responsive Layout: Built-in breakpoints ensure the app is mobile-friendly and adapts to various screen sizes.

### [Recharts.js](https://recharts.org/en-US)

- Data visualization: Used to display statistics such as win rates and guess distribution.


## Installation and Setup
To run the project locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/Jonathan6/6LetterWordle.git  
cd 6LetterWordle
```

2. Install dependencies:
```
npm install  
```

3. Start the development server:
```
npm run dev  
```

## Future Improvements
🔹 User Authentication: Implement login functionality to track user stats.
🔹 Leaderboard: Display local leaderboards.
🔹 Mobile Optimizations: Improve UI/UX for smaller screens.


## Conclusion
6 Letter Wordle showcases expertise in React, Vite, and frontend development best practices. The project demonstrates strong problem-solving skills, UI design proficiency, and modern web development techniques. Future improvements will continue to refine the gameplay and user experience.

🚀 Try it out now: [6 Letter Wordle](https://jonathan6.github.io/6LetterWordle/)