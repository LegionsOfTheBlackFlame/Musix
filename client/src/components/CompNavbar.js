import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import img from "../logo.png"



const CompNavbar = () => {
    return (
        <div
            id='nav_bar'
            className='nav-bar'>
            <div
                id='nav_logo'
                className='nav-logo-container'>
                    <Link to='/'>
                        <img
                            id='nav_logo_img'
                            className='nav-logo-img'
                            src={img}
                            alt='Muzix Logo' />
                    </Link>
            </div>
            <div
                id='nav_menu'
                className='nav-menu-container'>
                <ul
                    className='nav-menu'>
                    <li
                        className='nav-option'>
                           <Link className='nav-option' to='/games'>Games</Link>
                    </li>

                    <li
                        className='nav-option'>
                           <Link className='nav-option' to='/about'>About</Link>
                    </li>
                    
                    <li
                        className='nav-option'>
                            <Link  className='nav-option' to='/leaderboard'>
                        Leaderboard
                        </Link>
                    </li>

 <li className="nav-option">
                        <a className='nav-option' href="http://localhost:3100/login">Log in</a>

                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CompNavbar;
