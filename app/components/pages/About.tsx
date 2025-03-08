import { motion } from 'framer-motion';
import GlassSection from '../GlassSection';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <GlassSection id="about" title="About Me">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-6 font-[JetBrains Mono] text-[var(--starry-white)]"
      >
        <h2 className="text-2xl font-bold text-gradient mb-4">
          🚀 Mission: Build Beyond Limits
        </h2>
        
        <p className="leading-relaxed">
          Greetings, Earthlings! 🌌 I'm <span className="font-bold text-gradient">Akhilvarsh</span>, a passionate 
          tech geek driven by the unyielding desire to redefine the boundaries 
          of human potential through <span className="font-bold">AI and LLMs</span>.
        </p>

        <p className="leading-relaxed">
          My work revolves around <span className="font-bold">Large Language Models (LLMs)</span> and futuristic solutions that bring
          complex ideas to life. I'm obsessed with creating experiences that bridge the
          gap between <span className="font-bold">human intelligence and artificial cognition</span>.
        </p>

        <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-6 italic bg-opacity-20 bg-purple-900 rounded-r">
          <p className="leading-relaxed">
            "With the potential to achieve more, settling for less was never an option."
          </p>
        </blockquote>

        <p className="leading-relaxed">
          Every project I touch is a reflection of my belief that
          <span className="font-bold"> technology should transcend human limitations</span> — not just serve it.
        </p>

        <p className="leading-relaxed">
          As I navigate the ever-expanding galaxy of technology,
          my mission remains clear — to engineer AI systems that can
          <span className="font-bold"> reshape human communication, interaction, and productivity.</span>
        </p>

        <p className="leading-relaxed text-xl font-bold text-gradient">
          Buckle up, traveler — we are just getting started. 🚀💡
        </p>
      </motion.div>
    </GlassSection>
  );
}