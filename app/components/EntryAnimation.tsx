'use client';

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EntryAnimationProps {
  onComplete: () => void;
}

const CosmicParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 5000;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;     // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // Z
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00E0FF" // Matches --primary-gradient-to
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    const sound = new Howl({
      src: ['/assets/sounds/cosmic-entry.mp3'],
      volume: 0.5,
    });
    sound.play();
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Canvas className="absolute inset-0">
      <ambientLight intensity={0.5} />
      <CosmicParticles />
    </Canvas>
  );
};

export default EntryAnimation;