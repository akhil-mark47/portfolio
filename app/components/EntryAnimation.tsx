'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import React from 'react';

interface EntryAnimationProps {
 onComplete: () => void;
}

const HyperSpaceMeteors: React.FC<{ cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null> }> = ({ cameraRef }) => {
 const groupRef = useRef<THREE.Group>(null);
 const isMobile = typeof window !== 'undefined' && window.innerWidth < 768; // Mobile check
 const meteorCount = isMobile ? 75 : 150; // Fewer meteors on mobile

 const meteorsRef = useRef<{
 mesh: THREE.Mesh;
 velocity: THREE.Vector3;
 trail: THREE.Line;
 trailGeometry: THREE.BufferGeometry;
 material: THREE.MeshBasicMaterial;
 trailMaterial: THREE.LineBasicMaterial;
 }[]>([]);
 const meteors = meteorsRef.current;

 useFrame((state, delta) => {
 const time = state.clock.getElapsedTime();
 const speedFactor = time < 2 ? 0.3 : time < 5 ? 0.8 + (time - 2) * 0.4 : 2.0;
 meteors.forEach((meteor) => {
 meteor.mesh.position.addScaledVector(meteor.velocity, speedFactor * delta * 5);

 const positions = meteor.trailGeometry.attributes.position.array as Float32Array;
 positions[0] = meteor.mesh.position.x;
 positions[1] = meteor.mesh.position.y;
 positions[2] = meteor.mesh.position.z;
 positions[3] = meteor.mesh.position.x - meteor.velocity.x * 3;
 positions[4] = meteor.mesh.position.y - meteor.velocity.y * 3;
 positions[5] = meteor.mesh.position.z - meteor.velocity.z * 3;
 meteor.trailGeometry.attributes.position.needsUpdate = true;

 if (time > 7.8) {
 const fadeProgress = (time - 7.8) / 0.2;
 meteor.material.opacity = Math.max(0, 1 - fadeProgress);
 meteor.trailMaterial.opacity = Math.max(0, 0.7 - fadeProgress * 0.7);
 }

 if (meteor.mesh.position.z > 15) {
 meteor.mesh.position.set(
 (Math.random() - 0.5) * (isMobile ? 60 : 100), // Narrower spread on mobile
 (Math.random() - 0.5) * (isMobile ? 40 : 60),
 -50 - Math.random() * 20
 );
 meteor.velocity.set(
 (Math.random() - 0.5) * 0.2,
 (Math.random() - 0.5) * 0.2,
 0.6 + Math.random() * 0.6
 );
 meteor.material.opacity = 1;
 meteor.trailMaterial.opacity = 0.7;
 }
 });

 if (time > 5 && time < 8 && cameraRef.current) {
 cameraRef.current.position.x = Math.sin(time * 10) * 0.15;
 cameraRef.current.position.y = Math.cos(time * 10) * 0.15;
 }

 if (time > 7.5 && cameraRef.current) {
 cameraRef.current.position.z -= delta * 25;
 cameraRef.current.fov = Math.max(10, cameraRef.current.fov - delta * 60);
 cameraRef.current.updateProjectionMatrix();
 }

 if (groupRef.current) {
 groupRef.current.rotation.z = Math.sin(time * 0.05) * 0.05;
 }
 });

 useEffect(() => {
 if (!groupRef.current) return;

 for (let i = 0; i < meteorCount; i++) {
 const geometry = new THREE.ConeGeometry(0.1, 0.5, 8);
 const material = new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 1 });
 const mesh = new THREE.Mesh(geometry, material);
 mesh.rotation.x = Math.PI / 2;
 mesh.position.set(
 (Math.random() - 0.5) * (isMobile ? 60 : 100),
 (Math.random() - 0.5) * (isMobile ? 40 : 60),
 -50 - Math.random() * 20
 );
 const velocity = new THREE.Vector3(
 (Math.random() - 0.5) * 0.2,
 (Math.random() - 0.5) * 0.2,
 0.6 + Math.random() * 0.6
 );

 const trailGeometry = new THREE.BufferGeometry();
 const trailPositions = new Float32Array(6);
 trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
 const trailMaterial = new THREE.LineBasicMaterial({ color: '#00E0FF', transparent: true, opacity: 0.7 });
 const trail = new THREE.Line(trailGeometry, trailMaterial);

 groupRef.current.add(mesh, trail);
 meteors.push({ mesh, velocity, trail, trailGeometry, material, trailMaterial });
 }
 }, [isMobile, meteorCount, meteors]);

 return <group ref={groupRef} />;
};

const TypewriterText: React.FC = () => {
 const text = "Welcome To Ak's Galaxy";
 const [displayedText, setDisplayedText] = React.useState('');

 useEffect(() => {
 setDisplayedText('');
 const startDelay = 2000;
 let i = 0;
 const interval = setInterval(() => {
 if (i < text.length) {
 setDisplayedText(text.slice(0, i + 1));
 i++;
 } else {
 clearInterval(interval);
 }
 }, 100);
 const timeout = setTimeout(() => {}, startDelay);
 return () => {
 clearInterval(interval);
 clearTimeout(timeout);
 };
 }, []);

 return (
 <motion.h1
 className="absolute inset-0 flex items-center justify-center text-xl md:text-3xl font-bold text-[var(--starry-white)] font-[JetBrains Mono]"
 initial={{ opacity: 0, scale: 1 }}
 animate={{
 opacity: [0, 1, 1, 0],
 scale: [1, 1, 1.5, 6],
 }}
 transition={{
 opacity: { times: [0, 0.25, 0.975, 1], duration: 8 },
 scale: { times: [0, 0.25, 0.625, 1], duration: 8 },
 }}
 >
 {displayedText}
 {displayedText.length < text.length && (
 <motion.span
 className="animate-blink"
 animate={{ opacity: [1, 0, 1] }}
 transition={{ duration: 0.7, repeat: Infinity }}
 >
 |
 </motion.span>
 )}
 </motion.h1>
 );
};

const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete }) => {
 const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
 const isMobile = typeof window !== 'undefined' && window.innerWidth < 768; // Mobile check

 useEffect(() => {
 setTimeout(onComplete, 8000);
 }, [onComplete]);

 return (
 <motion.div
 className="fixed inset-0 bg-[var(--space-black)] z-50"
 initial={{ opacity: 1 }}
 animate={{ opacity: 0 }}
 transition={{ duration: 0.2, delay: 7.8 }}
 >
 <Canvas
 camera={{ position: [0, 0, 5], fov: isMobile ? 90 : 75 }} // Wider FOV on mobile
 className="absolute inset-0"
 onCreated={({ camera }) => (cameraRef.current = camera as THREE.PerspectiveCamera)}
 >
 <ambientLight intensity={0.2} />
 <HyperSpaceMeteors cameraRef={cameraRef} />
 </Canvas>
 <TypewriterText />
 </motion.div>
 );
};

export default EntryAnimation;