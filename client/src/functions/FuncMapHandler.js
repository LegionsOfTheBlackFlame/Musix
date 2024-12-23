import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as THREE from 'three';

export const loadSVG = (filePath, materialOptions = {}) => {
    console.log('[DEBUG] Loading SVG file:', filePath);

    return new Promise((resolve, reject) => {
        const loader = new SVGLoader();

        loader.load(
            filePath,
            (data) => {
                console.log('[DEBUG] SVG data loaded:', data);

                const paths = data.paths;
                const countryGroups = {};

                // Radius for wrapping shapes around the globe
                const radius = 1.55; // Slightly above globe surface

                paths.forEach((path, index) => {
                    const pathID = path.userData.node.getAttribute('id');
                    const groupID = path.userData.node.parentNode?.getAttribute('id');
                    const id = pathID || groupID || `ungrouped-${index}`;

                    console.log(`[DEBUG] Processing path #${index}, ID: ${pathID}, Group ID: ${groupID}, Final ID: ${id}`);

                    if (!countryGroups[id]) {
                        const group = new THREE.Group();
                        group.userData = { id };
                        countryGroups[id] = group;
                        console.log(`[DEBUG] Created group for ID: ${id}`);
                    }

                    const shapes = SVGLoader.createShapes(path);
                    shapes.forEach((shape, shapeIndex) => {
                        // Extrude the shape to give it depth
                        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.5, bevelEnabled: false,  curveSegments: 12 });

                        // Transform vertices to fit the globe surface
                        const positions = geometry.attributes.position.array;

                        for (let i = 0; i < positions.length; i += 3) {
                            const x = positions[i];
                            const y = positions[i + 1];

                            // Normalize SVG coordinates to lat/lon
                            const lat = (1 - y / 500) * 180 - 90; // Invert Y-axis
                            const lon = (x / 1000) * 360 - 180;

                            // Project to 3D sphere
                            const [px, py, pz] = latLonToXYZ(lat, lon, radius);
                            positions[i] = px;
                            positions[i + 1] = py;
                            positions[i + 2] = pz;
                        }

                        // Update geometry
                        geometry.attributes.position.needsUpdate = true;

                        const material = new THREE.MeshStandardMaterial({
                            color: 0x0077ff,
                            
                            ...materialOptions
                        });

                        const mesh = new THREE.Mesh(geometry, material);
                        
                        countryGroups[id].add(mesh);
                        console.log(`[DEBUG] Added shape #${shapeIndex} to group ID: ${id}`);
                    });
                });

                console.log('[DEBUG] Completed processing SVG paths. Returning groups:', countryGroups);
                resolve(countryGroups);
            },
            undefined,
            (error) => {
                console.error('[ERROR] Failed to load SVG file:', error);
                reject(error);
            }
        );
    });
};

// Helper function: Convert lat/lon to 3D coordinates
const latLonToXYZ = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
};
