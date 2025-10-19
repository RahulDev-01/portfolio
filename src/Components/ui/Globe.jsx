"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Globe from "three-globe";

function GlobeScene({ data, globeConfig }) {
  const globeRef = useRef();
  const { scene, camera } = useThree();

  useEffect(() => {
    // Create the globe instance
    const globe = new Globe()
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png");

    // Add hex polygons for dotted pattern like the image
    fetch('./data/globe.json')
      .then(res => res.json())
      .then(countries => {
        globe
          .hexPolygonsData(countries.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.7)
          .hexPolygonColor(() => `rgba(${Math.floor(Math.random() * 128) + 128}, ${Math.floor(Math.random() * 128) + 128}, ${Math.floor(Math.random() * 128) + 128}, ${Math.random() * 0.4 + 0.3})`)
          .hexPolygonAltitude(0.01);
      })
      .catch(err => console.log('Error loading globe data:', err));

    // Add arcs data for animated lines
    if (data && data.length > 0) {
      globe
        .arcsData(data)
        .arcColor('color')
        .arcDashLength(0.9)
        .arcDashGap(0.4)
        .arcDashInitialGap(() => Math.random() * 5)
        .arcDashAnimateTime(3000)
        .arcStroke(0.5)
        .arcsTransitionDuration(1000);
      
      // Add points data for the cyan glowing circles - make them larger/brighter so cities are visible
      globe
        .pointsData(data)
        .pointColor(() => '#aaffff')
        .pointAltitude(0.08)
        .pointRadius(6) // larger radius for visibility
        .pointsMerge(false);
      
      // Add rings around cities for intense glow effect
      globe
        .ringsData(data)
        .ringColor(() => '#66ffff')
        .ringMaxRadius(6)
        .ringPropagationSpeed(1.6)
        .ringRepeatPeriod(600);
    }

    // Configure atmosphere
    globe
      .showAtmosphere(true)
      .atmosphereColor("#ffffff")
      .atmosphereAltitude(0.25);

    // Add custom material for dark blue gradient
    // Tweak globe material for more visible city highlights
    setTimeout(() => {
      const globeMaterial = globe.globeMaterial();
      if (globeMaterial) {
        globeMaterial.color = new THREE.Color(0x071427);
        globeMaterial.emissive = new THREE.Color(0x00334d);
        globeMaterial.emissiveIntensity = 1.0; // stronger emissive to make highlights pop
        if ('metalness' in globeMaterial) globeMaterial.metalness = 0.2;
        if ('roughness' in globeMaterial) globeMaterial.roughness = 0.6;
        if ('shininess' in globeMaterial) globeMaterial.shininess = 20;
      }
    }, 100);

    // Position the globe
    globe.rotateY(-Math.PI * (5 / 9));
    globe.rotateZ(-Math.PI / 6);
    
    // Add to scene
    scene.add(globe);
    globeRef.current = globe;

    // Position camera
    camera.position.z = 300;

    // Cleanup
    return () => {
      if (globeRef.current) {
        scene.remove(globeRef.current);
        globeRef.current = null;
      }
    };
  }, [scene, camera, data]);

  // Animate rotation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return null;
}

function World({ data, globeConfig }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas 
        camera={{ position: [0, 0, 300], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
  <ambientLight intensity={0.9} />
  <directionalLight position={[-8, 5, 8]} intensity={0.9} />
  <pointLight position={[10, 10, 10]} intensity={4} color="#9fffff" />
  <pointLight position={[-10, -10, -10]} intensity={2.5} color="#5aa6ff" />
  <pointLight position={[0, 0, 10]} intensity={3.5} color="#66ffff" />
  <pointLight position={[5, 5, 5]} intensity={3.5} color="#00ffff" />
  <pointLight position={[-5, 0, 5]} intensity={2.5} color="#00d9ff" />
        <GlobeScene data={data} globeConfig={globeConfig} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          minDistance={200}
          maxDistance={500}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

export { World };
