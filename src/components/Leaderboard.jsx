import PropTypes from 'prop-types';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
  
const Leaderboard = (props) => {
    // Each index corresponds to the number of guesses
    // Each time the user plays a game they will get a score and will get a plus 1 in that category
    // 0 Index is reserved for when they were unable to guess the word
    
    // Clears localstorage and current leaderboard of all scores
    const clearData = () => {
        localStorage.clear();
    }
    
    const playAgain = () => {
        console.log("play again");
        props.toggleLeaderboard();
        props.startGame();
    }

    return (
        <div className="leaderboard-overlay">
            <div className="leaderboard">
                <button onClick={clearData}>Clear</button>
                <button className="close-btn" onClick={props.toggleLeaderboard}>X</button>
                <h2>Number of Guesses</h2>
                <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart
                        data={props.scores}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                        dataKey="count"
                        fill="#B3CDAD"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                        />
                    </BarChart>
                </ResponsiveContainer>
                <button onClick={playAgain}>Play Again</button>
                <button onClick={() => console.log(props.scores)}>test</button>
            </div>
        </div>
    );
}

Leaderboard.propTypes = {
    toggleLeaderboard: PropTypes.func,
    startGame: PropTypes.func,
    scores: PropTypes.array
}

export { Leaderboard };