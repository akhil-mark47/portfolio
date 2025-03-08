'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TypewriterEffect from '../TypewriterEffect'; // Placeholder—define this next

export default function Hero() {
  return (
    <section id="hero" className="h-screen flex items-center justify-center relative space-gradient">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center z-10 gap-10"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative"
        >
          {/* Wavy Background Effect */}
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
            width={300}
            height={300}
            className="rounded-full object-cover"
          />
          {/* Orbiting ring effect */}
          <motion.div
            className="absolute inset-0 border-3 border-dashed border-purple-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Name and Tagline */}
        <div className="text-center">
          <motion.h1
            className="text-8xl font-bold text-gradient"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Akhilvarsh Pettem
          </motion.h1>
          <div>
            <TypewriterEffect />
          </div>
        </div>
      </motion.div>
    </section>
  );
}