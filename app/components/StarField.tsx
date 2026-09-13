'use client';

import { useEffect, useRef } from 'react';

/**
 * Revolving 3D starfield.
 *
 * Previously rendered with three.js + WebGL (~161 kB gzip). This version produces
 * the identical effect using the same 3D projection math three.js was doing, drawn
 * on a plain 2D canvas — no WebGL context, ~2 kB of code.
 *
 * Parity with the original three.js version:
 *   - 5000 stars scattered in a 50-unit cube  ((rand - 0.5) * 50)
 *   - camera at z = 1 looking down -z          (~half the stars sit in front)
 *   - rotation.x += 0.0002, rotation.y += 0.0001 per frame
 *   - PointsMaterial({ size: 0.1, sizeAttenuation: true, opacity: 0.8 }):
 *     on-screen size = worldSize * focal / depth, so near stars grow as they approach
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ---- parameters copied 1:1 from the three.js version ----
    const STAR_COUNT = 5000;
    const SPREAD = 50;
    const CAM_Z = 1;
    const NEAR = 0.1;
    const FOV = (75 * Math.PI) / 180;
    const ROT_X = 0.0002;
    const ROT_Y = 0.0001;
    const BASE_OPACITY = 0.8;
    const STAR_SIZE = 0.1; // world-unit size, same as three.js PointsMaterial({ size: 0.1 })
    const MAX_STAR_PX = 24; // cap so a star right at the camera doesn't fill the screen

    // ---- base star positions (computed once) ----
    const xs = new Float32Array(STAR_COUNT);
    const ys = new Float32Array(STAR_COUNT);
    const zs = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      xs[i] = (Math.random() - 0.5) * SPREAD;
      ys[i] = (Math.random() - 0.5) * SPREAD;
      zs[i] = (Math.random() - 0.5) * SPREAD;
    }

    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let focal = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      cy = H / 2;
      focal = H / 2 / Math.tan(FOV / 2); // px per world-unit at depth 1
    };
    resize();
    window.addEventListener('resize', resize);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let ax = 0;
    let ay = 0;
    let raf = 0;
    let running = true;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = BASE_OPACITY; // constant opacity, same as the three.js material

      for (let i = 0; i < STAR_COUNT; i++) {
        const x = xs[i];
        const y = ys[i];
        const z = zs[i];

        // rotate around Y, then X (matches the object's tumble)
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // perspective: distance in front of the camera
        const depth = CAM_Z - z2;
        if (depth <= NEAR) continue; // behind camera / near-plane clip

        const inv = focal / depth;
        const sx = cx + x1 * inv;
        const sy = cy - y2 * inv;
        if (sx < -4 || sx > W + 4 || sy < -4 || sy > H + 4) continue;

        // size attenuation: diameter grows as the star nears the camera
        let d = STAR_SIZE * inv;
        if (d > MAX_STAR_PX) d = MAX_STAR_PX;
        else if (d < 0.6) d = 0.6;
        const r = d / 2;
        ctx.fillRect(sx - r, sy - r, d, d);
      }
      ctx.globalAlpha = 1;

      if (running && !reduceMotion) {
        ax += ROT_X;
        ay += ROT_Y;
        raf = requestAnimationFrame(render);
      }
    };

    render();

    // pause the loop when the tab is hidden (saves CPU/battery)
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-dark to-dark">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
