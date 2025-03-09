'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TypewriterEffect from '../TypewriterEffect';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/assets/videos/public_videos_skills-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
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
            width={200}
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