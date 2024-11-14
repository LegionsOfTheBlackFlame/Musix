import React from 'react';

export default function CompGameOption(countries) {
    return (
        <div>
            <h1>Choose a country</h1>
            {countries.map((country, index) => (
                <button key={index} className="this-btn" onClick={() => console.log(country)}>
                    {country}
                </button>
            ))}
        </div>
    );
}