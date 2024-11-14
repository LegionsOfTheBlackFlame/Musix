import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompPlayer from '../components/CompPlayer.js';
import RoundResultPopup from '../components/CompRoundResults.js';
import thisGameData from '../dataGame.js';

export default function PgGame(pickedCountries) {
    const [gameData, setGameData] = useState({
        id: null,
        song_name: null,
        artist_name: null,
        country: null,
        url: null
    });
    const [round, setRound] = useState(-1);
    const [isCorrect, setIsCorrect] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [score, setScore] = useState(0);
    const [showPopup, setShowPopup] = useState(false); // Controls visibility of the pop-up
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const finalScore = queryParams.get('finalScore');

    useEffect(() => {
        if (round === -1) {
            setRound(0);
        } else if (round === 0 && !hasStarted) {
            setHasStarted(true);
        }
    }, [round, hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        if (round === 0 && isResetting) {
            navigate(`/score?finalScore=${score}`);
            return;
        }

        if (isResetting) setIsResetting(false);

        const currentRoundData = thisGameData[round];
        if (currentRoundData && round > 0) {
            setGameData({
                id: currentRoundData.id,
                song_name: currentRoundData.song_name,
                artist_name: currentRoundData.artist_name,
                country: currentRoundData.country,
                url: currentRoundData.url
            });
        }
    }, [round, navigate, hasStarted, isResetting, score]);

    const nextRound = () => {
        setShowPopup(false); // Hide pop-up before moving to the next round
        setRound((prevRound) => {
            const newRound = prevRound < thisGameData.length - 1 ? prevRound + 1 : 0;
            if (newRound === 0 && prevRound === thisGameData.length - 1) {
                setIsResetting(true);
            }
            return newRound;
        });
    };

    const checkAnswer = (userAnswer) => {
        console.log("checkAnswer called with:", userAnswer); // Diagnostic log
    };
    
    

    return (
        <div>
            <div className='Song info'>
                <CompPlayer songData={gameData} />
            </div>
            <div className='game-result'>
                <h1 style={{ color: isCorrect ? "green" : "red" }}>
                    {isCorrect ? "Correct" : "Wrong"}
                </h1>
            </div>
            <div className='score-display'>
                <h2>Score: {score}</h2>
            </div>
            <button 
    className='this-btn' 
    onClick={(e) => {
        console.log("Button clicked with answer:", e.target.innerText); // Diagnostic log
        checkAnswer(e.target.innerText);
    }}
>
    Canada
</button>
<button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>USA</button>
<button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>Russia</button>
<button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>UK</button>
<button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>Brazil</button>

            {/* Render the pop-up if showPopup is true */}
            {showPopup && (
    <RoundResultPopup
        isCorrect={isCorrect}
        correctAnswer={gameData.country}
        onClose={nextRound}
    />
)}

        </div>
    );
}
