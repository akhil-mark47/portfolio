'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPython, FaReact, FaAws } from 'react-icons/fa';
import { SiNextdotjs, SiDocker, SiTensorflow, SiPostgresql, SiKubernetes } from 'react-icons/si';
import { FaFlutter } from 'react-icons/fa6';

/* ------------------------------------------------------------------ */
/*  Symbols = real skills, each with what it does + where it's used    */
/* ------------------------------------------------------------------ */
type Sym = { name: string; color: string; icon: JSX.Element; does: string; used: string };

const IC = 40;
const SYMBOLS: Sym[] = [
  { name: 'Python', color: '#4B8BBE', icon: <FaPython size={IC} />,
    does: 'A versatile, readable language for AI, data science and automation.',
    used: 'ML models, backend APIs, data pipelines and quick scripting.' },
  { name: 'React', color: '#61DAFB', icon: <FaReact size={IC} />,
    does: 'A library for building fast, component-based user interfaces.',
    used: 'This portfolio, web apps, dashboards and single-page apps.' },
  { name: 'Next.js', color: '#e5e7eb', icon: <SiNextdotjs size={IC} />,
    does: 'The React framework for production — routing, SSR and SSG out of the box.',
    used: 'Full-stack sites, server-rendered pages — and this very site.' },
  { name: 'AWS', color: '#FF9900', icon: <FaAws size={IC} />,
    does: "Amazon's cloud platform for scalable, on-demand infrastructure.",
    used: 'Hosting, S3 storage, Lambda/EC2 compute and deployments.' },
  { name: 'Docker', color: '#2496ED', icon: <SiDocker size={IC} />,
    does: 'Packages an app and its dependencies into portable containers.',
    used: 'Reproducible deploys, microservices and clean local dev.' },
  { name: 'TensorFlow', color: '#FF6F00', icon: <SiTensorflow size={IC} />,
    does: 'An end-to-end platform for building and training machine-learning models.',
    used: 'Neural networks, deep learning and model serving.' },
  { name: 'PostgreSQL', color: '#4169E1', icon: <SiPostgresql size={IC} />,
    does: 'A powerful, reliable open-source relational database.',
    used: 'Storing app data, analytics and transactional systems.' },
  { name: 'Kubernetes', color: '#326CE5', icon: <SiKubernetes size={IC} />,
    does: 'Orchestrates containers across machines at scale.',
    used: 'Auto-scaling, self-healing and cloud-native deployments.' },
  { name: 'Flutter', color: '#02569B', icon: <FaFlutter size={IC} />,
    does: "Google's toolkit for building cross-platform apps from one codebase.",
    used: 'iOS and Android apps that share a single UI.' },
];

/* ------------------------------------------------------------------ */
/*  Reel mechanics                                                     */
/* ------------------------------------------------------------------ */
const CELL = 74;          // px per symbol cell
const ROWS = 3;           // visible rows (middle = payline)
const LAND = 20;          // strip index that lands on the payline
const STRIP_LEN = LAND + 2;
const BET = 5;
const PAYOUT = 50;
const WIN_CHANCE = 0.32;  // weighted so players actually hit jackpots

const rnd = () => Math.floor(Math.random() * SYMBOLS.length);

type Reel = { spinId: number; items: number[]; target: number; dur: number; spinning: boolean };

function buildItems(prev: number, target: number): number[] {
  const items = Array.from({ length: STRIP_LEN }, rnd);
  items[1] = prev;      // keep the current symbol at rest → no jump when the spin starts
  items[LAND] = target; // this is what lands on the payline
  return items;
}
function initReels(): Reel[] {
  return Array.from({ length: 3 }, () => {
    const t = rnd();
    const items = Array.from({ length: STRIP_LEN }, rnd);
    items[LAND] = t;
    return { spinId: 0, items, target: t, dur: 0, spinning: false };
  });
}

