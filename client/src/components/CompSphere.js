import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadSVG } from '../functions/FuncMapHandler.js';

const InteractiveGlobe = () => {
    console.log('[INIT] InteractiveGlobe component initialized');

    const mountRef = useRef(null);
    const rotationSpeedRef = useRef(-0.005);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        console.log('[DEBUG] Setting up scene, camera, and renderer');
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

        console.log('[DEBUG] Adding globe');
        const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);
        const earthMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        const ambientLight = new THREE.AmbientLight(0xf5f5f5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);

        console.log('[DEBUG] Loading SVG data');
        loadSVG('/map.svg')
            .then((countryGroups) => {
                console.log('[DEBUG] SVG loaded. Adding countries to scene:', countryGroups);
                Object.values(countryGroups).forEach((group) => scene.add(group));

                const raycaster = new THREE.Raycaster();
                const mouse = new THREE.Vector2();
                let hoveredGroup = null;

                const handleMouseMove = (event) => {
                    const rect = renderer.domElement.getBoundingClientRect();
                    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(Object.values(countryGroups), true);

                    if (intersects.length > 0) {
                        const group = intersects[0].object.parent;
                        if (hoveredGroup !== group) {
                            console.log('[DEBUG] Hovered over group:', group.userData.id);
                            if (hoveredGroup) {
                                hoveredGroup.children.forEach((child) =>
                                    child.material.color.set(0x0077ff)
                                );
                            }
                            hoveredGroup = group;
                            hoveredGroup.children.forEach((child) =>
                                child.material.color.set(0xff0000)
                            );
                        }
                    } else if (hoveredGroup) {
                        console.log('[DEBUG] Hover removed from group:', hoveredGroup.userData.id);
                        hoveredGroup.children.forEach((child) =>
                            child.material.color.set(0x0077ff)
                        );
                        hoveredGroup = null;
                    }
                };

                const handleMouseClick = () => {
                    if (hoveredGroup) {
                        const id = hoveredGroup.userData.id;
                        console.log(`[CLICK] Selected country: ${id}`);
                        setSelectedCountry(id);
                    }
                };

                renderer.domElement.addEventListener('mousemove', handleMouseMove);
                renderer.domElement.addEventListener('click', handleMouseClick);
            })
            .catch((error) => console.error('[ERROR] Failed to load SVG:', error));

        const animate = () => {
            requestAnimationFrame(animate);
            earth.rotation.y += rotationSpeedRef.current;
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
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
