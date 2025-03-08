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

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CosmicCursor;

// 'use client';

// import { useEffect } from 'react';

// export default function CustomCursor() {
//   useEffect(() => {
//     const cursor = document.getElementById('custom-cursor');
    
//     const moveCursor = (e: MouseEvent) => {
//       if (cursor) {
//         cursor.style.left = `${e.clientX - 10}px`;
//         cursor.style.top = `${e.clientY - 10}px`;
//       }
//     };

//     const addHoverClass = () => {
//       if (cursor) cursor.classList.add('hover');
//     };

//     const removeHoverClass = () => {
//       if (cursor) cursor.classList.remove('hover');
//     };

//     document.addEventListener('mousemove', moveCursor);
    
//     const interactiveElements = document.querySelectorAll('a, button');
//     interactiveElements.forEach(el => {
//       el.addEventListener('mouseenter', addHoverClass);
//       el.addEventListener('mouseleave', removeHoverClass);
//     });

//     return () => {
//       document.removeEventListener('mousemove', moveCursor);
//       interactiveElements.forEach(el => {
//         el.removeEventListener('mouseenter', addHoverClass);
//         el.removeEventListener('mouseleave', removeHoverClass);
//       });
//     };
//   }, []);

//   return null;
// }