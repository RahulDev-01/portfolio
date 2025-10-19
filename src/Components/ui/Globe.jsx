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
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
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
      // Reduce density of arcs and related visuals (very few lines)
      const reducedData = data.filter(() => Math.random() < 0.1).slice(0, 5);
      globe
        .arcsData(reducedData)
        .arcColor(() => ['#b5b5b5', '#e5e5e5'])
        .arcDashLength(0.4)
        .arcDashGap(1.2)
        .arcDashInitialGap(() => Math.random() * 5)
        .arcDashAnimateTime(4500)
        .arcStroke(0.15)
        .arcsTransitionDuration(700);
      
      // Subtle, fewer points
      globe
        .pointsData(reducedData)
        .pointColor(() => '#cccccc')
        .pointAltitude(0.04)
        .pointRadius(1.5)
        .pointsMerge(true);
      
      // Subtle rings
      globe
        .ringsData(reducedData)
        .ringColor(() => '#d0d0d0')
        .ringMaxRadius(2.5)
        .ringPropagationSpeed(1.5)
        .ringRepeatPeriod(1200)
        .ringResolution(24);
    }

    // Configure atmosphere with brighter settings
    globe
      .showAtmosphere(true)
      .atmosphereColor("#ffffff")
      .atmosphereAltitude(0.3);

    // Enhance globe material for brightness
    setTimeout(() => {
      const globeMaterial = globe.globeMaterial();
      if (globeMaterial) {
        // Neutral material to let the texture show natural colors
        globeMaterial.color = new THREE.Color(0xffffff);
        globeMaterial.emissive = new THREE.Color(0x000000);
        globeMaterial.emissiveIntensity = 0.1;
        // Natural material response
        if ('metalness' in globeMaterial) globeMaterial.metalness = 0.0;
        if ('roughness' in globeMaterial) globeMaterial.roughness = 0.9;
        if ('shininess' in globeMaterial) globeMaterial.shininess = 10;
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
  const onPointerDown = (e) => { e.currentTarget.style.cursor = 'grabbing'; };
  const onPointerUp = (e) => { e.currentTarget.style.cursor = 'grab'; };
  const onPointerLeave = (e) => { e.currentTarget.style.cursor = 'grab'; };
  const onPointerOver = (e) => { e.currentTarget.style.cursor = 'grab'; };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas 
        camera={{ position: [0, 0, 300], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', cursor: 'grab' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onPointerOver={onPointerOver}
      >
        {/* Neutral lighting for natural colors */}
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight position={[5, 3, 5]} intensity={1.0} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#ffffff" />
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
