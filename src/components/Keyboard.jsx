import PropTypes from 'prop-types';
import { Key } from './Key';

const Keyboard = (props) => {
    const rowOne = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const rowTwo = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const rowThree = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

    return (
        <div className='keyboard'>
        <div className='row row_one'>
        {rowOne.map((char, key) => {
            return (
                <Key key={key} addChar={props.addChar} char={char}/>
            )
          })}
        </div>
        <div className='row row_two'>
        {rowTwo.map((char, key) => {
            return (
                <Key key={key} addChar={props.addChar} char={char}/>
            )
          })}
        </div>
        <div className='row row_three'>
        {rowThree.map((char, key) => {
          return (
              <Key key={key} addChar={props.addChar} backspace={props.backspace} submit={props.submit} char={char}/>
          )
          })}
        </div>
      </div>
    )
}

Keyboard.propTypes = {
  addChar: PropTypes.func,
  backspace: PropTypes.func,
  submit: PropTypes.func
}

export { Keyboard };