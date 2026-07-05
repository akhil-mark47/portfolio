'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Starfield from '../StarField';
import SpaceObjects from '../SpaceObjects';

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

type AppId = 'hobbies' | 'movies' | 'books' | 'music' | 'quotes';

const APPS: { id: AppId; title: string; ext: string; icon: string }[] = [
  { id: 'hobbies', title: 'hobbies', ext: '.dat', icon: '🚀' },
  { id: 'movies', title: 'movies', ext: '.vid', icon: '🎬' },
  { id: 'books', title: 'books', ext: '.txt', icon: '📚' },
  { id: 'music', title: 'music', ext: '.wav', icon: '🎵' },
  { id: 'quotes', title: 'quotes', ext: '.log', icon: '💭' },
];

const HOBBIES = [
  { icon: '🚀', text: 'Exploring emerging tech, AI, and LLMs' },
  { icon: '⌨️', text: 'Coding new universes through web & AI development' },
  { icon: '🔭', text: 'Amateur astronomy and stargazing' },
  { icon: '🎮', text: 'Sci-fi and strategy games' },
  { icon: '📊', text: 'Visualizing data & uncovering patterns' },
];

const MOVIES = [
  { title: 'Interstellar', note: 'A journey through space and time.', yt: 'zSWdZVtXT7E' },
  { title: 'Blade Runner 2049', note: 'Exploring AI and humanity.', yt: 'gCcx85zbxz4' },
  { title: 'The Matrix', note: 'Reality-bending classic.', yt: 'm8e-FF8MsqU' },
  { title: 'Salaar', note: 'Action-packed thriller starring Prabhas.', yt: '9Im1q4gvk1M' },
  { title: 'The Night Agent', note: 'FBI agent tangled in a vast conspiracy.', yt: 'YDbnY9Obsfs' },
  { title: 'The Recruit', note: 'A CIA lawyer caught in global conflict.', yt: 'czt_Mh_qdsw' },
];

const BOOKS = [
  {
    title: 'Hands-On Large Language Models',
    note: 'Understanding and building LLMs.',
    cover: 'https://raw.githubusercontent.com/HandsOnLLM/Hands-On-Large-Language-Models/main/images/book_cover.png',
  },
  {
    title: 'Hands-On Machine Learning',
    note: 'Scikit-Learn, Keras & TensorFlow.',
    cover: 'https://m.media-amazon.com/images/I/71UF9mDAX3L._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'Practical Statistics for Data Scientists',
    note: 'Core concepts for data analysis.',
    cover: 'https://m.media-amazon.com/images/I/81Sdk02bg+L._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'AI Engineering',
    note: 'Building apps with foundation models — Chip Huyen.',
    cover: 'https://m.media-amazon.com/images/I/815KH9GjFTL._AC_UF1000,1000_QL80_.jpg',
  },
];

const MUSIC = [
  { title: 'All the Stars', artist: 'Kendrick Lamar, SZA', track: '3GCdLUSnKSMJhs4Tj6CV3s' },
  { title: 'Starboy', artist: 'The Weeknd, Daft Punk', track: '7MXVkk9YMctZqd1Srtv4MB' },
  { title: 'Tainu Khabar Nahi', artist: 'Arijit Singh, Sachin-Jigar', track: '1bfWK1SIBYXzWA0Ypt4KlD' },
  { title: "They Don't Care About Us", artist: 'Michael Jackson', track: '3wuCCNCnBhJlwkIJTBZFiv' },
];

const QUOTES = [
  { text: "Opportunities don't happen. You create them.", author: 'Chris Grosser', color: '#22c55e' },
  { text: 'Success is not in what you have, but who you are.', author: 'Bo Bennett', color: '#eab308' },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: 'Vince Lombardi', color: '#ef4444' },
  { text: 'Do what you love and success will follow.', author: 'Meg Whitman', color: '#3b82f6' },
];

const MENUBAR_H = 28; // px
const BOOT_LINES = [
  '> AK//OS v4.8 — cold boot',
  '> mounting /personal_space ............ ok',
  '> loading modules [hobbies · movies · books · music · quotes] ... ok',
  '> calibrating starfield uplink ........ ONLINE',
  '> welcome, akhilvarsh_',
];

/* ================================================================== */
/*  Shared bits                                                        */
/* ================================================================== */

