'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Steps                                                              */
/* ------------------------------------------------------------------ */
export type GuideStep = {
  key: string;
  target?: string;
  title: string;
  text: string;
  cursor?: boolean;
  cta?: { label: string; href: string };
};

export const PORTFOLIO_STEPS: GuideStep[] = [
  { key: 'intro', title: "Hi, I'm Cosmo!", text: "I just hopped out of your cursor's UFO. Buckle up — I'll fly you around Akhil's galaxy in about a minute." },
  { key: 'hero', target: 'hero', title: 'The Launch Pad', text: 'This is home base — Akhilvarsh Pettem, a CSE (Data Science) engineer who builds with AI, the web, and the cloud.' },
  { key: 'about', target: 'about', title: 'About', text: 'A quick orbit around who Akhil is and what drives him.' },
  { key: 'experience', target: 'experience', title: 'Experience', text: 'Missions logged — the roles and real work where Akhil put these skills to use.' },
  { key: 'education', target: 'education', title: 'Education', text: 'The trajectory so far — degrees and milestones, plotted like a flight path.' },
  { key: 'skills', target: 'skills', title: 'Skills', text: "Akhil's toolkit — languages, frameworks and cloud tech. A spinning 3D ring on desktop; a rolodex you flick on mobile." },
  { key: 'projects', target: 'projects', title: 'Projects', text: "Things Akhil designed and launched — go on, poke around, they're interactive." },
  { key: 'certifications', target: 'certifications', title: 'Certifications', text: 'Proof of training gathered from across the galaxy.' },
  { key: 'achievements', target: 'achievements', title: 'Achievements', text: 'Trophies, rankings and wins worth bragging about.' },
  { key: 'volunteering', target: 'volunteering', title: 'Leadership', text: 'Positions of responsibility — where Akhil led teams and gave back.' },
  { key: 'cursor', cursor: true, title: 'Meet your cursor', text: '' },
  { key: 'space', title: 'My Space', text: "Want the fun stuff? My Space is Akhil's personal OS — games (try the slot machine!), music, movies and more.", cta: { label: 'Open My Space ▸', href: '/personal-space' } },
  { key: 'outro', title: "That's the tour!", text: 'Explore freely — use the menu to jump anywhere, and click me again if you get lost. Safe travels! ✦' },
];

export const SPACE_STEPS: GuideStep[] = [
  { key: 'intro', title: "Hi, I'm Cosmo!", text: 'Welcome to AK//OS — Akhil’s personal operating system, floating out in space. Let me show you around.' },
  { key: 'apps', title: 'The apps', text: 'Every icon is an app: hobbies, movies, books, music and quotes. Open one and it fills the screen.' },
  { key: 'slots', title: 'Slots 🎰', text: 'Newest arrival — the Slots app. Spin the reels of skill icons, match three, and learn what each technology does and where it’s used.' },
  { key: 'windows', title: 'Make it yours', text: 'On desktop you can drag windows around, minimise them to the dock, or right-click the space for quick actions.' },
  { key: 'exit', title: 'Back to the portfolio', text: 'Tap the 🪐 Portfolio icon anytime to fly back to the main site.', cta: { label: '← Back to Portfolio', href: '/' } },
  { key: 'outro', title: 'Enjoy the OS!', text: 'That’s the tour — launch apps, spin the slots, and have fun exploring. ✦' },
];

