'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* ================================================================== */
/*  Realistic SVG space craft & rocks (gradient-shaded)                */
/*  Each takes a unique `uid` so gradient ids never collide.           */
/* ================================================================== */

type Kind = 'rocket' | 'asteroid' | 'ship' | 'satellite' | 'comet' | 'meteor';

// [width, height] aspect used to size the SVG from a base dimension
const ASPECT: Record<Kind, [number, number]> = {
  rocket: [0.5, 1],
  asteroid: [1, 1],
  ship: [1, 0.6],
  satellite: [1, 0.5],
  comet: [1, 0.42],
  meteor: [1, 0.34],
};

const Rocket: React.FC<{ uid: string }> = ({ uid }) => (
  <svg viewBox="0 0 48 96" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8a8f98" />
        <stop offset="0.35" stopColor="#f4f6fb" />
        <stop offset="0.65" stopColor="#dfe3ea" />
        <stop offset="1" stopColor="#6b7078" />
      </linearGradient>
      <linearGradient id={`nose-${uid}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#b91c1c" />
        <stop offset="0.5" stopColor="#ef4444" />
        <stop offset="1" stopColor="#7f1d1d" />
      </linearGradient>
      <radialGradient id={`win-${uid}`} cx="0.35" cy="0.35" r="0.8">
        <stop offset="0" stopColor="#e0faff" />
        <stop offset="0.5" stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0c4a6e" />
      </radialGradient>
      <linearGradient id={`flame-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff7cc" />
        <stop offset="0.4" stopColor="#ffb703" />
        <stop offset="0.8" stopColor="#fb5607" />
        <stop offset="1" stopColor="#e23b0e" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* flame */}
    <g className="so-flame" style={{ transformOrigin: '24px 78px' }}>
      <path d="M18 78 Q24 118 30 78 Q24 88 18 78Z" fill={`url(#flame-${uid})`} />
      <path d="M21 78 Q24 102 27 78Z" fill="#fff7cc" opacity="0.9" />
    </g>
    {/* fins */}
    <path d="M14 58 L4 82 L14 78Z" fill={`url(#nose-${uid})`} />
    <path d="M34 58 L44 82 L34 78Z" fill={`url(#nose-${uid})`} />
    {/* body */}
    <path d="M16 26 Q16 20 24 18 Q32 20 32 26 L32 78 L16 78Z" fill={`url(#body-${uid})`} stroke="#2b2f36" strokeWidth="0.6" />
    {/* nose */}
    <path d="M24 0 Q34 12 32 26 L16 26 Q14 12 24 0Z" fill={`url(#nose-${uid})`} />
    {/* window */}
    <circle cx="24" cy="40" r="6" fill={`url(#win-${uid})`} stroke="#cbd5e1" strokeWidth="1" />
    {/* rivets / shading */}
    <line x1="24" y1="30" x2="24" y2="76" stroke="#ffffff" strokeWidth="0.6" opacity="0.3" />
  </svg>
);

const Asteroid: React.FC<{ uid: string }> = ({ uid }) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <defs>
      <radialGradient id={`rock-${uid}`} cx="0.38" cy="0.32" r="0.85">
        <stop offset="0" stopColor="#9a8f82" />
        <stop offset="0.5" stopColor="#5c534a" />
        <stop offset="1" stopColor="#2a2622" />
      </radialGradient>
    </defs>
    <path
      d="M22 6 L40 4 L54 16 L60 34 L52 52 L34 60 L14 54 L4 36 L8 16 Z"
      fill={`url(#rock-${uid})`}
      stroke="#1c1917"
      strokeWidth="1"
    />
    <circle cx="26" cy="24" r="6" fill="#000" opacity="0.28" />
    <circle cx="42" cy="38" r="4.5" fill="#000" opacity="0.25" />
    <circle cx="34" cy="48" r="3" fill="#000" opacity="0.22" />
    <circle cx="20" cy="40" r="2.5" fill="#000" opacity="0.2" />
    {/* rim light */}
    <path d="M22 6 L40 4 L54 16" fill="none" stroke="#d6c7b0" strokeWidth="1.4" opacity="0.5" />
  </svg>
);

// Reuses the custom cursor's CSS-drawn UFO (classes defined in globals.css).
const Ship: React.FC<{ uid: string }> = () => (
  <div className="ufo">
    <div className="ufo-body">
      <div className="ufo-dome">
        <div className="alien">
          <div className="alien-head">
            <div className="alien-eyes">
              <div className="alien-eye" />
              <div className="alien-eye" />
            </div>
          </div>
          <div className="alien-body" />
        </div>
      </div>
      <div className="ufo-lights">
        <div className="ufo-light" />
        <div className="ufo-light" />
        <div className="ufo-light" />
      </div>
    </div>
    <div className="flames">
      <div className="flame" />
      <div className="flame" />
      <div className="flame" />
    </div>
  </div>
);

