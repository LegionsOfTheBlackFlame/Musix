import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import earthTexture from '../earth.jpg'; // Replace with your own Earth texture image

const SpinningEarth = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return; // Ensure mountRef.current is defined

        // Scene, Camera, Renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(1200, 575);
        mountRef.current.appendChild(renderer.domElement);

        // Earth geometry and texture
        const earthGeometry = new THREE.SphereGeometry(1.5, 40, 40);
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

        // OrbitControls for mouse control
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Adds some smoothness to the controls
        controls.dampingFactor = 0.1;
        controls.enableZoom = true; // Allows zooming with mouse wheel
        controls.rotateSpeed = 0.5; // Adjust rotation speed

        // Animation loop
        const animate = () => {
            if (!mountRef.current) return; // Check if component is still mounted

            requestAnimationFrame(animate);

            // Rotation logic
            earth.rotation.y += 0.01; // Adjust rotation speed here

            // Update controls
            controls.update();

            renderer.render(scene, camera);
        };

        animate();

        // Clean up on component unmount
        return () => {
            if (mountRef.current) { // Check if mountRef is valid before cleanup
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className='sphere-container' />;
};

export default SpinningEarth;
