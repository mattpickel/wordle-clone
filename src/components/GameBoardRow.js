import React from "react";
import Tile from "./Tile";

function GameBoardRow(props) {    
    // console.log(props.currentInput.guesses[0][0]);
    return (
            <div className="row">
            <Tile letter={props.currentInput.guesses[props.rowNumber - 1][0]}/>
            <Tile letter={props.currentInput.guesses[props.rowNumber - 1][1]}/>
            <Tile letter={props.currentInput.guesses[props.rowNumber - 1][2]}/>
            <Tile letter={props.currentInput.guesses[props.rowNumber - 1][3]}/>
            <Tile letter={props.currentInput.guesses[props.rowNumber - 1][4]}/>
        </div>
    )
}

export default GameBoardRow;