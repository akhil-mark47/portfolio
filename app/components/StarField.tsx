
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  
  const particlesCount = 5000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;      // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;  // z
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0002;
      starsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-dark to-dark">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
}

// 'use client';

// import { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const Stars: React.FC = () => {
//   const starsRef = useRef<THREE.Points>(null);
//   const starCount = 1000;
//   const positions = new Float32Array(starCount * 3);
//   const sizes = new Float32Array(starCount);

//   for (let i = 0; i < starCount; i++) {
//     positions[i * 3] = (Math.random() - 0.5) * 200;     // X
//     positions[i * 3 + 1] = (Math.random() - 0.5) * 200; // Y
//     positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // Z
//     sizes[i] = Math.random() * 0.2 + 0.1;               // Random size
//   }

//   useFrame(() => {
//     if (starsRef.current) {
//       starsRef.current.position.z += 0.05; // Slow movement towards viewer
//       if (starsRef.current.position.z > 50) starsRef.current.position.z = -50; // Reset
//     }
//   });

//   return (
//     <points ref={starsRef}>
//       <bufferGeometry>
//         <bufferAttribute attach="attributes-position" count={starCount} array={positions} itemSize={3} />
//         <bufferAttribute attach="attributes-size" count={starCount} array={sizes} itemSize={1} />
//       </bufferGeometry>
//       <pointsMaterial color="#E6E6FA" sizeAttenuation transparent opacity={0.8} />
//     </points>
//   );
// };

// const StarField: React.FC = () => {
//   return (
//     <Canvas className="absolute inset-0">
//       <Stars />
//     </Canvas>
//   );
// };

// export default StarField;