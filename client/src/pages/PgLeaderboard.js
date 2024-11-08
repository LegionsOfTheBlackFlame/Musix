import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { leaderboard } from '../dataLeaderboard.js';
import logo from '../logo.png';
import CompRank from '../components/CompRank.js';

const thisUserID = 310;

function PgLeaderboard() {
    //if (userID && user.rank > 5) thisleaderboard = [rank1, rank2, rank3, prevRank, thisUser, nextRank]
    // if (userID && user.rank < 5) thisleaderboard = [rank1, rank2, rank3,rank4, rank5, rank6]
    // if (!userID) thisleaderboard = [rank1, rank2, rank3, rank4, rank5, rank6]

    const thisLeaderboard = leaderboard.filter(user => user.rank < 7);
    return (
        <div
            id='leaderboard_page'
            className='page leaderboard-page'>
            <h3>Global Leaderboard</h3>
            <div
            className='leaderboard-container'>
                {thisLeaderboard.map((user) => <CompRank key={user.id} data={user} />)}
            </div>
        </div>
    )
}

export default PgLeaderboard;