'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const InteractiveGuide: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Guide steps with text and audio
  const guideSteps = [
    {
      text: "Welcome to my portfolio! I’m your guide. Click me to start the tour.",
      audio: '/assets/audio/welcome.mp3',
      effect: '/assets/audio/beep.mp3',
    },
    {
      text: "This is the Hero section with my profile and a cosmic video backdrop.",
      audio: '/assets/audio/hero-explain.mp3',
      effect: '/assets/audio/whoosh.mp3',
    },
    {
      text: "Explore my Certifications with interactive image loops!",
      audio: '/assets/audio/cert-explain.mp3',
      effect: '/assets/audio/click.mp3',
    },
    {
      text: "Check out my Personal Space for a futuristic archive.",
      audio: '/assets/audio/space-explain.mp3',
      effect: '/assets/audio/swoosh.mp3',
    },
    {
      text: "Thanks for visiting! Click to restart or close me.",
      audio: '/assets/audio/goodbye.mp3',
      effect: '/assets/audio/tone.mp3',
    },
  ];

  // Handle audio playback
  useEffect(() => {
    if (isPlaying && step < guideSteps.length) {
      const audio = new Audio(guideSteps[step].audio);
      const effect = new Audio(guideSteps[step].effect);

      effect.play(); // Play sound effect first
      setTimeout(() => {
        audio.play(); // Play narration after effect
        audio.onended = () => setIsPlaying(false); // Move to next step when audio ends
      }, 500); // Delay narration to let effect play

      return () => {
        audio.pause();
        audio.currentTime = 0;
        effect.pause();
        effect.currentTime = 0;
      };
    }
  }, [step, isPlaying]);

  const handleGuideClick = () => {
    if (!isPlaying) {
      if (step === guideSteps.length - 1) {
        setStep(0); // Restart
      } else {
        setStep((prev) => prev + 1);
      }
      setIsPlaying(true);
    }
  };

  const closeGuide = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50 flex items-center space-x-4 bg-[rgba(10,10,10,0.8)] backdrop-blur-md p-4 rounded-lg shadow-lg border border-[rgba(59,130,246,0.2)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ y: [0, -10, 0], opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* GIF Animation */}
      <motion.img
        src="/assets/images/guide-gif.gif" // Replace with your GIF path
        alt="Interactive Guide"
        className="w-16 h-16 object-contain"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Text and Controls */}
      <div>
        <p className="text-sm text-[var(--starry-white)] max-w-xs">
          {guideSteps[step].text}
        </p>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={handleGuideClick}
            className="px-2 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)]"
            disabled={isPlaying}
          >
            {step === guideSteps.length - 1 ? 'Restart' : 'Next'}
          </button>
          <button
            onClick={closeGuide}
            className="px-2 py-1 bg-[rgba(147,51,234,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(147,51,234,0.4)]"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveGuide;