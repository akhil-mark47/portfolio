'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TypewriterEffect from '../TypewriterEffect';

export default function Hero() {
 return (
 <section id="hero" className="min-h-screen flex items-center justify-center relative space-gradient">
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 1 }}
 className="flex flex-col md:flex-row items-center justify-center z-10 gap-6 md:gap-10 px-4"
 >
 {/* Profile Image */}
 <motion.div
 initial={{ opacity: 0, x: -50 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.3, duration: 1 }}
 className="relative"
 >
 <motion.div
 className="absolute inset-0 -z-10"
 style={{
 width: '150%',
 height: '150%',
 top: '-25%',
 left: '-25%',
 background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)',
 borderRadius: '50%',
 }}
 animate={{
 scale: [1, 1.2, 1],
 opacity: [0.5, 1, 0.5],
 }}
 transition={{
 duration: 3,
 repeat: Infinity,
 ease: 'easeInOut',
 }}
 />
 <Image
 src="/assets/images/profile.jpg"
 alt="Pettem Akhilvarsh"
 width={200} // Smaller on mobile
 height={200}
 className="rounded-full object-cover w-32 h-32 md:w-[300px] md:h-[300px]"
 />
 <motion.div
 className="absolute inset-0 border-2 md:border-3 border-dashed border-purple-400 rounded-full"
 animate={{ rotate: 360 }}
 transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
 />
 </motion.div>

 {/* Name and Tagline */}
 <div className="text-center">
 <motion.h1
 className="text-4xl md:text-8xl font-bold text-gradient"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.5, duration: 1 }}
 >
 Akhilvarsh Pettem
 </motion.h1>
 <div className="mt-4">
 <TypewriterEffect />
 </div>
 </div>
 </motion.div>
 </section>
 );
}


/*
Moon  Phase Component
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import TypewriterEffect from '../TypewriterEffect';
import MoonPhaseSlider from '../MoonPhaseSlider';

export default function Hero() {
  const [brightness, setBrightness] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Handle phase changes from the slider
  const handlePhaseChange = (phase: number, darkMode: boolean) => {
    setBrightness(phase);
    setIsDarkMode(darkMode);
    
    // Update CSS variables for global brightness control
    document.documentElement.style.setProperty('--brightness-level', phase.toString());
    document.documentElement.style.setProperty('--darkness-level', (1 - phase).toString());
    
    // Toggle dark mode class for more specific styling
    if (darkMode) {
      document.documentElement.classList.add('moon-dark-mode');
    } else {
      document.documentElement.classList.remove('moon-dark-mode');
    }
  };
  
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative space-gradient transition-colors duration-500">
      {/* Star background (visible in darker phases) */
//       <motion.div 
//         className="absolute inset-0 overflow-hidden pointer-events-none"
//         animate={{
//           opacity: isDarkMode ? 0.8 : 0
//         }}
//         transition={{ duration: 1 }}
//       >
//         <div className="stars-container">
//           {[...Array(100)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="star"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 width: `${Math.random() * 2 + 1}px`,
//                 height: `${Math.random() * 2 + 1}px`,
//               }}
//               animate={{
//                 opacity: [0.1, 0.8, 0.1],
//                 scale: [1, 1.2, 1],
//               }}
//               transition={{
//                 duration: 1 + Math.random() * 3,
//                 repeat: Infinity,
//                 repeatType: 'reverse',
//                 delay: Math.random() * 5,
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>
      
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="flex flex-col items-center justify-center z-10 gap-6 md:gap-10 px-4"
//         style={{
//           filter: `brightness(${Math.max(0.7, brightness)})` // Prevent it from getting too dark
//         }}
//       >
//         {/* Profile Image */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3, duration: 1 }}
//           className="relative"
//         >
//           <motion.div
//             className="absolute inset-0 -z-10"
//             style={{
//               width: '150%',
//               height: '150%',
//               top: '-25%',
//               left: '-25%',
//               background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)',
//               borderRadius: '50%',
//             }}
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.5, 1, 0.5],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: 'easeInOut',
//             }}
//           />
//           <Image
//             src="/assets/images/profile.jpg"
//             alt="Pettem Akhilvarsh"
//             width={200}
//             height={200}
//             className="rounded-full object-cover w-32 h-32 md:w-[300px] md:h-[300px]"
//           />
//           <motion.div
//             className="absolute inset-0 border-2 md:border-3 border-dashed border-purple-400 rounded-full"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
//           />
//         </motion.div>

//         {/* Name and Tagline */}
//         <div className="text-center">
//           <motion.h1
//             className="text-4xl md:text-8xl font-bold text-gradient"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           >
//             Akhilvarsh Pettem
//           </motion.h1>
//           <div className="mt-4">
//             <TypewriterEffect />
//           </div>
//         </div>
        
//         {/* Moon Phase Slider */}
//         <MoonPhaseSlider onPhaseChange={handlePhaseChange} />
//       </motion.div>
//     </section>
//   );
// }
// */