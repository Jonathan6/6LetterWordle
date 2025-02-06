import PropTypes from 'prop-types';

import { SettingItem } from './SettingItem';
import { Modal } from './Modal';
  
const Settings = (props) => {

    const settings = [
        ["Hard Mode", "Must use previous hint in every subsequent guess."],
        ["Dark Mode", "Enables dark mode for better night-time viewing."],
        ["High Contrast Mode", "Improves visibility with stronger color contrasts."]
    ];

    const content = 
        <div className="mt-6 space-y-4">
            {settings.map(([title, description], key) => {
                return (
                    <SettingItem key={key} index={key} title={title} description={description} state={props.presets[key]} adjustSettings={props.adjustSettings} lastItem={key === (settings.length - 1)}></SettingItem>
                );
            })}
        </div>;
    
    return (
        <Modal title="Settings" content={content} toggleModal={props.toggleModal}></Modal>
    );
}

Settings.propTypes = {
    toggleModal: PropTypes.func,
    presets: PropTypes.array,
    adjustSettings: PropTypes.func
}

export { Settings };