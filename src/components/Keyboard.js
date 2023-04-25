import React from "react";
import KeyboardRow from "./KeyboardRow";
import { keyboardFirstRow, keyboardSecondRow, keyboardThirdTow } from "../data";

function Keyboard(props) {
    

    return (
        <div className="keyboard-container">
            <KeyboardRow guessedLetters={props.guessedLetters} letters={keyboardFirstRow}/>
            <KeyboardRow guessedLetters={props.guessedLetters} letters={keyboardSecondRow}/>
            <KeyboardRow guessedLetters={props.guessedLetters} letters={keyboardThirdTow}/>
        </div>
    )
}

export default Keyboard;