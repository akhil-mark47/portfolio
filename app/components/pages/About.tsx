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



// import { motion } from 'framer-motion';
// import { useState } from 'react'; // Add this import
// import GlassSection from '../GlassSection';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function About() {
//   // Add state for modal visibility
//   const [showResumeModal, setShowResumeModal] = useState(false);

//   return (
//     <GlassSection id="about" title="About Me">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeInUp}
//         transition={{ duration: 0.5 }}
//         className="p-6 space-y-6 font-[JetBrains Mono] text-[var(--starry-white)]"
//       >
//         <h2 className="text-2xl font-bold text-gradient mb-4">
//           🚀 Mission: Build Beyond Limits
//         </h2>
        
//         <p className="leading-relaxed">
//           Greetings, Earthlings! 🌌 I'm <span className="font-bold text-gradient">Akhilvarsh</span>, a passionate 
//           tech geek driven by the unyielding desire to redefine the boundaries 
//           of human potential through <span className="font-bold">AI and LLMs</span>.
//         </p>

//         <p className="leading-relaxed">
//           My work revolves around <span className="font-bold">Large Language Models (LLMs)</span> and futuristic solutions that bring
//           complex ideas to life. I'm obsessed with creating experiences that bridge the
//           gap between <span className="font-bold">human intelligence and artificial cognition</span>.
//         </p>

//         <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-6 italic bg-opacity-20 bg-purple-900 rounded-r">
//           <p className="leading-relaxed">
//             "With the potential to achieve more, settling for less was never an option."
//           </p>
//         </blockquote>

//         <p className="leading-relaxed">
//           Every project I touch is a reflection of my belief that
//           <span className="font-bold"> technology should transcend human limitations</span> — not just serve it.
//         </p>

//         <p className="leading-relaxed">
//           As I navigate the ever-expanding galaxy of technology,
//           my mission remains clear — to engineer AI systems that can
//           <span className="font-bold"> reshape human communication, interaction, and productivity.</span>
//         </p>

//         <p className="leading-relaxed text-xl font-bold text-gradient">
//           Buckle up, traveler — we are just getting started. 🚀💡
//         </p>

//         {/* Resume Button Integration */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="pt-6 border-t border-[rgba(147,51,234,0.3)]"
//         >
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center">
//               <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-2"></div>
//               <span className="text-sm text-[rgba(59,130,246,0.8)]">MISSION BRIEF AVAILABLE</span>
//             </div>
            
//             <motion.button
//               onClick={() => setShowResumeModal(true)}
//               className="flex items-center space-x-3 px-5 py-2.5 rounded-lg 
//                         bg-gradient-to-r from-[rgba(147,51,234,0.1)] to-[rgba(59,130,246,0.1)] 
//                         border border-[rgba(147,51,234,0.3)] hover:border-[rgba(147,51,234,0.5)]
//                         transition-all duration-300 group"
//               whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(147,51,234,0.2)" }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <div className="bg-[rgba(147,51,234,0.2)] p-2 rounded-full">
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M14 2V8H20" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M16 13H8" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M16 17H8" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M10 9H9H8" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//               <div className="flex flex-col items-start">
//                 <span className="text-[rgba(147,51,234,0.9)] text-xs">ACCESS CREDENTIALS</span>
//                 <span className="text-[var(--starry-white)] font-semibold">View My Resume</span>
//               </div>
//               <motion.div 
//                 className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                 animate={{ x: [0, 4, 0] }}
//                 transition={{ repeat: Infinity, duration: 1.5 }}
//               >
//                 →
//               </motion.div>
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Resume Modal */}
//         {showResumeModal && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-md"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={(e) => {
//               // Close when clicking outside the modal content
//               if (e.target === e.currentTarget) {
//                 setShowResumeModal(false);
//               }
//             }}
//           >
//             <motion.div 
//               className="bg-[rgba(10,10,30,0.95)] max-w-5xl w-full h-[85vh] rounded-lg border border-[rgba(147,51,234,0.4)] overflow-hidden flex flex-col relative"
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ type: "spring", damping: 25 }}
//             >
//               <div className="flex justify-between items-center border-b border-[rgba(59,130,246,0.3)] p-4">
//                 <div className="flex items-center">
//                   <span className="text-xl mr-2">📄</span>
//                   <h2 className="text-[rgba(147,51,234,0.9)] font-[JetBrains Mono] text-lg">STARLOG</h2>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <a 
//                     href="/resume.pdf" 
//                     download
//                     className="flex items-center px-3 py-1.5 bg-[rgba(59,130,246,0.2)] rounded hover:bg-[rgba(59,130,246,0.3)] transition-colors"
//                   >
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2">
//                       <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
//                       <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
//                     </svg>
//                     <span className="font-[JetBrains Mono] text-sm">DOWNLOAD</span>
//                   </a>
//                   <button
//                     onClick={() => setShowResumeModal(false)}
//                     className="flex items-center px-3 py-1.5 bg-[rgba(239,68,68,0.2)] rounded hover:bg-[rgba(239,68,68,0.3)] transition-colors"
//                   >
//                     <span className="mr-2">×</span>
//                     <span className="font-[JetBrains Mono] text-sm">CLOSE</span>
//                   </button>
//                 </div>
//               </div>
//               <div className="flex-1 overflow-hidden">
//                 <iframe 
//                   src="/documents/resume.pdf" 
//                   className="w-full h-full" 
//                   title="Resume"
//                 />
//               </div>

//               {/* Decorative elements */}
//               <div className="absolute -top-1 left-10 right-10 h-[2px] bg-blue-500 opacity-70"></div>
//               <div className="absolute -bottom-1 left-10 right-10 h-[2px] bg-purple-500 opacity-70"></div>
//             </motion.div>
//           </motion.div>
//         )}
//       </motion.div>
//     </GlassSection>
//   );
// }