import React from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const Controls = () => {
  return (
    <>
      {/* Dynamic Camera setup */}
      <PerspectiveCamera makeDefault fov={50} position={[0, 2, 5]} />
      
      {/* Standard Orbit Controls for desktop interaction */}
      <OrbitControls 
        enableDamping={true} 
        dampingFactor={0.05} 
        maxPolarAngle={Math.PI / 2.1} 
        minDistance={1} 
        maxDistance={25} 
      />
    </>
  );
};

export default Controls;
