import React from 'react';
import img from './logo.png';

const CompNavbar = () => {
    return (
        <div id="nav_bar" className="nav-bar">
            <div id="nav_logo" className="nav-logo-container">
                <a id="home_link" className="nav-option" href="/">
                    <img id="nav_logo_img" className="nav-logo-img" src={img} alt="Muzix Logo" />
                </a>
            </div>
            <div id="nav_menu" className="nav-menu-container">
                <ul className="nav-menu">
                    <li className="nav-option">
                        <a id="maps-link" href="/maps">Maps</a>
                    </li>
                    <li className="nav-option">
                        <a id="about-link" href="/about">About</a>
                    </li>
                    <li className="nav-option">
                        <a href="http://localhost:3100/login">Spotify ile Giriş Yap</a> {/* Spotify giriş bağlantısı */}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CompNavbar;