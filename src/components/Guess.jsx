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
                    color = " bg-white dark:bg-black"
                } else if (targetWord[key] === char) {
                    color = "bg-green contrast:bg-orange-500 contrast:text-black"
                } else if (targetWord.includes(char)) {
                    color = "bg-yellow contrast:bg-sky-500 contrast:text-black"
                } else {
                    color = "bg-grey"
                }
                return (<h2 key={key} className={"character-box text-white " + color}>{char}</h2>);
                })}
        </div>
    )
}

Guess.propTypes = {
  word: PropTypes.string,
  targetWord: PropTypes.string,
}

export {Guess};