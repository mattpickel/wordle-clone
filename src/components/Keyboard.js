import React from "react";
import KeyboardRow from "./KeyboardRow";
import { keyboardFirstRow, keyboardSecondRow, keyboardThirdTow } from "../data";

function Keyboard(props) {
    

    return (
        <div className="keyboard-container">
            <KeyboardRow guessedLetters={props.guessedLetters} letters={keyboardFirstRow} handleLetterInput={props.handleLetterInput} handleEnter={props.handleEnter} handleBackspace={props.handleBackspace}/>
            <KeyboardRow guessedLetters={props.guessedLetters} letters={keyboardSecondRow} handleLetterInput={props.handleLetterInput} handleEnter={props.handleEnter} handleBackspace={props.handleBackspace}/>
            <KeyboardRow guessedLetters={props.guessedLetters} letters={keyboardThirdTow} handleLetterInput={props.handleLetterInput} handleEnter={props.handleEnter} handleBackspace={props.handleBackspace}/>
        </div>
    )
}

export default Keyboard;