import React from "react"; 
import { useState, useEffect, useContext, useRef } from "react";
import logo from "../logo.png";
import cardLogo from "../game-card-logo.svg";
import gameModeProvider from '../functions/FuncGameModeProvider.js';

const CompGameCard = ({gameData}) => {
console.log("game card got called!")
    const bgColorClass = "background-" + `${gameData.color}`;
    const colorClass = "color-" + `${gameData.color}`;

    console.log("this is game data : " + gameData);
    console.log("this is color class : " + colorClass);

    const regionIndex = gameData.region;
    const quantity = gameData.nations;

    return (
        <div 
        className="game-card-container container">
            <img src={cardLogo}>
            </img>
            <h1>{gameData.name}</h1>
            <h2 className={`${colorClass}`}>{gameData.description}</h2>
        <p>{gameData.subtext}</p>
            <div className="score-container">
                <h1 className={`${colorClass}`}>12983</h1>
                <p>Your max score</p>
            </div>

            <button className={`${bgColorClass}` + " btn"} onClick={() => gameModeProvider(regionIndex, quantity)}>Play</button>
        </div>
    )
}

export default CompGameCard;