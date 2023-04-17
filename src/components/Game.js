import React from "react";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";

function Game(props) {
    return (
        <div className="game-container">
            <GameBoard currentLetter={props.currentLetter} currentInput={props.currentInput} currentGuess={props.currentInput.currentGuess}/>
            <Keyboard />
        </div>
    )
}

export default Game;