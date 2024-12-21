import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import parsePath from 'svg-path-parser';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * InteractiveGlobeWithSVG
 * Displays a 3D interactive globe using parsed SVG paths for countries.
 */
const InteractiveGlobeWithSVG = () => {
    console.log('[INIT] InteractiveGlobeWithSVG component initialized');

    const mountRef = useRef(null); // Mount reference
    const [selectedCountry, setSelectedCountry] = useState(null); // State for clicked country
    const rotationSpeedRef = useRef(-0.005); // Default rotation speed
    const earthTilt = 23.5 * (Math.PI / 180); // Earth's axial tilt

    useEffect(() => {
        if (!mountRef.current) {
            console.warn('[ERROR] mountRef is null!');
            return;
        }

        console.log('[SETUP] Scene, camera, and renderer setup started.');

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        console.log('[CAMERA] Camera initialized at position:', camera.position);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(1200, 575);
        mountRef.current.appendChild(renderer.domElement);
        console.log('[RENDERER] Renderer initialized.');

        // Create Sphere Geometry
        const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);
        const earthMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);
        console.log('[EARTH] Globe added with base material.');

        // Lights
        const ambientLight = new THREE.AmbientLight(0xf5f5f5);
        scene.add(ambientLight);
        console.log('[LIGHTING] Ambient light added.');

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);
        console.log('[LIGHTING] Point light added.');

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.minDistance = 2;
        controls.maxDistance = 10;
        console.log('[CONTROLS] OrbitControls initialized.');

        // === SVG Parsing ===
        fetch('/map.svg') // Replace with your SVG file path
            .then(response => response.text())
            .then(data => {
                console.log('[SVG] SVG data loaded.');
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(data, 'image/svg+xml');
                const svgElement = svgDoc.documentElement;

                const groups = svgElement.querySelectorAll('g'); // Select all <g> elements
                console.log(`[SVG] Found ${groups.length} <g> elements.`);

                groups.forEach((group) => {
                    const countryId = group.id || 'unknown';
                    const paths = group.querySelectorAll('path');

                    paths.forEach((path) => {
                        const shape = new THREE.Shape();
                        const pathData = path.getAttribute('d');
                    
                        // Parse path commands using svg-path-parser
                        const commands = parsePath(pathData);
                    
                        commands.forEach((cmd, i) => {
                            if (cmd.command === 'M') shape.moveTo(cmd.x, -cmd.y);
                            else if (cmd.command === 'L') shape.lineTo(cmd.x, -cmd.y);
                            else if (cmd.command === 'C') shape.bezierCurveTo(
                                cmd.x1, -cmd.y1, // Control point 1
                                cmd.x2, -cmd.y2, // Control point 2
                                cmd.x, -cmd.y   // Endpoint
                            );
                        });
                    
                        const geometry = new THREE.ShapeGeometry(shape);
                        const material = new THREE.MeshBasicMaterial({
                            color: 0x0077ff,
                            side: THREE.DoubleSide,
                        });
                        const mesh = new THREE.Mesh(geometry, material);
                    
                        // Map to sphere here...
                        scene.add(mesh);
                    

                        // Handle country click event
                        mesh.userData.id = countryId;
                        mesh.addEventListener('click', () => {
                            console.log(`[CLICK] Country clicked: ${countryId}`);
                            setSelectedCountry(countryId);
                        });
                    });
                });
            })
            .catch(err => {
                console.error('[ERROR] Failed to load or parse SVG:', err);
            });

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            earth.rotation.y += rotationSpeedRef.current;
            controls.update();
            renderer.render(scene, camera);
        };
        console.log('[ANIMATION] Starting animation loop.');
        animate();

        // Cleanup
        return () => {
            console.log('[CLEANUP] Cleaning up resources.');
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    console.log('[RENDER] Component rendering complete.');
    return (
        <div>
            <div ref={mountRef} className="sphere-container" />
            {selectedCountry && <p>Selected Country: {selectedCountry}</p>}
        </div>
    );
};

export default InteractiveGlobeWithSVG;
