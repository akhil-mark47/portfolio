'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { 
  FaPython, 
  FaJava, 
  FaAws, 
  FaGithub,
  FaReact,
  FaGitAlt
} from 'react-icons/fa';
import { TbBrandCSharp, TbBrandCpp } from "react-icons/tb";
import { SiGooglecloud, SiOllama, SiPandas, SiNumpy, SiFlask, SiStreamlit, SiApachehadoop, SiVercel, SiHuggingface, SiSupabase } from 'react-icons/si';
import { FaFlutter } from 'react-icons/fa6';
import { IoLogoJavascript } from 'react-icons/io';
import { DiMysql } from 'react-icons/di';
import { IoLogoFirebase } from 'react-icons/io5';

// Skills grouped by category
const skillsByCategory = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', icon: <FaPython size={32} /> },
      { name: 'Java', icon: <FaJava size={32} /> },
      { name: 'C++', icon: <TbBrandCpp size={32} /> },
      { name: 'C#', icon: <TbBrandCSharp size={32}/> },
      { name: 'JavaScript', icon: <IoLogoJavascript size={32} /> },
      { name: 'SQL', icon: <DiMysql size={32} /> },
    ],
  },
  {
    category: 'Libraries/Frameworks',
    skills: [
      { name: 'Hadoop', icon: <SiApachehadoop size={32} /> },
      { name: 'Flutter', icon: <FaFlutter size={32} /> },
      { name: 'Ollama', icon: <SiOllama size={32} /> },
      { name: 'React', icon: <FaReact size={32} /> },
      { name: 'Git', icon: <FaGitAlt size={32} /> },
      { name: 'Numpy', icon: <SiNumpy size={32} /> },
      { name: 'Pandas', icon: <SiPandas size={32} /> },
      { name: 'Flask', icon: <SiFlask size={32} /> },
      { name: 'CrewAi', icon: <Image src="/assets/icons/crewai.png" alt="CrewAi" width={32} height={38} /> },
    ],
  },
  {
    category: 'Platforms',
    skills: [
      { name: 'Github', icon: <FaGithub size={32} /> },
      { name: 'Supabase', icon: <SiSupabase size={32} /> },
      { name: 'Streamlit', icon: <SiStreamlit size={32} /> },
      { name: 'Vercel', icon: <SiVercel size={32} /> },
      { name: 'Firebase', icon: <IoLogoFirebase size={32} /> },
      { name: 'Huggingface', icon: <SiHuggingface size={32}/> },
      { name: 'AWS', icon: <FaAws size={32} /> },
      { name: 'GCP', icon: <SiGooglecloud size={32} /> },
    ],
  },
];

const SkillCylinder: React.FC<{ 
  skills: { name: string; icon: JSX.Element | null }[]; 
  isHovered: boolean; 
  mouseX: number; 
  xOffset: number; 
  yOffset: number;
  screenWidth: number;
}> = ({ skills, isHovered, mouseX, xOffset, yOffset, screenWidth }) => {
  // Adjust radius based on screen size
  const radius = screenWidth < 1024 ? 1.5 : screenWidth < 1440 ? 1.8 : 2.0;
  const angleStep = (2 * Math.PI) / skills.length;
  const groupRef = useRef<THREE.Group>(null);

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

  // Adjust icon and text size based on screen width
  const getIconSize = () => {
    if (screenWidth < 1024) return "scale-75";
    if (screenWidth < 1440) return "scale-90";
    return "";
  };

  return (
    <group ref={groupRef} position={[xOffset, yOffset, 0]}>
      {skills.map((skill, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        return (
          <mesh key={skill.name} position={[x, 0, z]}>
            <Html center>
              <div className={`flex flex-col items-center text-[var(--starry-white)] ${getIconSize()}`}>
                {skill.icon || <span className="text-lg font-[JetBrains Mono]">{skill.name}</span>}
                <span className="text-xs font-[JetBrains Mono] mt-1 whitespace-nowrap">{skill.name}</span>
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
  const [screenWidth, setScreenWidth] = useState(1440);
  
  // Track screen width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    // Set initial value
    setScreenWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isHovered) {
      const canvasWidth = (event.currentTarget as HTMLCanvasElement).clientWidth;
      const mouseNormalized = (event.clientX / canvasWidth) * 2 - 1;
      setMouseX(mouseNormalized);
    }
  };

  // Calculate responsive positions and dimensions
  const getCanvasHeight = () => {
    if (screenWidth < 768) return '400px';
    if (screenWidth < 1024) return '500px';
    if (screenWidth < 1440) return '550px';
    return '600px';
  };

  // Adjust cylinder positions based on screen size
  const topGroupsY = screenWidth < 1024 ? 1.2 : 1.5;
  const bottomGroupY = screenWidth < 1024 ? -1.6 : -2;
  const leftGroupX = screenWidth < 1024 ? -2.5 : -3;
  const rightGroupX = screenWidth < 1024 ? 2.5 : 3;
  
  return (
    <div className="w-full flex justify-center items-center">
      <Canvas
        className="w-full lg:w-[85vw] xl:w-[80vw] max-w-6xl mx-auto"
        style={{ height: getCanvasHeight() }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMouseX(0);
        }}
        onMouseMove={handleMouseMove}
        dpr={[1, 2]} // Optimize rendering for different device pixel ratios
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Left top group - Programming Languages */}
        <group position={[leftGroupX, topGroupsY, 0]}>
          <SkillCylinder
            skills={skillsByCategory[0].skills}
            isHovered={isHovered}
            mouseX={mouseX}
            xOffset={0}
            yOffset={0}
            screenWidth={screenWidth}
          />
          <mesh position={[0, 2, 0]}>
            <Html center>
              <span className="text-sm md:text-base lg:text-lg font-[JetBrains Mono] text-gray-400 whitespace-nowrap">
                {skillsByCategory[0].category}
              </span>
            </Html>
          </mesh>
        </group>
        
        {/* Right top group - Libraries/Frameworks */}
        <group position={[rightGroupX, topGroupsY, 0]}>
          <SkillCylinder
            skills={skillsByCategory[1].skills}
            isHovered={isHovered}
            mouseX={mouseX}
            xOffset={0}
            yOffset={0}
            screenWidth={screenWidth}
          />
          <mesh position={[0, 2, 0]}>
            <Html center>
              <span className="text-sm md:text-base lg:text-lg font-[JetBrains Mono] text-gray-400 whitespace-nowrap">
                {skillsByCategory[1].category}
              </span>
            </Html>
          </mesh>
        </group>
        
        {/* Bottom center group - Platforms */}
        <group position={[0, bottomGroupY, 0]}>
          <SkillCylinder
            skills={skillsByCategory[2].skills}
            isHovered={isHovered}
            mouseX={mouseX}
            xOffset={0}
            yOffset={0}
            screenWidth={screenWidth}
          />
          <mesh position={[0, 2, 0]}>
            <Html center>
              <span className="text-sm md:text-base lg:text-lg font-[JetBrains Mono] text-gray-400 whitespace-nowrap">
                {skillsByCategory[2].category}
              </span>
            </Html>
          </mesh>
        </group>
      </Canvas>
    </div>
  );
};

export default SkillsRing;