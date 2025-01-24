import PropTypes from 'prop-types';
import { useState } from 'react';

const Leaderboard = (props) => {
    // Each index corresponds to the number of guesses
    // Each time the user plays a game they will get a score and will get a plus 1 in that category
    // 0 Index is reserved for when they were unable to guess the word
    const [scores, setScores] = useState(localStorage.getItem('scores') !== null ? localStorage.getItem('scores') : [0,0,0,0,0,0,0]);
    

    return (
        <div className="leaderboard-overlay">
            <div className="leaderboard">
                <button className="close-btn" onClick={props.toggleLeaderboard}>X</button>
                <h2>Number of Guesses</h2>
                <ul>
                    <li>1 - {scores[1]}</li>
                    <li>2 - {scores[2]}</li>
                    <li>3 - {scores[3]}</li>
                    <li>4 - {scores[4]}</li>
                    <li>5 - {scores[5]}</li>
                    <li>6 - {scores[6]}</li>
                </ul>
            </div>
        </div>
    );
}

Leaderboard.propTypes = {
    toggleLeaderboard: PropTypes.func
}

export { Leaderboard };