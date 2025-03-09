'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface MoonPhaseSliderProps {
  onPhaseChange: (phase: number, isDarkMode: boolean) => void;
}

const moonPhases = [
  { name: 'New Moon', icon: '🌑' },
  { name: 'Waxing Crescent', icon: '🌒' },
  { name: 'First Quarter', icon: '🌓' },
  { name: 'Waxing Gibbous', icon: '🌔' },
  { name: 'Full Moon', icon: '🌕' },
  { name: 'Waning Gibbous', icon: '🌖' },
  { name: 'Last Quarter', icon: '🌗' },
  { name: 'Waning Crescent', icon: '🌘' },
];

export default function MoonPhaseSlider({ onPhaseChange }: MoonPhaseSliderProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(4); // Start at Full Moon
  
  // Track drag motion
  const x = useMotionValue(0);
  const width = 320; // Total width of the slider track
  const phaseWidth = width / (moonPhases.length - 1);
  
  // Create a spring-animated slider for smooth movement
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  
  // Transform motion value to phase index (0-7)
  const phaseIndex = useTransform(springX, 
    [0, width], 
    [0, moonPhases.length - 1]
  );
  
  // Transform for star background opacity (only visible near new moon)
  const starsOpacity = useTransform(
    springX, 
    [0, phaseWidth, width - phaseWidth, width], 
    [0.8, 0.2, 0.2, 0.8]
  );
  
  // Detect when phase changes
  useEffect(() => {
    const unsubscribe = phaseIndex.onChange(latest => {
      const rounded = Math.round(latest);
      if (rounded !== currentPhaseIndex) {
        setCurrentPhaseIndex(rounded);
        
        // Determine if we should be in dark mode (phases 0, 1, 7 are darker)
        const isDarkMode = rounded === 0 || rounded === 1 || rounded === 7;
        
        // Calculate brightness percentage (0 = new moon/dark, 1 = full moon/bright)
        const brightnessPercent = 
          rounded === 0 ? 0 : 
          rounded === 4 ? 1 : 
          rounded < 4 ? rounded / 4 : (8 - rounded) / 4;
          
        onPhaseChange(brightnessPercent, isDarkMode);
      }
    });
    
    return () => unsubscribe();
  }, [phaseIndex, currentPhaseIndex, onPhaseChange]);
  
  // Initial position setup
  useEffect(() => {
    // Start with full moon (index 4)
    x.set(4 * phaseWidth);
  }, [x, phaseWidth]);
  
  // Handle drag end to snap to nearest phase
  const handleDragEnd = () => {
    const currentX = x.get();
    const nearestPhase = Math.round(currentX / phaseWidth);
    const snapToX = nearestPhase * phaseWidth;
    
    x.set(snapToX);
  };
  
  return (
    <div className="mt-8 md:mt-10 w-full max-w-xs md:max-w-md mx-auto">
      <div className="text-center mb-2">
        <span className="text-xl md:text-2xl font-medium text-[var(--starry-white)]">
          {moonPhases[currentPhaseIndex].name}
        </span>
      </div>
      
      {/* Moon Phase Slider */}
      <div className="relative h-16 md:h-20">
        {/* Track background */}
        <div 
          className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full bg-gray-700 bg-opacity-30 backdrop-blur-sm"
          style={{ width }}
        />
        
        {/* Phase indicator dots */}
        <div className="absolute top-1/2 -translate-y-1/2 flex justify-between" style={{ width }}>
          {moonPhases.map((phase, index) => (
            <motion.div 
              key={phase.name} 
              className="w-3 h-3 rounded-full bg-blue-200"
              style={{
                opacity: useTransform(
                  phaseIndex,
                  [index - 0.5, index, index + 0.5],
                  [0.3, 1, 0.3]
                )
              }}
            />
          ))}
        </div>
        
        {/* Draggable Moon */}
        <motion.div
          drag="x"
          dragMomentum={false}
          dragConstraints={{ left: 0, right: width }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x: springX }}
          className="absolute top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
        >
          <motion.div 
            className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg"
            whileTap={{ scale: 1.1 }}
          >
            <span className="text-2xl md:text-3xl select-none">
              {moonPhases[currentPhaseIndex].icon}
            </span>
          </motion.div>
        </motion.div>
        
        {/* Star sparkles (only visible near new moon) */}
        <AnimatePresence>
          {(currentPhaseIndex === 0 || currentPhaseIndex === 7) && (
            <motion.div 
              className="absolute inset-0 -z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: starsOpacity.get() }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full shadow-glow"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}