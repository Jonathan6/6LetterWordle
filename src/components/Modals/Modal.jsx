import PropTypes from 'prop-types';
  
const Modal = (props) => {
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 text-white w-96 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-bold uppercase text-center">Settings</h2>
                <button
                    className="absolute top-4 right-4 text-white text-xl font-bold"
                    onClick={props.toggleModal}
                    >
                    ✖
                    </button>

                {props.content}
            </div>
        </div>  
    );
}

Modal.propTypes = {
    toggleModal: PropTypes.func,
    content: PropTypes.object
}

export { Modal };