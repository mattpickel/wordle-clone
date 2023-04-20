import React from "react";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";

function Game(props) {
    return (
        <div className="game-container">
            <GameBoard currentInput={props.currentInput} gameTileStates={props.gameTileStates}/>
            <Keyboard />
        </div>
    )
}

export default Game;