'use client';

import { useEffect, useRef } from 'react';


const CosmicCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
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
  );
};

export default CosmicCursor;
