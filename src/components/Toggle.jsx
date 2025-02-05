// import PropTypes from 'prop-types';
import { useState } from 'react';

const Toggle = () => {
    const [isOn, setIsOn] = useState(false);

    // Toggle function
    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <div
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 
                ${isOn ? "bg-green-600" : "bg-gray-400"}`}
            onClick={toggleSwitch}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                ${isOn ? "translate-x-7" : "translate-x-0"}`}
            ></div>
        </div>
        
    )
}

Toggle.propTypes = {
}

export { Toggle };