const Satellite: React.FC<{ uid: string }> = ({ uid }) => (
  <svg viewBox="0 0 96 44" width="100%" height="100%">
    <defs>
      <linearGradient id={`panel-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1e3a8a" />
        <stop offset="0.5" stopColor="#2563eb" />
        <stop offset="1" stopColor="#1e40af" />
      </linearGradient>
      <linearGradient id={`satbody-${uid}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fbbf24" />
        <stop offset="0.5" stopColor="#fef3c7" />
        <stop offset="1" stopColor="#b45309" />
      </linearGradient>
    </defs>
    {/* panels */}
    {[6, 66].map((px) => (
      <g key={px}>
        <rect x={px} y="12" width="24" height="20" fill={`url(#panel-${uid})`} stroke="#0f172a" strokeWidth="0.6" />
        <line x1={px + 8} y1="12" x2={px + 8} y2="32" stroke="#0f172a" strokeWidth="0.5" />
        <line x1={px + 16} y1="12" x2={px + 16} y2="32" stroke="#0f172a" strokeWidth="0.5" />
        <line x1={px} y1="22" x2={px + 24} y2="22" stroke="#0f172a" strokeWidth="0.5" />
      </g>
    ))}
    {/* struts */}
    <line x1="30" y1="22" x2="40" y2="22" stroke="#94a3b8" strokeWidth="2" />
    <line x1="56" y1="22" x2="66" y2="22" stroke="#94a3b8" strokeWidth="2" />
    {/* body */}
    <rect x="38" y="12" width="20" height="20" rx="2" fill={`url(#satbody-${uid})`} stroke="#78350f" strokeWidth="0.6" />
    {/* dish */}
    <ellipse cx="48" cy="8" rx="7" ry="3" fill="#e5e7eb" stroke="#64748b" strokeWidth="0.6" />
    <line x1="48" y1="8" x2="48" y2="12" stroke="#94a3b8" strokeWidth="1" />
  </svg>
);

const Comet: React.FC<{ uid: string }> = ({ uid }) => (
  <svg viewBox="0 0 120 50" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id={`tail-${uid}`} x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#a5f3fc" stopOpacity="0.9" />
        <stop offset="0.4" stopColor="#38bdf8" stopOpacity="0.5" />
        <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`head-${uid}`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.5" stopColor="#bae6fd" />
        <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M108 25 L10 15 Q0 25 10 35 Z" fill={`url(#tail-${uid})`} />
    <circle cx="104" cy="25" r="12" fill={`url(#head-${uid})`} />
    <circle cx="104" cy="25" r="4.5" fill="#ffffff" />
  </svg>
);

// Blazing meteor: a heated rock head at the right with a long flaming trail.
// Drawn pointing +x (head leading); rotated along travel direction at runtime.
const Meteor: React.FC<{ uid: string }> = ({ uid }) => (
  <svg viewBox="0 0 200 68" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id={`mtail-${uid}`} x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#fff7cc" stopOpacity="0.95" />
        <stop offset="0.18" stopColor="#ffb703" stopOpacity="0.85" />
        <stop offset="0.5" stopColor="#fb5607" stopOpacity="0.55" />
        <stop offset="0.8" stopColor="#e11d00" stopOpacity="0.2" />
        <stop offset="1" stopColor="#e11d00" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`mcore-${uid}`} x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="0.4" stopColor="#ffe08a" stopOpacity="0.7" />
        <stop offset="1" stopColor="#ff8a00" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`mglow-${uid}`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff2b0" stopOpacity="0.9" />
        <stop offset="0.5" stopColor="#ff7a18" stopOpacity="0.5" />
        <stop offset="1" stopColor="#ff7a18" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`mrock-${uid}`} cx="0.4" cy="0.35" r="0.85">
        <stop offset="0" stopColor="#b9a893" />
        <stop offset="0.55" stopColor="#5c4a3a" />
        <stop offset="1" stopColor="#241b14" />
      </radialGradient>
    </defs>
    {/* outer flaming trail (flickers) */}
    <g className="so-meteor" style={{ transformOrigin: '170px 34px' }}>
      <path d="M172 34 L14 18 Q2 34 14 50 Z" fill={`url(#mtail-${uid})`} />
      <path d="M172 34 L40 26 Q30 34 40 42 Z" fill={`url(#mcore-${uid})`} />
    </g>
    {/* white-hot glow around the head */}
    <circle cx="170" cy="34" r="22" fill={`url(#mglow-${uid})`} />
    {/* heated rock */}
    <path d="M162 22 L176 20 L184 30 L182 42 L172 48 L160 44 L156 32 Z" fill={`url(#mrock-${uid})`} stroke="#1c1005" strokeWidth="0.8" />
    <circle cx="168" cy="30" r="2.6" fill="#000" opacity="0.3" />
    <circle cx="176" cy="38" r="2" fill="#000" opacity="0.28" />
    {/* leading heated rim */}
    <path d="M176 20 L184 30 L182 42" fill="none" stroke="#ffb703" strokeWidth="1.6" opacity="0.8" />
  </svg>
);

