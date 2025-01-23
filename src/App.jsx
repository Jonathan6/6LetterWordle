import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

import { Guess } from './components/Guess'

import wordBank from './utils/wordBank'

function App() {
  // The words the user has guessed
  const [guessHistory, setGuessHistory] = useState([]);
  // !!!!!!!!! This is the target word. Currently at top of the page for clarity and devops
  const [targetWord, setTargetWord] = useState("Love All");
  // This is the word the user is coming up with
  const [userInput, setUserInput] = useState("");

  // !!!!! Need to add to hook so it runs at site start up
  const startGame = () => {
    const wordIndex = Math.floor(Math.random() * wordBank.length)
    console.log(wordIndex)
    setTargetWord(wordBank[wordIndex])
  }

  const updateGuess = () => {
    setUserInput(event.target.value.toUpperCase())
  }

  const submitGuess = () => {
    console.log(userInput)

    if (userInput.length !== 6) {
      console.log("WRONG LENGTH");
    } else if (!wordBank.includes(userInput)) {
      console.log("NOT VALID WORD");
    } else if (guessHistory.includes(userInput)) {
      console.log("WORD ALREADY GUESSED")
    } else {
      // update the next guess component with the guess
      // there's going to be a lot of logic here 
      setGuessHistory([...guessHistory, userInput])

      if (userInput === targetWord) {
        alert("CORRECT CORRECT CORRECT!!!")
      }
      
    }
  }

  

  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Wordle Plus One</h1>
      <div className="history-box">
        <h1>{targetWord}</h1>
        <Guess word={guessHistory[0]} targetWord={targetWord}/>
        <Guess word={guessHistory[1]} targetWord={targetWord}/>
        <Guess word={guessHistory[2]} targetWord={targetWord}/>
        <Guess word={guessHistory[3]} targetWord={targetWord}/>
        <Guess word={guessHistory[4]} targetWord={targetWord}/>
        <Guess word={guessHistory[5]} targetWord={targetWord}/>
      </div>
      <input onChange={updateGuess}></input> <button onClick={submitGuess}>Submit</button> <button onClick={startGame}>Start</button>

    </>
  )
}

export default App
