import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

const Guess = (props) => {
    const [wordArray, setWordArray] = useState([" ", " ", " ", " ", " ", " "]);
    
    useEffect(() => {
        setWordArray(wordArray.map((char, index) => {
            if (index < props.word.length) {
                return props.word[index];
            } else {
                return " ";
            }
        }));
    }, [props.word]);

    return (
        <div className="guess-box">
            {wordArray.map((char, index) => {
                var color = "";
                if (props.colors.length === 6) {
                    if (props.colors[index] === "w") {
                        color = " bg-gray-500 text-white";
                    } else if (props.colors[index] === "y") {
                        color = "bg-yellow contrast:bg-sky-500 contrast:text-black";
                    } else {
                        color = "bg-green contrast:bg-orange-500 contrast:text-black";
                    }
                    return (<h2 key={index} className={"character-box text-white " + color}>{char}</h2>);
                } else {
                    return (<h2 key={index} className={"character-box text-black bg-white dark:text-white dark:bg-black"}>{char}</h2>);
                }
            })}
        </div>
    )
}

Guess.propTypes = {
  word: PropTypes.string,
  colors: PropTypes.array
}

export {Guess};