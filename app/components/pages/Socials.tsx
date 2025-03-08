import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FcReddit } from "react-icons/fc";
import GlassSection from '../GlassSection';

const socialLinks = [
  { 
    href: "https://www.reddit.com/user/Primary-Present7403/",
    Icon: FcReddit,
    style: { color: "#FF4500" },
    hoverRotate: 5
  },
  { 
    href: "https://github.com/akhil-varsh",
    Icon: FaGithub,
    className: "text-purple-400 hover:text-purple-300",
    hoverRotate: 5
  },
  { 
    href: "https://www.linkedin.com/in/pettem-akhil-varsh-4ba049285/",
    Icon: FaLinkedin,
    className: "text-blue-400 hover:text-blue-300",
    hoverRotate: 5
  },
  { 
    href: "mailto:akhilvarshpettem@gmail.com",
    Icon: FaEnvelope,
    className: "text-[var(--starry-white)] hover:text-purple-300",
    hoverRotate: 5
  },
  { 
    href: "https://www.instagram.com/akhil__varsh/",
    Icon: FaInstagram,
    style: {
      backgroundImage: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },
    hoverRotate: 5
  },
  { 
    href: "https://discord.gg/e8EujaKw",
    Icon: FaDiscord,
    style: { color: "#5865F2" },
    hoverRotate: -5
  },
  { 
    href: "https://x.com/Akhil__47",
    Icon: FaXTwitter,
    style: { color: "#000" },
    hoverRotate: -5
  }
];

export default function Socials() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Setup spotlight effect
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const updateSpotlight = () => {
      const marquee = marqueeRef.current;
      if (!marquee) return;
      
      // Get all social links
      const links = marquee.querySelectorAll('a');
      
      // Get marquee position and center point
      const centerX = window.innerWidth / 2;
      
      // Find closest link to center
      let closestLink: Element | null = null;
      let minDistance = Infinity;
      
      // First pass: find the closest link to center
      links.forEach((link) => {
        const linkRect = link.getBoundingClientRect();
        const linkCenterX = linkRect.left + linkRect.width / 2;
        const distanceFromCenter = Math.abs(linkCenterX - centerX);
        
        if (distanceFromCenter < minDistance) {
          minDistance = distanceFromCenter;
          closestLink = link;
        }
      });
      
      // Second pass: apply spotlight to closest link only, dim others based on distance
      links.forEach((link) => {
        const linkRect = link.getBoundingClientRect();
        const linkCenterX = linkRect.left + linkRect.width / 2;
        const distanceFromCenter = Math.abs(linkCenterX - centerX);
        
        // If this is the closest link and it's within a reasonable distance from center
        if (link === closestLink && minDistance < 100) {
          link.classList.add('spotlight');
          
          // Apply enhanced spotlight effect with larger size
          link.style.opacity = "1";
          link.style.transform = "scale(1.3)";
          link.style.filter = "brightness(1.3) saturate(1.2) drop-shadow(0 0 12px currentColor)";
          link.style.zIndex = "10";
        } else {
          link.classList.remove('spotlight');
          
          // Calculate gradient effect based on distance
          // The closer to the center, the less dimmed
          const maxDistance = 400; // Distance at which icons reach minimum opacity/scale
          const opacity = Math.max(0.2, 1 - (distanceFromCenter / maxDistance));
          const scale = Math.max(0.7, 1 - (distanceFromCenter / (maxDistance * 1.2)));
          
          // Apply styles with darkening filter - further = darker
          link.style.opacity = opacity.toString();
          link.style.transform = `scale(${scale})`;
          link.style.filter = "brightness(0.5) saturate(0.6)";
          link.style.zIndex = "1";
        }
      });
    };
    
    // Initial update
    updateSpotlight();
    
    // Update on animation frames for smooth effect
    let animationFrameId: number;
    
    const animate = () => {
      updateSpotlight();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Additional event listener for scroll to ensure spotlight updates
    window.addEventListener('scroll', updateSpotlight);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateSpotlight);
    };
  }, []);
  
  return (
    <GlassSection id="socials" title="Socials">
      <div className="relative w-full overflow-hidden p-8">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.2)_0%,rgba(5,5,5,0)_70%)] pointer-events-none"></div>
        
        {/* Enhanced spotlight beam effect - narrower beam */}
        <div className="absolute left-1/2 top-0 h-full w-3 bg-gradient-to-b from-purple-500/40 via-blue-500/30 to-transparent transform -translate-x-1/2 pointer-events-none blur-md z-5"></div>
        
        {/* Scrolling marquee container */}
        <div className="relative overflow-hidden mx-auto max-w-full">
          {/* Gradient fade left */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[rgba(5,5,5,1)] to-transparent pointer-events-none z-10" />
          
          {/* Marquee track with multiple sets for smooth looping */}
          <div className="social-marquee-track" ref={marqueeRef}>
            {/* Four sets of icons to ensure seamless looping */}
            {[...Array(4)].map((_, setIndex) => (
              <div key={`set-${setIndex}`} className="social-marquee-content">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={`social-${setIndex}-${index}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all ${social.className || ''}`}
                    style={{ 
                      ...social.style,
                      margin: '0 1.8rem' // Add more spacing between icons
                    }}
                    whileHover={{ 
                      scale: 1.6,
                      rotate: social.hoverRotate,
                      zIndex: 20,
                      filter: "brightness(1.4) saturate(1.3) drop-shadow(0 0 15px currentColor)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.Icon size={48} />
                  </motion.a>
                ))}
              </div>
            ))}
          </div>
          
          {/* Gradient fade right */}
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[rgba(5,5,5,1)] to-transparent pointer-events-none z-10" />
        </div>
      </div>
      
      {/* Caption text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-center font-[JetBrains Mono] text-sm text-gray-400 mt-4"
      >
        <p>Connect with me across the digital universe ✨</p>
      </motion.div>
    </GlassSection>
  );
}