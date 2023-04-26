import React from "react";
import KeyboardTile from "./KeyboardTile"
import {v4 as uuidv4 } from "uuid";
import { keyboardFirstRow, keyboardSecondRow, keyboardThirdTow } from "../data";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

function KeyboardRow(props) {
    const letters = props.letters;
    
    return (
        <div className="keyboard-row">
        {
            //Generate a tile for each key in a row
        }
        {letters.map((letter) => (
            <KeyboardTile key={uuidv4()} letter={letter} guessedLetters={props.guessedLetters} handleLetterInput={props.handleLetterInput} handleEnter={props.handleEnter} handleBackspace={props.handleBackspace}/>
        ))}
        
        </div>
    )
}

export default KeyboardRow;