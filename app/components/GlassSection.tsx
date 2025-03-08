'use client';

import { motion, Variants } from 'framer-motion';

interface GlassSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const subtleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const GlassSection: React.FC<GlassSectionProps> = ({ id, title, children }) => {
  return (
    <motion.section
      id={id}
      className="flex items-center justify-center relative space-gradient py-8" // Added py-8 for extra spacing
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={subtleVariants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="glass-panel">
        <h2 className="text-4xl font-bold text-gradient mb-8">{title}</h2>
        {children}
      </div>
    </motion.section>
  );
};

export default GlassSection;