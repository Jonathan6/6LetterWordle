import { useEffect, useState } from 'react';
import './App.css';
import wordBank from './utils/wordBank';

import { Guess } from './components/Guess';
import { Keyboard } from './components/Keyboard';
import { Scoreboard } from './components/Modals/Scoreboard';
import { Settings } from './components/Modals/Settings';


function App() {
  // State 1: User is trying to guesss
  const [targetWord, setTargetWord] = useState("");
  // State 2: Words array the user has guessed
  const [guessHistory, setGuessHistory] = useState([]);
  // State 3: Current user guess
  const [userInput, setUserInput] = useState("");
  // State 4: Used to toggle scoreboard visibility
  const [scoreboard, setScoreboard] = useState(true);
  // State 5: Used to toggle scoreboard visibility
  const [settings, setSettings] = useState(false);
  // State 6: Number array of past scores
  const [scores, setScores] = useState(() => {
    const savedScores = localStorage.getItem("scores");
    return savedScores ? JSON.parse(savedScores) :
          [{
          name: '1',
          count: 0
          },
          {
          name: '2',
          count: 0
          },
          {
          name: '3',
          count: 0
          },
          {
          name: '4',
          count: 0
          },
          {
          name: '5',
          count: 0
          },
          {
          name: '6',
          count: 0
          },
          {
          name: 'Failed',
          count: 0
          },
      ];
  });
  // State 7: Current state ( active | win | loss )
  const [gameState, setGameState] = useState("");

  // General hook: start the game on page load
  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    if (targetWord === "") {
      startGame();
    }

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, []);

  // GuessHistory hook: sets game state
  useEffect(() => {
    if (guessHistory.length > 0) {
      // sets to loss
      if (guessHistory.length === 6) {
        setGameState("loss");
      }
      // sets to win
      // There is an edgecase where the user guesses the word on the final try and both these statements are true
      if (guessHistory.includes(targetWord)) {
        setGameState("win");
      }
    }
  }, [guessHistory]);

  useEffect(() => {
    if (gameState === "loss" || gameState === "win") {
      finishGame()
    }
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores])

  const startGame = () => {
    // Select Word
    setGuessHistory([]);
    setUserInput("")
    setGameState("active");
    const wordIndex = Math.floor(Math.random() * wordBank.length);
    setTargetWord(wordBank[wordIndex]);
    console.log(wordBank[wordIndex]);
  }

  const finishGame = () => {
    if (gameState == "win") {
      // win
      addScore(guessHistory.length);
      // TODO: add victory message
    } else {
      // loss
      addScore(0)
      // TODO: add loss message
    }
    toggleScoreboard();
  }

  const addCharUserInput = (char) => {
    if (userInput.length < 6) {
      setUserInput(prevUserInput => prevUserInput + char);
    } else {
      console.log("too long!");
      console.log(userInput);
    }
  }

  const removeLastCharUserInput = () => {
    if (userInput.length > 0) {
      setUserInput(prevUserInput => prevUserInput.slice(0,-1));
    } else {
      console.log("too short!");
      console.log(userInput);
    }
  }

  const checkGuess = (word) => {
    if (word.length !== 6) {
      console.log("WRONG LENGTH");
      return false;
    } else if (!wordBank.includes(word)) {
      console.log("NOT VALID WORD");
      return false;
    } else if (guessHistory.includes(word)) {
      console.log("WORD ALREADY GUESSED");
      return false
    } else {
      return true;
    }
  }

  const submitGuess = () => {
    console.log(userInput);
    if (checkGuess(userInput)) {
      setGuessHistory((guessHistory) => [...guessHistory, userInput]);
      setUserInput("");
    }
  }

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      addCharUserInput(key);
    } else if (key === "BACKSPACE") {
      removeLastCharUserInput();
    } else if (key === "ENTER") {
      submitGuess();
    }
  }

  const toggleScoreboard = () => {
    setScoreboard((scoreboard) => !scoreboard);
  }

  const toggleSettings = () => {
    setSettings((settings) => !settings);
  }

// Adds the result of the game to the scoreboard
  const addScore = (target) => {
    // Since it is possible to win on the 6th guess winCheck is to determine if player won or lost
    // We add one to the index equal to guessHistory length
    setScores(scores.map((score) => {
      if (score.name === target.toString()) {
        return ({
          name: score.name,
          count: score.count + 1
          });
      } else if (target === 0 && score.name === "Failed") {
        return ({
          name: score.name,
          count: score.count + 1
          });
      } else {
        return score;
      }
    }));
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  const clearScores = () => {
    setScores([{
      name: '1',
      count: 0
      },
      {
      name: '2',
      count: 0
      },
      {
      name: '3',
      count: 0
      },
      {
      name: '4',
      count: 0
      },
      {
      name: '5',
      count: 0
      },
      {
      name: '6',
      count: 0
      },
      {
      name: 'Failed',
      count: 0
      },
    ]);
  }

  return (
    <>
      <nav className='navbar'>
        <button>Tips</button>
        <button onClick={() => toggleScoreboard()}>Scoreboard</button>
        <button>?</button>
        <button onClick={() => toggleSettings()}>Settings</button>
      </nav>
      {scoreboard && <Scoreboard toggleScoreboard={toggleScoreboard} startGame={startGame} scores={scores} gameState={gameState} clearScores={clearScores}/>}
      {settings && <Settings toggleModal={toggleSettings}/>}
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
      
    </>
  )
}

export default App;
