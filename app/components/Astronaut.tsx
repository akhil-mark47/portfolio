'use client';

import { motion } from 'framer-motion';

const Astronaut: React.FC = () => {
  const astronautVariants = {
    float: {
      y: [-10, 10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'reverse' as const,
          duration: 2,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <motion.img
      src="/assets/images/astronaut.png" // Your astronaut image
      alt="Astronaut"
      className="absolute bottom-10 right-20 w-48 h-48"
      variants={astronautVariants}
      animate="float"
    />
  );
};

export default Astronaut;