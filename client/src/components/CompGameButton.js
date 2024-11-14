import React from 'react';
import { useNavigate } from 'react-router-dom';

import pickCountries from '../functions/FuncPickCountries.js';

// regionIndex: 0 - all, 1-7 - other continents
//quantity: number of countries to pick
function GameComponent({ regionIndex, quantity, bgColorClass }) {
    console.group("init GameComponent...");
    const navigate = useNavigate();
    
    const gameModeProvider = (regionIndex, quantity) => {
        console.log("running gameModeProvider...");
       
        // console.log('region: ', region, ' quantity: ', quantity);

        const pickedCountries = [];
        for (let i = 1; i <= quantity; i++) {
            console.log("prosessing country number: ", i);
           pickedCountries.push(pickCountries(regionIndex));
        }

        // Redirect after processing
        navigate('/game', { state: { pickedCountries} }); // Change '/game' to the route you want to redirect to
        console.groupEnd("End GameComponent...");
    };

    return (
        <button className={`${bgColorClass} btn btn-v1`} onClick={() => gameModeProvider(regionIndex, quantity)}>
            Play
        </button>
    );
}

export default GameComponent;
