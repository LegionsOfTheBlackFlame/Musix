import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import logo from './logo.png';

function CompRank({data}) {
    return (
        <div 
        className='rank-container'>
            <div
            className='player-rank'>
                <h1>{data.rank}</h1>
            </div>
            <div className='player-info'>
                <h3>{data.username}</h3>
                <h5>{data.score}</h5>
            </div>
            <div className='profile-pic'>
               <img
               src={logo}></img>
            </div>
        </div>
    )
}

export default CompRank;