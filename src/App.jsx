import { useEffect, useState } from 'react';
import './App.css';
import wordBank from './utils/wordBank';

import { Guess } from './components/Guess';
import { Keyboard } from './components/Keyboard';
import { Leaderboard } from './components/Leaderboard';


function App() {
  const [targetWord, setTargetWord] = useState("");
  // The words the user has guessed
  const [guessHistory, setGuessHistory] = useState([]);
  // This is the word the user is coming up with
  const [userInput, setUserInput] = useState("");
  // Boolean that controls leaderboard toggle
  const [leaderboard, setLeaderboard] = useState(false);

  // !!!!! Need to add to hook so it runs at site start up
  const startGame = () => {
    const wordIndex = Math.floor(Math.random() * wordBank.length);
    setTargetWord(wordBank[wordIndex]);
    console.log(wordBank[wordIndex]);
  }

  // Used to track game logic and start the game on page load
  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    startGame();

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, []);

  const addCharUserInput = (char) => {
    setUserInput(prevUserInput => prevUserInput + char);
  }

  const removeLastCharUserInput = () => {
    setUserInput(prevUserInput => prevUserInput.slice(0,-1));
  }

  const submitGuess = () => {
    console.log(userInput);

    if (userInput.length !== 6) {
      console.log("WRONG LENGTH");
    } else if (!wordBank.includes(userInput)) {
      console.log("NOT VALID WORD");
    } else if (guessHistory.includes(userInput)) {
      console.log("WORD ALREADY GUESSED");
    } else {
      setGuessHistory([...guessHistory, userInput]);

      if (userInput === targetWord) {
        alert("CORRECT CORRECT CORRECT!!!");
        // !!!! show scoreboard
        // !!!! play again function
        // !!!! if yes : clear word history, start game
        // !!!! if no : thank player, show contact info
      }
    }
  }

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      addCharUserInput(key);
    } else if (key === "BACKSPACE") {
      if (userInput.length > 0) {
        removeLastCharUserInput();
      }
    } else if (key === "ENTER") {
      submitGuess();
    }
  }

  const toggleLeaderboard = () => {
    setLeaderboard((leaderboard) => !leaderboard);
  }

  
  return (
    <>
      <nav className='navbar'>
        <button>Tips</button>
        <button onClick={() => toggleLeaderboard()}>Leaderboard</button>
        <button>?</button>
        <button>Setting</button>
      </nav>
      <div className='content'>
        <div className="history-box">
          <Guess word={guessHistory[0]} targetWord={targetWord}/>
          <Guess word={guessHistory[1]} targetWord={targetWord}/>
          <Guess word={guessHistory[2]} targetWord={targetWord}/>
          <Guess word={guessHistory[3]} targetWord={targetWord}/>
          <Guess word={guessHistory[4]} targetWord={targetWord}/>
          <Guess word={guessHistory[5]} targetWord={targetWord}/>
        </div>
        <div className="ui">
          {userInput}
        </div>
        <Keyboard addChar={addCharUserInput} backspace={removeLastCharUserInput} submit={submitGuess}/>
      </div>
      {leaderboard && <Leaderboard toggleLeaderboard={toggleLeaderboard}/>}
    </>
  )
}

export default App
