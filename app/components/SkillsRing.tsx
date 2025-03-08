'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { 
  FaPython, 
  FaJava, 
  FaAws, 
  FaDatabase, 
  FaFlask, 
  FaGithub,
  FaReact,
  FaGitAlt
} from 'react-icons/fa';
import { TbBrandCSharp, TbBrandCpp } from "react-icons/tb";
import { SiPytorch, SiTensorflow, SiGooglecloud, SiOllama, SiPandas, SiNumpy, SiFlask, SiStreamlit, SiApachehadoop, SiVercel, SiHuggingface } from 'react-icons/si';
import { FaC, FaFlutter } from 'react-icons/fa6';
import { IoLogoJavascript } from 'react-icons/io';
import { DiMysql } from 'react-icons/di';
import { IoLogoFirebase } from 'react-icons/io5';

// Skills grouped by category
const skillsByCategory = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', icon: <FaPython size={40} /> },
      { name: 'Java', icon: <FaJava size={40} /> },
      { name: 'C++', icon: <TbBrandCpp size={40} /> },
      { name: 'C#', icon: <TbBrandCSharp size={40}/> },
      { name: 'JavaScript', icon: <IoLogoJavascript size = {40} /> },
      { name: 'SQL', icon: <DiMysql  size={40} /> },
    ],
  },
  {
    category: 'Libraries/Frameworks',
    skills: [
      { name: 'Hadoop', icon: <SiApachehadoop size={40} /> },
      { name: 'Flutter', icon: <FaFlutter  size={40} /> },
      { name: 'Ollama', icon: <SiOllama size={40} /> },
      { name: 'React', icon: <FaReact size={40} /> },
      { name: 'Git', icon: <FaGitAlt  size={40} /> },
      { name: 'Numpy', icon: <SiNumpy size={40} /> },
      { name: 'Pandas', icon: <SiPandas size={40} /> },
      { name: 'Flask', icon: <SiFlask size={40} /> },
      { name: 'CrewAi', icon: <img src="/assets/icons/crewai.png" alt="CrewAi" className="w-10 h-12" /> },
    ],
  },
  {
    category: 'Platforms',
    skills: [
      { name: 'Github', icon: <FaGithub size={40} /> },
      { name: 'Streamlit', icon: <SiStreamlit size={40} /> },
      { name: 'Vercel', icon: <SiVercel size={40} /> },
      { name: 'Firbase', icon: <IoLogoFirebase  size={40} /> },
      { name: 'Huggingface', icon: <SiHuggingface size={40}/>},
      { name: 'AWS', icon: <FaAws size={40} /> },
      { name: 'GCP', icon: <SiGooglecloud size={40} /> },
    ],
  },
];

const SkillCylinder: React.FC<{ skills: { name: string; icon: JSX.Element | null }[]; isHovered: boolean; mouseX: number; xOffset: number; yOffset: number }> = ({ skills, isHovered, mouseX, xOffset, yOffset }) => {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2.0; // Cylinder radius
  const angleStep = (2 * Math.PI) / skills.length;

  useFrame(() => {
    if (groupRef.current) {
      if (!isHovered) {
        groupRef.current.rotation.y += 0.01;
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          -mouseX * Math.PI,
          0.1
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[xOffset, yOffset, 0]}>
      {skills.map((skill, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        return (
          <mesh key={skill.name} position={[x, 0, z]}>
            <Html center>
              <div className="flex flex-col items-center text-[var(--starry-white)]">
                {skill.icon || <span className="text-lg font-[JetBrains Mono]">{skill.name}</span>}
                <span className="text-sm font-[JetBrains Mono] mt-1">{skill.name}</span>
              </div>
            </Html>
          </mesh>
        );
      })}
    </group>
  );
};

const SkillsRing: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isHovered) {
      const canvasWidth = (event.currentTarget as HTMLCanvasElement).clientWidth;
      const mouseNormalized = (event.clientX / canvasWidth) * 2 - 1;
      setMouseX(mouseNormalized);
    }
  };

  return (
    <Canvas
      className="w-[80vw] mx-auto"
      style={{ height: '600px' }} // Adjusted height for layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouseX(0);
      }}
      onMouseMove={handleMouseMove}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {/* Two cylinders at the top */}
      <group position={[-3, 1.5, 0]}> {/* Left top */}
        <SkillCylinder
          skills={skillsByCategory[0].skills} // Programming
          isHovered={isHovered}
          mouseX={mouseX}
          xOffset={0}
          yOffset={0}
        />
        <mesh position={[0, 2, 0]}>
          <Html center>
            <span className="text-lg font-[JetBrains Mono] text-gray-40 whitespace-nowrap">
              {skillsByCategory[0].category}
            </span>
          </Html>
        </mesh>
      </group>
      <group position={[3, 1.5, 0]}> {/* Right top */}
        <SkillCylinder
          skills={skillsByCategory[1].skills} // ML Frameworks
          isHovered={isHovered}
          mouseX={mouseX}
          xOffset={0}
          yOffset={0}
        />
        <mesh position={[0, 2, 0]}>
          <Html center>
            <span className="text-lg font-[JetBrains Mono] text-gray-400 whitespace-nowrap">
              {skillsByCategory[1].category}
            </span>
          </Html>
        </mesh>
      </group>
      {/* One cylinder below */}
      <group position={[0, -2, 0]}> {/* Center bottom */}
        <SkillCylinder
          skills={skillsByCategory[2].skills} // Web & Cloud
          isHovered={isHovered}
          mouseX={mouseX}
          xOffset={0}
          yOffset={0}
        />
        <mesh position={[0, 2, 0]}>
          <Html center>
            <span className="text-lg font-[JetBrains Mono] text-gray-400 whitespace-nowrap">
              {skillsByCategory[2].category}
            </span>
          </Html>
        </mesh>
      </group>
    </Canvas>
  );
};

export default SkillsRing;