import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react'

const Key = (props) => {
    if (/^[a-zA-Z]$/.test(props.char)) {
        return (
            <button onClick={() => props.addChar(props.char)}>{props.char}</button>
        );
    } else if (props.char === "BACK") {
        return (
            <button onClick={() => props.backspace()}>{props.char}</button>
        );
    } else if (props.char === "ENTER") {
        return (
            <button onClick={() => props.submit()}>{props.char}</button>
        );
    }
    
}

Key.propTypes = {
  addChar: PropTypes.func,
    backspace: PropTypes.func,
    submit: PropTypes.func,
  char: PropTypes.string
}

export { Key };