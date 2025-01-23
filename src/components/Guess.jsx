import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

const Guess = (props) => {
    const [wordArray, setWordArray] = useState(props.word ? [...props.word] : [" ", " ", " ", " ", " ", " "]);
    const [targetWord, setTargetWord] = useState("");
    
    useEffect(() => {
        console.log("COMPONENT MOUNTED");
        if (props.word) {
            setWordArray([...props.word])
        }
        if (props.targetWord) {
            setTargetWord(props.targetWord)
        }
        return () => {
            console.log("COMPONENT UNMOUNTED");
        };
    }, [props.word, props.targetWord]);

    // !!!! Need to add in logic for what color each character box is
    // !!!! Need to know what the target word is to color each char box
    // !!!! It will probably be easier to have a character box component that I can pass the character to 
    // !!!! Later on I need to reset this back to blank state
    return (
        <div className="guess-box">
            {wordArray.map((char, key) => {
                var color = ""
                if (char === " ") {
                    color = ""
                } else if (targetWord[key] === char) {
                    color = " green"
                } else if (targetWord.includes(char)) {
                    color = " yellow"
                } else {
                    color = " grey"
                }
                return (<h2 key={key} className={"character-box" + color}>{char}</h2>);
                })}
        </div>
    )
}

// return (
//     <div className="guess-box">
//         {wordArray.map((char, key) => <h2 key={key} className="character-box">{char}</h2>)}
//     </div>
// )

Guess.propTypes = {
  word: PropTypes.string,
  targetWord: PropTypes.string,
}

export {Guess};