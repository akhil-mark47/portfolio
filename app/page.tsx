'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

import Navigation from './components/Navigation';
import Hero from './components/pages/Hero';
import Experience from './components/pages/Experience';
import Projects from './components/pages/Projects';
import Achievements from './components/pages/Achievements';
import Volunteering from './components/pages/Volunteering';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Socials from './components/pages/Socials';
import EntryAnimation from './components/EntryAnimation';
import EducationRoadmap from './components/pages/EducationRoadmap';
import GlassSection from './components/GlassSection';
import SkillsRing from './components/pages/SkillsRing';
import Certifications from './components/pages/Certifications';
const StarFieldDynamic = dynamic(() => import('./components/StarField'), { ssr: false });

export default function Page() {
  const [showEntry, setShowEntry] = useState(true);

  const handleEntryComplete = () => {
    console.log("Transitioning to main content");
    setShowEntry(false);
  };

  return (
    <main className="bg-[var(--space-black)] overflow-hidden">
      <StarFieldDynamic />
      <AnimatePresence>
        {showEntry && <EntryAnimation onComplete={handleEntryComplete} />}
      </AnimatePresence>
      {!showEntry && (
        <>
           <Navigation />
          <Hero />
          <About />
          <Experience />
          <section id="education" className="relative space-gradient py-8 md:py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center mb-8 md:mb-12">Education</h2>
            <EducationRoadmap />
          </section>
          <GlassSection id="skills" title="Skills">
            <SkillsRing />
          </GlassSection>
          <Projects />
          <Certifications />
          <Achievements />
          <Volunteering />
          <Contact />
          <Socials />
        </>
      )}
    </main>
  );
}
