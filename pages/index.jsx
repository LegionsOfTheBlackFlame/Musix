// File: /pages/index.jsx
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import Head from 'next/head';
import { useState, useEffect } from 'react';

// Biome Model Component
const BiomeModel = ({ biome }) => {
  // GLTF Models for Land and Snow
  const { scene: landScene } = useGLTF('/textures/land/globe_land.gltf'); // Land model
  const { scene: snowScene } = useGLTF('/textures/snow/snow_field_aerial_8k.gltf'); // Snow model

  // Texture for Ocean
  const oceanTexture = useLoader(TextureLoader, '/textures/Ocean.jpg');

  // Material for Ocean
  const oceanMaterial = new THREE.MeshStandardMaterial({
    map: oceanTexture,
    roughness: 0.5,
    metalness: 0.5,
  });

  // Render biome based on the current state
  if (biome === 'land') {
    return <primitive object={landScene} scale={2} />;
  } else if (biome === 'snow') {
    return <primitive object={snowScene} scale={2} />;
  } else {
    return (
      <mesh>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial {...oceanMaterial} />
      </mesh>
    );
  }
};

// Main Component
export default function Home() {
  // Biome state
  const [biome, setBiome] = useState('ocean');

  // Biome switching effect every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBiome((prev) => {
        if (prev === 'ocean') return 'land';
        if (prev === 'land') return 'snow';
        return 'ocean'; // Loop back to ocean
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <>
      <Head>
        <title>Biome World - GLTF Models</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
      >
        {/* Lighting setup */}
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <BiomeModel biome={biome} />
        <OrbitControls enableZoom enableRotate enablePan={false} />
      </Canvas>
    </>
  );
}