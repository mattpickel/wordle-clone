import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function Header(props) {
    return (
        <header>
            <div className="button-box">
                <button>
                    <MenuIcon />
                </button>
            </div>
            <h1>Wordle</h1>
            <div className="button-box button-box-right">
                <button name="help" onClick={props.handleHeaderClick}>
                    <HelpOutlineIcon />
                </button>
                <button name="score" onClick={props.handleHeaderClick}>
                    <LeaderboardIcon />
                </button>
                <button name="settings" onClick={props.handleHeaderClick}>
                    <SettingsIcon />
                </button>
            </div>
        </header>
    )
}

export default Header;