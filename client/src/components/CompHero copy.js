import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { randomOfArray } from '../utils.js';
import '../styles/hero.css';

const getData = async () => { //DONE!
  try {
    const response = await fetch(`http://localhost:3100/data`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('[GETDATA] Error fetching data:', error);
    return null;
  }
};

function CompHero() {
  console.log("[HERO] render");
  const containerRef = useRef(null);

  // States
    // -statics
  const [CountryObj, setCountryObj] = useState(null);
  const [alphaPool, setAlphaPool] = useState([]);
    // -controls
  const [animationPhase, setAnimationPhase] = useState("alpha");

    // -values
  const [betaPool, setBetaPool] = useState([]);
  const [alphaValues, setAlphaValues] = useState({ solve: null, coagulate: null });
  const [betaValues, setBetaValues] = useState({ solve: null, coagulate: null });

  // Animation controls
  const alphaControls = useAnimation();
  const betaSolveControls = useAnimation();
  const betaCoagulateControls = useAnimation();

  // Animation variants
  const varCoagulate = {
    initial: { opacity: 0, x: -50, y: -50 },
    final: { opacity: 1, x: 0, y: 0, transition: { duration: 2 } },
    reset: { opacity: 0, x: -50, y: -50, transition: { duration: 0 } }
  };

  const varSolve = {
    initial: { opacity: 1, x: 0, y: 0 },
    final: { opacity: 0, x: 50, y: 50, transition: { duration: 2 } },
    reset: { opacity: 1, x: 0, y: 0, transition: { duration: 0 } }
  };

 
// fetches data from the server & sets static states
  useEffect(() => { //DONE!
    const initializeData = async () => {
      console.log("[INITIALIZE] Fetching data...");
      const data = await getData();
      if (data) {
        console.log("[INITIALIZE] Data received:", data);
        setCountryObj(data);
        const keys = Object.keys(data);
        setAlphaPool(keys);
      } else {
        console.warn("[INITIALIZE] No data received. Check the server or network.");
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    /*> CHECK : statics populated | > SET PASE : alpha */ 
    if (alphaPool.length > 0 && CountryObj) {
      console.log("Animating");
      setAnimationPhase("alpha");
    } else {
      console.log("Not animating");
    }
  }, [CountryObj, alphaPool]);

  useEffect(() => {
    animationControls(animationPhase);
  }, [animationPhase])

  async function animationControls(phase) {

    if (phase === "alpha" 
      && alphaValues.coagulate === null 
      && alphaValues.solve === null) {
        console.log("[AC ALPHA] initial alpha cycle");
        setAlphaValues({ coagulate: alphaPool[0] });
    } else if (phase === "alpha" 
      && alphaValues.coagulate !== null) {
        console.log("[AC ALPHA] animating Coagulate");
        alphaControls.start("final").then(()=> {
          console.log("[AC ALPHA] coagulate animation complete");
          setAlphaValues({ ...alphaValues, solve: alphaValues.coagulate});
        })
  } else {
    console.log("[AC ALPHA] unknown phase");
  }}
  return (
    <div ref={containerRef} className='hero-container cont'>
      <motion.h1
        className='alpha'
        variants={varCoagulate}
        initial="initial"
        animate={alphaControls}
      >
        {alphaValues.coagulate}
      </motion.h1>
      <motion.h3
        className='beta-solve'
        variants={varSolve}
        initial="initial"
        animate={betaSolveControls}
      >
        {betaValues.solve}
      </motion.h3>
      <motion.h3
        className='beta-coagulate'
        variants={varCoagulate}
        initial="initial"
        animate={betaCoagulateControls}
      >
        {betaValues.coagulate}
      </motion.h3>
    </div>
  );
}

export default CompHero;
