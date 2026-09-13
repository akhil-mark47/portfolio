'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; decay: number; color: number; size: number;
};

// Exact particle colours from globals.css (.particle-blue/cyan/white/electric) + smoke
const COLORS = [
  { r: 0, g: 153, b: 255 },   // 0 blue
  { r: 0, g: 255, b: 255 },   // 1 cyan
  { r: 255, g: 255, b: 255 }, // 2 white
  { r: 102, g: 221, b: 255 }, // 3 electric
  { r: 170, g: 172, b: 186 }, // 4 smoke (out of fuel)
];

function makeSprite(c: { r: number; g: number; b: number }): HTMLCanvasElement {
  const size = 64;
  const mid = size / 2;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const g = cv.getContext('2d')!;
  const rgb = `${c.r}, ${c.g}, ${c.b}`;
  const halo = g.createRadialGradient(mid, mid, 0, mid, mid, mid);
  halo.addColorStop(0, `rgba(${rgb}, 1)`);
  halo.addColorStop(0.34, `rgba(${rgb}, 1)`);
  halo.addColorStop(0.5, `rgba(${rgb}, 0.55)`);
  halo.addColorStop(0.78, `rgba(${rgb}, 0.14)`);
  halo.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = halo;
  g.fillRect(0, 0, size, size);
  const core = g.createRadialGradient(mid, mid, 0, mid, mid, size * 0.16);
  core.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  core.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = core;
  g.beginPath(); g.arc(mid, mid, size * 0.16, 0, Math.PI * 2); g.fill();
  return cv;
}

