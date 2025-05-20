'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import Starfield from '../StarField'; 

const PersonalSpace: React.FC = () => {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
  const [showingFullscreen, setShowingFullscreen] = useState(false);
  const [moviePreview, setMoviePreview] = useState<string | null>(null);
  const [activePreviewTitle, setActivePreviewTitle] = useState<string>('');
  const navigateToHome = useCallback(() => {
    // Use window.location.replace to navigate without adding to history stack
    // This is more reliable than router.replace for preventing reloads
    window.location.href = '/';
  }, []);
  interface NavigationProps {
    activeSection: string;
  }

  const panels = [
    
    {
      id: 'hobbies',
      title: 'Hobbies',
      icon: '🚀',
      extension: '.dat',
      summary: 'Exploring coding, stargazing, and gaming in virtual worlds.',
      content: [
        <div key="tech-exploration" className="space-y-2">
          <div className="flex items-center">
            <span className="text-blue-400 mr-2">🚀</span> Exploring emerging tech, AI, and LLMs
          </div>
{/*           <img
            src="https://via.placeholder.com/300x200?text=Tech+Exploration"
            alt="Tech Exploration"
            className="w-full h-48 object-cover rounded"
          /> */}
        </div>,
        <div key="coding" className="space-y-2">
          <div className="flex items-center">
            <span className="text-blue-400 mr-2">⌨️</span> Coding new universes through web and AI development
          </div>
{/*           <img
            src="https://via.placeholder.com/300x200?text=Coding+Project"
            alt="Coding"
            className="w-full h-48 object-cover rounded"
          /> */}
        </div>,
        <div key="stargazing" className="space-y-2">
          <div className="flex items-center">
            <span className="text-blue-400 mr-2">🔭</span> Amateur astronomy and stargazing
          </div>
{/*           <img
            src="https://via.placeholder.com/300x200?text=Stargazing"
            alt="Stargazing"
            className="w-full h-48 object-cover rounded"
          /> */}
        </div>,
        <div key="gaming" className="space-y-2">
          <div className="flex items-center">
            <span className="text-blue-400 mr-2">🎮</span> Exploring virtual worlds in sci-fi and strategy games
          </div>
{/*           <img
            src="https://via.placeholder.com/300x200?text=Gaming"
            alt="Gaming"
            className="w-full h-48 object-cover rounded"
          /> */}
        </div>,
       
        <div key="data-viz" className="space-y-2">
          <div className="flex items-center">
            <span className="text-blue-400 mr-2">📊</span> Visualizing data & uncovering patterns
          </div>
{/*           <img
            src="https://via.placeholder.com/300x200?text=Data+Visualization"
            alt="Data Visualization"
            className="w-full h-48 object-cover rounded"
          /> */}
        </div>,
        
      ],
      
    },
    {
      id: 'movies',
      title: 'Movies',
      icon: '🎬',
      extension: '.vid',
      summary: 'Favorites: Interstellar, The Night Agent, Salaar.',
      content: [
        
        <div key="interstellar" className="space-y-2">
          <h5 className="text-blue-400">Interstellar</h5>
          <p className="text-sm">A journey through space and time.</p>
          <button
            className="mt-2 px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)]"
            onClick={(e) => {
              e.stopPropagation(); // Prevent fullscreen click event
              setShowingFullscreen(false); // Close fullscreen first
              setExpandedPanel(null); // Clear expanded panel
              setMoviePreview('https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1&mute=0');
              setActivePreviewTitle('Interstellar');
            }}
          >
            Preview
          </button>
        </div>,
        <div key="bladerunner" className="space-y-2">
          <h5 className="text-blue-400">Blade Runner 2049</h5>
          <p className="text-sm">Exploring AI and humanity.</p>
          <button
            className="mt-2 px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)]"
            onClick={(e) => {
              e.stopPropagation();
              setShowingFullscreen(false); // Close fullscreen first
              setExpandedPanel(null); // Clear expanded panel
              setMoviePreview('https://www.youtube.com/embed/gCcx85zbxz4?autoplay=1&mute=0');
              setActivePreviewTitle('Blade Runner 2049');
            }}
          >
            Preview
          </button>
        </div>,
        <div key="matrix" className="space-y-2">
          <h5 className="text-blue-400">The Matrix</h5>
          <p className="text-sm">Reality-bending classic.</p>
          <button
            className="mt-2 px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)]"
            onClick={(e) => {
              e.stopPropagation();
              setShowingFullscreen(false); // Close fullscreen first
              setExpandedPanel(null); // Clear expanded panel
              setMoviePreview('https://www.youtube.com/embed/m8e-FF8MsqU?autoplay=1&mute=0');
              setActivePreviewTitle('The Matrix');
            }}
          >
            Preview
          </button>
        </div>,
        <div key="salaar" className="space-y-2">
          <h5 className="text-blue-400">Salaar</h5>
          <p className="text-sm">An action-packed thriller starring Prabhas.</p>
          <button
            className="mt-2 px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)]"
            onClick={(e) => {
              e.stopPropagation();
              setShowingFullscreen(false); // Close fullscreen first
              setExpandedPanel(null); // Clear expanded panel
              setMoviePreview('https://www.youtube.com/embed/9Im1q4gvk1M?autoplay=1&mute=0');
              setActivePreviewTitle('Salaar');
            }}
          >
            Preview
          </button>
        </div>,
        <div key="the-night-agent" className="space-y-2">
          <h5 className="text-blue-400">The Night Agent</h5>
          <p className="text-sm">A thrilling series about a low-level FBI agent entangled in a vast conspiracy.</p>
          <button
            className="mt-2 px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)]"
            onClick={(e) => {
              e.stopPropagation();
              setShowingFullscreen(false); // Close fullscreen first
              setExpandedPanel(null); // Clear expanded panel
              setMoviePreview('https://www.youtube.com/embed/YDbnY9Obsfs?autoplay=1&mute=0');
              setActivePreviewTitle('The Night Agent');
            }}
          >
            Preview
          </button>
        </div>,
        <div key="the-recruit" className="space-y-2">
          <h5 className="text-blue-400">The Recruit</h5>
          <p className="text-sm">A spy-adventure series following a CIA lawyer caught in dangerous international conflicts.</p>
          <button
            className="mt-2 px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)]"
            onClick={(e) => {
              e.stopPropagation();
              setShowingFullscreen(false); // Close fullscreen first
              setExpandedPanel(null); // Clear expanded panel
              setMoviePreview('https://www.youtube.com/embed/czt_Mh_qdsw?autoplay=1&mute=0');
              setActivePreviewTitle('The Recruit');
            }}
          >
            Preview
          </button>
        </div>,
      ],
      
    },
    {
      id: 'books',
      title: 'Books',
      icon: '📚',
      extension: '.txt',
      summary: 'Currently reading: Hands-On Large Language Models.',
      content: [
        <div key="hands-on-llms" className="space-y-2">
          <h5 className="text-blue-400">Hands-On Large Language Models</h5>
          <p className="text-sm">A comprehensive guide to understanding and building large language models.</p>
          <img
            src="https://raw.githubusercontent.com/HandsOnLLM/Hands-On-Large-Language-Models/main/images/book_cover.png"
            alt="Hands-On Large Language Models Book Cover"
            className="w-full h-48 object-cover rounded"
          />
        </div>,
        <div key="hands-on-ml" className="space-y-2">
          <h5 className="text-blue-400">Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow</h5>
          <p className="text-sm">Concepts, tools, and techniques to build intelligent systems.</p>
          <img
            src="https://m.media-amazon.com/images/I/71UF9mDAX3L._AC_UF1000,1000_QL80_.jpg"
            alt="Hands-On Machine Learning Book Cover"
            className="w-full h-48 object-cover rounded"
          />
        </div>,
        <div key="practical-data-science" className="space-y-2">
          <h5 className="text-blue-400">Practical Statistics for Data Scientists</h5>
          <p className="text-sm">Essential concepts and techniques for data analysis and machine learning using R.</p>
          <img
            src="https://m.media-amazon.com/images/I/81Sdk02bg+L._AC_UF1000,1000_QL80_.jpg"
            alt="Practical Data Science with R Book Cover"
            className="w-full h-48 object-cover rounded"
          />
        </div>,
        <div key="ai-engineering" className="space-y-2">
          <h5 className="text-blue-400">AI Engineering</h5>
          <p className="text-sm">Book by Chip Huyen focusing on building applications with foundation models.</p>
          <img
            src="https://m.media-amazon.com/images/I/815KH9GjFTL._AC_UF1000,1000_QL80_.jpg"
            alt="AI Engineering Book Cover"
            className="w-full h-48 object-cover rounded"
          />
        </div>,
      ],
      
    },
    {
      id: 'music',
      title: 'Music',
      icon: '🎵',
      extension: '.wav',
      summary: 'Loving synthwave and ambient tracks by Tycho and Kavinsky.',
      content: [
<div key="all-the-stars" className="space-y-2">
  <h5 className="text-blue-400">All the Stars</h5>
  <p className="text-sm">A song by Kendrick Lamar and SZA, featured in the movie 'Black Panther'.</p>
  <iframe width="100%" height="352" src="https://open.spotify.com/embed/track/3GCdLUSnKSMJhs4Tj6CV3s?utm_source=generator" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
</div>,
<div key="starboy" className="space-y-2">
  <h5 className="text-blue-400">Starboy</h5>
  <p className="text-sm">A song by The Weeknd featuring Daft Punk.</p>
  <iframe width="100%" height="352" src="https://open.spotify.com/embed/track/7MXVkk9YMctZqd1Srtv4MB?utm_source=generator" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
</div>,
<div key="tainu-khabar-nahi" className="space-y-2">
  <h5 className="text-blue-400">Tainu Khabar Nahi</h5>
  <p className="text-sm">A soulful track by Arijit Singh, Sachin-Jigar, and Amitabh Bhattacharya.</p>
  <iframe width="100%" height="352" src="https://open.spotify.com/embed/track/1bfWK1SIBYXzWA0Ypt4KlD?utm_source=generator" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
</div>,
<div key="dangerous" className="space-y-2">
  <h5 className="text-blue-400">They Don't Care About Us</h5>
  <p className="text-sm">A song by Michael Jackson.</p>
  <iframe width="100%" height="352" src="https://open.spotify.com/embed/track/3wuCCNCnBhJlwkIJTBZFiv?utm_source=generator" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
</div>


      ],
    },
    {
      id: 'quotes',
      title: 'Quotes',
      icon: '💭',
      extension: '.log',
      summary: '"The universe is a pretty big place..." – Carl Sagan',
      content: [
        <div key="quotes-title" className="space-y-4">
          <h4 className="text-[rgba(147,51,234,0.9)] text-lg">Words of Wisdom</h4>
        </div>,
        <div key="business-quote" className="space-y-2">
          <blockquote className="border-l-4 border-green-500 pl-4 py-2 italic">
            "Opportunities don't happen. You create them."
            <footer className="text-green-400 mt-2 text-sm">– Chris Grosser</footer>
          </blockquote>
        </div>,
        <div key="success-quote" className="space-y-2">
          <blockquote className="border-l-4 border-yellow-500 pl-4 py-2 italic">
            "Success is not in what you have, but who you are."
            <footer className="text-yellow-400 mt-2 text-sm">– Bo Bennett</footer>
          </blockquote>
        </div>,
        <div key="perseverance-quote" className="space-y-2">
          <blockquote className="border-l-4 border-red-500 pl-4 py-2 italic">
            "It’s not whether you get knocked down, it’s whether you get up."
            <footer className="text-red-400 mt-2 text-sm">– Vince Lombardi</footer>
          </blockquote>
        </div>,
        <div key="growth-quote" className="space-y-2">
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic">
            "Do what you love and success will follow. Passion is the fuel behind a successful career."
            <footer className="text-blue-400 mt-2 text-sm">– Meg Whitman</footer>
          </blockquote>
        </div>,
      ],
      
    },
  ];

  const panelVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const fullscreenVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  const previewVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        animationDelay: `${Math.random() * 5}s`,
      });
    }
    return stars;
  };

  const stars = generateStars(100);
  // Add this useEffect hook just before your return statement

