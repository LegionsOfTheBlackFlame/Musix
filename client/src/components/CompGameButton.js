import React from 'react';
import { useNavigate } from 'react-router-dom';

const regions = {
    0: "all",
    1: "europe",
    2: "asia",
    3: "africa",
    4: "americas",
    5: "oceania"
}

const countries = {
    1: ["UK", "Germany", "France", "Italy", "Spain", "Belgium", "Netherlands", "Sweden", "Denmark", "Norway", "Finland", "Switzerland", "Austria", "Ireland", "Luxembourg", "Portugal", "Greece", "Cyprus", "Iceland", "Malta", "Liechtenstein", "Norway", "Poland", "Romania", "Slovakia", "Slovenia", "Turkey", "United Kingdom", "Bulgaria", "Croatia", "Czech Republic", "Hungary", "Latvia", "Lithuania", "Montenegro", "Serbia", "Slovenia", "Bosnia and Herzegovina", "Macedonia", "Albania", "Moldova", "Romania", "Russia", "Ukraine", "Belarus", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Uzbekistan"],
    2: ["China", "Korea", "India", "Russia", "Iran", "Turkey"],
    3: ['Nigeria','Kenya', 'Egypt','South Africa', 'Sudan', 'Tunisia', 'Libya', 'Algeria', 'Morocco', 'Nigeria', 'Egypt', 'South Africa', 'Sudan', 'Tunisia', 'Libya', 'Algeria', 'Morocco', 'Nigeria', 'Egypt', 'South Africa', 'Sudan', 'Tunisia', 'Libya', 'Algeria', 'Morocco'],
    4: ["United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Ecuador", "Peru", "Venezuela", "Dominican Republic", "Costa Rica", "Puerto Rico", "Cuba", "Panama", "Jamaica", "Trinidad and Tobago", "Guatemala", "Honduras", "Nicaragua", "Haiti", "El Salvador", "Guadeloupe", "Martinique", "Saint Lucia", "Saint Vincent and the Grenadines", "Barbados", "Antigua and Barbuda", "Anguilla", "Bahamas", "Belize", "Bermuda", "British Virgin Islands", "Cayman Islands", "Dominica", "Grenada", "Montserrat", "Turks and Caicos Islands", "Virgin Islands"],
    5: ["Australia", "New Zealand", "Papua New Guinea", "Fiji", "Samoa", "Tonga", "Solomon Islands", "Vanuatu", "Palau", "Kiribati"]

    
}

function GameComponent({ regionIndex, quantity, bgColorClass }) {
    const navigate = useNavigate();

    const gameModeProvider = (region, quantity) => {
        console.group('Finding countries...');
        console.log('region: ', region, ' quantity: ', quantity);

        if (region === 0) {
            for (let i = 1; i <= quantity; i++) {
                const randomRegion = Math.floor(Math.random() * 5) + 1;
                console.log('random region index: ', randomRegion);

                const randomIndex = Math.floor(Math.random() * countries[randomRegion].length);
                const randomCountry = countries[randomRegion][randomIndex];
                console.log(randomCountry);
            }
        } else {
            for (let i = 1; i < quantity; i++) {
                const randomIndex = Math.floor(Math.random() * countries[region].length);
                const randomCountry = countries[region][randomIndex];
                console.log(randomCountry);
            }
        }

        // Redirect after processing
        navigate('/game'); // Change '/game' to the route you want to redirect to
        console.groupEnd();
    };

    return (
        <button className={`${bgColorClass} btn`} onClick={() => gameModeProvider(regionIndex, quantity)}>
            Play
        </button>
    );
}

export default GameComponent;
