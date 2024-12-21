import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    ambientLight: THREE.AmbientLight;
    pointLight: THREE.PointLight;
  }
}