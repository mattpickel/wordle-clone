import React from "react";

function Tile(props) {
    const className = "tile " + props.tileState;
    return (
        <div className={className}>
            {props.letter}
        </div>
    )
}

export default Tile;