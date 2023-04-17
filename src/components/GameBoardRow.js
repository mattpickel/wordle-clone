import React from "react";
import Tile from "./Tile";

function GameBoardRow(props) {    
    return (
        <div className="row">
            <Tile letter={props.currentInput.currentGuess[0]}/>
            <Tile letter={props.currentInput.currentGuess[1]}/>
            <Tile letter={props.currentInput.currentGuess[2]}/>
            <Tile letter={props.currentInput.currentGuess[3]}/>
            <Tile letter={props.currentInput.currentGuess[4]}/>
        </div>
    )
}

export default GameBoardRow;