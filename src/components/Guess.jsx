import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

const Guess = (props) => {
    const [wordArray, setWordArray] = useState([]);
    const [targetWord, setTargetWord] = useState("");
    
    useEffect(() => {
        if (props.word) {
            setWordArray([...props.word])
        } else {
            setWordArray([" ", " ", " ", " ", " ", " "])
        }
        if (props.targetWord) {
            setTargetWord(props.targetWord);
        }
    }, [props.word, props.targetWord]);

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

Guess.propTypes = {
  word: PropTypes.string,
  targetWord: PropTypes.string,
}

export {Guess};