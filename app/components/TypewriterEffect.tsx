import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const TypewriterEffect: React.FC = () => {
  // Your taglines (cleaned up the formatting)
  const taglines = useMemo(() => [
    "Data Science Student",
    "AI Explorer",
    "Cloud Computing Enthusiast",
    "Mobile App Developer",
    "Machine Learning Enthusiast"
  ], []);
  

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  
  // Typing speed (in milliseconds)
  const typingSpeed: number = 100;
  const deletingSpeed: number = 50;
  const delayAfterTyping: number = 2000; // Pause when tagline is fully typed
  const delayBeforeTyping: number = 500; // Pause before starting to type next tagline

  useEffect(() => {
    const currentTagline: string = taglines[currentTaglineIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentTagline.substring(0, displayText.length + 1));
        
        // If we've finished typing
        if (displayText.length === currentTagline.length) {
          setTimeout(() => setIsDeleting(true), delayAfterTyping);
        }
      } else {
        // Deleting
        setDisplayText(currentTagline.substring(0, displayText.length - 1));
        
        // If we've finished deleting
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
          // Add a delay before typing the next tagline
          return;
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTaglineIndex, taglines, typingSpeed, deletingSpeed, delayAfterTyping]);

  return (
    <motion.p
      className="text-xl font-[JetBrains Mono] text-[var(--starry-white)] mt-4 floating"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      {displayText}
      <span className="cursor">|</span>
    </motion.p>
  );
};

export default TypewriterEffect;