import React from "react"
import CloseIcon from '@mui/icons-material/Close';

const exampleImage1 = require('../imgs/example1.png');
const exampleImage2 = require('../imgs/example2.png');



function HeaderModal(props) {
    return(
        <div className="header-modal">
            <div className="header-modal-content">
                <div className="exit-wrapper">
                    <button className="header-modal-exit" onClick={props.closeHeaderModal}>
                        <CloseIcon />
                    </button>
                </div>
                <h2>How To Play</h2>
                <p>You have 6 tries to guess the 5 letter word. Each guess must be a valid word.</p>
                <p>After guessing, the tiles will change colors to show any correct letters.</p>
                <img className="help-img" src={exampleImage1}></img>
                <p>The letter M is in the correct position in the guess above.</p>
                <img className="help-img" src={exampleImage2}></img>
                <p>The letter I is in the word, but in a different position in the guess above.</p>

            </div>
        </div>
    )
}

export default HeaderModal;