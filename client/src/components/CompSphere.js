import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import earthTexture from '../earth.jpg'; // Replace with your own Earth texture file

/**
 * SpinningEarth Component
 * Renders a 3D spinning Earth with interactive controls.
 * Features:
 * - Smooth rotation with adjustable speed.
 * - Mouse-based interaction for zooming and panning.
 * - Responsive lighting setup to enhance the visual experience.
 */
const SpinningEarth = () => {
    const mountRef = useRef(null);
    const defaultRotationSpeed = -0.005; // Default rotation speed (counterclockwise)
    const slowRotationSpeed = -0.001; // Reduced speed during interaction
    const rotationSpeedRef = useRef(defaultRotationSpeed); // Current rotation speed
    const earthTilt = 23.5 * (Math.PI / 180); // Earth's axial tilt in radians

    useEffect(() => {
        if (!mountRef.current) return; // Ensure mountRef is valid

        // Scene, Camera, and Renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5; // Default zoom level

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(1200, 575);
        mountRef.current.appendChild(renderer.domElement);

        // Create the Earth geometry and texture
        const earthGeometry = new THREE.SphereGeometry(1.5, 40, 40);

      

        const earthMaterial = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(earthTexture),
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        // Set Earth's axial tilt
        earth.rotation.set(earthTilt, 0, 0);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xf5f5f5); // Ambient light for overall illumination
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1); // Directional light
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);

        // OrbitControls for mouse interaction (OrbitControls allow the camera to orbit around a target object using mouse or touch interactions.)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth control movements
        controls.dampingFactor = 0.1;
        controls.enableZoom = true; // Allow zooming
        controls.enablePan = true; // Allow panning

        // Set zoom limits
        controls.minDistance = 2; // Minimum zoom level
        controls.maxDistance = 10; // Maximum zoom level

        // Handle left mouse button interactions
        function handleLeftClickStart() {
            rotationSpeedRef.current = slowRotationSpeed; // Slow down rotation
        }

        function handleLeftClickEnd() {
            setTimeout(() => {
                rotationSpeedRef.current = defaultRotationSpeed; // Reset rotation speed after 5 seconds
            }, 5000);
        }

        // Handle right mouse button interactions
        function handleRightClick(e) {
            if (e.button === 2) { // Check for right mouse button
                e.preventDefault(); // Prevent the default context menu
                rotationSpeedRef.current = slowRotationSpeed; // Slow down rotation
                setTimeout(() => {
                    rotationSpeedRef.current = defaultRotationSpeed; // Reset rotation speed after 5 seconds
                }, 5000);
            }
        }

        // Add mouse event listeners
        renderer.domElement.addEventListener('mousedown', (e) => {
            if (e.button === 0) handleLeftClickStart(); // Handle left-click start
        });
        renderer.domElement.addEventListener('mouseup', (e) => {
            if (e.button === 0) handleLeftClickEnd(); // Handle left-click end
        });
        renderer.domElement.addEventListener('mousedown', handleRightClick);

        // Animation loop
        const animate = () => {
            if (!mountRef.current) return; // Ensure component is mounted

            requestAnimationFrame(animate); //chedules an animation frame by telling the browser to call a specific function (your animation loop) before the next screen repaint.

            // Apply rotation
            earth.rotation.y += rotationSpeedRef.current;

            // Update controls and render the scene
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup when the component unmounts
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            renderer.domElement.removeEventListener('mousedown', handleLeftClickStart);
            renderer.domElement.removeEventListener('mouseup', handleLeftClickEnd);
            renderer.domElement.removeEventListener('mousedown', handleRightClick);
        };
    }, []);

    return <div ref={mountRef} className="sphere-container" />;
};

export default SpinningEarth;
