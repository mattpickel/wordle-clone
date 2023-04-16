import React from "react";
import KeyboardTile from "./KeyboardTile"
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
            <KeyboardTile key={letter.index} letter={letter}/>
        ))}
        
        </div>
    )
}

export default KeyboardRow;