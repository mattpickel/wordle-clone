import React, { useState } from "react";
import GameBoardRow from "./GameBoardRow";

function Gameboard(props) {
    const [currentActiveRow, setCurrentActiveRow] = useState(1);

    function nextRow() {
        setCurrentActiveRow(props.currentInput.currentGuessNumber)
    }

    const emptyLetter = ""
    const emptyArray = ["","","","",""]
    const emptyInput = {
        currentLetter: emptyLetter,
        currentGuess: emptyArray
    }

    const activeInput = props.currentInput;

    const rowOneInput = (props.currentInput.currentGuessNumber === 1) ? activeInput : emptyInput;
    const rowTwoInput = (props.currentInput.currentGuessNumber === 2) ? activeInput : emptyInput;
    const rowThreeInput = (props.currentInput.currentGuessNumber === 3) ? activeInput : emptyInput;
    const rowFourInput = (props.currentInput.currentGuessNumber === 4) ? activeInput : emptyInput;
    const rowFiveInput = (props.currentInput.currentGuessNumber === 5) ? activeInput : emptyInput;
    const rowSixInput = (props.currentInput.currentGuessNumber === 6) ? activeInput : emptyInput;

    

    return (
        <div className="gameboard-container">
            <button onClick={nextRow}>test</button>
            <div className="gameboard">
                <GameBoardRow currentInput={rowOneInput}/>
                <GameBoardRow currentInput={rowTwoInput}/>
                <GameBoardRow currentInput={rowThreeInput}/>
                <GameBoardRow currentInput={rowFourInput}/>
                <GameBoardRow currentInput={rowFiveInput}/>
                <GameBoardRow currentInput={rowSixInput}/>
            </div>
        </div>
    )
}

export default Gameboard;