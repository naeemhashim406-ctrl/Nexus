import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FlightRoute {
  from: [number, number]; // [lat, lng]
  to: [number, number];
  name: string;
}

interface ThreeGlobeProps {
  selectedLocation?: { lat: number; lng: number; name?: string } | null;
  interactive?: boolean;
  size?: 'hero' | 'destination' | 'compact';
  autoRotateSpeed?: number;
  className?: string;
}

// Convert geographic coordinates (latitude, longitude) to 3D Cartesian Vector3
function latLngToVector(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Global flight routes connecting major international hubs
const ROUTES: FlightRoute[] = [
  { from: [25.2048, 55.2708], to: [51.5074, -0.1278], name: 'Dubai -> London' },
  { from: [51.5074, -0.1278], to: [40.7128, -74.006], name: 'London -> New York' },
  { from: [25.2048, 55.2708], to: [43.6532, -79.3832], name: 'Dubai -> Toronto' },
  { from: [41.0082, 28.9784], to: [48.8566, 2.3522], name: 'Istanbul -> Paris' },
  { from: [25.2048, 55.2708], to: [3.139, 101.6869], name: 'Dubai -> Kuala Lumpur' },
  { from: [3.139, 101.6869], to: [-33.8688, 151.2093], name: 'Kuala Lumpur -> Sydney' },
  { from: [51.5074, -0.1278], to: [35.6762, 139.6503], name: 'London -> Tokyo' },
  { from: [25.2048, 55.2708], to: [31.5204, 74.3587], name: 'Dubai -> Lahore' },
  { from: [31.5204, 74.3587], to: [21.4858, 39.1925], name: 'Lahore -> Jeddah (Hajj & Umrah)' },
  { from: [40.7128, -74.006], to: [41.0082, 28.9784], name: 'New York -> Istanbul' },
];

/**
 * Procedural Earth Texture Generator
 * Generates an instant high-quality realistic Earth texture with oceans,
 * continents, terrain shading, polar ice caps, and country borders.
 * This displays instantaneously while the satellite photo texture loads.
 */
function createProceduralEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // 1. Deep Ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#0c2340');
  oceanGrad.addColorStop(0.5, '#0e2e5c');
  oceanGrad.addColorStop(1, '#0c2340');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Helper to map lat/lng to canvas pixels
  const toX = (lng: number) => ((lng + 180) / 360) * canvas.width;
  const toY = (lat: number) => ((90 - lat) / 180) * canvas.height;

  // Draw a polygon continent
  const drawLandmass = (coords: [number, number][], fillStyle: string) => {
    if (coords.length < 3) return;
    ctx.beginPath();
    ctx.moveTo(toX(coords[0][1]), toY(coords[0][0]));
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(toX(coords[i][1]), toY(coords[i][0]));
    }
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();

    // Coastline highlight
    ctx.strokeStyle = 'rgba(91, 184, 245, 0.45)';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Realistic continent contours [lat, lng]
  // Eurasia & North Africa & Middle East
  drawLandmass([
    [70, 30], [68, 60], [72, 110], [70, 160], [60, 170], [45, 140],
    [35, 120], [20, 110], [10, 100], [8, 80], [22, 70], [25, 60],
    [15, 45], [12, 44], [30, 32], [32, -5], [45, -9], [55, 5],
    [60, 10], [70, 30]
  ], '#2c5836');

  // Africa
  drawLandmass([
    [35, -5], [37, 10], [30, 32], [12, 44], [10, 50], [-5, 40],
    [-25, 33], [-34, 18], [-33, 26], [-10, 14], [4, 9], [6, 2],
    [5, -4], [15, -17], [25, -15], [35, -5]
  ], '#7d7045');

  // North America
  drawLandmass([
    [70, -160], [72, -130], [68, -85], [58, -60], [45, -65], [35, -75],
    [25, -80], [22, -97], [15, -90], [8, -78], [15, -95], [25, -110],
    [32, -117], [48, -125], [60, -145], [70, -160]
  ], '#355c3c');

  // South America
  drawLandmass([
    [12, -75], [10, -62], [4, -50], [-5, -35], [-22, -40], [-35, -55],
    [-54, -68], [-52, -74], [-40, -73], [-20, -70], [-5, -80], [4, -77],
    [12, -75]
  ], '#295433');

  // Australia
  drawLandmass([
    [-12, 130], [-15, 136], [-12, 142], [-22, 150], [-32, 152],
    [-38, 145], [-35, 117], [-22, 114], [-16, 122], [-12, 130]
  ], '#8d6e42');

  // Greenland
  drawLandmass([
    [82, -35], [70, -20], [60, -45], [70, -55], [78, -68], [82, -35]
  ], '#dff0fa');

  // Antarctica polar ice cap
  drawLandmass([
    [-65, -180], [-68, -120], [-64, -60], [-72, 0], [-66, 60],
    [-65, 120], [-68, 180], [-90, 180], [-90, -180], [-65, -180]
  ], '#eef8ff');

  // North polar cap
  ctx.fillStyle = 'rgba(235, 246, 255, 0.75)';
  ctx.fillRect(0, 0, canvas.width, toY(75));

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Procedural Clouds Texture Generator
 */
function createProceduralCloudsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft atmospheric cloud bands
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 25 + Math.random() * 60;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 2.2, radius * 0.7, Math.random() * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export const ThreeGlobe: React.FC<ThreeGlobeProps> = ({
  selectedLocation,
  interactive = true,
  size = 'hero',
  autoRotateSpeed = 0.0018,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [activeCountryName, setActiveCountryName] = useState<string>('');

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cloudMeshRef = useRef<THREE.Mesh | null>(null);
  const pinMarkerRef = useRef<THREE.Group | null>(null);
  const planeMeshesRef = useRef<{ mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Target rotation for smooth interpolation
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.22, y: -0.8 });
  const isDraggingRef = useRef<boolean>(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update target coordinates when selectedLocation changes
  useEffect(() => {
    if (!selectedLocation || !globeGroupRef.current) return;

    setActiveCountryName(selectedLocation.name || '');

    // Convert lat/lng to sphere angles
    const phi = (selectedLocation.lat * Math.PI) / 180;
    const theta = ((selectedLocation.lng + 90) * Math.PI) / 180;

    // Set target rotation so that this point faces the camera (+Z)
    targetRotationRef.current = {
      x: phi * 0.75,
      y: -theta,
    };

    // Position the glowing 3D pin marker
    if (pinMarkerRef.current) {
      const radius = size === 'hero' ? 2.5 : 2.15;
      const pinPos = latLngToVector(selectedLocation.lat, selectedLocation.lng, radius * 1.02);
      pinMarkerRef.current.position.copy(pinPos);
      pinMarkerRef.current.lookAt(pinPos.clone().multiplyScalar(2));
      pinMarkerRef.current.visible = true;
    }
  }, [selectedLocation, size]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
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

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Setup Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Setup Camera with ample breathing room to prevent edge cropping on mobile
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = size === 'hero' ? 7.4 : 6.4;
    cameraRef.current = camera;

    // 3. Setup WebGL Renderer with capped pixel ratio (capped at 1.2 to prevent GPU fillrate lag)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.outline = 'none';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Space / Studio Lighting for Earth
    // Ambient light so the night side remains visible
    const ambientLight = new THREE.AmbientLight(0xddeeff, 0.85);
    scene.add(ambientLight);

    // Primary Sun Keylight shining from top-right
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(7, 5, 8);
    scene.add(sunLight);

    // Secondary soft cool fill from opposite side
    const fillLight = new THREE.DirectionalLight(0x5bb8f5, 1.0);
    fillLight.position.set(-8, -4, -6);
    scene.add(fillLight);

    // 5. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const globeRadius = size === 'hero' ? 2.5 : 2.15;

    // Base Procedural Textures (Instant load, zero flash)
    const proceduralEarth = createProceduralEarthTexture();
    const proceduralClouds = createProceduralCloudsTexture();

    // 6. ACTUAL EARTH MESH
    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: proceduralEarth,
      specular: new THREE.Color(0x5bb8f5),
      shininess: 25,
      bumpScale: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 7. REALISTIC CLOUD LAYER
    const cloudGeo = new THREE.SphereGeometry(globeRadius * 1.015, 64, 64);
    const cloudMat = new THREE.MeshLambertMaterial({
      map: proceduralClouds,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(cloudMesh);
    cloudMeshRef.current = cloudMesh;

    // 8. UPGRADE TEXTURES: Load High-Resolution NASA Satellite Imagery from Fast CDN
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // CDN Satellite Earth Texture
    const earthTextureUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg';
    const fallbackEarthUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg';

    textureLoader.load(
      earthTextureUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        earthMat.map = tex;
        earthMat.needsUpdate = true;
      },
      undefined,
      () => {
        // Fallback if needed
        textureLoader.load(fallbackEarthUrl, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          earthMat.map = tex;
          earthMat.needsUpdate = true;
        });
      }
    );

    // CDN Specular Water Mask (makes oceans reflect light, continents matte)
    const specularUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg';
    textureLoader.load(specularUrl, (tex) => {
      earthMat.specularMap = tex;
      earthMat.specular = new THREE.Color(0x7cd0ff);
      earthMat.shininess = 35;
      earthMat.needsUpdate = true;
    });

    // CDN Realistic High-Res Cloud Mask
    const cloudsUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png';
    textureLoader.load(cloudsUrl, (tex) => {
      cloudMat.map = tex;
      cloudMat.opacity = 0.5;
      cloudMat.needsUpdate = true;
    });

    // 10. Glowing Flight Path Arcs & Traveling Airplane Markers
    const planesList: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[] = [];

    ROUTES.forEach((route, idx) => {
      const vFrom = latLngToVector(route.from[0], route.from[1], globeRadius);
      const vTo = latLngToVector(route.to[0], route.to[1], globeRadius);

      const mid = new THREE.Vector3().addVectors(vFrom, vTo).multiplyScalar(0.5);
      const distance = vFrom.distanceTo(vTo);
      const lift = Math.min(1.2, Math.max(0.35, distance * 0.32));
      mid.normalize().multiplyScalar(globeRadius + lift);

      const curve = new THREE.QuadraticBezierCurve3(vFrom, mid, vTo);
      const points = curve.getPoints(45);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

      // Luminous cyan/gold flight arc
      const arcMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x7cd0ff : 0x5bb8f5,
        transparent: true,
        opacity: 0.65,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Low-poly miniature jet
      const planeGeo = new THREE.ConeGeometry(0.045, 0.12, 4);
      planeGeo.rotateX(Math.PI / 2);
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);

      // Wingtip beacon
      const beaconGeo = new THREE.SphereGeometry(0.032, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0x5bb8f5 });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      planeMesh.add(beacon);

      globeGroup.add(planeMesh);

      planesList.push({
        mesh: planeMesh,
        curve,
        progress: (idx * 0.14) % 1,
        speed: 0.0016 + (idx % 3) * 0.0006,
      });
    });
    planeMeshesRef.current = planesList;

    // 11. Interactive Destination Pin Marker
    const pinGroup = new THREE.Group();
    pinMarkerRef.current = pinGroup;

    // Outer pulsing ring
    const ringGeo = new THREE.RingGeometry(0.08, 0.13, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x5bb8f5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    pinGroup.add(ringMesh);

    // Inner bright center beacon
    const centerPinGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const centerPinMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const centerPin = new THREE.Mesh(centerPinGeo, centerPinMat);
    centerPin.position.z = 0.06;
    pinGroup.add(centerPin);

    // Light beam line reaching outward from surface
    const beamGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.35, 8);
    beamGeo.rotateX(Math.PI / 2);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x5bb8f5, transparent: true, opacity: 0.8 });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.z = 0.18;
    pinGroup.add(beamMesh);

    pinGroup.visible = false;
    globeGroup.add(pinGroup);

    // Initial position orientation
    globeGroup.rotation.x = targetRotationRef.current.x;
    globeGroup.rotation.y = targetRotationRef.current.y;

    // 12. Intersection Observer to pause rendering when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 13. Animation Loop
    let lastTime = performance.now();

    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Auto rotation of Earth when not dragging
      if (!isDraggingRef.current) {
        targetRotationRef.current.y += autoRotateSpeed;
      }

      // Smooth interpolation toward target rotation
      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.y +=
          (targetRotationRef.current.y - globeGroupRef.current.rotation.y) * 0.06;
        globeGroupRef.current.rotation.x +=
          (targetRotationRef.current.x - globeGroupRef.current.rotation.x) * 0.06;
      }

      // Clouds rotate slightly faster to simulate atmospheric wind
      if (cloudMeshRef.current) {
        cloudMeshRef.current.rotation.y += 0.0004;
      }

      // Animate planes along flight arcs
      planeMeshesRef.current.forEach((item) => {
        item.progress = (item.progress + item.speed) % 1;
        const currentPos = item.curve.getPoint(item.progress);
        item.mesh.position.copy(currentPos);

        const lookAheadPoint = item.curve.getPoint(Math.min(item.progress + 0.01, 1));
        item.mesh.lookAt(lookAheadPoint);
      });

      // Pulse the destination pin if visible
      if (pinMarkerRef.current && pinMarkerRef.current.visible) {
        const pulse = 1 + Math.sin(time * 0.006) * 0.22;
        ringMesh.scale.set(pulse, pulse, pulse);
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Resize handler with ResizeObserver
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotateSpeed, size]);

  // Pointer Interaction Handlers for interactive drag & spin
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!interactive) return;
    if (isDraggingRef.current) {
      const deltaX = e.clientX - mousePosRef.current.x;
      const deltaY = e.clientY - mousePosRef.current.y;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x += deltaY * 0.005;
      targetRotationRef.current.x = Math.max(-0.8, Math.min(0.8, targetRotationRef.current.x));

      mousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  if (!webglSupported) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#0B1F4D] to-[#1F4FA3] rounded-full p-8 text-center text-white ${className}`}>
        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-[#5BB8F5] animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#5BB8F5]">Global Network</p>
          <p className="text-sm font-light text-slate-200">Interactive Earth Globe</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseLeave={() => {
        isDraggingRef.current = false;
      }}
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center overflow-visible"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        title={interactive ? 'Drag to rotate Earth' : undefined}
      />

      {/* Floating control badge */}
      {interactive && (
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 max-w-[92vw]">
          <div className="glass-panel px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full flex items-center gap-2 border border-white/60 text-[10px] sm:text-[11px] text-[#0B1F4D] shadow-sm whitespace-nowrap">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#5BB8F5] animate-pulse flex-shrink-0" />
            <span className="font-medium truncate">
              {activeCountryName ? `Target: ${activeCountryName}` : 'Interactive 3D Earth • Drag to rotate'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
