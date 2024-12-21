import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * InteractiveGlobe
 * Renders a 3D spinning globe with countries as interactive meshes.
 */
const InteractiveGlobe = () => {
    console.log('[INIT] InteractiveGlobe component initialized');

    const mountRef = useRef(null);
    const rotationSpeedRef = useRef(-0.005);
    const [selectedCountry, setSelectedCountry] = useState(null); // Tracks the selected country

    useEffect(() => {
        // === Setup Scene ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(1200, 575);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.enableZoom = true;
        controls.minDistance = 2;
        controls.maxDistance = 10;

        // === Add Globe ===
        const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);
        const earthMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        const ambientLight = new THREE.AmbientLight(0xf5f5f5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);

        // === Raycaster Setup ===
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Track hovered and clicked objects
        let hoveredObject = null;

        // === Create Interactive Countries (Fake for Demo) ===
        const countries = [];
        for (let i = 0; i < 50; i++) {
            const countryGeometry = new THREE.SphereGeometry(0.05, 16, 16); // Small sphere
            const countryMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
            const countryMesh = new THREE.Mesh(countryGeometry, countryMaterial);

            // Randomly position countries on globe surface
            const lat = Math.random() * Math.PI - Math.PI / 2;
            const lon = Math.random() * Math.PI * 2;
            const radius = 1.51; // Just above globe surface

            countryMesh.position.set(
                radius * Math.cos(lat) * Math.sin(lon),
                radius * Math.sin(lat),
                radius * Math.cos(lat) * Math.cos(lon)
            );
            countryMesh.userData.id = `Country-${i + 1}`; // Fake IDs for countries
            scene.add(countryMesh);
            countries.push(countryMesh); // Store for raycasting
        }

        console.log('[COUNTRIES] Added countries to the globe.');

        // === Mouse Events ===
        const handleMouseMove = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(countries);

            if (intersects.length > 0) {
                if (hoveredObject !== intersects[0].object) {
                    if (hoveredObject) hoveredObject.material.color.set(0x0077ff); // Reset color
                    hoveredObject = intersects[0].object;
                    hoveredObject.material.color.set(0xff0000); // Highlight hover
                }
            } else if (hoveredObject) {
                hoveredObject.material.color.set(0x0077ff); // Reset color if no hover
                hoveredObject = null;
            }
        };

        const handleMouseClick = () => {
            if (hoveredObject) {
                const countryId = hoveredObject.userData.id;
                console.log(`[CLICK] Selected country: ${countryId}`);
                setSelectedCountry(countryId); // Update state
            }
        };

        // Attach listeners
        renderer.domElement.addEventListener('mousemove', handleMouseMove);
        renderer.domElement.addEventListener('click', handleMouseClick);

        // === Animation Loop ===
        const animate = () => {
            requestAnimationFrame(animate);
            earth.rotation.y += rotationSpeedRef.current;
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            renderer.domElement.removeEventListener('mousemove', handleMouseMove);
            renderer.domElement.removeEventListener('click', handleMouseClick);
            renderer.dispose();
        };
    }, []);

    return (
        <div>
            <div ref={mountRef} className="sphere-container" />
            {selectedCountry && <p>Selected Country: {selectedCountry}</p>}
        </div>
    );
};

export default InteractiveGlobe;
