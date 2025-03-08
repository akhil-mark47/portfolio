'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  "Initializing AI Core...",
  "Calibrating Warp Drive...",
  "Mission Briefing: Build Real-World Impact with AI",
];

const warpSequence = [
  "Warp Drive Activation Sequence Initiated...",
  "With the potential to achieve more...",
  "...settling for less was never an option.",
];

const galaxySequence = [
  "Entering Galaxy Coordinates: [Akhilvarsh-001]",
  "Warp Drive: 65% Activated",
  "AI Core: Online",
  "Mission Status: Launched",
];

const PreLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    console.log("Phase:", phase, "TextIndex:", textIndex);
    const currentSequence = phase === 0 ? bootSequence : phase === 1 ? warpSequence : galaxySequence;
    if (textIndex < currentSequence.length) {
      const text = currentSequence[textIndex];
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setCurrentText((prev) => prev + text[i]);
          i++;
        } else {
          clearInterval(typingInterval);
          setDisplayedLines((prev) => [...prev, text]);
          setCurrentText("");
          setTextIndex((prev) => prev + 1);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    } else if (phase < 2) {
      setTimeout(() => {
        setPhase((prev) => prev + 1);
        setTextIndex(0);
        setDisplayedLines([]);
      }, 1000);
    } else {
      setTimeout(() => {
        console.log("PreLoader Complete");
        onComplete();
      }, 2000);
    }
  }, [phase, textIndex, onComplete]);

  const handleSkip = () => {
    console.log("Skip clicked");
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--space-black)] font-[JetBrains Mono] text-[var(--starry-white)] text-lg md:text-xl"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
      >
        <div className="w-full max-w-2xl p-6 border-2 border-purple-500 bg-[rgba(0,0,0,0.9)] shadow-[0_0_15px_rgba(147,51,234,0.3)]">
          <div className="flex justify-between mb-4 text-sm text-blue-400">
            <span>[MISSION CONTROL: AKHILVARSH-001]</span>
            <span>STATUS: {phase === 0 ? "BOOTING" : phase === 1 ? "WARPING" : "LAUNCHED"}</span>
          </div>
          <div className="min-h-[20rem] flex flex-col justify-end">
            {displayedLines.map((line, i) => (
              <p key={i} className="mb-2 glitch" data-text={line}>
                 {line}
              </p>
            ))}
            {currentText && (
              <p className="mb-2">
                {currentText}
                <span className="animate-blink">|</span>
              </p>
            )}
          </div>
          <motion.button
            className="absolute bottom-4 right-4 text-purple-400 hover:text-purple-300 transition-all"
            onClick={handleSkip}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            [SKIP INTRO]
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreLoader;