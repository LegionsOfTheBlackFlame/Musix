import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import Head from 'next/head';

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

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>Interactive 3D World</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Globe />
        <OrbitControls enableZoom enableRotate enablePan />
      </Canvas>
    </div>
  );
}