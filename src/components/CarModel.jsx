import React, { useRef, Suspense, useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';

const Model = ({ url, scale, position, color }) => {
  const isObj = url.toLowerCase().endsWith('.obj');
  
  // Use the appropriate loader based on file extension
  const loadedObject = isObj 
    ? useLoader(OBJLoader, url) 
    : useGLTF(url).scene;
  
  // Create a copy to avoid mutating cached objects
  const scene = useMemo(() => loadedObject.clone(), [loadedObject]);
  
  // Apply changes to the model
  scene.traverse((node) => {
    if (node.isMesh && node.material) {
      // Clone material to avoid affecting other instances
      node.material = node.material.clone();
      
      const name = node.name.toLowerCase();
      const matName = node.material.name.toLowerCase();
      
      // Paint detection
      if (name.includes('body') || name.includes('paint') || name.includes('car_shell') || matName.includes('body') || matName.includes('paint')) {
        node.material.color.set(new THREE.Color(color));
      }
      
      node.material.metalness = 0.8;
      node.material.roughness = 0.2;
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return <primitive object={scene} scale={scale} position={position} />;
};

const CarModel = ({ color = '#ff3333', type = 'mustang' }) => {
  const carRef = useRef();

  useFrame((state, delta) => {
    if (carRef.current) {
      carRef.current.rotation.y += delta * 0.1;
    }
  });

  const modelConfig = {
    mustang: {
      url: "/assets/mustang/mustang.glb",
      scale: 0.027, // Increased from 0.018
      position: [0, 0, 0],
      label: "Mustang"
    },
    mclaren: {
      url: "/assets/mclaren/mclaren.obj",
      scale: 0.0022, // Increased from 0.0015
      position: [0, 0, 0],
      label: "McLaren Senna"
    },
    "992": {
      url: "/assets/911/992.glb",
      scale: 2.7, // Increased from 1.8
      position: [0, 0, 0],
      label: "Porsche 911 (992)"
    },
    "720s": {
      url: "/assets/mclaren/720s.glb",
      scale: 3.0, // Increased from 2.0
      position: [0, 0, 0],
      label: "McLaren"
    },
    "mustang_gt": {
      url: "/assets/mustang/Mustang_GT.glb",
      scale: 20.0, // Increased from 5.0
      position: [0, 0, 0],
      label: "Mustang GT"
    },
    "porsche_gt": {
      url: "/assets/911/Porsche_GT3S.glb",
      scale: 20.0, // Increased from 5.0
      position: [0, 0, 0],
      label: "Porsche GT"
    }
  };

  const config = modelConfig[type] || modelConfig.mustang;

  // Final safety: if the URL is missing or likely to 404 based on my file check
  const finalUrl = (type === 'mclaren' && config.url.endsWith('.glb')) ? modelConfig.mustang.url : config.url;

  return (
    <group ref={carRef}>
      <Suspense fallback={<Html center><div className="loading-tag">Loading {config.label}...</div></Html>}>
        <Model 
          url={finalUrl} 
          scale={config.scale} 
          position={config.position} 
          color={color} 
        />
      </Suspense>
    </group>
  );
};

export default CarModel;
