import React from 'react';
import CompTest from '../components/CompTest.js';
console.log("[ROOT] First run of Pg");
function Pg() {
    return (
        <div
            id='main_page'
            className='page main-page'>
                {console.log("e.main_page rendered")}
            {/* <CompTest /> */}
        </div>
    )
}

export default Pg;