import { useEffect, useState, useRef } from 'react';
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
  const [scores, setScores] = useState([
        {
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
  const winCheck = useRef(false);

  const startGame = () => {
    // Select Word
    setGuessHistory([]);
    winCheck.current = true;
    const wordIndex = Math.floor(Math.random() * wordBank.length);
    setTargetWord(wordBank[wordIndex]);
    console.log(wordBank[wordIndex]);
  }

  // Used to track game logic and start the game on page load
  // General hook
  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    setUpLeaderboard();
    startGame();

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, []);

  // GuessHistory hook
  useEffect(() => {
    // loss
    // if (guessHistory.length > 0 && guessHistory[guessHistory.length - 1] === targetWord) {
      // alert("CORRECT CORRECT CORRECT!!!");
      // finishGame();
    // } else if (guessHistory.length >= 6) {
      // winCheck.current = false;
      // finishGame();
    // }
  }, [guessHistory]);

  // Scores hook
  // useEffect(() => {
  // }, [scores]);

  const addCharUserInput = (char) => {
    if (userInput.length < 6) {
      setUserInput(prevUserInput => prevUserInput + char);
    } else {
      console.log("too long!");
    }
  }

  const removeLastCharUserInput = () => {
    if (userInput.length > 0) {
      setUserInput(prevUserInput => prevUserInput.slice(0,-1));
    } else {
      console.log("too short!");
    }
  }

  const submitGuess = () => {
    if (userInput.length !== 6) {
      console.log("WRONG LENGTH");
    } else if (!wordBank.includes(userInput)) {
      console.log("NOT VALID WORD");
    } else if (guessHistory.includes(userInput)) {
      console.log("WORD ALREADY GUESSED");
    } else {
      setGuessHistory((guessHistory) => [...guessHistory, userInput]);
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

  // Loads previous scores onto leaderboard
  const setUpLeaderboard = () => {
    const data = localStorage.getItem('scores');
        if (data) {
            try {
                const scoresArray = JSON.parse(data);
                setScores(scoresArray);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.log("No scores found in localstorage");
            console.log(scores)
        }
  }

// Adds the result of the game to the leaderboard
  const updateScores = (target) => {
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
    //  TODO: Currently the console log delays it enough for scores to update to be stored locally.
    console.log(scores);
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  const finishGame = () => {
    // if (winCheck) {
    //   updateScores(guessHistory.length);
    // } else {
    //   updateScores(0);
    // }
    updateScores(guessHistory.length);
    toggleLeaderboard();
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
      {leaderboard && <Leaderboard toggleLeaderboard={toggleLeaderboard} startGame={startGame} scores={scores}/>}
    </>
  )
}

export default App;
