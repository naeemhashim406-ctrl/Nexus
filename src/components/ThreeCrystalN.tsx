import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCrystalNProps {
  className?: string;
}

export const ThreeCrystalN: React.FC<ThreeCrystalNProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const isVisibleRef = useRef<boolean>(true);
  const animFrameIdRef = useRef<number | null>(null);

  // Mouse tracking for dynamic crystal specular highlight
  const mouseLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 2. Renderer with performance-optimized pixel ratio
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting setup for faceted crystal shine
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x5bb8f5, 3.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x1f4fa3, 2.6);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    // Interactive mouse light
    const mouseLight = new THREE.PointLight(0x7cd0ff, 2.5, 15);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);
    mouseLightRef.current = mouseLight;

    // 4. Create the 3D Faceted "N" Geometry
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // Material 1: Navy metallic crystal pillar
    const navyCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b1f4d,
      roughness: 0.15,
      metalness: 0.65,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    // Material 2: Sky-to-Royal glowing sapphire facet
    const facetCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x2e82de,
      emissive: 0x0e326e,
      roughness: 0.08,
      metalness: 0.3,
      transmission: 0.35,
      ior: 1.52,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Left Bar
    const leftBarGeo = new THREE.BoxGeometry(0.7, 3.8, 0.7);
    const leftBarMesh = new THREE.Mesh(leftBarGeo, navyCrystalMat);
    leftBarMesh.position.set(-1.45, 0, 0);
    crystalGroup.add(leftBarMesh);

    // Right Bar
    const rightBarGeo = new THREE.BoxGeometry(0.7, 3.8, 0.7);
    const rightBarMesh = new THREE.Mesh(rightBarGeo, navyCrystalMat);
    rightBarMesh.position.set(1.45, 0, 0);
    crystalGroup.add(rightBarMesh);

    // Faceted Diagonal Prism
    // Create an angled parallelogram cross-section
    const diagShape = new THREE.Shape();
    diagShape.moveTo(-1.2, 1.8);
    diagShape.lineTo(-0.5, 1.8);
    diagShape.lineTo(1.2, -1.8);
    diagShape.lineTo(0.5, -1.8);
    diagShape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: 0.8,
      bevelEnabled: true,
      bevelThickness: 0.18,
      bevelSize: 0.14,
      bevelSegments: 3,
    };

    const diagGeo = new THREE.ExtrudeGeometry(diagShape, extrudeSettings);
    diagGeo.center();
    const diagMesh = new THREE.Mesh(diagGeo, facetCrystalMat);
    diagMesh.position.set(0, 0, 0.05);
    crystalGroup.add(diagMesh);

    // Corner decorative diamond facets
    const jewelGeo = new THREE.OctahedronGeometry(0.24, 0);
    const jewelMat = new THREE.MeshPhysicalMaterial({
      color: 0x7cd0ff,
      emissive: 0x5bb8f5,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8,
    });

    const jewelTop = new THREE.Mesh(jewelGeo, jewelMat);
    jewelTop.position.set(-1.45, 1.9, 0.45);
    crystalGroup.add(jewelTop);

    const jewelBottom = new THREE.Mesh(jewelGeo, jewelMat);
    jewelBottom.position.set(1.45, -1.9, 0.45);
    crystalGroup.add(jewelBottom);

    // Subtle floating orbit rings
    const orbitGeo = new THREE.TorusGeometry(2.8, 0.018, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x5bb8f5,
      transparent: true,
      opacity: 0.35,
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI / 2.6;
    crystalGroup.add(orbitMesh);

    // 5. Visibility observer to pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 6. Animation loop
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const t = time * 0.001;

      // Dynamic specular light motion without layout thrashing
      if (mouseLightRef.current) {
        mouseLightRef.current.position.x = Math.sin(t * 0.8) * 3.5;
        mouseLightRef.current.position.y = Math.cos(t * 0.6) * 3.0;
      }

      // Slow elegant rotation with gentle floating wave
      crystalGroup.rotation.y = t * 0.45;
      crystalGroup.rotation.x = Math.sin(t * 0.5) * 0.12;
      crystalGroup.position.y = Math.sin(t * 1.2) * 0.15;

      // Rotate orbit ring counter
      orbitMesh.rotation.z = -t * 0.3;

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className={`flex items-center justify-center p-8 bg-gradient-to-br from-[#0B1F4D] to-[#1F4FA3] rounded-2xl text-white ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-[#5BB8F5]/20 flex items-center justify-center font-serif text-3xl font-bold text-[#5BB8F5]">
            N
          </div>
          <p className="text-xs uppercase tracking-widest text-[#5BB8F5]">Faceted Brand Emblem</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div ref={containerRef} className="w-full h-full min-h-[340px] flex items-center justify-center" />
      {/* Decorative ambient halo behind the crystal */}
      <div className="absolute inset-0 -z-10 bg-radial from-[#5BB8F5]/20 via-transparent to-transparent pointer-events-none blur-2xl" />
    </div>
  );
};
