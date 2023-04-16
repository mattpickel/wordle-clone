import React from "react";
import KeyboardRow from "./KeyboardRow";
import { keyboardFirstRow, keyboardSecondRow, keyboardThirdTow } from "../data";

function Keyboard() {
    

    return (
        <div className="keyboard-container">
            <KeyboardRow letters={keyboardFirstRow}/>
            <KeyboardRow letters={keyboardSecondRow}/>
            <KeyboardRow letters={keyboardThirdTow}/>
        </div>
    )
}

export default Keyboard;