import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Alert = (props) => {
    useEffect(() => {
        const timer = setTimeout(props.onClose, props.duration);
        return () => clearTimeout(timer);
      }, [props.duration, props.onClose]);
    

    return (
        <div className="absolute top-18 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg alert">
        {props.message}
    </div>
    );
}

Alert.propTypes = {
    message: PropTypes.string,
    duration: PropTypes.number,
    alertVisible: PropTypes.bool,
    onClose: PropTypes.func
}

export { Alert };