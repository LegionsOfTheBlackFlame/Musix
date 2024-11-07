import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import earthTexture from './earth.jpg'; // Replace with your own Earth texture image

const SpinningEarth = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene, Camera, Renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Earth geometry and texture
        const earthGeometry = new THREE.SphereGeometry(1, 40, 40);
        const earthMaterial = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(earthTexture),
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xf5f5f5); // Dim ambient light
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);

        // Camera position
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotation logic
            earth.rotation.y += 0.01; // Adjust rotation speed here

            renderer.render(scene, camera);
        };

        animate();

        // Clean up on component unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className='sphere-container' />;
};

export default SpinningEarth;
