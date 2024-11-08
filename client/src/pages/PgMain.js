import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';

import games from '../dataGames.js';


import CompNavbar from '../components/CompNavbar.js';
import CompHero from '../components/CompHero.js';
import CompGameCard from '../components/CompGameCard.js';

import SpinningEarth from '../components/CompSphere.js';


games.forEach((game) => console.log("this is game : " + `${game.description}`));
const PgMain = () => {

  
    console.log("this is games : " + `${games}`);

    return (
        <>
            <div
                id='main_page'
                className='page main-page'>
                
                <SpinningEarth />
                
                <div className='game-cards-container'>
                {games.map((game) => <CompGameCard key={game.id} gameData={game} />)}
                </div>
            </div>
        </>
    )
}

export default PgMain;