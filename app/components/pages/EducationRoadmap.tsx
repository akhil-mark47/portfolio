'use client';

import dynamic from 'next/dynamic';
import { useIsMobile } from '../../hooks/useIsMobile';
import EducationRoadmapMobile from './EducationRoadmapMobile';

// Desktop version carries the video background + orbiting planets; only load it
// when we're actually on a desktop-width viewport.
const EducationRoadmapDesktop = dynamic(() => import('./EducationRoadmapDesktop'), {
  ssr: false,
});

const EducationRoadmap: React.FC = () => {
  const isMobile = useIsMobile();

  // avoid a layout jump before the width is known
  if (isMobile === null) return <div className="min-h-[420px] md:min-h-[1000px]" />;

  return isMobile ? <EducationRoadmapMobile /> : <EducationRoadmapDesktop />;
};

export default EducationRoadmap;
