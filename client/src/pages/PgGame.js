import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';

import CompPlayer from '../components/CompPlayer.js';
import thisGameData from '../dataGame.js';
const thisAnswer = "Canada";

export default function PgGame() {
    const [gameData, setGameData] = useState({
        "id": null,
        "song_name": null,
        "artist_name": null,
        "country": null,
        "url": null
    });
    const [round, setRound] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    console.log(thisGameData[round]);
    useEffect(() => {
        setGameData({
            "id": thisGameData[round].id,
            "song_name": thisGameData[round].song_name,
            "artist_name": thisGameData[round].artist_name,
            "country": thisGameData[round].country,
            "url": thisGameData[round].url
        });
        console.log("this is game data : " + gameData);
    }, [round]);
   
    const checkAnswer = (userAnswer) => {
        if (userAnswer === thisAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        if (round < thisGameData.length - 1) {
            setRound(round + 1);
        } else { setRound(0); }
    }
    return (
        <div>
            <div className='Song info'>
                <CompPlayer songData={gameData} />
            </div>
            <div className='game-result'>
                <h1 style={{color: isCorrect ? "green" : "red"}}>
               {isCorrect ? "Correct" : "Wrong"}
               </h1>
            </div>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>Canada</button>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>USA</button>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>Russia</button>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>UK</button>
            <button className='this-btn' onClick={(e) => checkAnswer(e.target.innerText)}>Brazil</button>
        </div>
    )
}