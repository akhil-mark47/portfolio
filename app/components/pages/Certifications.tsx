'use client';

import { useState } from 'react';
import GlassSection from '../GlassSection';
import { motion, AnimatePresence } from 'framer-motion';

interface Certificate {
  id: number;
  title: string;
  category: 'Tech' | 'AI' | 'Cloud' | 'Other';
  date: string;
  image: string;
}

const certificatesData: Certificate[] = [
  { id: 1, title: 'Oracle Cloud Infrastructure: Generative AI Certified Professional', category: 'AI', date: '07-2024', image: '/assets/certificates/oracle.jpg' },
  
];

const Certifications: React.FC = () => {
  const [expandedCertId, setExpandedCertId] = useState<number | null>(null);

  const toggleCertificate = (certId: number) => {
    if (expandedCertId === certId) {
      setExpandedCertId(null);
    } else {
      setExpandedCertId(certId);
    }
  };

  return (
    <GlassSection id="certifications" title="Certifications">
      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="space-y-6">
          {certificatesData.map((cert) => (
            <div key={cert.id} className="gradient-border p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gradient">{cert.title}</h3>
                  <p className="font-[JetBrains Mono] text-gray-400">{cert.category} | {cert.date}</p>
                  <p>Certificate in {cert.category} specialization</p>
                </div>
                <button
                  className="gradient-button"
                  onClick={() => toggleCertificate(cert.id)}
                >
                  {expandedCertId === cert.id ? 'Hide' : 'View'}
                </button>
              </div>
              
              {/* Expandable certificate image section */}
              <AnimatePresence>
                {expandedCertId === cert.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="border-2 border-blue-500 rounded-lg overflow-hidden bg-white p-2">
                      <img
                        src={cert.image}
                        alt={`${cert.title} Certificate`}
                        className="w-full object-contain max-h-[400px]"
                        loading="eager"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </GlassSection>
  );
};

export default Certifications;