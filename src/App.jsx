import { useEffect, useState } from 'react';
import './App.css';
import wordBank from './utils/wordBank';

import { Guess } from './components/Guess';
import { Keyboard } from './components/Keyboard';
import { Scoreboard } from './components/Modals/Scoreboard';
import { Settings } from './components/Modals/Settings';
import { Navbar } from './components/Navbar';
import { Alert } from './components/Alert';


function App() {
  // State 1: Used to toggle scoreboard visibility
  const [scoreboard, setScoreboard] = useState(false);
  // State 2: Used to toggle scoreboard visibility
  const [settings, setSettings] = useState(false);
  // State 3: Boolean array of the user's saved settings
  const [presets, setPresets] = useState(() => {
    const savedSettings = localStorage.getItem("settings");
    return savedSettings ? JSON.parse(savedSettings) : [false, true, false];
  });
  // State 4: Number array of past scores
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
  // State 5: Current state ( active | win | loss )
  const [gameState, setGameState] = useState("");
  
  // State 6: User is trying to guesss
  const [targetWord, setTargetWord] = useState("");
  // State 7: Words array the user has guessed
  const [guessHistory, setGuessHistory] = useState(["","","","","",""]);
  // State 8: Current user guess
  const [userInput, setUserInput] = useState("");
  // State 9: Current index in guessHistory to modify
  const [currentIndex, setCurrentIndex] = useState(0);
  // State 10: Assigns each tile a color depending on guess/target word
  const [colors, setColors] = useState([[],[],[],[],[],[]]);

  // State 11: Shows Alert
  const [alertVisible, setAlertVisible] = useState(false);
  // State 12: Alert text
  const[alertText, setAlertText] = useState("");
  // State 13: Today date, used to generate daily work and check to see if player has completed daily
  const [date, setDate] = useState("");

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

  useEffect(() => {
    setGuessHistory(guessHistory.map((word, index) => {
      if (index === currentIndex) {
        return userInput;
      } else {
        return word;
      }
    }));
  }, [userInput]);

  useEffect(() => {
    if (gameState === "win" || gameState === "loss") {
      if (gameState === "win") {
        addScore(currentIndex);
        setTimeout(() => {
          sendAlert("Wonderful!");
        }, 6000);
      } else if (gameState === "loss") {
        addScore(0)
        setTimeout(() => {
          sendAlert("Maybe Next Time");
        }, 6000);
      }
      setTimeout(() => {
        toggleScoreboard()
        saveState();
      }, 7000);
    }
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    document.getElementById('body').classList.add('bg-white');
    document.getElementById('body').classList.add('dark:bg-black');

    if (presets[1]) {
      document.getElementById('body').classList.add('dark');
    } else {
      document.getElementById('body').classList.remove('dark');
    }
    if (presets[2]) {
      document.getElementById('body').classList.add('contrast');
    } else {
      document.getElementById('body').classList.remove('contrast');
    }
    localStorage.setItem("settings", JSON.stringify(presets));
  }, [presets]);

  useEffect(() => {
    if (currentIndex > 0) {
      if (guessHistory[currentIndex - 1] === targetWord) {
        setGameState("win");
      } else if (currentIndex >= 6) {
        setGameState("loss");
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    // bugged
    // if (scoreboard || settings) {
    //   window.removeEventListener('keyup', handleKeyPress);
    // } else if (!scoreboard && !settings) {
    //   window.addEventListener('keyup', handleKeyPress);
    // }
  }, [scoreboard, settings]);

  const startGame = () => {
    const savedDate = localStorage.getItem("savedDate");
    const date = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    if (date != savedDate) {
      setGuessHistory(["","","","","",""]);
      setColors([[],[],[],[],[],[]]);
      setUserInput("")
      setCurrentIndex(0);
      setGameState("active");
      setTargetWord(getDailyWord(date));
      setDate(date);
    } else {
      setState();
    }
  }

  const setState = () => {
    setGuessHistory(JSON.parse(localStorage.getItem("savedGuessHistory")));
    setCurrentIndex(localStorage.getItem("savedCurrentIndex"));
    setColors(JSON.parse(localStorage.getItem("savedColors")));
  }

  const saveState = () => {
    localStorage.setItem("savedGuessHistory", JSON.stringify(guessHistory));
    localStorage.setItem("savedCurrentIndex", currentIndex);
    localStorage.setItem("savedColors", JSON.stringify(colors));
    localStorage.setItem("savedDate", date);
  }

  const getDailyWord = (date) => {
    // Simple hash using bitwise operations
    const year = parseInt(date.substring(0,4));
    const month = parseInt(date.substring(5,7));
    const day = parseInt(date.substring(8));
    console.log(`year:${year} month:${month} day:${day} date:${date}`);

    const prime1 = 31;
    const prime2 = 37;
    const prime3 = 41;

    let hash = (year * prime3) ^ (month * prime2) ^ (day * prime1);
    hash = (hash << 5) - hash; // Bitwise shift for extra randomness

    console.log(wordBank[Math.abs(hash) % wordBank.length]);
    
    // Use modulo to keep within word bank range
    return wordBank[Math.abs(hash) % wordBank.length];
}

  const addCharUserInput = (char) => {
    if (userInput.length < 6) {
      setUserInput(prevUserInput => prevUserInput + char);
    } else {
      sendAlert("Too Long");
    }
  }

  const removeLastCharUserInput = () => {
    if (userInput.length > 0) {
      setUserInput(prevUserInput => prevUserInput.slice(0,-1));
    }
  }

  const checkGuess = (word) => {
    if (word.length !== 6) {
      sendAlert("Wrong Length");
      return false;
    } else if (!wordBank.includes(word)) {
      sendAlert("Not a Valid Word");
      return false;
    } else {
      for (let i = 0; i < currentIndex; i++) {
        if (guessHistory[i] === word) {
          return false;
        }
      }
      return true
    }
  }

  const submitGuess = (word) => {
    if (checkGuess(word)) {
      /*
      step 1 find the word in guess history. We determine colors from this
      step 2 map based on word in guess history comparing to target word creating new array
      step 3 map function colors the right guess colors aray
      */
      const color = [...userInput].map((char, index) => {
        if (char === targetWord[index]) {
          return "g";
        } else if (targetWord.includes(char)) {
          return "y";
        } else {
          return "w";
        }
      });
      setColors(colors.map((curr, index) => {
        if (index === currentIndex) {
          return color;
        } else {
          return curr;
        }
      }));

      setUserInput("");
      setCurrentIndex((preIndex) => preIndex + 1);
    }
  }

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    console.log(key);
    if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      addCharUserInput(key);
    } else if (key === "BACKSPACE") {
      setUserInput(prevUserInput => prevUserInput.slice(0,-1));
    } else if (key === "ENTER") {
      submitGuess(userInput);
    }
  }

  const toggleScoreboard = () => {
    setScoreboard((scoreboard) => !scoreboard);
  }

  const toggleSettings = () => {
    setSettings((settings) => !settings);
  }

  const adjustSettings = (num) => {
    setPresets(presets.map((state, index) => {
      if (index === num) {
        return !state;
      } else {
        return state;
      }
    }));
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

  const sendAlert = (message) => {
    setAlertText(message);
    setAlertVisible(true);
  }

  return (
    <>
      <Navbar toggleScoreboard={toggleScoreboard} toggleSettings={toggleSettings}></Navbar>
      {scoreboard && <Scoreboard toggleScoreboard={toggleScoreboard} startGame={startGame} scores={scores} gameState={gameState} clearScores={clearScores}/>}
      {settings && <Settings toggleModal={toggleSettings} presets={presets} adjustSettings={adjustSettings}/>}
      {alertVisible && <Alert message={alertText} duration={1000} onClose={() => setAlertVisible(false)}></Alert>}
      <div className='content'>
        <div className="history-box p-[20px]">
          {guessHistory.map((word, index) => {
            return <Guess word={word} key={index} colors={colors[index]}/>
          })}
        </div>
        <Keyboard addChar={addCharUserInput} backspace={removeLastCharUserInput} submit={submitGuess} userInput={userInput}/>
      </div>
    </>
  )
}

export default App;