const Equalizer: React.FC<{ active: boolean; bars?: number }> = ({ active, bars = 4 }) => (
  <div className="flex items-end gap-[2px] h-4">
    {Array.from({ length: bars }).map((_, i) => (
      <motion.span
        key={i}
        className="w-[3px] bg-[rgba(59,130,246,0.9)] rounded-sm"
        animate={active ? { height: ['30%', '100%', '45%', '90%', '30%'] } : { height: '30%' }}
        transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ height: '30%' }}
      />
    ))}
  </div>
);

interface WinState {
  x: number;
  y: number;
  w: number;
  h: number;
  max: boolean;
}

/* ================================================================== */
/*  Desktop window (drag / resize / minimize / maximize)               */
/* ================================================================== */

interface OSWindowProps {
  app: (typeof APPS)[number];
  state: WinState;
  z: number;
  focused: boolean;
  minimized: boolean;
  onChange: (patch: Partial<WinState>) => void;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const OSWindow: React.FC<OSWindowProps> = ({
  app, state, z, focused, minimized, onChange, onClose, onMinimize, onFocus, children,
}) => {
  const dragRef = useRef<{ px: number; py: number; ox: number; oy: number; snap: boolean } | null>(null);
  const resizeRef = useRef<{ px: number; py: number; ow: number; oh: number } | null>(null);
  const [snapHint, setSnapHint] = useState(false);

  const onHeaderDown = (e: React.PointerEvent) => {
    // Don't start a drag when pressing a window control (close/min/max) —
    // capturing the pointer here would swallow their click.
    if ((e.target as HTMLElement).closest('button')) return;
    if (state.max) return;
    onFocus();
    dragRef.current = { px: e.clientX, py: e.clientY, ox: state.x, oy: state.y, snap: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onHeaderMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const nx = dragRef.current.ox + (e.clientX - dragRef.current.px);
    const ny = Math.max(MENUBAR_H, dragRef.current.oy + (e.clientY - dragRef.current.py));
    const nearTop = e.clientY <= MENUBAR_H + 6;
    dragRef.current.snap = nearTop;
    setSnapHint(nearTop);
    onChange({ x: nx, y: ny });
  };
  const onHeaderUp = (e: React.PointerEvent) => {
    if (dragRef.current?.snap) onChange({ max: true });
    dragRef.current = null;
    setSnapHint(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const onResizeDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onFocus();
    resizeRef.current = { px: e.clientX, py: e.clientY, ow: state.w, oh: state.h };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onResizeMove = (e: React.PointerEvent) => {
    if (!resizeRef.current) return;
    onChange({
      w: Math.max(360, resizeRef.current.ow + (e.clientX - resizeRef.current.px)),
      h: Math.max(260, resizeRef.current.oh + (e.clientY - resizeRef.current.py)),
    });
  };
  const onResizeUp = (e: React.PointerEvent) => {
    resizeRef.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const geometry: React.CSSProperties = state.max
    ? { top: MENUBAR_H + 8, left: 8, width: 'calc(100% - 16px)', height: `calc(100% - ${MENUBAR_H + 8}px - 104px)` }
    : { top: state.y, left: state.x, width: state.w, height: state.h };

  return (
    <motion.div
      className="absolute"
      style={{ ...geometry, zIndex: z }}
      initial={{ opacity: 0, scale: 0.9, y: 14 }}
      animate={
        minimized
          ? { opacity: 0, scale: 0.15, y: 400, pointerEvents: 'none' }
          : { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' }
      }
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      onMouseDown={onFocus}
    >
      <div
        className={`w-full h-full flex flex-col rounded-xl overflow-hidden border bg-[rgba(10,10,24,0.94)] backdrop-blur-xl transition-shadow ${
          focused
            ? 'border-[rgba(147,51,234,0.55)] shadow-[0_18px_50px_rgba(45,0,247,0.35)]'
            : 'border-[rgba(59,130,246,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Title bar */}
        <div
          className={`flex items-center justify-between px-3 py-2 border-b select-none touch-none ${
            state.max ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          } ${focused ? 'bg-[rgba(147,51,234,0.12)] border-[rgba(147,51,234,0.3)]' : 'bg-[rgba(59,130,246,0.06)] border-[rgba(59,130,246,0.2)]'}`}
          onPointerDown={onHeaderDown}
          onPointerMove={onHeaderMove}
          onPointerUp={onHeaderUp}
          onDoubleClick={() => onChange({ max: !state.max })}
        >
          <div className="flex items-center gap-2 group">
            <button onClick={onClose} className="h-3.5 w-3.5 rounded-full bg-red-500 hover:brightness-125 flex items-center justify-center text-[8px] text-black/60" aria-label="Close">
              <span className="opacity-0 group-hover:opacity-100">×</span>
            </button>
            <button onClick={onMinimize} className="h-3.5 w-3.5 rounded-full bg-yellow-500 hover:brightness-125 flex items-center justify-center text-[8px] text-black/60" aria-label="Minimize">
              <span className="opacity-0 group-hover:opacity-100">−</span>
            </button>
            <button onClick={() => onChange({ max: !state.max })} className="h-3.5 w-3.5 rounded-full bg-green-500 hover:brightness-125 flex items-center justify-center text-[8px] text-black/60" aria-label="Maximize">
              <span className="opacity-0 group-hover:opacity-100">+</span>
            </button>
          </div>
          <span className="text-xs font-[JetBrains Mono] text-[rgba(147,51,234,0.95)] pointer-events-none">
            {app.icon} {app.title}{app.ext}
          </span>
          <span className="w-12" />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 font-[JetBrains Mono]">{children}</div>
      </div>

      {/* snap hint */}
      {snapHint && !state.max && (
        <div className="fixed left-2 right-2 rounded-xl border-2 border-dashed border-[rgba(147,51,234,0.6)] bg-[rgba(147,51,234,0.08)] pointer-events-none"
          style={{ top: MENUBAR_H + 8, height: `calc(100% - ${MENUBAR_H + 8}px - 104px)`, zIndex: 5 }} />
      )}

      {/* resize handle */}
      {!state.max && (
        <div
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize touch-none"
          style={{ zIndex: z + 1 }}
        >
          <div className="absolute bottom-1 right-1 h-2.5 w-2.5 border-r-2 border-b-2 border-[rgba(59,130,246,0.6)]" />
        </div>
      )}
    </motion.div>
  );
};

/* ================================================================== */
/*  Main                                                               */
/* ================================================================== */

const PersonalSpace: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [windows, setWindows] = useState<AppId[]>([]); // z-order (last = top)
  const [minimized, setMinimized] = useState<AppId[]>([]);
  const [winState, setWinState] = useState<Record<string, WinState>>({});

  const [moviePreview, setMoviePreview] = useState<string | null>(null);
  const [activePreviewTitle, setActivePreviewTitle] = useState('');
  const [nowPlaying, setNowPlaying] = useState(MUSIC[1]);
  const [playing, setPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const [sound, setSound] = useState(false);
  const [clock, setClock] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [appleMenu, setAppleMenu] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);

  const navigateToHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  /* Responsive */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Boot */
  useEffect(() => {
    if (booted) return;
    if (bootStep >= BOOT_LINES.length) {
      const t = setTimeout(() => setBooted(true), 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootStep((s) => s + 1), 360);
    return () => clearTimeout(t);
  }, [bootStep, booted]);

  /* Clock */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  /* Parallax (desktop) + ESC + close menus */
  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (moviePreview) return setMoviePreview(null);
      setWindows((w) => w.slice(0, -1));
    };
    const onClick = () => {
      setAppleMenu(false);
      setCtxMenu(null);
    };
    if (!isMobile) window.addEventListener('mousemove', onMove);
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, [moviePreview, isMobile]);

  /* Ambient hum (Web Audio, no asset) */
  const audioRef = useRef<{ ctx: AudioContext } | null>(null);
  useEffect(() => {
    if (!sound) {
      if (audioRef.current) {
        const ref = audioRef.current;
        setTimeout(() => ref.ctx.close().catch(() => {}), 300);
        audioRef.current = null;
      }
      return;
    }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    [55, 82.4, 110].forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.6 : 0.25;
      osc.connect(g);
      g.connect(master);
      osc.start();
    });
    master.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.8);
    audioRef.current = { ctx };
    return () => {
      ctx.close().catch(() => {});
      audioRef.current = null;
    };
  }, [sound]);

  /* Window manager */
  const focusedApp = [...windows].reverse().find((id) => !minimized.includes(id)) ?? null;

  const focusApp = (id: AppId) => setWindows((w) => [...w.filter((x) => x !== id), id]);

  const openApp = (id: AppId) => {
    setWinState((s) => {
      if (s[id]) return s;
      const idx = Object.keys(s).length;
      const w = Math.min(720, typeof window !== 'undefined' ? window.innerWidth - 40 : 720);
      const h = Math.min(540, typeof window !== 'undefined' ? window.innerHeight - 180 : 540);
      const cx = typeof window !== 'undefined' ? (window.innerWidth - w) / 2 : 60;
      const cy = typeof window !== 'undefined' ? (window.innerHeight - h) / 2 - 20 : 60;
      return { ...s, [id]: { x: cx + idx * 26, y: Math.max(MENUBAR_H + 8, cy + idx * 26), w, h, max: false } };
    });
    setMinimized((m) => m.filter((x) => x !== id));
    focusApp(id);
    setAppleMenu(false);
    setCtxMenu(null);
  };

  const closeApp = (id: AppId) => {
    setWindows((w) => w.filter((x) => x !== id));
    setMinimized((m) => m.filter((x) => x !== id));
    setWinState((s) => {
      const n = { ...s };
      delete n[id];
      return n;
    });
  };
  const minimizeApp = (id: AppId) => setMinimized((m) => (m.includes(id) ? m : [...m, id]));
  const patchWin = (id: AppId, patch: Partial<WinState>) =>
    setWinState((s) => ({ ...s, [id]: { ...s[id], ...patch } }));

  const dockClick = (id: AppId) => {
    if (!windows.includes(id)) return openApp(id);
    if (minimized.includes(id)) {
      setMinimized((m) => m.filter((x) => x !== id));
      return focusApp(id);
    }
    if (focusedApp === id) return minimizeApp(id);
    focusApp(id);
  };

  const playTrailer = (yt: string, title: string) => {
    setMoviePreview(`https://www.youtube.com/embed/${yt}?autoplay=1`);
    setActivePreviewTitle(title);
  };

  /* -------------------------------------------------------------- */
  /*  App content (shared desktop + mobile)                         */
  /* -------------------------------------------------------------- */
  const renderApp = (id: AppId) => {
    switch (id) {
      case 'hobbies':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOBBIES.map((h) => (
              <div key={h.text} className="flex items-center gap-3 p-3 rounded-lg border border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.12)] transition-colors">
                <span className="text-2xl">{h.icon}</span>
                <span className="text-sm text-[var(--starry-white)]">{h.text}</span>
              </div>
            ))}
          </div>
        );
      case 'movies':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {MOVIES.map((m) => (
              <button key={m.title} onClick={() => playTrailer(m.yt, m.title)} className="group relative rounded-lg overflow-hidden border border-[rgba(59,130,246,0.25)] text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://img.youtube.com/vi/${m.yt}/hqdefault.jpg`} alt={m.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="h-10 w-10 rounded-full bg-[rgba(147,51,234,0.85)] flex items-center justify-center text-white">▶</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="text-xs font-bold text-white truncate">{m.title}</div>
                  <div className="text-[10px] text-gray-300 truncate">{m.note}</div>
                </div>
              </button>
            ))}
          </div>
        );
      case 'books':
        return (
          <div style={{ perspective: '1200px' }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
            {BOOKS.map((b) => (
              <div key={b.title} className="flex flex-col items-center group">
                <div className="relative transition-transform duration-500 group-hover:[transform:rotateY(-18deg)_translateY(-6px)]" style={{ transformStyle: 'preserve-3d' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.cover} alt={b.title} className="w-24 h-36 object-cover rounded-sm shadow-[6px_6px_16px_rgba(0,0,0,0.6)] border-l-4 border-[rgba(147,51,234,0.6)]" />
                </div>
                <div className="mt-6 text-[11px] text-center text-[var(--starry-white)] leading-tight">{b.title}</div>
                <div className="text-[10px] text-gray-500 text-center">{b.note}</div>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-4 h-1 rounded-full bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.6)] to-transparent shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
          </div>
        );
      case 'music':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.div
                className="relative h-28 w-28 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: 'repeating-radial-gradient(circle, #111 0 2px, #1c1c28 2px 4px)', boxShadow: '0 0 24px rgba(45,0,247,0.4)' }}
                animate={{ rotate: selectedTrack ? 360 : 0 }}
                transition={{ duration: 3, repeat: selectedTrack ? Infinity : 0, ease: 'linear' }}
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]" />
                <div className="absolute h-2 w-2 rounded-full bg-black" />
              </motion.div>
              <div className="flex-1 w-full">
                {selectedTrack ? (
                  <iframe title="Spotify player" className="w-full rounded-lg" height="152" src={`https://open.spotify.com/embed/track/${selectedTrack}?utm_source=generator`} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
                ) : (
                  <div className="text-sm text-gray-400 h-[152px] flex items-center justify-center border border-dashed border-[rgba(59,130,246,0.3)] rounded-lg">Select a track to spin it up ▸</div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {MUSIC.map((t) => {
                const active = selectedTrack === t.track;
                return (
                  <button key={t.track} onClick={() => { setSelectedTrack(t.track); setNowPlaying(t); setPlaying(true); }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg border transition-colors ${active ? 'border-[rgba(147,51,234,0.6)] bg-[rgba(147,51,234,0.12)]' : 'border-[rgba(59,130,246,0.2)] hover:bg-[rgba(59,130,246,0.08)]'}`}>
                    <div className="text-left">
                      <div className="text-sm text-[var(--starry-white)]">{t.title}</div>
                      <div className="text-[11px] text-gray-500">{t.artist}</div>
                    </div>
                    {active ? <Equalizer active /> : <span className="text-[rgba(59,130,246,0.7)]">▶</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 'quotes':
        return (
          <div className="space-y-3">
            {QUOTES.map((q) => (
              <blockquote key={q.author} className="pl-4 py-2 italic text-sm text-[var(--starry-white)] rounded-r-lg bg-[rgba(255,255,255,0.02)]" style={{ borderLeft: `4px solid ${q.color}` }}>
                &ldquo;{q.text}&rdquo;
                <footer className="mt-1 text-xs not-italic" style={{ color: q.color }}>— {q.author}</footer>
              </blockquote>
            ))}
          </div>
        );
    }
  };

  /* -------------------------------------------------------------- */
  /*  Background (shared)                                            */
  /* -------------------------------------------------------------- */
  const Background = (
    <>
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ x: mouse.x * -14, y: mouse.y * -14 }}
        transition={{ type: 'tween', duration: 0.4 }}
      >
        <Starfield />
      </motion.div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10)_0%,rgba(147,51,234,0.05)_35%,transparent_70%)]" />
      <SpaceObjects />
    </>
  );

  /* -------------------------------------------------------------- */
  /*  Boot screen                                                   */
  /* -------------------------------------------------------------- */
  const BootScreen = (
    <AnimatePresence>
      {!booted && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[var(--space-black)] cursor-pointer"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setBooted(true)}
        >
          <div className="font-[JetBrains Mono] text-sm sm:text-base text-[rgba(59,130,246,0.9)] px-6 w-full max-w-xl">
            {BOOT_LINES.slice(0, bootStep).map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={i === BOOT_LINES.length - 1 ? 'text-[rgba(147,51,234,1)]' : ''}>
                {line}{i === bootStep - 1 && <span className="animate-pulse">█</span>}
              </motion.div>
            ))}
            <div className="mt-6 text-[10px] text-gray-600">tap to skip</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* Movie modal (shared) */
  const TrailerModal = (
    <AnimatePresence>
      {moviePreview && (
        <motion.div className="fixed inset-0 z-[95] flex items-center justify-center p-3 bg-black/90 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMoviePreview(null)}>
          <motion.div className="relative w-full max-w-4xl bg-[rgba(10,10,30,0.97)] rounded-xl p-4 border border-[rgba(59,130,246,0.35)]" initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3 font-[JetBrains Mono]">
              <h3 className="text-[rgba(147,51,234,0.95)] text-sm sm:text-base">🎬 {activePreviewTitle}</h3>
              <button onClick={() => setMoviePreview(null)} className="px-3 py-1 text-sm rounded bg-[rgba(59,130,246,0.2)] hover:bg-[rgba(59,130,246,0.4)] transition">× CLOSE</button>
            </div>
            <div className="rounded-lg overflow-hidden border-2 border-[rgba(59,130,246,0.3)] aspect-video">
              <iframe width="100%" height="100%" src={moviePreview} title="Movie Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="bg-black w-full h-full" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ============================================================== */
  /*  MOBILE — iOS-style phone                                       */
  /* ============================================================== */
  if (isMobile) {
    const currentApp = focusedApp;
    return (
      <section className="relative min-h-screen overflow-hidden bg-[var(--space-black)] text-[var(--starry-white)] select-none">
        {Background}
        {BootScreen}

        {/* Status bar */}
        <div className="relative z-30 flex items-center justify-between px-5 h-8 text-xs font-[JetBrains Mono]">
          <span className="text-[var(--starry-white)]">{clock}</span>
          <span className="text-[rgba(147,51,234,0.9)]">AK//OS</span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setSound((s) => !s)} aria-label="sound">{sound ? '♫' : '♪'}</button>
            <span className="tracking-tight">▂▄▆</span>
            <span>􀛨</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentApp ? (
            /* Fullscreen app */
            <motion.div key={currentApp} className="relative z-20 flex flex-col" style={{ height: 'calc(100vh - 2rem)' }}
              initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }} transition={{ type: 'spring', stiffness: 320, damping: 30 }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(59,130,246,0.25)]">
                <button onClick={() => closeApp(currentApp)} className="flex items-center gap-1 text-[rgba(59,130,246,0.9)] font-[JetBrains Mono] text-sm">‹ Home</button>
                <span className="font-[JetBrains Mono] text-sm text-[rgba(147,51,234,0.95)]">{APPS.find((a) => a.id === currentApp)?.icon} {currentApp}</span>
                <span className="w-12" />
              </div>
              <div className="flex-1 overflow-y-auto p-4 font-[JetBrains Mono]">{renderApp(currentApp)}</div>
            </motion.div>
          ) : (
            /* Home screen */
            <motion.div key="home" className="relative z-20 flex flex-col items-center" style={{ minHeight: 'calc(100vh - 2rem)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Clock widget */}
              <div className="mt-8 text-center">
                <div className="text-5xl font-light tracking-tight">{clock}</div>
                <div className="text-sm text-gray-400 mt-1">{dateStr}</div>
              </div>
              {/* Now playing widget */}
              <button onClick={() => openApp('music')} className="mt-6 flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-[rgba(59,130,246,0.3)] bg-[rgba(10,10,24,0.7)] backdrop-blur-md">
                <motion.span className="h-8 w-8 rounded-full flex items-center justify-center text-[10px]" style={{ background: 'repeating-radial-gradient(circle,#111 0 1.5px,#1c1c28 1.5px 3px)' }} animate={{ rotate: playing ? 360 : 0 }} transition={{ duration: 3, repeat: playing ? Infinity : 0, ease: 'linear' }}>◉</motion.span>
                <div className="text-left">
                  <div className="text-xs font-[JetBrains Mono] max-w-[150px] truncate">{nowPlaying.title}</div>
                  <div className="text-[10px] text-gray-500 max-w-[150px] truncate">{nowPlaying.artist}</div>
                </div>
                <Equalizer active={playing} />
              </button>
              {/* App grid */}
              <div className="mt-8 grid grid-cols-3 gap-6 px-8">
                {APPS.map((app) => (
                  <motion.button key={app.id} onClick={() => openApp(app.id)} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1.5">
                    <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-3xl border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.1)] shadow-[0_6px_16px_rgba(0,0,0,0.4)]">{app.icon}</div>
                    <span className="text-[11px] font-[JetBrains Mono] text-[var(--starry-white)]">{app.title}</span>
                  </motion.button>
                ))}
              </div>
              {/* Exit to portfolio */}
              <button onClick={navigateToHome} className="mt-auto mb-6 flex flex-col items-center gap-1.5">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-3xl border border-[rgba(147,51,234,0.4)] bg-[rgba(147,51,234,0.12)]">🪐</div>
                <span className="text-[11px] font-[JetBrains Mono] text-[rgba(147,51,234,0.9)]">Portfolio</span>
              </button>
              {/* Home bar */}
              <div className="mb-2 h-1.5 w-32 rounded-full bg-[rgba(255,255,255,0.4)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home bar when in app → tap to go home */}
        {currentApp && (
          <button onClick={() => closeApp(currentApp)} aria-label="Home" className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 h-1.5 w-32 rounded-full bg-[rgba(255,255,255,0.5)]" />
        )}

        {TrailerModal}
      </section>
    );
  }

  /* ============================================================== */
  /*  DESKTOP — windowed OS                                          */
  /* ============================================================== */
  return (
    <section
      className="relative h-screen overflow-hidden bg-[var(--space-black)] text-[var(--starry-white)] select-none"
      onContextMenu={(e) => {
        e.preventDefault();
        setCtxMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      {Background}
      {BootScreen}

      {/* ---- Menu bar ---- */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-3 border-b border-[rgba(59,130,246,0.25)] bg-[rgba(5,5,12,0.65)] backdrop-blur-md font-[JetBrains Mono] text-xs" style={{ height: MENUBAR_H }}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setAppleMenu((m) => !m); }} className="text-[rgba(147,51,234,0.95)] hover:text-white transition font-bold"> AK//OS</button>
            <AnimatePresence>
              {appleMenu && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} onClick={(e) => e.stopPropagation()}
                  className="absolute top-6 left-0 w-52 rounded-lg border border-[rgba(59,130,246,0.3)] bg-[rgba(10,10,24,0.96)] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-1 text-[var(--starry-white)]">
                  <div className="px-3 py-1.5 text-[10px] text-gray-500">akhilvarsh · logged in</div>
                  <button onClick={() => { setBooted(false); setBootStep(0); setWindows([]); setMinimized([]); setAppleMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-[rgba(59,130,246,0.15)]">↻ Restart</button>
                  <div className="my-1 h-px bg-[rgba(59,130,246,0.2)]" />
                  <button onClick={navigateToHome} className="w-full text-left px-3 py-1.5 hover:bg-[rgba(147,51,234,0.2)] text-[rgba(147,51,234,0.95)]">⏻ Exit to Portfolio</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="text-[var(--starry-white)]">{focusedApp ? `${APPS.find((a) => a.id === focusedApp)?.title}${APPS.find((a) => a.id === focusedApp)?.ext}` : 'Finder'}</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setSound((s) => !s)} className={`transition ${sound ? 'text-[rgba(147,51,234,1)]' : 'text-[rgba(59,130,246,0.7)] hover:text-white'}`}>{sound ? '♫ ambient' : '♪ muted'}</button>
          <span className="hidden sm:inline text-[rgba(59,130,246,0.7)]">STATUS <span className="text-green-400">ONLINE</span></span>
          <span className="hidden md:inline text-gray-400">{dateStr}</span>
          <span className="text-[var(--starry-white)] tabular-nums">{clock}</span>
        </div>
      </div>

      {/* ---- Desktop icons ---- */}
      <div className="absolute z-20 flex flex-col gap-5 p-4" style={{ top: MENUBAR_H + 8 }}>
        {APPS.map((app) => (
          <button key={app.id} onDoubleClick={() => openApp(app.id)} className="flex flex-col items-center gap-1 group w-20" title={`Open ${app.title}`}>
            <div className="h-14 w-14 rounded-xl flex items-center justify-center text-2xl border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.08)] group-hover:bg-[rgba(147,51,234,0.18)] group-hover:border-[rgba(147,51,234,0.5)] transition-colors">{app.icon}</div>
            <span className="text-[11px] font-[JetBrains Mono] text-[rgba(147,51,234,0.9)]">{app.title}{app.ext}</span>
          </button>
        ))}
        <button onDoubleClick={navigateToHome} className="flex flex-col items-center gap-1 group w-20" title="Exit to Portfolio">
          <div className="h-14 w-14 rounded-xl flex items-center justify-center text-2xl border border-[rgba(147,51,234,0.4)] bg-[rgba(147,51,234,0.12)] group-hover:bg-[rgba(147,51,234,0.25)] transition-colors">🪐</div>
          <span className="text-[11px] font-[JetBrains Mono] text-[rgba(147,51,234,0.9)]">Portfolio</span>
        </button>
      </div>

      {/* ---- Windows ---- */}
      <AnimatePresence>
        {windows.map((id, i) => {
          const app = APPS.find((a) => a.id === id)!;
          const st = winState[id];
          if (!st) return null;
          return (
            <OSWindow
              key={id}
              app={app}
              state={st}
              z={40 + i}
              focused={focusedApp === id}
              minimized={minimized.includes(id)}
              onChange={(patch) => patchWin(id, patch)}
              onClose={() => closeApp(id)}
              onMinimize={() => minimizeApp(id)}
              onFocus={() => focusApp(id)}
            >
              {renderApp(id)}
            </OSWindow>
          );
        })}
      </AnimatePresence>

      {/* ---- Now-playing widget ---- */}
      <button onClick={() => openApp('music')} className="fixed bottom-24 left-4 z-30 flex items-center gap-3 px-3 py-2 rounded-full border border-[rgba(59,130,246,0.3)] bg-[rgba(10,10,24,0.8)] backdrop-blur-md hover:border-[rgba(147,51,234,0.6)] transition">
        <motion.span className="h-7 w-7 rounded-full flex items-center justify-center text-[10px]" style={{ background: 'repeating-radial-gradient(circle,#111 0 1.5px,#1c1c28 1.5px 3px)' }} animate={{ rotate: playing ? 360 : 0 }} transition={{ duration: 3, repeat: playing ? Infinity : 0, ease: 'linear' }}>◉</motion.span>
        <div className="text-left">
          <div className="text-[11px] font-[JetBrains Mono] text-[var(--starry-white)] max-w-[140px] truncate">{nowPlaying.title}</div>
          <div className="text-[9px] text-gray-500 max-w-[140px] truncate">{nowPlaying.artist}</div>
        </div>
        <Equalizer active={playing} />
      </button>

      {/* ---- Dock ---- */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-end gap-3 px-4 py-2 rounded-2xl border border-[rgba(59,130,246,0.3)] bg-[rgba(10,10,24,0.75)] backdrop-blur-xl shadow-[0_0_30px_rgba(45,0,247,0.25)]">
          {APPS.map((app) => {
            const open = windows.includes(app.id);
            return (
              <motion.button key={app.id} onClick={() => dockClick(app.id)} whileHover={{ y: -10, scale: 1.25 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="relative flex flex-col items-center" title={app.title}>
                <span className="text-2xl">{app.icon}</span>
                <span className={`mt-1 h-1 w-1 rounded-full transition-opacity ${open ? 'bg-[rgba(147,51,234,1)] opacity-100' : 'opacity-0'}`} />
              </motion.button>
            );
          })}
          <div className="w-px h-8 self-center bg-[rgba(59,130,246,0.3)] mx-1" />
          <motion.button onClick={navigateToHome} whileHover={{ y: -10, scale: 1.25 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="flex flex-col items-center" title="Exit to Portfolio">
            <span className="text-2xl">🪐</span>
            <span className="mt-1 h-1 w-1 opacity-0" />
          </motion.button>
        </div>
      </div>

      {/* ---- Right-click context menu ---- */}
      <AnimatePresence>
        {ctxMenu && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 w-56 rounded-lg border border-[rgba(59,130,246,0.3)] bg-[rgba(10,10,24,0.96)] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-1 font-[JetBrains Mono] text-xs text-[var(--starry-white)]"
            style={{ top: Math.min(ctxMenu.y, (typeof window !== 'undefined' ? window.innerHeight : 800) - 320), left: Math.min(ctxMenu.x, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 240) }}
            onClick={(e) => e.stopPropagation()}>
            <div className="px-3 py-1.5 text-[10px] text-gray-500">Open app</div>
            {APPS.map((app) => (
              <button key={app.id} onClick={() => { openApp(app.id); setCtxMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-[rgba(59,130,246,0.15)]">{app.icon} {app.title}{app.ext}</button>
            ))}
            <div className="my-1 h-px bg-[rgba(59,130,246,0.2)]" />
            <button onClick={() => { setSound((s) => !s); setCtxMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-[rgba(59,130,246,0.15)]">{sound ? '♫ Ambient: on' : '♪ Ambient: off'}</button>
            <button onClick={() => { navigateToHome(); }} className="w-full text-left px-3 py-1.5 hover:bg-[rgba(147,51,234,0.2)] text-[rgba(147,51,234,0.95)]">⏻ Exit to Portfolio</button>
          </motion.div>
        )}
      </AnimatePresence>

      {TrailerModal}
    </section>
  );
};

export default PersonalSpace;