/* ------------------------------------------------------------------ */
/*  Cosmo — the alien (no saucer)                                      */
/* ------------------------------------------------------------------ */
const Cosmo: React.FC<{ size?: number; reduce?: boolean }> = ({ size = 60, reduce }) => (
  <motion.div
    style={{ width: size, filter: 'drop-shadow(0 5px 12px rgba(124,58,237,0.5))' }}
    animate={reduce ? {} : { y: [0, -5, 0] }}
    transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 56 68" width="100%">
      <defs>
        <linearGradient id="al-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b6f5ac" />
          <stop offset="100%" stopColor="#4ec94e" />
        </linearGradient>
        <linearGradient id="al-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6ee86e" />
          <stop offset="100%" stopColor="#3aa53a" />
        </linearGradient>
      </defs>

      {/* antennae */}
      <g stroke="#6ee86e" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="9" x2="18" y2="2" />
        <line x1="34" y1="9" x2="38" y2="2" />
      </g>
      <circle cx="18" cy="2" r="2.2" fill="#c7ffbf" />
      <circle cx="38" cy="2" r="2.2" fill="#c7ffbf" />

      {/* body */}
      <ellipse cx="28" cy="52" rx="10" ry="12" fill="url(#al-body)" />
      {/* arms — one waving up */}
      <path d="M19 48 Q10 45 8 37" stroke="#4ec94e" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M37 48 Q45 50 47 56" stroke="#4ec94e" strokeWidth="3.4" fill="none" strokeLinecap="round" />

      {/* head */}
      <ellipse cx="28" cy="25" rx="17" ry="19" fill="url(#al-head)" stroke="#2f7d2f" strokeWidth="0.6" />

      {/* eyes (blink) */}
      <motion.g
        style={{ transformOrigin: '28px 26px' }}
        animate={reduce ? {} : { scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4, times: [0, 0.92, 0.95, 1], repeat: Infinity }}
      >
        <ellipse cx="20" cy="25" rx="3.7" ry="6.2" transform="rotate(18 20 25)" fill="#0b0a15" />
        <ellipse cx="36" cy="25" rx="3.7" ry="6.2" transform="rotate(-18 36 25)" fill="#0b0a15" />
        <circle cx="19" cy="22" r="1" fill="#fff" />
        <circle cx="35" cy="22" r="1" fill="#fff" />
      </motion.g>

      {/* mouth */}
      <path d="M24 35 Q28 38.5 32 35" stroke="#1b4d1b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Blazing asteroid — the compact tour launcher                       */
/* ------------------------------------------------------------------ */
const Asteroid: React.FC<{ size?: number; reduce?: boolean }> = ({ size = 40, reduce }) => (
  <div style={{ width: size, height: size, position: 'relative' }} aria-hidden="true">
    <svg viewBox="0 0 52 52" width="100%" height="100%">
      <defs>
        <radialGradient id="astRock" cx="0.38" cy="0.36" r="0.72">
          <stop offset="0%" stopColor="#8a7f74" /><stop offset="55%" stopColor="#5b5249" /><stop offset="100%" stopColor="#2f2924" />
        </radialGradient>
        <radialGradient id="astGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffb23e" stopOpacity="0.85" /><stop offset="100%" stopColor="#ffb23e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="30" r="22" fill="url(#astGlow)" opacity="0.7" />
      {/* blaze tongues trailing up-right */}
      <motion.g style={{ transformOrigin: '34px 20px' }}
        animate={reduce ? {} : { scaleY: [0.85, 1.12, 0.9], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatType: 'mirror' }}>
        <path d="M31 23 Q43 13 51 3 Q45 15 37 25 Z" fill="#ff5a1a" />
        <path d="M31 24 Q40 16 46 8 Q42 17 36 26 Z" fill="#ffb02e" />
        <path d="M31 25 Q37 19 41 13 Q39 19 35 27 Z" fill="#ffe27a" />
      </motion.g>
      {/* asteroid body */}
      <path d="M18 22 L24 16 L32 17 L38 23 L38 32 L31 38 L22 37 L15 30 Z" fill="url(#astRock)" stroke="#241f1b" strokeWidth="0.6" />
      <path d="M24 16 L32 17 L38 23" fill="none" stroke="#ffbd73" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
      <circle cx="23" cy="27" r="2.4" fill="#39322c" />
      <circle cx="30" cy="31" r="1.8" fill="#39322c" />
      <circle cx="20" cy="32" r="1.3" fill="#39322c" />
    </svg>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Guide                                                              */
/* ------------------------------------------------------------------ */
const S = 60; // Cosmo size when open
type Phase = 'idle' | 'launching' | 'open' | 'returning';

const Guide: React.FC<{ steps?: GuideStep[] }> = ({ steps = PORTFOLIO_STEPS }) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [voiceOn, setVoiceOn] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [returnTo, setReturnTo] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const open = phase === 'open';

  /* layout + capabilities */
  useEffect(() => {
    const calc = () => {
      const mob = window.matchMedia('(max-width: 767px)').matches;
      setIsMobile(mob);
      setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      setAnchor(mob
        ? { x: window.innerWidth / 2, y: window.innerHeight - 212 }
        : { x: window.innerWidth - 62, y: window.innerHeight - 224 });
    };
    calc();
    mouseRef.current = { x: window.innerWidth - 44, y: window.innerHeight - 44 };
    const m = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('resize', calc);
    window.addEventListener('mousemove', m);
    return () => { window.removeEventListener('resize', calc); window.removeEventListener('mousemove', m); };
  }, []);

  const stepText = useCallback(
    (s: GuideStep) =>
      s.cursor
        ? isMobile
          ? "There's no cursor on a phone — but tap, swipe and long-press everything: the skills reel, the projects, the menu rocket. It all reacts."
          : 'See that UFO I flew out of? On desktop it’s your cursor. Glide around — and click fast to charge the boosters until it slingshots across the screen and runs out of fuel! 🚀'
        : s.text,
    [isMobile]
  );

  /* spotlight measure */
  const measure = useCallback(() => {
    const s = steps[index];
    if (!open || !s?.target) { setSpot(null); return; }
    const el = document.getElementById(s.target);
    if (!el) { setSpot(null); return; }
    const r = el.getBoundingClientRect();
    const pad = 10;
    const top = Math.max(8, r.top - pad);
    const left = Math.max(8, r.left - pad);
    const right = Math.min(window.innerWidth - 8, r.right + pad);
    const bottom = Math.min(window.innerHeight - 8, r.bottom + pad);
    setSpot({ top, left, width: Math.max(0, right - left), height: Math.max(0, bottom - top) });
  }, [index, open, steps]);

  useEffect(() => {
    if (!open) return;
    const s = steps[index];
    if (s?.target) document.getElementById(s.target)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    measure();
    const t = setTimeout(measure, reduce ? 60 : 540);
    return () => clearTimeout(t);
  }, [index, open, reduce, measure, steps]);

  useEffect(() => {
    if (!open) return;
    let raf = 0;
    const onMove = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);
    return () => { window.removeEventListener('scroll', onMove); window.removeEventListener('resize', onMove); cancelAnimationFrame(raf); };
  }, [open, measure]);

  /* typewriter */
  useEffect(() => {
    if (!open) return;
    const full = stepText(steps[index]);
    setTyped('');
    let i = 0;
    const id = setInterval(() => { i++; setTyped(full.slice(0, i)); if (i >= full.length) clearInterval(id); }, reduce ? 0 : 16);
    return () => clearInterval(id);
  }, [index, open, reduce, stepText, steps]);

  /* voice */
  useEffect(() => {
    if (!open) return;
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) return;
    synth.cancel();
    if (voiceOn) {
      const u = new SpeechSynthesisUtterance(stepText(steps[index]).replace(/[🚀✦▸←]/g, ''));
      u.rate = 1.02; u.pitch = 1.25; u.volume = 0.9;
      synth.speak(u);
    }
    return () => synth.cancel();
  }, [index, open, voiceOn, stepText, steps]);

  const setAlienOut = (out: boolean) => window.dispatchEvent(new CustomEvent('cosmo:alien', { detail: { out } }));
  const start = () => { setOrigin({ ...mouseRef.current }); setIndex(0); setCollapsed(false); setAlienOut(true); setPhase('launching'); };
  const close = () => { setReturnTo({ ...mouseRef.current }); if (typeof window !== 'undefined') window.speechSynthesis?.cancel(); setPhase('returning'); };
  const next = () => (index >= steps.length - 1 ? close() : setIndex((i) => i + 1));
  const back = () => setIndex((i) => Math.max(0, i - 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  // safety: if the guide unmounts mid-tour, put the alien back in the cursor
  useEffect(() => () => { window.dispatchEvent(new CustomEvent('cosmo:alien', { detail: { out: false } })); }, []);

  const step = steps[index];
  const flightTrans = { type: 'spring' as const, stiffness: 260, damping: 20 };

  return (
    <>
      {/* spotlight */}
      <AnimatePresence>
        {open && !collapsed && spot && (
          <motion.div key="spot" className="fixed z-[940] pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, top: spot.top, left: spot.left, width: spot.width, height: spot.height }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            style={{ boxShadow: '0 0 0 9999px rgba(5,4,13,0.74)', border: '2px solid rgba(181,123,255,0.8)', outline: '1px solid rgba(53,224,207,0.4)' }} />
        )}
      </AnimatePresence>

      {/* Ant-Man flight: out of the cursor (grow) and back in (shrink) */}
      {phase === 'launching' && (
        <motion.div className="fixed z-[965] pointer-events-none" style={{ left: 0, top: 0 }}
          initial={{ x: origin.x - S / 2, y: origin.y - S / 2, scale: 0.12, opacity: 0.7 }}
          animate={{ x: anchor.x - S / 2, y: anchor.y - S / 2, scale: 1, opacity: 1 }}
          transition={flightTrans}
          onAnimationComplete={() => setPhase('open')}>
          <Cosmo size={S} reduce={reduce} />
        </motion.div>
      )}
      {phase === 'returning' && (
        <motion.div className="fixed z-[965] pointer-events-none" style={{ left: 0, top: 0 }}
          initial={{ x: anchor.x - S / 2, y: anchor.y - S / 2, scale: 1, opacity: 1 }}
          animate={{ x: returnTo.x - S / 2, y: returnTo.y - S / 2, scale: 0.1, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          onAnimationComplete={() => { setAlienOut(false); setPhase('idle'); setIndex(0); }}>
          <Cosmo size={S} reduce={reduce} />
        </motion.div>
      )}

      {/* docked guide */}
      <AnimatePresence>
        {open && !collapsed && (
          <>
            {/* Cosmo hovering above the card */}
            <motion.div key="cosmo" className="fixed z-[965] pointer-events-none"
              style={{ left: anchor.x - S / 2, top: anchor.y - S / 2 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div key={index} animate={reduce ? {} : { rotate: [0, -12, 12, 0] }} transition={{ duration: 0.6 }}>
                <Cosmo size={S} reduce={reduce} />
              </motion.div>
            </motion.div>

            {/* speech card */}
            <motion.div key="card"
              className={`fixed z-[960] ${isMobile ? 'left-3 right-3 bottom-3' : 'right-5 bottom-5 w-[340px]'}`}
              initial={{ opacity: 0, y: 30, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}>
              <div className="relative rounded-2xl border border-[rgba(181,123,255,0.4)] bg-[rgba(12,9,26,0.92)] backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(45,0,247,0.6)] p-4 pt-6">
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <button onClick={() => setVoiceOn((v) => !v)} aria-label="toggle voice" className="text-sm text-gray-400 hover:text-white transition">{voiceOn ? '🔊' : '🔇'}</button>
                  <button onClick={() => { if (typeof window !== 'undefined') window.speechSynthesis?.cancel(); setCollapsed(true); }} aria-label="minimize guide" className="text-gray-400 hover:text-white transition text-lg leading-none px-1">‒</button>
                  <button onClick={close} aria-label="close tour" className="text-gray-400 hover:text-white transition text-sm leading-none px-1">✕</button>
                </div>

                <div className="min-h-[62px]">
                  <div className="font-[JetBrains_Mono] text-[11px] tracking-[0.14em] uppercase text-[rgba(181,123,255,0.95)]">{step.title}</div>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--starry-white)]">
                    {typed}
                    <span className="inline-block w-[2px] h-[14px] -mb-[2px] ml-[1px] bg-[rgba(53,224,207,0.9)] animate-pulse" />
                  </p>
                  {step.cta && (
                    <a href={step.cta.href} className="inline-block mt-3 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white" style={{ background: 'linear-gradient(90deg,#9333ea,#3b82f6)' }}>{step.cta.label}</a>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-center gap-1.5">
                  {steps.map((_, i) => (
                    <button key={i} onClick={() => setIndex(i)} aria-label={`step ${i + 1}`} className="h-1.5 rounded-full transition-all"
                      style={{ width: i === index ? 16 : 6, background: i === index ? '#b57bff' : 'rgba(181,123,255,0.3)' }} />
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between font-[JetBrains_Mono] text-[12px]">
                  <button onClick={back} disabled={index === 0} className="px-3 py-1.5 rounded-lg border border-[rgba(168,120,255,0.25)] text-gray-300 disabled:opacity-40 hover:bg-[rgba(147,51,234,0.15)] transition">‹ Back</button>
                  <button onClick={close} className="text-[11px] text-gray-500 hover:text-gray-300 transition">skip</button>
                  <button onClick={next} className="px-4 py-1.5 rounded-lg font-semibold text-white" style={{ background: 'linear-gradient(90deg,#9333ea,#3b82f6)' }}>
                    {index >= steps.length - 1 ? 'Done ✦' : 'Next ›'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* collapsed → tiny chip so it never covers the content */}
        {open && collapsed && (
          <motion.button key="mini" onClick={() => setCollapsed(false)}
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            whileTap={{ scale: 0.94 }}
            className="fixed z-[965] right-4 bottom-4 flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 border border-[rgba(181,123,255,0.45)] bg-[rgba(12,9,26,0.92)] backdrop-blur-xl shadow-[0_10px_30px_-8px_rgba(45,0,247,0.6)]"
            aria-label="expand guide">
            <Cosmo size={30} reduce={reduce} />
            <span className="font-[JetBrains_Mono] text-[11px] text-[var(--starry-white)]">Cosmo&nbsp;▴</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* launcher */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.button key="launch" onClick={start}
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            className="fixed z-[900] right-4 bottom-4 flex items-center gap-2 rounded-full p-1 sm:pr-4 border border-[rgba(245,138,26,0.45)] bg-[rgba(12,9,26,0.85)] backdrop-blur-xl shadow-[0_10px_30px_-8px_rgba(255,120,20,0.5)]"
            aria-label="Take a guided tour with Cosmo" title="Tour with Cosmo">
            {!reduce && (
              <motion.span className="absolute inset-0 rounded-full border border-[rgba(245,138,26,0.5)]" animate={{ scale: [1, 1.3], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
            )}
            <Asteroid size={40} reduce={reduce} />
            <span className="hidden sm:inline font-[JetBrains_Mono] text-[12px] text-[var(--starry-white)]">Tour with&nbsp;Cosmo</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Guide;
