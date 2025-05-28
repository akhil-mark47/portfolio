'use client';

import { useEffect, useRef } from 'react';

const CosmicCursor: React.FC = () => {
  const ufoCursorRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<any[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const maxParticles = 100;
  const clickCount = useRef(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Create stars
    const createStars = () => {
      if (!starsContainerRef.current) return;
      const numStars = 150;

      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainerRef.current.appendChild(star);
      }
    };

    // Create particle
    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const types = ['particle-blue', 'particle-cyan', 'particle-white', 'particle-electric'];
      const type = types[Math.floor(Math.random() * types.length)];
      particle.classList.add(type);

      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      document.body.appendChild(particle);

      const particleData = {
        element: particle,
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 1,
        decay: Math.random() * 0.015 + 0.008,
      };

      particles.current.push(particleData);

      if (particles.current.length > maxParticles) {
        const oldParticle = particles.current.shift();
        oldParticle?.element.remove();
      }
    };

    // Update particles
    const updateParticles = () => {
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        p.element.style.left = `${p.x}px`;
        p.element.style.top = `${p.y}px`;
        p.element.style.opacity = p.life;
        p.element.style.transform = `scale(${p.life})`;

        if (p.life <= 0) {
          p.element.remove();
          particles.current.splice(i, 1);
        }
      }
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Update cursor position
    const updateCursor = () => {
      if (!ufoCursorRef.current) return;

      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      cursorPos.current.x += dx * 0.1;
      cursorPos.current.y += dy * 0.1;

      ufoCursorRef.current.style.left = `${cursorPos.current.x}px`;
      ufoCursorRef.current.style.top = `${cursorPos.current.y}px`;

      // Create particles more frequently with enhanced trail
      if (Math.random() < 0.4) {
        createParticle(
          cursorPos.current.x + (Math.random() - 0.5) * 25,
          cursorPos.current.y + 12 + Math.random() * 8
        );
      }

      // Create additional flame particles
      if (Math.random() < 0.2) {
        createParticle(
          cursorPos.current.x + (Math.random() - 0.5) * 15,
          cursorPos.current.y + 15 + Math.random() * 10
        );
      }

      updateParticles();
      requestAnimationFrame(updateCursor);
    };

    
    // Handle click effects
    const handleClick = () => {
      // Increment click count
      clickCount.current++;
      
      // Create shockwave effect
      
      // Apply flame merge effect based on click count
      if (ufoCursorRef.current) {
        const flames = ufoCursorRef.current.querySelector('.flames');
        if (flames) {
          flames.classList.add(`flame-merge-${Math.min(clickCount.current, 5)}`);
        }
      }

      // Reset click count after 2 seconds of no clicks
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
      clickTimeout.current = setTimeout(() => {
        clickCount.current = 0;
        if (ufoCursorRef.current) {
          const flames = ufoCursorRef.current.querySelector('.flames');
          if (flames) {
            flames.className = 'flames'; // Reset to original class
          }
        }
      }, 1500);

      // Create intense burst of particles on click
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          createParticle(
            mousePos.current.x + (Math.random() - 0.5) * 40,
            mousePos.current.y + (Math.random() - 0.5) * 40
          );
        }, i * 30);
      }
    };

    // Initialize
    createStars();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    updateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      particles.current.forEach((p) => p.element.remove());
      particles.current = [];
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <div className="stars" ref={starsContainerRef}></div>
      <div className="ufo-cursor" ref={ufoCursorRef}>
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