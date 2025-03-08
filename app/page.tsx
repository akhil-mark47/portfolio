'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Added for profile image
import EntryAnimation from './components/EntryAnimation';
import GlassSection from './components/GlassSection';
import SkillsRing from './components/SkillsRing';
import Navigation from './components/Navigation';
import EducationRoadmap from './components/EducationRoadmap';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StarFieldDynamic = dynamic(() => import('./components/StarField'), { ssr: false });

export default function Page() {
  const [showEntry, setShowEntry] = useState<boolean>(true);

  return (
    <main className="bg-[var(--space-black)] overflow-hidden">
      <StarFieldDynamic />
      <Navigation />
      {showEntry ? (
        <EntryAnimation onComplete={() => setShowEntry(false)} />
      ) : (
        <>
          <section id="hero" className="h-screen flex items-center justify-center relative space-gradient">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center z-10 gap-10" // Flex row with gap
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
                      width: '150%', // Wider than image for ripple effect
                      height: '150%',
                      top: '-25%', // Center it
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
                  {/* <div className="gradient-border rounded-full p-3 hover:shadow-[0_0_25px_rgba(147,51,234,0.7)] transition-all"> */}
                    <Image
                      src="/assets/images/profile.jpg" // Replace with your actual image path
                      alt="Pettem Akhilvarsh"
                      width={300}
                      height={300}
                      className="rounded-full object-cover"
                    />
                    {/* Orbiting ring effect */}
                    <motion.div
                      className="absolute inset-0 border-3 border-dashed border-purple-400 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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

  
          <GlassSection id="freelancing" title="Freelancing">
  <div className="space-y-6">
    <div className="gradient-border p-4">
      <h3 className="text-xl font-bold text-gradient">Web Developer</h3>
      <p className="font-[JetBrains Mono] text-gray-400">NAVAIDIX SOLUTIONS | Jan 2025 - Present</p>
      <p>Building a dynamic staff recruitment website using React to enhance candidate hiring experience.</p>
    </div>
              <div className="gradient-border p-4">
                <h3 className="text-xl font-bold text-gradient">Industrial Trainee</h3>
                <p className="font-[JetBrains Mono] text-gray-400">NSIC Technical Services Centre, ECIL | June 2023 - Nov 2023</p>
                <p>Created web scraping tool using Beautiful Soup, reducing manual search time by 70-80%</p>
              </div>
            </div>
          </GlassSection>

          <section id="education" className="relative space-gradient py-12">
            <h2 className="text-4xl font-bold text-gradient text-center mb-12">Education</h2>
            <EducationRoadmap />
          </section>

          <GlassSection id="skills" title="Skills">
            <SkillsRing />
          </GlassSection>

          <GlassSection id="projects" title="Projects">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "SnapLearn: Smart Question Paper Generator",
                  desc: "Flutter-based mobile app that reduces question paper creation time by 75% using AI and OCR.",
                  tech: ["Flutter", "Google ML Kit", "Gemini 1.5 Pro"],
                  github: "https://github.com/akhil-varsh/SnapLearn"
                },
                {
                  title: "Urban Hero: Waste Reporting Platform",
                  desc: "Flutter app for waste reporting, increasing municipal response efficiency by 70% through real-time tracking.",
                  tech: ["Flutter", "Firebase"],
                  github: "https://github.com/akhil-varsh/UrbanHero"
                },
                {
                  title: "Syntax Sage: Code Analysis Platform",
                  desc: "Flask-based platform for automated code analysis using Llama 3.1:8B and CrewAI, improving efficiency by 60%.",
                  tech: ["Flask", "Llama 3.1:8B", "CrewAI", "Ollama"],
                  github: "https://github.com/akhil-varsh/SyntaxSage"
                },
                {
                  title: "CNN-Multi Class Classifier",
                  desc: "Built a CNN Classifier using PyTorch, achieving 90% accuracy on test data with efficient batch processing.",
                  tech: ["PyTorch", "Python", "Jupyter"],
                  github: "https://github.com/akhil-varsh/CNN-Multi-Class-Classifier"
                },
                {
                  title: "RAG-Powered Chatbot for Intelligent Course Assistance",
                  desc: "Developed a LangChain-powered chatbot using OCI Generative AI with Cohere embeddings for context-aware responses.",
                  tech: ["LangChain", "OCI", "Cohere Command Model", "Streamlit", "ChromaDB"],
                  github: "https://github.com/akhil-varsh/RAG-Powered-Chatbot-for-Intelligent-Course-Assistance"
                },
                {
                  title: "Web Scraping Tool for Amazon Products",
                  desc: "Built a web scraping tool using Beautiful Soup to extract the top 10 product links from Amazon based on user input.",
                  tech: ["Beautiful Soup", "Python"],
                  github: "N/A"
                }
              ].map((project) => (
                <div key={project.title} className="gradient-border p-4 flex flex-col">
                  <h3 className="text-xl font-bold text-gradient">{project.title}</h3>
                  <p className="font-[JetBrains Mono] text-gray-300">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs font-[JetBrains Mono] px-2 py-1 bg-[rgba(45,0,247,0.2)] rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-button mt-4 self-start"
                  >
                    {project.github === "N/A" ? "Private Repo" : "View Project"}
                  </a>
                </div>
              ))}
            </div>
          </GlassSection>

          <GlassSection id="achievements" title="Achievements">
            <div className="space-y-6">
              <div className="gradient-border p-4">
                <h3 className="text-xl font-bold text-gradient">Finalist - HACK4SDG Hackathon</h3>
                <p className="font-[JetBrains Mono] text-gray-400">AIESEC | 2024</p>
                <p>Reached the finals among 160+ teams by developing innovative solutions aligned with sustainable development goals.</p>
              </div>
              <div className="gradient-border p-4">
                <h3 className="text-xl font-bold text-gradient">Finalist - Smart India Hackathon (SIH)</h3>
                <p className="font-[JetBrains Mono] text-gray-400">Internal Hackathon | 2024</p>
                <p>Participated in the internal round of Smart India Hackathon under the software category.</p>
              </div>
              <div className="gradient-border p-4">
                <h3 className="text-xl font-bold text-gradient">Finalist - Innovasia Hackathon</h3>
                <p className="font-[JetBrains Mono] text-gray-400">Innovasia | 2024</p>
                <p>Stood out among 180+ teams by proposing a groundbreaking solution during the Innovasia Hackathon.</p>
              </div>
              <div className="gradient-border p-4">
                <h3 className="text-xl font-bold text-gradient">‘C’ Certification - National Cadet Corps (NCC)</h3>
                <p className="font-[JetBrains Mono] text-gray-400">NCC | 2023</p>
                <p>Successfully completed \'C\' Certification with active participation in 30+ leadership workshops and diverse training exercises.</p>
              </div>
            </div>
          </GlassSection>

          <GlassSection id="volunteering" title="Volunteering">
            <div className="space-y-6">
              <div className="gradient-border p-4">
                <h3 className="text-xl font-bold text-gradient">Technical Volunteer</h3>
                <p className="font-[JetBrains Mono] text-gray-400">VJ Data Questers | 2024 - Present</p>
                <p>Assisting in organizing technical events and data science workshops, fostering tech enthusiasm among peers.</p>
              </div>
              <div className="gradient-border p-4">
                <h3 className="text-xl font-bold text-gradient">App Development Volunteer</h3>
                <p className="font-[JetBrains Mono] text-gray-400">Google Developer Groups On Campus | 2024 - Present</p>
                <p>Contributing to mobile app development initiatives, promoting hands-on learning and app development among students.</p>
              </div>
              <div className="gradient-border p-4">
                <h3 className="text-xl font-bold text-gradient">Secretary</h3>
                <p className="font-[JetBrains Mono] text-gray-400">Cloud Community Club | 2023 - 2024</p>
                <p>Led cloud-based technical events, workshops, and meetups to promote cloud computing knowledge.</p>
              </div>
            </div>
          </GlassSection>
        </>
      )}
    </main>
  );
}

