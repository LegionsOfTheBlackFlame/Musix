import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import earthTexture from '../earth.jpg'; // Kendi dünya doku dosyanızla değiştirin

const SpinningEarth = () => {
    const mountRef = useRef(null);
    const defaultRotationSpeed = -0.005; // Dünya'nın normal dönüş hızı (ters yönde dönecek)
    const slowRotationSpeed = -0.001; // Etkileşim sırasında kullanılacak yavaş dönüş hızı
    const rotationSpeedRef = useRef(defaultRotationSpeed); // Dönüş hızını ref olarak saklayın
    const earthTilt = 23.5 * (Math.PI / 180); // 23.5 dereceyi radiana çevirme (pozitif yönde)

    useEffect(() => {
        if (!mountRef.current) return; // mountRef.current tanımlı olduğundan emin olun

        // Sahne, Kamera ve Renderer ayarları
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5; // Varsayılan zoom değeri

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

        // Dünya'nın eksen eğikliğini ayarla
        earth.rotation.set(earthTilt, 0, 0); // X ekseninde 23.5 derece eğim ver (pozitif)

        // Işıklandırma
        const ambientLight = new THREE.AmbientLight(0xf5f5f5); // Ortam ışığı
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);

        // OrbitControls ile fare kontrolü
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Kontrolleri daha yumuşak hale getirir
        controls.dampingFactor = 0.1;
        controls.enableZoom = true; // Zoom yapılmasına izin verir
        controls.enablePan = true;   // Pan yaparak kamerayı hareket ettirir

        // Zoom sınırlarını ayarla
        controls.minDistance = 2; // Minimum zoom seviyesi
        controls.maxDistance = 10;  // Maksimum zoom seviyesi

        // Sol tıklama sırasında dönüş hızını azaltma fonksiyonu
        function handleLeftClickStart() {
            rotationSpeedRef.current = slowRotationSpeed; // Dönüş hızını yavaşlat
        }

        function handleLeftClickEnd() {
            setTimeout(() => {
                rotationSpeedRef.current = defaultRotationSpeed; // 5 saniye sonra dönüş hızını eski haline getir
            }, 5000); 
        }

        // Sağ tıklama sırasında dönüş hızını azaltma fonksiyonu
        function handleRightClick(e) {
            if (e.button === 2) { // Sağ tuş kontrolü
                e.preventDefault(); // Sağ tuş menüsünü engelle
                rotationSpeedRef.current = slowRotationSpeed; // Dönüş hızını yavaşlat
                setTimeout(() => {
                    rotationSpeedRef.current = defaultRotationSpeed; // 5 saniye sonra dönüş hızını eski haline getir
                }, 5000);
            }
        }

        // Fare sol ve sağ tıklama olaylarını dinleyin
        renderer.domElement.addEventListener('mousedown', (e) => {
            if (e.button === 0) handleLeftClickStart(); // Sol tıklama başlangıcı
        });
        renderer.domElement.addEventListener('mouseup', (e) => {
            if (e.button === 0) handleLeftClickEnd(); // Sol tıklama sonu
        });
        renderer.domElement.addEventListener('mousedown', handleRightClick);

        // Animasyon döngüsü
        const animate = () => {
            if (!mountRef.current) return; // Bileşen yüklü olduğundan emin olun

            requestAnimationFrame(animate);

            // Dönüş işlemi
            earth.rotation.y += rotationSpeedRef.current; // Dönüş hızını uygula

            // Kamera pozisyonu ve zoom kontrolü
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // Bileşen kapandığında temizleme işlemi
        return () => {
            if (mountRef.current) { // mountRef geçerli olduğundan emin olun
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            renderer.domElement.removeEventListener('mousedown', handleLeftClickStart);
            renderer.domElement.removeEventListener('mouseup', handleLeftClickEnd);
            renderer.domElement.removeEventListener('mousedown', handleRightClick);
        };
    }, []);

    return <div ref={mountRef} className='sphere-container' />;
};

export default SpinningEarth;
