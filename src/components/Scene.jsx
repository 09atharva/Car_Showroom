import React, { Suspense } from 'react';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import CarModel from './CarModel';

const Scene = ({ carColor, selectedCar }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[5, 10, 5]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
      />
      <pointLight position={[-10, 10, -10]} intensity={1} color="#33ccff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff33cc" />

      <Suspense fallback={null}>
        {/* Only show environment when loaded */}
        <Environment preset="city" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={[0, -0.2, 0]}>
            <CarModel color={carColor} type={selectedCar} />
          </group>
        </Float>
        
        <ContactShadows 
          resolution={1024} 
          scale={15} 
          blur={1.5} 
          opacity={0.65} 
          far={10} 
          color="#000000" 
        />
      </Suspense>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.1} 
          metalness={0.8}
        />
      </mesh>

      <gridHelper 
        args={[100, 100, '#333', '#111']} 
        position={[0, -0.59, 0]} 
      />
    </>
  );
};

export default Scene;
