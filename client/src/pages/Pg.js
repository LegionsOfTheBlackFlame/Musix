import React from 'react';
import CompHero from '../components/CompHero copy.js';
console.log("[ROOT] First run of Pg");
function Pg() {
    return (
        <div
            id='main_page'
            className='page main-page'>
                {console.log("e.main_page rendered")}
            <CompHero />
        </div>
    )
}

export default Pg;