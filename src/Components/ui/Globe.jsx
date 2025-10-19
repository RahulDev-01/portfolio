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
      
      // Enhanced points for better visibility
      globe
        .pointsData(data)
        .pointColor(() => '#88ffff')
        .pointAltitude(0.08)
        .pointRadius(3)
        .pointsMerge(true);
      
      // Brighter and more visible rings
      globe
        .ringsData(data)
        .ringColor(() => '#00ffff')
        .ringMaxRadius(4.0)
        .ringPropagationSpeed(2.5)
        .ringRepeatPeriod(700)
        .ringResolution(32);
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
        // Brighter base color and stronger emissive
        globeMaterial.color = new THREE.Color(0x1a3a5f);
        globeMaterial.emissive = new THREE.Color(0x003366);
        globeMaterial.emissiveIntensity = 0.6;
        // Adjust material properties for better light reflection
        if ('metalness' in globeMaterial) globeMaterial.metalness = 0.1;
        if ('roughness' in globeMaterial) globeMaterial.roughness = 0.8;
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
        {/* Enhanced lighting for brighter globe */}
        <ambientLight intensity={1.0} />
        <directionalLight position={[-8, 5, 8]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[8, -5, -8]} intensity={0.8} color="#e0f7ff" />
        <pointLight position={[15, 15, 15]} intensity={5} color="#a0e8ff" distance={1000} />
        <pointLight position={[-15, -15, 15]} intensity={4} color="#3b82f6" distance={1000} />
        <pointLight position={[0, 0, 20]} intensity={6} color="#66ffff" distance={1000} />
        <pointLight position={[10, 10, 10]} intensity={8} color="#00ffff" distance={1000} />
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