const ART: Record<Kind, React.FC<{ uid: string }>> = {
  rocket: Rocket,
  asteroid: Asteroid,
  ship: Ship,
  satellite: Satellite,
  comet: Comet,
  meteor: Meteor,
};

/* ================================================================== */
/*  Object model + spawner                                             */
/* ================================================================== */

interface SpaceObj {
  id: number;
  kind: Kind;
  base: number; // px (larger dimension)
  depth: number; // 0.35 (far) .. 1.1 (near)
  duration: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  rotFrom: number;
  rotTo: number;
  scaleFrom: number;
  scaleTo: number;
  approach: boolean;
  delay: number;
}

// meteors show up a little more often — they're the eye-catcher
const KINDS: Kind[] = ['rocket', 'asteroid', 'ship', 'satellite', 'comet', 'meteor', 'meteor'];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

let seq = 0;

function makeObject(vw: number, vh: number): SpaceObj {
  const kind = pick(KINDS);
  const depth = rand(0.4, 1.05);
  const base = rand(46, 150) * depth * (kind === 'comet' ? 1.4 : kind === 'meteor' ? 1.5 : 1);
  const margin = 260;

  // rockets & comets sometimes fly toward the camera and past
  const approach = (kind === 'rocket' || kind === 'comet') && Math.random() < 0.5;

  if (approach) {
    const sx = rand(vw * 0.3, vw * 0.7);
    const sy = rand(vh * 0.3, vh * 0.7);
    const ang = rand(0, Math.PI * 2);
    const dist = Math.max(vw, vh) * 1.2;
    const to = { x: sx + Math.cos(ang) * dist, y: sy + Math.sin(ang) * dist };
    const dirDeg = (Math.atan2(to.y - sy, to.x - sx) * 180) / Math.PI;
    return {
      id: seq++, kind, base, depth,
      duration: rand(7, 12),
      from: { x: sx, y: sy },
      to,
      rotFrom: kind === 'rocket' ? dirDeg + 90 : dirDeg,
      rotTo: kind === 'rocket' ? dirDeg + 90 : dirDeg,
      scaleFrom: 0.12,
      scaleTo: rand(1.8, 3),
      approach: true,
      delay: 0,
    };
  }

  // drift across the void, edge to edge
  const side = Math.floor(rand(0, 4));
  let from = { x: 0, y: 0 };
  let to = { x: 0, y: 0 };
  if (side === 0) { from = { x: -margin, y: rand(0, vh) }; to = { x: vw + margin, y: rand(0, vh) }; }
  else if (side === 1) { from = { x: vw + margin, y: rand(0, vh) }; to = { x: -margin, y: rand(0, vh) }; }
  else if (side === 2) { from = { x: rand(0, vw), y: -margin }; to = { x: rand(0, vw), y: vh + margin }; }
  else { from = { x: rand(0, vw), y: vh + margin }; to = { x: rand(0, vw), y: -margin }; }

  const dirDeg = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
  const spin = kind === 'asteroid' || kind === 'satellite' ? rand(-120, 120) : 0;
  const orient = kind === 'rocket' ? dirDeg + 90 : kind === 'comet' || kind === 'meteor' ? dirDeg : 0;

  // meteors streak FAST; everything else drifts slowly with depth
  const duration = kind === 'meteor' ? rand(1.6, 3.2) : (rand(16, 30) / depth) * 0.7;

  return {
    id: seq++, kind, base, depth,
    duration,
    from, to,
    rotFrom: orient,
    rotTo: orient + spin,
    scaleFrom: 1,
    scaleTo: 1,
    approach: false,
    delay: 0,
  };
}

