'use client';

import dynamic from 'next/dynamic';
import { useIsMobile } from '../../hooks/useIsMobile';
import SkillsRingMobile from './SkillsRingMobile';

// The desktop ring is the only thing that pulls in three.js / @react-three.
// It is dynamically imported and only mounted on desktop-width viewports, so
// three.js is never downloaded or executed on phones.
const SkillsRingDesktop = dynamic(() => import('./SkillsRingDesktop'), {
  ssr: false,
});

const SkillsRing: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile === null) return <div className="min-h-[360px] md:min-h-[500px]" />;

  return isMobile ? <SkillsRingMobile /> : <SkillsRingDesktop />;
};

export default SkillsRing;
