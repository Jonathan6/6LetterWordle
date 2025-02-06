import PropTypes from 'prop-types';

const Navbar = (props) => {
    return (
        <nav className="fixed top-0 right-0 left-0 bg-black text-white p-4 flex justify-between items-center">
            <button
                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
                Open Left Modal
            </button>

            <div className="flex gap-4">
                <button
                onClick={props.toggleScoreboard}
                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                Scoreboard
                </button>

                <button 
                onClick={props.toggleSettings}
                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                Settings
                </button>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    toggleScoreboard: PropTypes.func,
    toggleSettings: PropTypes.func
}

export { Navbar };