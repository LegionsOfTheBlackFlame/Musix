import React from "react"; 
import cardLogo from "../game-card-logo.svg";
import GameButton from './CompGameButton.js'; 
import "../styles/game-cards.css"; // Import the GameButton that contains the button

const CompGameCard = ({ gameData }) => {
    const bgColorClass = "background-" + `${gameData.color}`;
    const colorClass = "color-" + `${gameData.color}`;
    
    const regionIndex = gameData.region;
    const quantity = gameData.nations;

    return (
        <div className="game-card-container container">
            <img src={cardLogo} alt="Game Card Logo" />
            <h1>{gameData.name}</h1>
            <h2 className={`${colorClass}`}>{gameData.description}</h2>
            <p>{gameData.subtext}</p>
            <div className="score-container">
                <h1 className={`${colorClass}`}>12983</h1>
                <p>Your max score</p>
            </div>

            {/* Render GameButton instead of a direct button */}
            <GameButton
                regionIndex={regionIndex}
                quantity={quantity}
                bgColorClass={bgColorClass}
            />
        </div>
    );
};

export default CompGameCard;