//GLB CODE
// 'use client';

// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// import { motion } from 'framer-motion';
// import EntryAnimation from './components/EntryAnimation';
// import StarField from './components/StarField';
// import Moon from './components/Moon';
// import Astronaut from './components/Astronaut';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const StarFieldDynamic = dynamic(() => import('./components/StarField'), { ssr: false });

// export default function Page() {
//   const [showEntry, setShowEntry] = useState<boolean>(true);

//   return (
//     <main className="min-h-screen bg-[var(--space-black)] overflow-hidden">
//       <StarFieldDynamic />
//       {showEntry ? (
//         <EntryAnimation onComplete={() => setShowEntry(false)} />
//       ) : (
//         <section className="h-screen flex items-center justify-center relative space-gradient">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="text-center z-10"
//           >
//             <motion.h1
//               className="text-8xl font-bold text-gradient"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.5, duration: 1 }}
//             >
//               Pettem Akhilvarsh
//             </motion.h1>
//             <motion.p
//               className="text-xl font-[JetBrains Mono] text-[var(--starry-white)] mt-4 floating"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1, duration: 1 }}
//             >
//               Data Science & AI Enthusiast
//             </motion.p>
//           </motion.div>
//           <Moon />
//           <Astronaut />
//         </section>
//       )}
//     </main>
//   );
// }