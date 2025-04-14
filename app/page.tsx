'use client';

import dynamic from 'next/dynamic';

import Navigation from './components/Navigation';
import Hero from './components/pages/Hero';
import Experience from './components/pages/Experience';
import Projects from './components/pages/Projects';
import Achievements from './components/pages/Achievements';
import Volunteering from './components/pages/Volunteering';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Socials from './components/pages/Socials';
import EducationRoadmap from './components/pages/EducationRoadmap';
import GlassSection from './components/GlassSection';
import SkillsRing from './components/pages/SkillsRing';
import Certifications from './components/pages/Certifications';
// import Gallery from './components/pages/Gallery';
const StarFieldDynamic = dynamic(() => import('./components/StarField'), { ssr: false });

export default function Page() {
  return (
    <main className="bg-[var(--space-black)] overflow-hidden">
      <StarFieldDynamic />
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
      {/* <Gallery /> */}
      <Achievements />
      <Volunteering />
      <Contact />
      <Socials />
    </main>
  );
}