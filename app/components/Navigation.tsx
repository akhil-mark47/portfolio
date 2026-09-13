
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
          {/* Rocket menu icon */}
          <motion.svg
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isIgnited ? -1 : 0,
              scale: isOpen ? 1.08 : 1,
            }}
            transition={{
              rotate: { duration: 0.5, type: 'spring', stiffness: 120 },
              scale: { duration: 0.3 },
            }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="rk-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d6cbff" />
                <stop offset="45%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <radialGradient id="rk-win" cx="0.4" cy="0.35" r="0.75">
                <stop offset="0%" stopColor="#bff5fb" />
                <stop offset="55%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0e7490" />
              </radialGradient>
            </defs>

            {/* Fins */}
            <motion.path
              d="M8.6 13.4 L5.5 17.1 C5.2 17.4 5.1 17.9 5.2 18.5 L5.4 19.5 C7 18.8 8.1 17.8 8.9 16.5 Z"
              fill="#7c3aed"
              animate={{ x: isIgnited ? -0.4 : 0 }}
            />
            <motion.path
              d="M15.4 13.4 L18.5 17.1 C18.8 17.4 18.9 17.9 18.8 18.5 L18.6 19.5 C17 18.8 15.9 17.8 15.1 16.5 Z"
              fill="#7c3aed"
              animate={{ x: isIgnited ? 0.4 : 0 }}
            />

            {/* Body */}
            <path
              d="M12 2 C14.7 4.7 15.6 8.3 15.6 11.7 L15.6 16 C15.6 17.5 14 18.2 12 18.2 C10 18.2 8.4 17.5 8.4 16 L8.4 11.7 C8.4 8.3 9.3 4.7 12 2 Z"
              fill="url(#rk-body)"
              stroke="#ede9fe"
              strokeWidth="0.4"
            />

            {/* Window + highlight */}
            <circle cx="12" cy="9" r="2.15" fill="url(#rk-win)" stroke="#ede9fe" strokeWidth="0.5" />
            <circle cx="11.3" cy="8.3" r="0.55" fill="#ffffff" fillOpacity="0.85" />

            {/* Body seam */}
            <path d="M9 13.1 H15" stroke="#ede9fe" strokeWidth="0.4" strokeOpacity="0.5" strokeLinecap="round" />

            {/* Exhaust flames — ignite when the menu is open */}
            <motion.path
              d="M12 18 C13.5 18.9 14.1 20.1 14.1 21.4 C14.1 22.8 13.2 23.7 12 23.7 C10.8 23.7 9.9 22.8 9.9 21.4 C9.9 20.1 10.5 18.9 12 18 Z"
              fill="#ff7a1a"
              style={{ transformOrigin: '12px 18px' }}
              initial={{ opacity: 0, scaleY: 0.6 }}
              animate={{
                opacity: isIgnited ? [0.85, 1, 0.9] : 0,
                scaleY: isIgnited ? [0.8, 1.15, 0.9] : 0.6,
              }}
              transition={{ duration: 0.5, repeat: isIgnited ? Infinity : 0, repeatType: 'mirror' }}
            />
            <motion.path
              d="M12 19 C12.9 19.6 13.2 20.5 13.2 21.3 C13.2 22.2 12.7 22.9 12 22.9 C11.3 22.9 10.8 22.2 10.8 21.3 C10.8 20.5 11.1 19.6 12 19 Z"
              fill="#ffd93d"
              style={{ transformOrigin: '12px 19px' }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isIgnited ? [0.8, 1, 0.85] : 0,
                scaleY: isIgnited ? [0.8, 1.1, 0.9] : 0.6,
              }}
              transition={{ duration: 0.35, repeat: isIgnited ? Infinity : 0, repeatType: 'mirror' }}
            />
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