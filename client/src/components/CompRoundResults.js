// RoundResultPopup.js
import React from 'react';

function RoundResultPopup({ isCorrect, correctAnswer, songTitle, artistName, onClose }) {
    console.log("RoundResultPopup received isCorrect:", isCorrect);

    return (
        <div className="popup-overlay">
            <div className={`popup-content ${isCorrect ? 'bg-green' : 'bg-red'}`}>
                <h2>{isCorrect ? "Correct!" : "Wrong Answer"}</h2>
                <p><strong>{songTitle}</strong> by {artistName}</p>
                {isCorrect ? (
                    <p>You got it right!</p>
                ) : (
                    <p>is from <strong>{correctAnswer}</strong></p>
                )}
                <button className="btn-X"onClick={onClose}>X</button>
            </div>
        </div>
    );

}


export default RoundResultPopup;
