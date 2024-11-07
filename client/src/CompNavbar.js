import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';

import img from "./logo.png"

const CompNavbar = () => {

    return (
        <div
            id='nav_bar'
            className='nav-bar'>
            <div
                id='nav_logo'
                className='nav-logo-container'>
                    <a
                    id='home_link'
                    className='nav-option'>
                        <img
                            id='nav_logo_img'
                            className='nav-logo-img'
                            src={img}
                            alt='Muzix Logo' />
                    </a>
            </div>
            <div
                id='nav_menu'
                className='nav-menu-container'>
                <ul
                    className='nav-menu'>
                    <li
                        className='nav-option'>
                            <a
                            id='maps-link'>Maps</a>
                    </li>

                    <li
                        className='nav-option'>
                            <a
                            id='about-link'>About</a>
                    </li>

                    <li
                        className='nav-option'>
                            <a
                            id='leaderboard-link'>Leaderboard</a>
                    </li>

                </ul>
                <div
                id='nav_account'
                className='nav-account-container nav-option'>
                    <img></img>
                </div>
            </div>

        </div>)
}

export default CompNavbar;