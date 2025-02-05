import PropTypes from 'prop-types';

import { SettingItem } from './SettingItem';
  
const SettingsModal = (props) => {

    const settings = [
        ["Dark Mode", "Enables dark mode for better night-time viewing."],
        ["High Contrast Mode", "Improves visibility with stronger color contrasts."],
        ["Reduce Motion", "Disables animations for a smoother experience."]
];
    
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

                <div className="mt-6 space-y-4">

                    {settings.map(([title, description], key) => {
                        return <SettingItem key={key} title={title} description={description}></SettingItem>
                    })}

                </div>
            </div>
        </div>  
    );
}

SettingsModal.propTypes = {
    toggleModal: PropTypes.func
}

export { SettingsModal };