import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompPlayer from '../components/CompPlayer.js';
import RoundResultPopup from '../components/CompRoundResults.js';
import thisGameData from '../dataGame.js';

export default function PgGame(pickedCountries) {
    const [thisGame, setThisGame] = useState({
        score: 0,
        userId: null,
        hasStarted: false,
        isResetting: false,
        activeRoundIndex: -1
    });

    const [thisRound, setThisRound] = useState({
        songTitle: null,
        artistName: null,
        songUrl: null,
        country: null,
        isCorrect: false,
        roundIndex: -1
    });

    const [roundResult, setRoundResult] = useState(null); // New state to hold round result
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (thisGame.activeRoundIndex === -1) {
            setThisGame(prev => ({
                ...prev,
                activeRoundIndex: 0
            }));
        } else if (thisGame.activeRoundIndex === 0 && !thisGame.hasStarted) {
            setThisGame(prev => ({ ...prev, hasStarted: true }));
        }
    }, [thisGame.activeRoundIndex, thisGame.hasStarted]);

    useEffect(() => {
        if (!thisGame.hasStarted) return;

        if (thisGame.activeRoundIndex === 0 && thisGame.isResetting) {
            navigate(`/score?finalScore=${thisGame.score}`);
            return;
        }

        if (thisGame.isResetting) {
            setThisGame(prev => ({ ...prev, isResetting: false }));
        }

        const currentRoundData = thisGameData[thisGame.activeRoundIndex];
        if (currentRoundData) {
            setThisRound({
                songTitle: currentRoundData.song_name,
                artistName: currentRoundData.artist_name,
                songUrl: currentRoundData.url,
                country: currentRoundData.country,
                isCorrect: false,
                roundIndex: thisGame.activeRoundIndex
            });
        }
    }, [thisGame.activeRoundIndex, thisGame.hasStarted, thisGame.isResetting, thisGame.score, navigate]);

    const nextRound = () => {
        if (thisGame.activeRoundIndex === thisGameData.length - 1) {
            // If the current round is the last one, navigate to the score page
            navigate(`/score?finalScore=${thisGame.score}`);
        } else {
            // Otherwise, go to the next round
            setShowPopup(false); // Hide the pop-up before moving to the next round
            setThisGame(prevGame => ({
                ...prevGame,
                activeRoundIndex: prevGame.activeRoundIndex + 1
            }));
            setRoundResult(null); // Reset round result for the next round
        }
    };

    // const nextRound = () => {
    //     setShowPopup(false); // Hide the pop-up before moving to the next round
    //     setThisGame(prevGame => {
    //         const newIndex = prevGame.activeRoundIndex < thisGameData.length - 1 ? prevGame.activeRoundIndex + 1 : 0;
    //         return {
    //             ...prevGame,
    //             activeRoundIndex: newIndex,
    //             isResetting: newIndex === 0 && prevGame.activeRoundIndex === thisGameData.length - 1
    //         };
    //     });
    //     setRoundResult(null); // Reset round result for the next round
    // };

    const checkAnswer = (userAnswer) => {
        console.log("checkAnswer received userAnswer:", userAnswer);
        console.log("correctAnswer:", thisRound.country);
        const isAnswerCorrect = userAnswer === thisRound.country;
        console.log("isAnswerCorrect:", isAnswerCorrect);

        setThisRound(prevRound => ({
            ...prevRound,
            isCorrect: isAnswerCorrect
        }));

        setThisGame(prevGame => ({
            ...prevGame,
            score: prevGame.score + (isAnswerCorrect ? 100 : 0)
        }));

        setRoundResult(isAnswerCorrect); // Set the result of the current round
        setShowPopup(true); // Show the pop-up with the result info
    };

    return (
        <div className='game-container'>
            <div className='media-player-container'>
                <CompPlayer songData={{ song_name: thisRound.songTitle, artist_name: thisRound.artistName, url: thisRound.songUrl }} />
            </div>
           <div className='answers-container'>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>Canada</button>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>USA</button>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>Russia</button>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>UK</button>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>Brazil</button>
            </div>
            {/* Render the pop-up if showPopup is true */}
            {showPopup && (
                <RoundResultPopup
                    isCorrect={roundResult} // Use `roundResult` to display the result directly
                    correctAnswer={thisRound.country}
                    songTitle={thisRound.songTitle}
                    artistName={thisRound.artistName}
                    onClose={nextRound}
                />
            )}
        </div>
    );
}
