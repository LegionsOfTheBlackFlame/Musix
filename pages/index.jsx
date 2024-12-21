import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import Head from 'next/head';
import { useEffect } from 'react';

// Globe bileşeni
const Globe = () => {
  return (
    <Sphere visible args={[2, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color="#1E90FF"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  );
};

// Lights bileşeni
const Lights = () => {
  const { scene } = useThree();

  useEffect(() => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Renk ve yoğunluk
    const pointLight = new THREE.PointLight(0xffffff, 1); // Renk ve yoğunluk
    pointLight.position.set(10, 10, 10);

    // Işıkları sahneye ekleyelim
    scene.add(ambientLight);
    scene.add(pointLight);

    return () => {
      scene.remove(ambientLight);
      scene.remove(pointLight);
    };
  }, [scene]);

  return null; // JSX içinde render edilmiyor, sadece sahneye ekleniyor
};

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>Interactive 3D World</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Lights />
        <Globe />
        <OrbitControls enableZoom enableRotate enablePan />
      </Canvas>
    </div>
  );
}