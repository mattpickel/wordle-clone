import React from "react";

function Tile(props) {
    return (
        <div className="tile">
            {props.letter}
        </div>
    )
}

export default Tile;