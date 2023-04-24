import React, { useState } from "react";
import GameBoardRow from "./GameBoardRow";

function Gameboard(props) {
    return (
        <div className="gameboard-container">
            <div className="gameboard">
                <GameBoardRow rowNumber="1" currentInput={props.currentInput} gameTileStates={props.gameTileStates.tileStates[0]}/>
                <GameBoardRow rowNumber="2" currentInput={props.currentInput} gameTileStates={props.gameTileStates.tileStates[1]}/>
                <GameBoardRow rowNumber="3" currentInput={props.currentInput} gameTileStates={props.gameTileStates.tileStates[2]}/>
                <GameBoardRow rowNumber="4" currentInput={props.currentInput} gameTileStates={props.gameTileStates.tileStates[3]}/>
                <GameBoardRow rowNumber="5" currentInput={props.currentInput} gameTileStates={props.gameTileStates.tileStates[4]}/>
                <GameBoardRow rowNumber="6" currentInput={props.currentInput} gameTileStates={props.gameTileStates.tileStates[5]}/>
            </div>
        </div>
    )
}

export default Gameboard;