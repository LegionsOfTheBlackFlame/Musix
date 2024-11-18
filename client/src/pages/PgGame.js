import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompPlayer from '../components/CompPlayer.js';
import RoundResultPopup from '../components/CompRoundResults.js';

export default function PgGame() {
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

    const [roundResult, setRoundResult] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    // Oyun başladığında backend'den şarkı bilgilerini almak
    useEffect(() => {
        const fetchRoundData = async () => {
            try {
                const response = await fetch('http://localhost:3100/song');
                const data = await response.json();

                if (data.error) {
                    console.error('Şarkı bilgileri alınamadı:', data.error);
                    return;
                }

                setThisRound({
                    songTitle: data.songName,
                    artistName: data.artistName,
                    songUrl: data.previewUrl,
                    country: data.country,
                    isCorrect: false,
                    roundIndex: thisGame.activeRoundIndex + 1
                });

                setThisGame(prev => ({
                    ...prev,
                    hasStarted: true
                }));
            } catch (error) {
                console.error('Şarkı bilgileri alınamadı:', error);
            }
        };

        if (thisGame.hasStarted && thisGame.activeRoundIndex === -1) {
            setThisGame(prev => ({ ...prev, activeRoundIndex: 0 }));
            fetchRoundData();
        }
    }, [thisGame.hasStarted, thisGame.activeRoundIndex]);

    // Cevap kontrolü
    const checkAnswer = (userAnswer) => {
        const isAnswerCorrect = userAnswer === thisRound.country;
        setThisRound(prevRound => ({
            ...prevRound,
            isCorrect: isAnswerCorrect
        }));
        setThisGame(prevGame => ({
            ...prevGame,
            score: prevGame.score + (isAnswerCorrect ? 100 : 0)
        }));
        setRoundResult(isAnswerCorrect);
        setShowPopup(true);
    };

    // Bir sonraki tura geçiş
    const nextRound = () => {
        setShowPopup(false);
        setThisGame(prevGame => ({
            ...prevGame,
            activeRoundIndex: prevGame.activeRoundIndex + 1
        }));
        setRoundResult(null);
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
            {showPopup && (
                <RoundResultPopup
                    isCorrect={roundResult}
                    correctAnswer={thisRound.country}
                    songTitle={thisRound.songTitle}
                    artistName={thisRound.artistName}
                    onClose={nextRound}
                />
            )}
        </div>
    );
}
