import PropTypes from 'prop-types';

import { SettingItem } from './SettingItem';
import { Modal } from './Modal';
  
const Settings = (props) => {

    const settings = [
        ["Dark Mode", "Enables dark mode for better night-time viewing."],
        ["High Contrast Mode", "Improves visibility with stronger color contrasts."],
        ["Reduce Motion", "Disables animations for a smoother experience."]
    ];

    const content = 
        <div className="mt-6 space-y-4">
            {settings.map(([title, description], key) => {
                return (
                    <SettingItem key={key} title={title} description={description} lastItem={key === (settings.length - 1)}></SettingItem>
                );
            })}
        </div>;
    
    return (
        <Modal title="Settings" content={content} toggleModal={props.toggleModal}></Modal>
    );
}

Settings.propTypes = {
    toggleModal: PropTypes.func
}

export { Settings };