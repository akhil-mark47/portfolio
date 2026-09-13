'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  FaPython,
  FaJava,
  FaAws,
  FaReact,
  FaGitAlt,
} from 'react-icons/fa';
import { TbBrandCSharp, TbBrandCpp } from 'react-icons/tb';
import {
  SiGooglecloud, SiPandas, SiNumpy, SiFlask, SiNodedotjs, SiNextdotjs,
  SiTailwindcss, SiPostgresql, SiMongodb, SiDocker, SiKubernetes,
  SiTensorflow, SiPrisma, SiCelery, SiGrafana,
} from 'react-icons/si';
import { FaFlutter } from 'react-icons/fa6';
import { IoLogoJavascript } from 'react-icons/io';
import { DiMysql } from 'react-icons/di';
import { IoLogoFirebase } from 'react-icons/io5';

type Skill = { name: string; icon: JSX.Element };

const ICON = 20;
const LANG: Skill[] = [
  { name: 'Python', icon: <FaPython size={ICON} /> },
  { name: 'Java', icon: <FaJava size={ICON} /> },
  { name: 'C++', icon: <TbBrandCpp size={ICON} /> },
  { name: 'C#', icon: <TbBrandCSharp size={ICON} /> },
  { name: 'JavaScript', icon: <IoLogoJavascript size={ICON} /> },
  { name: 'SQL', icon: <DiMysql size={ICON} /> },
];
const FRAME: Skill[] = [
  { name: 'Node.js', icon: <SiNodedotjs size={ICON} /> },
  { name: 'Next.js', icon: <SiNextdotjs size={ICON} /> },
  { name: 'React', icon: <FaReact size={ICON} /> },
  { name: 'Flask', icon: <SiFlask size={ICON} /> },
  { name: 'Flutter', icon: <FaFlutter size={ICON} /> },
  { name: 'TensorFlow', icon: <SiTensorflow size={ICON} /> },
  { name: 'Celery', icon: <SiCelery size={ICON} /> },
  { name: 'Pandas', icon: <SiPandas size={ICON} /> },
  { name: 'Numpy', icon: <SiNumpy size={ICON} /> },
  { name: 'Tailwind', icon: <SiTailwindcss size={ICON} /> },
];
const CLOUD: Skill[] = [
  { name: 'AWS', icon: <FaAws size={ICON} /> },
  { name: 'GCP', icon: <SiGooglecloud size={ICON} /> },
  { name: 'Docker', icon: <SiDocker size={ICON} /> },
  { name: 'Kubernetes', icon: <SiKubernetes size={ICON} /> },
  { name: 'Git', icon: <FaGitAlt size={ICON} /> },
  { name: 'PostgreSQL', icon: <SiPostgresql size={ICON} /> },
  { name: 'MongoDB', icon: <SiMongodb size={ICON} /> },
  { name: 'Prisma', icon: <SiPrisma size={ICON} /> },
  { name: 'Firebase', icon: <IoLogoFirebase size={ICON} /> },
  { name: 'Grafana', icon: <SiGrafana size={ICON} /> },
];

const TABS = [
  { key: 'all', label: 'All', skills: [...LANG, ...FRAME, ...CLOUD] },
  { key: 'lang', label: 'Languages', skills: LANG },
  { key: 'frame', label: 'Frameworks', skills: FRAME },
  { key: 'cloud', label: 'Cloud & Tools', skills: CLOUD },
] as const;

const SkillsRingMobile: React.FC = () => {
  const [active, setActive] = useState<string>('all');
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const skills = useMemo(
    () => TABS.find((t) => t.key === active)?.skills ?? TABS[0].skills,
    [active]
  );

  // Cylinder geometry. Keep a constant chord (~58px) between neighbours so a
  // 6-item and a 26-item reel are equally packed, and scale the perspective
  // WITH the radius so the front card always renders at ~1.2x — never balloons
  // or clips, no matter how many skills are in the set.
  const CARD_W = 156;
  const CARD_H = 38;
  const n = skills.length;
  const step = 360 / n;
  const radius = 58 / (2 * Math.sin(Math.PI / n));
  const perspective = Math.round(radius * 6); // front-card scale = 6/5 = 1.2

  return (
    <div className="mx-auto w-full max-w-md px-4">
      {/* Category tabs — choose a set, or leave on All for the universal reel */}
      <div className="flex flex-wrap justify-center gap-2 pb-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            aria-pressed={active === t.key}
            className={
              'font-[JetBrains_Mono] text-[11px] tracking-wide rounded-full px-3 py-[6px] border transition-colors ' +
              (active === t.key
                ? 'bg-purple-500 text-black border-purple-400 font-semibold'
                : 'text-gray-400 border-[rgba(168,120,255,0.22)] hover:text-gray-200')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {reduced ? (
        // Motion-safe fallback: a plain, readable grid — no spinning
        <div className="grid grid-cols-3 gap-2 py-4">
          {skills.map((s) => (
            <div
              key={s.name}
              className="flex flex-col items-center gap-1 rounded-xl border border-[rgba(168,120,255,0.16)] bg-[rgba(20,17,32,0.6)] py-3"
            >
              <span className="text-[var(--starry-white)]">{s.icon}</span>
              <span className="font-[JetBrains_Mono] text-[9px] text-gray-400">{s.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/*
            The reel auto-loops on its own — it never binds wheel/touchmove, so a
            vertical swipe scrolls the page straight past to the next section.
            A tap just pauses/resumes. Fade masks mark the top/bottom boundary.
          */}
          <div
            role="button"
            tabIndex={0}
            aria-label={paused ? 'Resume skills reel' : 'Pause skills reel'}
            onClick={() => setPaused((p) => !p)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPaused((p) => !p); }
            }}
            className="reel-stage relative mx-auto grid h-[300px] w-full place-items-center overflow-hidden"
            style={{ perspective: `${perspective}px` }}
          >
            <div
              key={active} /* restart cleanly when the set changes */
              className={'reel-spin relative' + (paused ? ' is-paused' : '')}
              style={{ transformStyle: 'preserve-3d', width: CARD_W, height: 120 }}
            >
              {skills.map((s, i) => (
                <div
                  key={s.name}
                  className="absolute left-1/2 top-1/2 flex items-center justify-center gap-2 rounded-2xl border border-[rgba(168,120,255,0.22)] bg-[rgba(18,15,30,0.82)] text-[var(--starry-white)] shadow-[0_4px_18px_-6px_rgba(0,0,0,0.8)]"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    marginLeft: -CARD_W / 2,
                    marginTop: -CARD_H / 2,
                    transform: `rotateX(${i * step}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <span className="shrink-0">{s.icon}</span>
                  <span className="font-[JetBrains_Mono] text-[11px] whitespace-nowrap">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center font-[JetBrains_Mono] text-[10px] tracking-[0.14em] text-gray-500 pt-1">
            {paused ? 'tap to resume' : 'tap reel to pause · swipe to continue'}
          </p>
        </>
      )}
    </div>
  );
};

export default SkillsRingMobile;
