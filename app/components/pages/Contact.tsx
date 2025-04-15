import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import GlassSection from '../GlassSection';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  return (
    <GlassSection id="contact" title="Contact">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="p-6 text-center"
      >
        <p className="font-[JetBrains Mono] text-[var(--starry-white)] text-lg mb-4">
          Ready to launch a project or just want to connect? Transmit a signal my way!
        </p>
        <a
          href="https://forms.gle/k6NVDdvsZ69e4ghn8"
          className="gradient-button inline-flex items-center gap-2"
        >
          Send a Cosmic Message
        </a>
      </motion.div>
    </GlassSection>
  );
}
