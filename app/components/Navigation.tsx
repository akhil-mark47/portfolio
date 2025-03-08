'use client';

import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', id: 'hero' },
  { name: 'Experience', id: 'experience' },
  { name: 'Education', id: 'education' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Volunteering', id: 'volunteering' },
];

const Navigation: React.FC = () => {
  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
    });
  };

  return (
    <nav className="space-nav">
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          className="nav-button"
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavClick(item.id)}
        >
          {item.name}
        </motion.button>
      ))}
    </nav>
  );
};

export default Navigation;