import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { randomOfArray } from '../utils.js';
import '../styles/hero.css';

const getData = async () => {
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
  const [alphaValues, setAlphaValues] = useState({ solve: null });
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

  const animationControls = (phase, ) => {

  }

  useEffect(() => {
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
    if (alphaPool.length > 0 && CountryObj) {
      console.log("[INITIALIZE] Setting initial alpha and beta values...");
      const initialAlpha = randomOfArray(alphaPool);
      const bands = CountryObj[initialAlpha];
      console.log("[INITIALIZE] Initial country:", initialAlpha);
      console.log("[INITIALIZE] Bands for country:", bands);

      setAlphaValues({ solve: initialAlpha });
      setBetaPool(bands);
      setBetaValues({ solve: bands[0] || null, coagulate: bands[1] || null });

      // Notify that data initialization is complete
      console.log("[INITIALIZE] Data setup complete.");
    }
  }, [alphaPool, CountryObj]);

  const startAlphaCycle = async () => {
    console.log("[ALPHA CYCLE] Starting alpha animation for:", alphaValues.solve);
    await alphaControls.start("final");
    console.log("[ALPHA CYCLE] Alpha animation completed.");

    if (betaPool.length === 0) {
      console.warn("[ALPHA CYCLE] Beta pool is empty. Skipping beta cycle.");
      return;
    }
    setBetaValues({ solve: betaPool[0], coagulate: betaPool[1] || null });
    console.log("[ALPHA CYCLE] Beta values set:", { solve: betaPool[0], coagulate: betaPool[1] || null });

    setAnimationPhase("beta");
    console.log("[ALPHA CYCLE] Animation phase set to beta.");

    startBetaCycle();
  };

  const startBetaCycle = async () => {
    console.log("[BETA CYCLE] Starting beta animation...");

    if (betaValues.coagulate) {
      console.log("[BETA CYCLE] Starting coagulate animation for:", betaValues.coagulate);
      await betaCoagulateControls.start("final");
      console.log("[BETA CYCLE] Coagulate animation completed.");
      await betaCoagulateControls.start("reset");
      console.log("[BETA CYCLE] Coagulate animation reset.");
    }

    if (betaValues.solve) {
      console.log("[BETA CYCLE] Starting solve animation for:", betaValues.solve);
      await betaSolveControls.start("final");
      console.log("[BETA CYCLE] Solve animation completed.");
      await betaSolveControls.start("reset");
      console.log("[BETA CYCLE] Solve animation reset.");
    }

    const nextIndex = betaPool.indexOf(betaValues.solve) + 1;
    console.log("[BETA CYCLE] Calculating next beta index:", nextIndex);

    if (nextIndex < betaPool.length) {
      setBetaValues({ solve: betaPool[nextIndex], coagulate: betaPool[nextIndex + 1] || null });
      console.log("[BETA CYCLE] Updated beta values:", { solve: betaPool[nextIndex], coagulate: betaPool[nextIndex + 1] || null });

      startBetaCycle();
    } else {
      console.log("[BETA CYCLE] Beta cycle completed. Moving to next alpha.");
      moveToNextAlpha();
    }
  };

  const moveToNextAlpha = () => {
    const filteredAlphaPool = alphaPool.filter((key) => key !== alphaValues.solve);
    if (filteredAlphaPool.length === 0) {
      console.error("[NEXT ALPHA] No valid countries left in alpha pool.");
      return;
    }

    const nextAlpha = randomOfArray(filteredAlphaPool);
    const nextBands = CountryObj[nextAlpha] || [];
    console.log("[NEXT ALPHA] Moving to next country:", nextAlpha);
    console.log("[NEXT ALPHA] Bands for next country:", nextBands);

    setAlphaValues({ solve: nextAlpha });
    console.log("[NEXT ALPHA] Updated alpha values:", { solve: nextAlpha });

    setBetaPool(nextBands);
    console.log("[NEXT ALPHA] Updated beta pool:", nextBands);

    setBetaValues({ solve: nextBands[0] || null, coagulate: nextBands[1] || null });
    console.log("[NEXT ALPHA] Updated beta values:", { solve: nextBands[0] || null, coagulate: nextBands[1] || null });

    startAlphaCycle();
  };

  useEffect(() => {
    if (animationPhase === "alpha") {
      console.log("[USEEFFECT] Animation phase is alpha. Starting alpha cycle.");
      startAlphaCycle();
    }
  }, [animationPhase]);

  return (
    <div ref={containerRef} className='hero-container cont'>
      <motion.h1
        className='alpha'
        variants={varCoagulate}
        initial="initial"
        animate={alphaControls}
      >
        {alphaValues.solve}
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
