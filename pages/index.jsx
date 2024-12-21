import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import Head from 'next/head';

// Globe component
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

// Main component
export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>Interactive 3D World</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Environment lighting */}
        <Environment preset="sunset" />
        <Globe />
        <OrbitControls enableZoom enableRotate enablePan />
      </Canvas>
    </div>
  );
}