import React from "react"
import CloseIcon from '@mui/icons-material/Close';

import exampleImage1 from '../imgs/example1.png';
import exampleImage2 from '../imgs/example2.png';



function HeaderModal(props) {
    const { type, closeHeaderModal } = props;

    let modalContent;
    if (type === 'help') {
        modalContent = (
            <>
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
            </>
        );
    } else if (type === 'score') {
        modalContent = (
            <>
                <div className="exit-wrapper">
                    <button className="header-modal-exit" onClick={closeHeaderModal}>
                        <CloseIcon />
                    </button>
                </div>
                <h2>Score Modal</h2>
                <p>This is the score modal.</p>
            </>
        )
    } else if (type === 'settings') {
        modalContent = (
            <>
                <div className="exit-wrapper">
                    <button className="header-modal-exit" onClick={closeHeaderModal}>
                        <CloseIcon />
                    </button>
                </div>
                <h2>Settings Modal</h2>
                <p>This is the settings modal.</p>
            </>
        )
    }
    return(
        <div className="header-modal">
            <div className="header-modal-content">
                {modalContent}
            </div>
        </div>
    )
}

export default HeaderModal;