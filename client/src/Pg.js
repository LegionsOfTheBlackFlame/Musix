import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import CompHero from './CompHero.js';

function Pg() {
    return (
        <div
            id='main_page'
            className='page main-page'>
            <CompHero />
        </div>
    )
}

export default Pg;