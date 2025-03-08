'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { useRef } from 'react';

const EducationRoadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 0.8]);
  const planetScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.2, 0.9]);
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="relative min-h-[1000px] py-12 overflow-hidden" ref={containerRef}>
      {/* Nebula background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.2)_0%,rgba(59,130,246,0.1)_30%,transparent_70%)] pointer-events-none" />

      {/* Cosmic zigzag orbit path */}
      <motion.div
        className="absolute h-full left-1/2 top-0 w-6 transform -translate-x-1/2 z-0"
        style={{ opacity: pathOpacity }}
      >
        <svg width="100%" height="100%" className="absolute">
          <path
            d="M3,0 
               Q15,50 3,100 
               Q-9,150 3,200 
               Q15,250 3,300 
               Q-9,350 3,400 
               Q15,450 3,500 
               Q-9,550 3,600"
            strokeWidth="4"
            stroke="url(#cosmicGradient)"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="10 10"
            className="glow-path"
          />
          <defs>
            <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Planet 1: B.Tech (Current) */}
      <motion.div
        className="relative flex items-center mb-48"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="w-1/2 pr-32 flex justify-end">
          <div className="relative gradient-border p-8 w-[28rem] rounded-full bg-[rgba(5,5,5,0.9)] hover:scale-110 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] z-10">
            <h3 className="text-2xl font-bold text-gradient">B.Tech CSE (Data Science)</h3>
            <p className="font-[JetBrains Mono] text-gray-300">VNR VJIET | Jul 2024 - Present</p>
            <p className="mt-3 text-gray-400">Specializing in Data Science and AI technologies</p>
          </div>
        </div>
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 z-20"
          style={{ scale: planetScale }}
        >
          <motion.div
            className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="bg-[var(--space-black)] rounded-full p-6 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              <HiAcademicCap size={50} className="text-purple-300" />
            </div>
            <motion.div
              className="absolute inset-0 border-2 border-dashed border-purple-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <div className="absolute -top-12 text-center w-32">
            <span className="text-sm font-[JetBrains Mono] text-gray-300 bg-[rgba(5,5,5,0.7)] px-2 py-1 rounded">PRESENT</span>
          </div>
        </motion.div>
        <div className="w-1/2 pl-32" />
      </motion.div>

      {/* Planet 2: Diploma */}
      <motion.div
        className="relative flex items-center mb-48"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="w-1/2 pr-32" />
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 z-20"
          style={{ scale: planetScale }}
        >
          <motion.div
            className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <div className="bg-[var(--space-black)] rounded-full p-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <FaGraduationCap size={50} className="text-blue-300" />
            </div>
            <motion.div
              className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
        <div className="w-1/2 pl-32">
          <div className="relative gradient-border p-8 w-[28rem] rounded-full bg-[rgba(5,5,5,0.9)] hover:scale-110 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] z-10">
            <h3 className="text-2xl font-bold text-gradient">Diploma in Cloud Computing & Big Data</h3>
            <p className="font-[JetBrains Mono] text-gray-300">Government Institute Of Electronics | 2021 - 2024</p>
            <p className="mt-3 text-gray-400">Graduated with CGPA of 9.53</p>
          </div>
        </div>
      </motion.div>

      {/* Planet 3: Matriculation */}
      <motion.div
        className="relative flex items-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="w-1/2 pr-32 flex justify-end">
          <div className="relative gradient-border p-8 w-[28rem] rounded-full bg-[rgba(5,5,5,0.9)] hover:scale-110 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] z-10">
            <h3 className="text-2xl font-bold text-gradient">Matriculation</h3>
            <p className="font-[JetBrains Mono] text-gray-300">St. Mary's Bethany Convent Vidyalaya | 2021</p>
            <p className="mt-3 text-gray-400">Passed with 10 GPA</p>
          </div>
        </div>
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 z-20"
          style={{ scale: planetScale }}
        >
          <motion.div
            className="relative bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="bg-[var(--space-black)] rounded-full p-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <FaSchool size={50} className="text-blue-200" />
            </div>
            <motion.div
              className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <div className="absolute -bottom-12 text-center w-32">
            <span className="text-sm font-[JetBrains Mono] text-gray-300 bg-[rgba(5,5,5,0.7)] px-2 py-1 rounded">START</span>
          </div>
        </motion.div>
        <div className="w-1/2 pl-32" />
      </motion.div>

      {/* Stardust particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"
          style={{
            left: `calc(50% + ${Math.sin(i) * 30 - 15}px)`, // Increased spread
            top: `${i * 15 + 10}%`, // Adjusted for shorter height
            boxShadow: '0 0 8px rgba(147, 51, 234, 0.6)',
            zIndex: 5,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
    </div>
  );
};

export default EducationRoadmap;