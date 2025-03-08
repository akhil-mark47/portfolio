'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const MoonModel: React.FC = () => {
  const moonRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, '/assets/textures/moon.jpg'); // Add moon texture

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.002; // Slow rotation
    }
  });

  return (
    <mesh ref={moonRef} position={[5, 0, -5]} scale={[2, 2, 2]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Moon: React.FC = () => {
  return (
    <Canvas className="absolute top-0 right-0 w-1/3 h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <MoonModel />
    </Canvas>
  );
};

export default Moon;