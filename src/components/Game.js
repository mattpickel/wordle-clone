import React from "react";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";

function Game() {
    return (
        <div className="game-container">
            <GameBoard />
            <Keyboard />
        </div>
    )
}

export default Game;