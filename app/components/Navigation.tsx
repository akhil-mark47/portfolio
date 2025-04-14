
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import router

interface NavigationProps {
  activeSection?: string;
  showBackButton?: boolean;  // Add option to show back button
  backUrl?: string;          // Add option for custom back URL
  variant?: 'main' | 'space'; // Different variants of navigation
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  showBackButton = false,
  backUrl = '/',
  variant = 'main'
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isIgnited, setIsIgnited] = useState(false);
  
  // Determine which nav items to show based on variant
  const mainNavItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Experience', id: 'experience' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Certifications', id: 'certifications' },
    // { name: 'Gallery', id: 'gallery' }, 
    { name: 'Achievements', id: 'achievements' },
    { name: 'Volunteering', id: 'volunteering' },
    { name: ' My Space', href: '/personal-space' },
  ];
  
  const spaceNavItems = [
    { name: 'Home', href: '/' },
    { name: 'Hobbies', id: 'hobbies' },
    { name: 'Movies', id: 'movies' },
    { name: 'Books', id: 'books' },
    { name: 'Music', id: 'music' },
    { name: 'Quotes', id: 'quotes' },
  ];
  
  // Choose which nav items to use
  const navItems = variant === 'space' ? spaceNavItems : mainNavItems;

  // Control flame state based on menu state
  useEffect(() => {
    if (isOpen) {
      setIsIgnited(true);
    } else {
      setIsIgnited(false);
    }
  }, [isOpen]);

  const handleNavClick = (id: string | undefined, href: string | undefined) => {
    if (href) {
      router.push(href);
    } else if (id) {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsOpen(false); // Close menu on click
  };

  const handleRocketClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 space-nav">
      {/* Container for rocket and potentially back button */}
      <div className="md:hidden p-4 flex items-center justify-between">
        {/* Back Button - Only shown when showBackButton is true */}
        {showBackButton && (
          <motion.button
            className="flex items-center space-x-1 px-3 py-1.5 bg-[rgba(59,130,246,0.2)] text-[rgba(147,51,234,0.9)] rounded-md border border-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.3)] transition-all group"
            onClick={() => router.push(backUrl)}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              fill="currentColor" 
              viewBox="0 0 16 16" 
              className="group-hover:animate-pulse"
            >
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
            <span className="text-xs font-[JetBrains Mono]">BACK</span>
          </motion.button>
        )}
        
        {/* Rocket Button */}
        <button
          onClick={handleRocketClick}
          className="text-[var(--starry-white)] relative ml-auto"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {/* Your rocket SVG code */}
          <motion.svg
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              rotate: isOpen ? 45 : 0,
              scale: isOpen ? 1.1 : 1,
            }}
            transition={{
              rotate: { duration: 0.5, type: 'spring', stiffness: 100 },
              scale: { duration: 0.3 },
            }}
          >
            {/* Rocket Body */}
            <motion.path
              d="M12 22V8M12 8C12 8 17 6 17 3C17 1.5 14.5 1 12 3C9.5 1 7 1.5 7 3C7 6 12 8 12 8Z"
              stroke="currentColor"
              strokeWidth={2}
              fill="currentColor"
              animate={{
                y: isIgnited ? -1 : 0,
                fillOpacity: isIgnited ? 1 : 0.7,
              }}
            />
             {/* Rocket Windows */}
             <motion.circle 
           cx="11" 
           cy="23" 
           r="0.5" 
           fill="#888"
           initial={{ opacity: 0 }}
           animate={{ 
             opacity: isIgnited ? [0, 0.4, 0.2, 0] : 0,
             y: isIgnited ? [0, 1, 2, 3] : 0,
             x: isIgnited ? [0, -1, -2, -3] : 0,
           }}
           transition={{ 
             duration: 1.5,
             repeat: isIgnited ? Infinity : 0,
             repeatDelay: 0.5
           }}
         />
         <motion.circle />
            {/* Rocket Fins */}
            <motion.path
              d="M10 20L7 18V13L10 15V20Z"
              fill="currentColor"
              stroke="currentColor"
              animate={{
                x: isIgnited ? -0.5 : 0,
                fillOpacity: isIgnited ? 1 : 0.9,
              }}
            />
            <motion.path
              d="M14 20L17 18V13L14 15V20Z"
              fill="currentColor"
              stroke="currentColor"
              animate={{
                x: isIgnited ? 0.5 : 0,
                fillOpacity: isIgnited ? 1 : 0.9,
              }}
            />
            {/* Fire/Exhaust Animations */}
            <motion.g>
              {/* Main Exhaust */}
              <motion.path
                d="M12 22C12 22 10 21 10 19.5C10 18 12 16 12 16C12 16 14 18 14 19.5C14 21 12 22 12 22Z"
                fill="#FF4500"
                initial={{ opacity: 0, y: -2 }}
                animate={{
                  opacity: isIgnited ? [0.8, 1, 0.9, 0.8] : 0,
                  y: isIgnited ? [2, 3, 2.5, 2] : 0,
                  scale: isIgnited ? [1, 1.2, 1.1, 1] : 0.8,
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.3, 0.6, 1],
                  repeat: isIgnited ? Infinity : 0,
                  repeatType: 'reverse',
                }}
              />
              {/* Yellow Inner Flame */}
              <motion.path
                d="M12 22C12 22 11 21.2 11 20C11 18.8 12 18 12 18C12 18 13 18.8 13 20C13 21.2 12 22 12 22Z"
                fill="#FFD700"
                initial={{ opacity: 0, y: -3 }}
                animate={{
                  opacity: isIgnited ? [0.7, 1, 0.8, 0.7] : 0,
                  y: isIgnited ? [1, 2, 1.5, 1] : 0,
                  scale: isIgnited ? [0.9, 1.1, 1, 0.9] : 0.7,
                }}
                transition={{
                  duration: 0.8,
                  times: [0, 0.3, 0.6, 1],
                  repeat: isIgnited ? Infinity : 0,
                  repeatType: 'mirror',
                }}
              />
              {/* Small Side Flames */}
              <motion.path
                d="M10 22C10 22 9.5 21.5 9.5 20.5C9.5 19.5 10 19 10 19"
                stroke="#FF4500"
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isIgnited ? [0.3, 0.7, 0.5, 0.3] : 0,
                  pathLength: isIgnited ? [0.5, 0.8, 0.6, 0.5] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: isIgnited ? Infinity : 0,
                  repeatType: 'mirror',
                }}
              />
              <motion.path
                d="M14 22C14 22 14.5 21.5 14.5 20.5C14.5 19.5 14 19 14 19"
                stroke="#FF4500"
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isIgnited ? [0.3, 0.7, 0.5, 0.3] : 0,
                  pathLength: isIgnited ? [0.5, 0.8, 0.6, 0.5] : 0,
                }}
                transition={{
                  duration: 1.2,
                  repeat: isIgnited ? Infinity : 0,
                  repeatType: 'mirror',
                }}
              />
              {/* Smoke/Particle Effects */}
              <motion.circle
                cx="11"
                cy="23"
                r="0.5"
                fill="#888"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isIgnited ? [0, 0.4, 0.2, 0] : 0,
                  y: isIgnited ? [0, 1, 2, 3] : 0,
                  x: isIgnited ? [0, -1, -2, -3] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isIgnited ? Infinity : 0,
                  repeatDelay: 0.5,
                }}
              />
              <motion.circle
                cx="13"
                cy="23"
                r="0.5"
                fill="#888"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isIgnited ? [0, 0.4, 0.2, 0] : 0,
                  y: isIgnited ? [0, 1, 2, 3] : 0,
                  x: isIgnited ? [0, 1, 2, 3] : 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.3,
                  repeat: isIgnited ? Infinity : 0,
                  repeatDelay: 0.7,
                }}
              />
            </motion.g>
          </motion.svg>
        </button>
      </div>

      {/* Desktop Back Button */}
      {showBackButton && (
        <div className="hidden md:block absolute top-4 left-4">
          <motion.button
            className="flex items-center space-x-1 px-3 py-1.5 bg-[rgba(59,130,246,0.2)] text-[rgba(147,51,234,0.9)] rounded-md border border-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.3)] transition-all group"
            onClick={() => router.push(backUrl)}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              fill="currentColor" 
              viewBox="0 0 16 16" 
              className="group-hover:animate-pulse"
            >
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
            <span className="text-xs font-[JetBrains Mono]">BACK TO MAIN</span>
          </motion.button>
        </div>
      )}

      {/* Nav Items */}
      <motion.div
  className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 p-4 md:p-2 bg-[var(--space-black)] md:bg-transparent ${isOpen ? 'block' : 'hidden md:flex'}`}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
        {navItems.map((item) => (
          item.href ? (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`nav-button text-sm md:text-base w-full md:w-auto py-2 px-4 ${
                activeSection === item.name.toLowerCase().replace(' ', '-') ? 'active-nav' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ) : (
            <motion.button
              key={item.id}
              className={`nav-button text-sm md:text-base w-full md:w-auto py-2 px-4 ${
                activeSection === item.id ? 'active-nav' : ''
              }`}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick(item.id, undefined)}
            >
              {item.name}
            </motion.button>
          )
        ))}
      </motion.div>
    </nav>
  );
};

export default Navigation;