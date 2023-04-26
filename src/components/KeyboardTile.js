import React from "react";

function KeyboardTile(props) {
    let className = "keyboard-tile";
    if ((props.letter === "ENTER") || (props.letter === "DEL")) {
        className += " keyboard-tile-wide";
    }
    if (props.guessedLetters.has(props.letter.toUpperCase())) {
        className += " guessed-letter"
    }

    function handleClick() {
        if (props.letter === "ENTER") {
            return (() => props.handleEnter());
        } else if (props.letter === "DEL") {
            return (() => props.handleBackspace());
        } else {
            return (() => props.handleLetterInput(props.letter.toUpperCase()));
        }
    }

    return (
        <button className={className} type="button" onClick={handleClick()}>
            {props.letter}
        </button>
    )
}

export default KeyboardTile;