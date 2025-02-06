import PropTypes from 'prop-types';

const Key = (props) => {
    const css = 'key text-black dark:text-white ' + props.char

    if (/^[a-zA-Z]$/.test(props.char)) {
        return (
            <button className={css} onClick={() => props.addChar(props.char)}>{props.char}</button>
        );
    } else if (props.char === "BACK") {
        return (
            <button className={css} onClick={() => props.backspace()}>{props.char}</button>
        );
    } else if (props.char === "ENTER") {
        return (
            <button className={css} onClick={() => props.submit()}>{props.char}</button>
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