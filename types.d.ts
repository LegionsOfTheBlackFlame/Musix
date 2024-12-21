/// <reference types="react-scripts" />
import * as THREE from 'three';

declare module '*.glb' {
  const content: string;
  export default content;
}

declare module '*.gltf' {
  const content: string;
  export default content;
}

declare module '@react-three/fiber' {
  export interface ThreeElements {
    ambientLight: THREE.AmbientLight | any;
    pointLight: THREE.PointLight | any;
  }
}