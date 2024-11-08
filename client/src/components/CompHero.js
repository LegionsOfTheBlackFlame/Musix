import React, { useState, useEffect } from 'react';
import { randomIndex } from '../utils.js';

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
};
const countries = Object.keys(CountryObj);

const CompHero = () => {
  const [countryData, setCountryData] = useState({
    solvCountry: null,
    solvBand: null,
    coagCountry: null,
    coagBand: null,
  });
  const [isSolvActive, setIsSolvActive] = useState(true);

  useEffect(() => {
    // Initial setup for solv and coag elements
    const initialCountry = countries[randomIndex(countries)];
    console.log("initialCountry", initialCountry);
    const initialBand = CountryObj[initialCountry][randomIndex(CountryObj[initialCountry])];
    console.log("initialBand", initialBand);
    let randomCountry;
    do {
      randomCountry = countries[randomIndex(countries)];
    } while (randomCountry === initialCountry);

    setCountryData({
      solvCountry: initialCountry,
      solvBand: initialBand,
      coagCountry: randomCountry,
      coagBand: CountryObj[randomCountry][randomIndex(CountryObj[randomCountry])]
    });

    const interval = setInterval(updateCountries, 4000); // Matches CSS animation duration

    return () => clearInterval(interval);
  }, []);

  const updateCountries = () => {
    setCountryData((prevData) => {
      const { coagCountry, coagBand } = prevData;

      // Generate a new random country and band for coag
      let newCoagCountry;
      do {
        newCoagCountry = countries[randomIndex(countries)];
      } while (newCoagCountry === coagCountry);

      const newCoagBand = CountryObj[newCoagCountry][randomIndex(CountryObj[newCoagCountry])];

      return {
        solvCountry: coagCountry,       // Move previous coag to solv
        solvBand: coagBand,             // Move previous coag band to solv band
        coagCountry: newCoagCountry,    // New random country for coag
        coagBand: newCoagBand           // New random band for coag
      };
    });

    setIsSolvActive(prevIsSolvActive => !prevIsSolvActive);
  };

  const { solvCountry, solvBand, coagCountry, coagBand } = countryData;

  return (
    <div id="hero_sect" className="hero-comp-container">
      <h1 className={`country ${isSolvActive ? 'solv-alpha' : 'coag-alpha'}`}>
        {isSolvActive ? solvCountry : coagCountry}
      </h1>
      <h1 className={`country ${isSolvActive ? 'coag-alpha' : 'solv-alpha'}`}>
        {isSolvActive ? coagCountry : solvCountry}
      </h1>

      <h6> home to...</h6>
      <h3 className={`band ${isSolvActive ? 'solv-beta' : 'coag-beta'}`}>
        {isSolvActive ? solvBand : coagBand}
      </h3>
      <h3 className={`band ${isSolvActive ? 'coag-beta' : 'solv-beta'}`}>
        {isSolvActive ? coagBand : solvBand}
      </h3>
    </div>
  );
};

export default CompHero;