const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>(initReels);
  const [busy, setBusy] = useState(false);
  const [credits, setCredits] = useState(100);
  const [win, setWin] = useState<Sym | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [muted, setMuted] = useState(false);
  const [leverDown, setLeverDown] = useState(false);

  /* ---- Web-Audio SFX (no assets) ---- */
  const acRef = useRef<AudioContext | null>(null);
  const ac = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!acRef.current) {
      const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      acRef.current = new C();
    }
    if (acRef.current.state === 'suspended') acRef.current.resume();
    return acRef.current;
  }, []);
  const tone = useCallback((type: OscillatorType, from: number, to: number, dur: number, vol: number, at = 0) => {
    if (muted) return;
    const c = ac(); if (!c) return;
    const t = c.currentTime + at;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(from, t);
    if (to !== from) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }, [ac, muted]);
  const sfxSpin = () => tone('sawtooth', 90, 240, 2.4, 0.05);
  const sfxTick = () => tone('square', 520, 520, 0.07, 0.06);
  const sfxWin = () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone('triangle', f, f, 0.35, 0.11, i * 0.11));

  /* ---- Spin ---- */
  const spin = () => {
    if (busy || credits < BET) return;
    sfxSpin();
    setBusy(true); setWin(null); setShowModal(false); setLastWin(0);
    setCredits((c) => c - BET);
    setLeverDown(true);
    setTimeout(() => setLeverDown(false), 320);

    const forceWin = Math.random() < WIN_CHANCE;
    const winSym = rnd();
    const targets = reels.map(() => (forceWin ? winSym : rnd()));

    setReels((prev) =>
      prev.map((r, i) => ({
        spinId: r.spinId + 1,
        items: buildItems(r.target, targets[i]),
        target: targets[i],
        dur: 1.5 + i * 0.65,
        spinning: true,
      }))
    );

    const total = (1.5 + 2 * 0.65) * 1000 + 320;
    window.setTimeout(() => {
      setBusy(false);
      const [a, b, c] = targets;
      if (a === b && b === c) {
        setCredits((cr) => cr + PAYOUT);
        setLastWin(PAYOUT);
        setWin(SYMBOLS[a]);
        setShowModal(true);
        sfxWin();
      }
    }, total);
  };

  const onReelStop = (i: number) => {
    setReels((prev) => prev.map((r, idx) => (idx === i ? { ...r, spinning: false } : r)));
    sfxTick();
  };

  const landingY = -((LAND - 1) * CELL);

  return (
    <div className="w-full flex flex-col items-center text-[var(--starry-white)]">
      {/* Header / credits */}
      <div className="w-full max-w-[340px] flex items-center justify-between mb-3">
        <div className="text-[10px] tracking-[0.2em] text-[#f5c542]">★ SKILL&nbsp;JACKPOT ★</div>
        <button onClick={() => setMuted((m) => !m)} className="text-xs text-gray-400 hover:text-white" aria-label="toggle sound">
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* ---- Cabinet ---- */}
      <div
        className="relative rounded-[22px] p-4"
        style={{
          background: 'linear-gradient(180deg,#241247 0%,#160a2e 55%,#0c0620 100%)',
          border: '2px solid rgba(245,197,66,0.55)',
          boxShadow: '0 0 0 3px rgba(147,51,234,0.35), 0 24px 60px -20px rgba(0,0,0,0.9), inset 0 2px 10px rgba(255,255,255,0.06)',
        }}
      >
        {/* marquee bulbs */}
        <div className="absolute inset-x-3 -top-1 flex justify-between">
          {Array.from({ length: 11 }).map((_, i) => (
            <motion.span key={i} className="h-1.5 w-1.5 rounded-full"
              style={{ background: i % 2 ? '#f5c542' : '#ff5db1', boxShadow: '0 0 6px currentColor' }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1, delay: i * 0.09, repeat: Infinity }} />
          ))}
        </div>

        {/* marquee title */}
        <div className="text-center mb-3">
          <div className="font-extrabold tracking-[0.15em] text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(90deg,#f5c542,#ff5db1,#7dd3fc,#f5c542)', fontSize: 18 }}>
            AK&apos;S GALAXY SLOTS
          </div>
        </div>

        {/* ---- Reels ---- */}
        <div className="relative rounded-xl p-2"
          style={{ background: 'linear-gradient(180deg,#05040d,#0b0820)', border: '1px solid rgba(147,51,234,0.4)', boxShadow: 'inset 0 0 22px rgba(0,0,0,0.85)' }}>
          <div className="flex gap-2 justify-center">
            {reels.map((reel, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg"
                style={{
                  width: CELL, height: ROWS * CELL,
                  background: 'linear-gradient(180deg,#141026,#1c1636)',
                  border: '1px solid rgba(125,211,252,0.25)',
                }}>
                <motion.div
                  key={reel.spinId}
                  initial={{ y: 0 }}
                  animate={{ y: landingY }}
                  transition={reel.spinId === 0 ? { duration: 0 } : { duration: reel.dur, ease: [0.12, 0.6, 0.2, 1] }}
                  onAnimationComplete={() => reel.spinId > 0 && onReelStop(i)}
                  style={{ filter: reel.spinning ? 'blur(1.4px)' : 'none', willChange: 'transform' }}
                >
                  {reel.items.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-center" style={{ height: CELL, color: SYMBOLS[s].color }}>
                      <span style={{ filter: `drop-shadow(0 0 6px ${SYMBOLS[s].color}88)` }}>{SYMBOLS[s].icon}</span>
                    </div>
                  ))}
                </motion.div>

                {/* glass gradient over each reel */}
                <div className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(180deg,rgba(5,4,13,0.92),transparent 26%,transparent 74%,rgba(5,4,13,0.92))' }} />
              </div>
            ))}
          </div>

          {/* payline */}
          <div className="pointer-events-none absolute left-1 right-1" style={{ top: 8 + CELL + CELL / 2 - 1 }}>
            <div className="h-[2px] w-full rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#f5c542,transparent)', boxShadow: '0 0 10px #f5c542' }} />
            <span className="absolute -left-1 -top-[7px] text-[#f5c542] text-xs">▸</span>
            <span className="absolute -right-1 -top-[7px] text-[#f5c542] text-xs">◂</span>
          </div>
        </div>

        {/* ---- Controls ---- */}
        <div className="mt-4 flex items-end justify-between gap-3">
          {/* credit / win readouts */}
          <div className="font-mono text-[11px] leading-tight">
            <div className="text-gray-400">CREDITS</div>
            <div className="text-[#7dd3fc] text-lg tabular-nums" style={{ textShadow: '0 0 8px rgba(125,211,252,0.6)' }}>{credits}</div>
            <div className="mt-1 text-gray-400">WIN</div>
            <div className="text-[#f5c542] text-lg tabular-nums" style={{ textShadow: '0 0 8px rgba(245,197,66,0.6)' }}>{lastWin}</div>
          </div>

          {/* SPIN */}
          <motion.button
            onClick={spin}
            disabled={busy || credits < BET}
            whileTap={{ scale: 0.94 }}
            className="relative h-20 w-20 rounded-full font-extrabold text-sm tracking-wide disabled:opacity-50"
            style={{
              background: busy ? 'radial-gradient(circle at 35% 30%,#8b93a7,#3c4152)' : 'radial-gradient(circle at 35% 30%,#ff8a8a,#e0243b 60%,#8a0f22)',
              color: '#fff', border: '3px solid rgba(245,197,66,0.8)',
              boxShadow: '0 6px 0 #6b0f1e, 0 10px 22px rgba(224,36,59,0.5), inset 0 2px 8px rgba(255,255,255,0.4)',
            }}
          >
            {busy ? '···' : 'SPIN'}
          </motion.button>

          {/* lever */}
          <button onClick={spin} disabled={busy || credits < BET} aria-label="pull lever" className="relative h-24 w-8 flex flex-col items-center justify-start">
            <div className="w-2 h-full rounded-full" style={{ background: 'linear-gradient(180deg,#3a3350,#171327)' }} />
            <motion.div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
              animate={{ top: leverDown ? '55%' : '2%' }} transition={{ type: 'spring', stiffness: 500, damping: 22 }}>
              <div className="h-5 w-5 rounded-full" style={{ background: 'radial-gradient(circle at 35% 30%,#ff8a8a,#e0243b)', boxShadow: '0 0 10px rgba(224,36,59,0.8)', border: '2px solid #f5c542' }} />
            </motion.div>
          </button>
        </div>

        {credits < BET && (
          <button onClick={() => setCredits(100)} className="mt-3 w-full rounded-lg py-2 text-xs font-bold tracking-wide"
            style={{ background: 'linear-gradient(90deg,#f5c542,#ff5db1)', color: '#160a2e' }}>
            ⟳ INSERT COIN — REFILL 100
          </button>
        )}
      </div>

      <p className="mt-3 text-center text-[11px] text-gray-500 font-mono max-w-[320px]">
        Match <span className="text-[#f5c542]">3 of a kind</span> on the payline to win — and discover what that skill does.
      </p>

      {/* ---- Jackpot modal ---- */}
      <AnimatePresence>
        {showModal && win && (
          <motion.div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
            {/* coin rain */}
            {Array.from({ length: 26 }).map((_, i) => (
              <motion.span key={i} className="absolute text-xl" style={{ left: `${(i * 3.8) % 100}%` }}
                initial={{ top: '-8%', opacity: 0, rotate: 0 }}
                animate={{ top: '108%', opacity: [0, 1, 1, 0], rotate: 360 }}
                transition={{ duration: 1.6 + (i % 5) * 0.3, delay: (i % 7) * 0.12, repeat: Infinity, ease: 'easeIn' }}>
                {i % 2 ? '🪙' : '✨'}
              </motion.span>
            ))}

            <motion.div onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl p-6 text-center"
              style={{ background: 'linear-gradient(180deg,#241247,#0c0620)', border: '2px solid rgba(245,197,66,0.7)', boxShadow: '0 0 50px rgba(245,197,66,0.4)' }}
              initial={{ scale: 0.7, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
              <motion.div className="text-2xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg,#f5c542,#ff5db1,#7dd3fc,#f5c542)' }}
                animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                YOU&apos;VE WON!
              </motion.div>
              <div className="text-[#f5c542] text-sm font-mono mt-1">+{PAYOUT} credits</div>

              <motion.div className="mx-auto my-4 h-24 w-24 rounded-2xl flex items-center justify-center"
                style={{ color: win.color, background: 'radial-gradient(circle,rgba(255,255,255,0.08),transparent 70%)', border: `2px solid ${win.color}`, boxShadow: `0 0 26px ${win.color}88` }}
                animate={{ rotate: [0, -6, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <span style={{ transform: 'scale(1.5)' }}>{win.icon}</span>
              </motion.div>

              <div className="text-xl font-bold" style={{ color: win.color }}>{win.name}</div>

              <div className="mt-4 text-left space-y-3 font-mono text-[12.5px]">
                <div>
                  <div className="text-[10px] tracking-[0.18em] text-[#7dd3fc] uppercase mb-1">What it does</div>
                  <p className="text-gray-200 leading-relaxed">{win.does}</p>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.18em] text-[#ff5db1] uppercase mb-1">Where it&apos;s used</div>
                  <p className="text-gray-200 leading-relaxed">{win.used}</p>
                </div>
              </div>

              <button onClick={() => setShowModal(false)}
                className="mt-6 w-full rounded-xl py-2.5 font-bold tracking-wide"
                style={{ background: 'linear-gradient(90deg,#e0243b,#ff5db1)', color: '#fff', boxShadow: '0 4px 14px rgba(224,36,59,0.5)' }}>
                SPIN AGAIN ▸
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlotMachine;
