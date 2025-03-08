'use client';

import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Portal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = state.clock.getElapsedTime() * -0.2;
      glowRef.current.rotation.y = state.clock.getElapsedTime() * -0.1;
    }
  });

  return (
    <>
      {/* Glow effect */}
      <mesh ref={glowRef} scale={[1.2, 1.2, 1.2]}>
        <torusGeometry args={[3, 0.4, 32, 100]} />
        <meshBasicMaterial
          color="#4D00F7"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Main portal */}
      <mesh ref={meshRef}>
        <torusGeometry args={[3, 0.5, 32, 100]} />
        <MeshDistortMaterial
          color="#2D00F7"
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </>
  );
}

export default function PortalScene() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Portal />
      </Canvas>
    </div>
  );
}