// Keyboard handler for ESC key
useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (moviePreview) {
          setMoviePreview(null);
        } else if (showingFullscreen) {
          setShowingFullscreen(false);
          setExpandedPanel(null);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moviePreview, showingFullscreen]);
  return (
    <section
      id="personal-space"
      className="min-h-screen bg-[var(--space-black)] text-[var(--starry-white)] flex items-center justify-center overflow-hidden relative"
    >

<motion.button
  className="fixed top-4 left-4 z-50 flex items-center space-x-1 px-3 py-1.5 bg-[rgba(59,130,246,0.2)] text-[rgba(147,51,234,0.9)] rounded-md border border-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.3)] transition-all group"
  onClick={navigateToHome}
  whileHover={{ x: -2 }}
  whileTap={{ scale: 0.95 }}
  aria-label="Back to Home"
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
  <span className="text-xs font-[JetBrains Mono]">HOME</span>
</motion.button>
      {/* Starry Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
  <Starfield /> {/* This reuses your existing starfield component */}
</div>
      {/* <div className="absolute inset-0 bg-black pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animation: `twinkle 4s infinite ${star.animationDelay}`,
            }}
          />
        ))}
      </div> */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,rgba(147,51,234,0.05)_30%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 border-b border-[rgba(59,130,246,0.3)] pb-4">
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
            <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
            <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-[rgba(147,51,234,0.9)] font-[JetBrains Mono] ml-4">FILE.SYSTEM.EXPLORER</span>
          </div>
          <div className="text-[rgba(59,130,246,0.7)] font-[JetBrains Mono] text-sm">
            SYS.STATUS: <span className="text-green-400">ONLINE</span>
          </div>
        </div>

        {!showingFullscreen && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 rounded-lg border border-[rgba(59,130,246,0.2)] bg-[rgba(10,10,20,0.7)] backdrop-blur-md">
            {panels.map((panel) => (
              <motion.div
                key={panel.id}
                className="flex flex-col items-center text-center cursor-pointer group"
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={panelVariants}
                onClick={() => {
                  setExpandedPanel(panel.id);
                  setShowingFullscreen(true);
                }}
              >
                <div className="w-20 h-24 bg-[rgba(59,130,246,0.1)] rounded-lg flex items-center justify-center mb-2 relative border border-[rgba(59,130,246,0.2)] group-hover:bg-[rgba(59,130,246,0.2)] transition-colors">
                  <span className="text-4xl">{panel.icon}</span>
                  <div className="absolute top-1 right-1 bg-[rgba(147,51,234,0.9)] text-xs px-1 rounded">
                    {panel.extension}
                  </div>
                  <motion.div
                    className="absolute inset-0 border-2 border-[rgba(59,130,246,0.5)] rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
                <div className="text-sm font-[JetBrains Mono] text-[rgba(147,51,234,0.9)] mb-1">
                  {panel.title}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">{panel.summary}</div>
                <div className="mt-1 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-1"></div>
                  <span className="text-xs text-[rgba(59,130,246,0.7)]">ACTIVE</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Fullscreen View */}
        <AnimatePresence>
          {showingFullscreen && expandedPanel && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black bg-opacity-90 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fullscreenVariants}
            >
              <div className="bg-[rgba(10,10,30,0.95)] border-2 border-[rgba(59,130,246,0.3)] rounded-lg w-full max-w-6xl h-full max-h-[80vh] flex flex-col relative">
                <div className="p-4 border-b border-[rgba(59,130,246,0.3)] flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{panels.find(p => p.id === expandedPanel)?.icon}</span>
                    <h2 className="text-xl font-[JetBrains Mono] text-[rgba(147,51,234,1)]">
                      {panels.find(p => p.id === expandedPanel)?.title}
                      {panels.find(p => p.id === expandedPanel)?.extension}
                    </h2>
                  </div>
                  <button
                    className="flex items-center px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)] transition-colors"
                    onClick={() => {
                      setShowingFullscreen(false);
                      setExpandedPanel(null);
                      setMoviePreview(null); // Reset preview when closing fullscreen
                    }}
                  >
                    <span className="text-xs mr-2">×</span>
                    <span className="font-[JetBrains Mono] text-sm">CLOSE</span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 font-[JetBrains Mono]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {panels.find(p => p.id === expandedPanel)?.content.map((child: JSX.Element, index: number) => (
                      <div
                        key={index}
                        className="bg-[rgba(10,10,20,0.7)] p-4 rounded-lg border border-[rgba(59,130,246,0.2)]"
                      >
                        {child}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 border-t border-[rgba(59,130,246,0.3)] flex justify-between items-center text-xs text-[rgba(147,51,234,0.7)] font-[JetBrains Mono]">
                  <div>FILE: PERSONAL/{expandedPanel}{panels.find(p => p.id === expandedPanel)?.extension}</div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                    <span>FILE.OPEN</span>
                  </div>
                </div>

                <div className="absolute -top-1 left-10 right-10 h-[2px] bg-blue-500 opacity-70"></div>
                <div className="absolute -bottom-1 left-10 right-10 h-[2px] bg-purple-500 opacity-70"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>



{/* Movie Preview Popup */}
<AnimatePresence>
  {moviePreview && (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-sm movie-preview-container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={previewVariants}
    >
      <motion.div 
        className="relative bg-[rgba(10,10,30,0.95)] rounded-lg p-6 max-w-4xl w-full movie-preview-container"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Enhanced header with movie title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🎬</span>
            <h3 className="text-lg font-[JetBrains Mono] text-[rgba(147,51,234,0.9)]">
              {activePreviewTitle ? `${activePreviewTitle} Preview` : 'Movie Preview'}
            </h3>
          </div>
          <button
            className="flex items-center px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)] transition-colors"
            onClick={() => setMoviePreview(null)}
            aria-label="Close preview"
          >
            <span className="text-xs mr-2">×</span>
            <span className="font-[JetBrains Mono] text-sm">CLOSE</span>
          </button>
        </div>
        
        {/* Frame with improved styling */}
        <div className="relative rounded-md overflow-hidden border-2 border-[rgba(59,130,246,0.3)] movie-preview-container">
          <iframe
            width="100%"
            height="500"
            src={moviePreview} // Now includes autoplay=1 parameter
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="bg-black movie-preview-iframe"
          ></iframe>
          
          {/* Loading indicator for iframe */}
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <div className="h-4 w-32 bg-[rgba(59,130,246,0.3)] rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-[rgba(59,130,246,0.7)]"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>
              <span className="text-xs text-[rgba(59,130,246,0.7)] font-[JetBrains Mono]">INITIALIZING PLAYBACK</span>
            </div>
          </motion.div>
        </div>
        
        {/* User guidance note */}
        <div className="mt-4 text-xs text-center text-[rgba(59,130,246,0.7)] font-[JetBrains Mono]">
          NOTE: IF AUDIO DOESN'T START AUTOMATICALLY, CLICK THE VIDEO ONCE
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

        {!showingFullscreen && (
          <div className="mt-6 p-4 border-t border-[rgba(59,130,246,0.3)] flex justify-between items-center">
            <div className="text-xs text-[rgba(147,51,234,0.7)] font-[JetBrains Mono]">
              DIR: /PERSONAL_SPACE
            </div>
            <div className="flex items-center">
              <div className="mr-4 h-3 w-10 bg-[rgba(59,130,246,0.3)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[rgba(59,130,246,0.7)]"
                  animate={{ width: ['20%', '100%', '20%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <span className="text-xs text-[rgba(59,130,246,0.7)] font-[JetBrains Mono]">DIR.SCAN</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
};

export default PersonalSpace;