const CosmicCursor: React.FC = () => {
  const ufoRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const ufo = ufoRef.current;
    if (!canvas || !ufo) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sprites = COLORS.map(makeSprite);

    // rocket-launch sound (plays on slingshot — user click is the gesture)
    const rocket = new Audio('/assets/sounds/rocket-launch.mp3');
    rocket.volume = 0.45;
    rocket.preload = 'auto';

    let W = 0, H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // twinkle stars (full-motion only)
    const starEls: HTMLDivElement[] = [];
    if (!reduce && starsRef.current) {
      for (let i = 0; i < 150; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        const sz = Math.random() * 2 + 1;
        s.style.width = `${sz}px`; s.style.height = `${sz}px`;
        s.style.animationDelay = `${Math.random() * 2}s`;
        starsRef.current.appendChild(s);
        starEls.push(s);
      }
    }

    /* ---- state machine ---- */
    const mouse = { x: W / 2, y: H / 2 };
    const cur = { x: W / 2, y: H / 2 };
    const vel = { vx: 0, vy: 0 };
    let mode: 'follow' | 'launch' | 'fall' | 'fallen' = 'follow';
    let charge = 0;   // 0..1, built by rapid clicks
    let fuel = 0;     // 0..1 while launched
    let particles: Particle[] = [];
    const MAX = 160;
    let lastClick = 0;

    const spawn = (x: number, y: number, ci = -1, sizeMul = 1) => {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 1,
        decay: Math.random() * 0.015 + 0.008,
        color: ci >= 0 ? ci : (Math.random() * 4) | 0,
        size: (Math.random() * 6 + 2) * sizeMul,
      });
      if (particles.length > MAX) particles.shift();
    };

    const setFlames = (level: number) => {
      const flames = ufo.querySelector('.flames');
      if (!flames) return;
      flames.className = 'flames';
      if (level > 0) flames.classList.add(`flame-merge-${Math.min(level, 5)}`);
    };

    const launch = () => {
      // slingshot: upward-biased blast, speed & fuel scale with booster charge
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const speed = 9 + charge * 14;
      vel.vx = Math.cos(angle) * speed;
      vel.vy = Math.sin(angle) * speed;
      fuel = 0.55 + charge * 0.6;
      mode = 'launch';
      charge = 0;
      try { rocket.currentTime = 0; void rocket.play().catch(() => {}); } catch { /* ignore */ }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      // moving the mouse re-engages a spent cursor
      if (mode === 'fall' || mode === 'fallen') {
        mode = 'follow'; charge = 0; fuel = 0; setFlames(0);
      }
    };

    const onClick = () => {
      if (mode !== 'follow') return;
      const now = performance.now();
      const rapid = now - lastClick < 450;
      lastClick = now;
      charge = Math.min(1, charge + (rapid ? 0.3 : 0.13));
      setFlames(Math.ceil(charge * 5));
      if (!reduce) for (let i = 0; i < 10; i++) {
        setTimeout(() => spawn(mouse.x + (Math.random() - 0.5) * 36, mouse.y + (Math.random() - 0.5) * 36), i * 24);
      }
      if (charge >= 0.9 && !reduce) launch();
    };

    let raf = 0;
    let running = true;
    const frame = () => {
      if (mode === 'follow') {
        // vibrate a little more as the boosters charge → "powering up"
        const shake = reduce ? 0 : charge * 7;
        const tx = mouse.x + (Math.random() - 0.5) * shake;
        const ty = mouse.y + (Math.random() - 0.5) * shake;
        cur.x += (tx - cur.x) * 0.12;
        cur.y += (ty - cur.y) * 0.12;
        vel.vx = tx - cur.x; vel.vy = ty - cur.y;
        charge *= 0.985;
        if (charge < 0.05) charge = 0;
        if (!reduce) {
          if (Math.random() < 0.4) spawn(cur.x + (Math.random() - 0.5) * 25, cur.y + 12 + Math.random() * 8);
          if (Math.random() < 0.2 + charge * 0.5) spawn(cur.x + (Math.random() - 0.5) * 18, cur.y + 15 + Math.random() * 10);
        }
      } else if (mode === 'launch') {
        cur.x += vel.vx; cur.y += vel.vy;
        // gently curve the flight so it wanders like a firework
        const a = Math.atan2(vel.vy, vel.vx) + (Math.random() - 0.5) * 0.16;
        const spd = Math.hypot(vel.vx, vel.vy);
        vel.vx = Math.cos(a) * spd; vel.vy = Math.sin(a) * spd;
        // bounce off the walls
        if (cur.x < 24) { cur.x = 24; vel.vx = Math.abs(vel.vx) * 0.92; }
        if (cur.x > W - 24) { cur.x = W - 24; vel.vx = -Math.abs(vel.vx) * 0.92; }
        if (cur.y < 24) { cur.y = 24; vel.vy = Math.abs(vel.vy) * 0.92; }
        if (cur.y > H - 40) { cur.y = H - 40; vel.vy = -Math.abs(vel.vy) * 0.7; }
        // booster plume behind the craft
        const bx = cur.x - vel.vx * 1.4, by = cur.y - vel.vy * 1.4;
        for (let k = 0; k < 4; k++) spawn(bx + (Math.random() - 0.5) * 14, by + (Math.random() - 0.5) * 14, -1, 1.35);
        fuel -= 0.007;
        if (fuel <= 0) mode = 'fall';
      } else if (mode === 'fall') {
        vel.vy += 0.6; vel.vx *= 0.985;
        cur.x += vel.vx; cur.y += vel.vy;
        if (Math.random() < 0.35) spawn(cur.x + (Math.random() - 0.5) * 8, cur.y + 6, 4, 0.85); // smoke
        const floor = H - 34;
        if (cur.y >= floor) {
          cur.y = floor;
          vel.vy *= -0.34; vel.vx *= 0.5;
          if (Math.abs(vel.vy) < 2) { mode = 'fallen'; vel.vx = 0; vel.vy = 0; setFlames(0); }
        }
      } else { // fallen — rests at the bottom, out of fuel
        cur.y = H - 34;
        if (!reduce && Math.random() < 0.03) spawn(cur.x + (Math.random() - 0.5) * 6, cur.y - 4, 4, 0.7);
      }

      // draw
      ctx.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const d = p.size * (1.7 + 1.2 * p.life);
        ctx.globalAlpha = p.life;
        ctx.drawImage(sprites[p.color], p.x - d / 2, p.y - d / 2, d, d);
      }
      ctx.globalAlpha = 1;

      // position + orientation of the UFO
      const flying = mode === 'launch' || mode === 'fall';
      const tilt = flying ? Math.max(-45, Math.min(45, vel.vx * 3)) : 0;
      const sc = mode === 'fallen' ? 0.92 : 1 + charge * 0.28;
      ufo.style.left = `${cur.x}px`;
      ufo.style.top = `${cur.y}px`;
      ufo.style.transform = `translate(-50%, -50%) rotate(${tilt}deg) scale(${sc})`;

      if (running) raf = requestAnimationFrame(frame);
    };
    frame();

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick);

    // let the Guide pull the alien out of the UFO (and put it back)
    const onAlienToggle = (e: Event) => {
      const out = (e as CustomEvent).detail?.out;
      ufo.querySelector('.alien')?.classList.toggle('alien-gone', !!out);
    };
    window.addEventListener('cosmo:alien', onAlienToggle);

    const onVisibility = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else { running = true; raf = requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick);
      window.removeEventListener('cosmo:alien', onAlienToggle);
      ufo.querySelector('.alien')?.classList.remove('alien-gone');
      document.removeEventListener('visibilitychange', onVisibility);
      starEls.forEach((s) => s.remove());
      particles = [];
      ctx.clearRect(0, 0, W, H);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div className="stars" ref={starsRef}></div>
      <div className="ufo-cursor" ref={ufoRef}>
        <div className="ufo">
          <div className="ufo-body">
            <div className="ufo-dome">
              <div className="alien">
                <div className="alien-head">
                  <div className="alien-eyes">
                    <div className="alien-eye"></div>
                    <div className="alien-eye"></div>
                  </div>
                </div>
                <div className="alien-body"></div>
              </div>
            </div>
            <div className="ufo-lights">
              <div className="ufo-light"></div>
              <div className="ufo-light"></div>
              <div className="ufo-light"></div>
            </div>
          </div>
          <div className="flames">
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CosmicCursor;
