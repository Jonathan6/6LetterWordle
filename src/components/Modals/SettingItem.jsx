import PropTypes from 'prop-types';
import { Toggle } from '../Toggle';

// title, description, lastItem = false
const SettingItem = (props) => {
    return (
      <div>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-lg font-bold">{props.title}</h3>
            <p className="text-sm text-gray-300">{props.description}</p>
          </div>
  
          <Toggle state={props.state} changeState={props.adjustSettings} num={props.index}/>
        </div>
  
        {!props.lastItem && <div className="border-t border-gray-700 my-4"></div>}
      </div>
    );
}

SettingItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    lastItem: PropTypes.bool,
    index: PropTypes.number,
    state: PropTypes.bool,
    adjustSettings: PropTypes.func
}

export { SettingItem };