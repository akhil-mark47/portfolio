'use client';

import { useEffect, useRef } from 'react';

const CosmicCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  let lastX = 0;
  let lastY = 0;
  let speed = 0;

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;

        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        speed = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (speed > 20 && speed < 70) {
          cursorRef.current.classList.add('fast-speed');
          cursorRef.current.classList.remove('warp-speed');
        } else if (speed > 100) {
          cursorRef.current.classList.add('warp-speed');
          cursorRef.current.classList.add('fast-speed');
        } else {
          cursorRef.current.classList.remove('fast-speed');
          cursorRef.current.classList.remove('warp-speed');
        }

        lastX = e.clientX;
        lastY = e.clientY;

        createParticles(e.clientX, e.clientY);
      }
    };

    const createParticles = (x: number, y: number) => {
      if (particlesContainerRef.current) {
        for (let i = 0; i < 5; i++) { // Increased particles
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          particlesContainerRef.current.appendChild(particle);

          setTimeout(() => {
            particle.remove();
          }, 1000);
        }
      }
    };

    const handleClick = () => {
      if (cursorRef.current) {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave';
        shockwave.style.left = `${lastX}px`;
        shockwave.style.top = `${lastY}px`;
        document.body.appendChild(shockwave);

        setTimeout(() => {
          shockwave.remove();
        }, 600);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="alien-spaceship-cursor">
        <div className="spaceship-body">
          <div className="dome" />
        </div>
        <div className="flames">
          <div className="flame flame1" />
          <div className="flame flame2" />
          <div className="flame flame3" />
        </div>
      </div>
      <div ref={particlesContainerRef} className="particles-container"></div>
    </>
  );
};

export default CosmicCursor;