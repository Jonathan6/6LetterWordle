import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

const Guess = (props) => {
    const blank = "character-box border-2 border-gray-500 font-bold size-15 mx-px text-black bg-white dark:text-white dark:bg-black";
    const [wordArray, setWordArray] = useState([" ", " ", " ", " ", " ", " "]);
    const [className, setClassName] = useState(Array(6).fill(blank));
    const [animate, setAnimate] = useState(false);


    useEffect(() => {
        setWordArray(wordArray.map((char, index) => {
            if (index < props.word.length) {
                return props.word[index];
            } else {
                return " ";
            }
        }));
    }, [props.word]);

    useEffect(() => {
        if (props.colors.length === 6) {
            setAnimate(true);
            setClassName(className.map((__, index) => {
                let color = '';
                if (props.colors[index] === "w") {
                    color = " bg-gray-500 text-white";
                } else if (props.colors[index] === "y") {
                    color = " text-white bg-yellow contrast:bg-sky-500 contrast:text-black";
                } else {
                    color = " bg-green contrast:bg-orange-500 contrast:text-black";
                }
                return `character-box font-bold size-15 mx-px text-white ${color} flip-delay-${index}`;
            }));
            setTimeout(() => {
                setAnimate(false);
            }, 7000);
        } else {
            setClassName(Array(6).fill(blank));
        }
    }, [props.colors]);

    return (
        <div className="guess-box my-[2px]">
            {wordArray.map((char, index) => {
                return (
                    <div
                        key={index}
                        className={className[index]} style={{ transitionDelay: `${animate ? (500 + 1000 * index) : 0}ms` }}
                    >
                        {char}
                    </div>
                );
            })}
        </div>
    )
}

// return (<h2 key={index} className={`border-2 border-gray-200   dark:border-stone-600 dark:text-white dark:bg-black ${css}`}>{char}</h2>);
// return (<div key={index} className={"text-white " + color + css}>{char}</div>);
{/* <div
                        key={index}
                        className={`${css} ${colors[index]} transition:${delay} ${props.colors.length === 6 ? "animate-flip" : ""}`}
                    >
                        {char}
                    </div> */}
Guess.propTypes = {
  word: PropTypes.string,
  colors: PropTypes.array,
}

export {Guess};