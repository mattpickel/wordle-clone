import React from "react";
import GameBoardRow from "./GameBoardRow";

function Gameboard() {
    return (
        <div className="gameboard-container">
            <div className="gameboard">
                <GameBoardRow />
                <GameBoardRow />
                <GameBoardRow />
                <GameBoardRow />
                <GameBoardRow />
                <GameBoardRow />
            </div>
        </div>
    )
}

export default Gameboard;