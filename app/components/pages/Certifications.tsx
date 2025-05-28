'use client';

import { useState } from 'react';
import GlassSection from '../GlassSection';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
            <div key={cert.id} className="gradient-border p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-gradient">{cert.title}</h3>
                  <p className="text-sm sm:text-base font-[JetBrains Mono] text-gray-400">{cert.category} | {cert.date}</p>
                  <p className="text-sm sm:text-base">Certificate in {cert.category} specialization</p>
                </div>
                <button
                  className="gradient-button px-4 py-2 text-sm sm:text-base rounded-lg"
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
                      <Image
                        src={cert.image}
                        alt={`${cert.title} Certificate`}
                        className="w-full object-contain max-h-[250px] sm:max-h-[400px]"
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