// A comet shower: several comets streaking in parallel, staggered in time.
function makeShower(vw: number, vh: number): SpaceObj[] {
  const n = Math.round(rand(4, 7));
  const margin = 300;
  // roughly diagonal downward, slightly randomized per shower
  const angDeg = rand(0, 1) < 0.5 ? rand(55, 75) : rand(105, 125); // down-right or down-left
  const ang = (angDeg * Math.PI) / 180;
  const dirX = Math.cos(ang);
  const dirY = Math.sin(ang);
  const dist = Math.max(vw, vh) * 1.7;
  // entry band across the top, offset upstream so they enter over time
  const spread = vw * 1.1;
  const bandX0 = rand(-vw * 0.1, vw * 0.2);

  return Array.from({ length: n }).map((_, i) => {
    const depth = rand(0.55, 1.0);
    const meteor = Math.random() < 0.3; // sprinkle a few fireballs into the shower
    const kind: Kind = meteor ? 'meteor' : 'comet';
    const base = rand(48, 110) * depth * (meteor ? 1.4 : 1);
    const fx = bandX0 + (spread / n) * i + rand(-40, 40) - dirX * margin;
    const fy = -margin + rand(-80, 40) - dirY * 40;
    const from = { x: fx, y: fy };
    const to = { x: fx + dirX * dist, y: fy + dirY * dist };
    return {
      id: seq++, kind, base, depth,
      duration: rand(2.8, 4.6),
      from, to,
      rotFrom: angDeg, rotTo: angDeg,
      scaleFrom: 1, scaleTo: 1,
      approach: false,
      delay: i * rand(0.18, 0.5),
    };
  });
}

const SpaceObjects: React.FC<{ max?: number }> = ({ max = 4 }) => {
  const [objects, setObjects] = useState<SpaceObj[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (reduced.current || size.w === 0) return;
    let timer: ReturnType<typeof setTimeout>;
    let mounted = true;

    const spawn = () => {
      if (!mounted) return;
      setObjects((cur) => {
        if (cur.length >= max) return cur;
        // ~1 in 5 spawns is a comet shower burst (bypasses the soft cap)
        if (Math.random() < 0.2) return [...cur, ...makeShower(size.w, size.h)];
        return [...cur, makeObject(size.w, size.h)];
      });
      timer = setTimeout(spawn, rand(3500, 8000));
    };
    // stagger a first couple in
    timer = setTimeout(spawn, 1200);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [size, max]);

  const remove = (id: number) => setObjects((cur) => cur.filter((o) => o.id !== id));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 10 }} aria-hidden>
      <AnimatePresence>
        {objects.map((o) => {
          const Art = ART[o.kind];
          const [aw, ah] = ASPECT[o.kind];
          // The UFO ship is a fixed 60x30 CSS craft — scale it to the target size.
          const isShip = o.kind === 'ship';
          const w = isShip ? 60 : o.base * aw;
          const h = isShip ? 30 : o.base * ah;
          const iscale = isShip ? o.base / 60 : 1;
          const isFire = o.kind === 'meteor';
          // fireballs stay crisp with a hot glow; everything else gets depth blur
          const blur = isFire ? 0 : (1.1 - o.depth) * 1.8;
          const glow = isFire ? ' drop-shadow(0 0 10px rgba(255,140,32,0.85)) drop-shadow(0 0 22px rgba(255,80,0,0.5))' : '';
          const opacity = Math.min(0.95, 0.45 + o.depth * 0.5);
          return (
            <motion.div
              key={o.id}
              className="absolute top-0 left-0"
              style={{ width: w, height: h, filter: `blur(${blur.toFixed(2)}px)${glow}`, marginLeft: -w / 2, marginTop: -h / 2 }}
              initial={{ x: o.from.x, y: o.from.y, rotate: o.rotFrom, scale: o.scaleFrom * iscale, opacity: 0 }}
              animate={{
                x: o.to.x,
                y: o.to.y,
                rotate: o.rotTo,
                scale: o.scaleTo * iscale,
                opacity: [0, opacity, opacity, 0],
              }}
              transition={{
                delay: o.delay,
                duration: o.duration,
                ease: o.approach ? 'easeIn' : 'linear',
                opacity: { delay: o.delay, duration: o.duration, times: [0, 0.12, 0.85, 1] },
              }}
              onAnimationComplete={() => remove(o.id)}
            >
              <Art uid={String(o.id)} />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes so-flame-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.95; }
          50% { transform: scaleY(1.25) scaleX(0.85); opacity: 0.7; }
        }
        .so-flame { animation: so-flame-flicker 0.18s infinite; }
        @keyframes so-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        .so-blink { animation: so-blink 1.1s infinite; }
        @keyframes so-meteor-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.95; }
          40% { transform: scaleY(0.82) scaleX(1.05); opacity: 0.7; }
          70% { transform: scaleY(1.15) scaleX(0.95); opacity: 1; }
        }
        .so-meteor { animation: so-meteor-flicker 0.09s infinite; }
      `}</style>
    </div>
  );
};

export default SpaceObjects;
