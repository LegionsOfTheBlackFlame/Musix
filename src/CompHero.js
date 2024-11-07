import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';

import { randomIndex, checkLimit } from './utils.js';

// key: country name, value: array of bands
const CountryObj = {
    Bolivia: ["Luzmila Carpio", "Los Jairas", "Atajo"],
    Brazil: ["Sepultura", "Gilberto Gil", "Caetano Veloso", "João Gilberto", "Anitta"],
    Canada: ["Celine Dion", "Bryan Adams", "Leonard Cohen", "Drake"],
    Chile: ["Gepe", "Eloy Alquinta", "Cristian Heyne"],
    Colombia: ["Shakira", "Totó la Momposina", "Alexander Cuesta"],
    CostaRica: ["Debi Nova", "Daniel Rojas", "Manuel Obregón"],
    Cuba: ["X Alfonso", "Cándido Fabré", "Al Jourgensen"],
    China: ["Faye Wong", "Beyond", "Vajara"],
    India: ["The Local Train", "Agnee", "Parikrama"],
    SouthKorea: ["Hoppipolla", "Purple Rain", "Lucy"],
    Mexico: ["Molotov", "Caifanes", "Camila"],
    Sweden: ["Europe", "ABBA", "Sabaton", "Opeth"],
    USA: ["Metallica", "Nirvana", "Pearl Jam"],
    UK: ["the Beatles", "Queen", "Led Zeppelin"],
    Norway: ["Mayhem", "Burzum", "Darkthrone"],
    Germany: ["Scorpions", "Rammstein", "Accept"],
    France: ["Daft Punk", "Gojira", "Whatfor"],
    Spain: ["Los Del Río", "Sober", "Cadillac"],
    Italy: ["Nomadi", "Lacuna Coil", "Death SS"],
}
// array of country names
const countries = Object.keys(CountryObj);
var thisSetUp = false;



// Preparing States before rendering
const initDynamicHero = (setAlphaIndex, setSolve, setCoagula, setBetaIndex,setSolveBeta, setCoagulaBeta) => {
    // Solve is the element exiting, coagula is the element entering
    if (countries) { console.log("initDynamicHero found 'countries' defined") }
    /* Each country (alpha group) is subject to a long animation timer and 
    nests bands (beta group) subject to shorter animation timer */
    const alphaIndex = randomIndex(countries)
    if (alphaIndex <= countries.length) { console.log("Checking alphaIndex against countries' lenght") }
    const randomCountry = countries[alphaIndex];
    setSolve(randomCountry); // type : string
    console.log("Initial active country randoomly selected : " + randomCountry);

    const resetAlphaIndex = checkLimit(alphaIndex, countries.length); // type : boolean
    /* If alphaIndex is greater than country's length, reset to 0 
        assign appropriate index for alphaCoagula */
    if (resetAlphaIndex) {
        alphaIndex = 0;
        setCoagula(countries[alphaIndex])
    } else {
        setCoagula(countries[alphaIndex + 1])
    }

    setAlphaIndex(alphaIndex);

    const betaIndex = randomIndex(CountryObj[randomCountry]);
    const randomBand = CountryObj[randomCountry][betaIndex];
    if (randomBand) { console.log("initial active band randoomly selected : " + randomBand) }
    setSolveBeta(randomBand); // type : string
   
    const resetBetaIndex = checkLimit(betaIndex, CountryObj[randomCountry].length);
    if (resetBetaIndex) {
        betaIndex = 0;
        setCoagulaBeta(CountryObj[randomCountry][betaIndex])
    } else {
        setCoagulaBeta(CountryObj[randomCountry][betaIndex + 1]);
    }

    thisSetUp = true;
}



const CompHero = () => {
    const [alphaIndex, setAlphaIndex] = useState(null);
    const [solvCountry, setSolvCountry] = useState(null);
    const [coagCountry, setCoagCountry] = useState(null);

    const [betaIndex, setBetaIndex] = useState(null);
    const [solvBand, setSolvBand] = useState(null);
    const [coagBand, setCoagBand] = useState(null);
    const [betaCycleCount, setBetaCycleCount] = useState(0);

    useEffect(() => {
        initDynamicHero(setAlphaIndex, setSolvCountry, setCoagCountry, setBetaIndex, setSolvBand, setCoagBand);
        
    }, []);

    useEffect(() => {
        
    }, [thisSetUp])

    return (
        <div
            id='hero_sect'
            className='hero-comp-container'>
            <h1 className='coug coug-alpha'>
                {coagCountry}
            </h1>
            <h1 className='solv solv-alpha'>
                {solvCountry}
            </h1>

            <h3> home to...</h3>
            <h1 className='coug coug-beta'>
                {coagBand}
            </h1>
            <h1 className='solv solv-beta'>
                {solvBand}
            </h1>

        </div>
    );
}

export default CompHero;