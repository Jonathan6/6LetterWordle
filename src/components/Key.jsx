import PropTypes from 'prop-types';

const Key = (props) => {
    const css = 'key rounded-sm bg-gray-300 text-black dark:text-white dark:bg-neutral-400 ' + props.char

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