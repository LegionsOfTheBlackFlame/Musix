import React from 'react';

import games from '../dataGames.js'; // iss 0.10: add fetch mechanism
import CompGameCard from '../components/CompGameCard.js';
import SpinningEarth from '../components/CompSphere.js';


games.forEach((game) => console.log("this is game : " + `${game.description}`));
const PgGames = () => {

  
    console.log("this is games : " + `${games}`);

    return (
        <>
            <div
                id='main_page'
                className='page main-page'>
                
                <SpinningEarth />
                {/* Move to its own component */}
                <div className='game-cards-container'>
                {games.map((game) => <CompGameCard key={game.id} gameData={game} />)}
                </div>
            </div>
        </>
    )
}

export default PgGames;