import React from "react";

function KeyboardTile(props) {
    let className = "keyboard-tile";
    if ((props.letter === "ENTER") || (props.letter === "DEL")) {
        className += " keyboard-tile-wide";
    }
    if (props.guessedLetters.has(props.letter.toUpperCase())) {
        className += " guessed-letter"
    }
    return (
        <button className={className} type="button">
            {props.letter}
        </button>
    )
}

export default KeyboardTile;