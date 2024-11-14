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

export default function pickCountries(regionIndex) {
    console.group("running pickCountries...");
    if (regionIndex === 0) {
        console.log("picking from all continents ...");
            const randomRegion = Math.floor(Math.random() * 5) + 1;
            console.log('random region index: ', randomRegion);

            const randomIndex = Math.floor(Math.random() * countries[randomRegion].length);
            console.log("random country index: ", randomIndex);
            const randomCountry = countries[randomRegion][randomIndex];
            console.log("random country: ", randomCountry);
           
        
    } else {
        console.log("picking from country at index: ", regionIndex);
            const randomIndex = Math.floor(Math.random() * countries[regionIndex].length);
            const randomCountry = countries[regionIndex][randomIndex];
            console.log("random country: ", randomCountry);
        }
        console.groupEnd("End pickCountries...");
    }
