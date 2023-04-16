import React from "react";

function KeyboardTile(props) {
    let className = "keyboard-tile";
    if ((props.letter === "ENTER") || (props.letter === "DEL")) {
        className += " keyboard-tile-wide";
    }
    
    return (
        <button className={className} type="button">
            {props.letter}
        </button>
    )
}

export default KeyboardTile;