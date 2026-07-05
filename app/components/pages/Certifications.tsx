'use client';

import { useState } from 'react';
import GlassSection from '../GlassSection';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CredLink {
  label: string;
  url: string;
}

interface Certificate {
  id: number;
  title: string;
  category: 'Tech' | 'AI' | 'Cloud' | 'ML' | 'Other';
  date: string;
  image?: string;
  links?: CredLink[];
}

const certificatesData: Certificate[] = [
  {
    id: 1,
    title: 'Oracle Cloud Infrastructure Professional',
    category: 'Cloud',
    date: '2024',
    links: [
      { label: 'DevOps', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=5F2FF6E66A30EB6FF8220FDA4705F767EB5C799DC87C765C72F857EFA6E143D3' },
      { label: 'Data Science', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=5F2FF6E66A30EB6FF8220FDA4705F767B22EFA2DB828D95AABEF1E246A1A61C0' },
      { label: 'Generative AI', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=ACBE385ABE0D5A828323B1614143C575918369E631259F4F5AD9840E40C2BE0C' },
    ],
  },
  {
    id: 2,
    title: 'Aviatrix Certified Engineer (ACE): Multicloud Network Associate',
    category: 'Cloud',
    date: '2024',
    links: [
      { label: 'Verify', url: 'https://www.credly.com/badges/49b522ea-d689-4684-903a-05dd7fd11ff3/public_url' },
    ],
  },
  {
    id: 3,
    title: 'Deep Learning & Machine Learning',
    category: 'ML',
    date: '2024',
    links: [
      { label: 'Neural Networks & Deep Learning', url: 'https://www.coursera.org/account/accomplishments/verify/2GYD8Q5D8O1T' },
      { label: 'Supervised Machine Learning', url: 'https://www.coursera.org/account/accomplishments/verify/ZH5D885CUHKO' },
    ],
  },
 
];

const Certifications: React.FC = () => {
  const [expandedCertId, setExpandedCertId] = useState<number | null>(null);

  const toggleCertificate = (certId: number) => {
    setExpandedCertId(expandedCertId === certId ? null : certId);
  };

  return (
    <GlassSection id="certifications" title="Certifications">
      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="space-y-6">
          {certificatesData.map((cert) => (
            <div key={cert.id} className="gradient-border p-4 rounded-lg">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCertificate(cert.id)}>
                <div className="flex items-center space-x-4">
                  {cert.image && (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{cert.title}</h3>
                    <p className="text-sm text-gray-400">{cert.category} - {cert.date}</p>
                  </div>
                </div>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: expandedCertId === cert.id ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
              <AnimatePresence>
                {expandedCertId === cert.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-2"
                  >
                    {cert.links && cert.links.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {cert.links.map((link, index) => (
                          <li key={index}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">No links available.</p>
                    )}
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
