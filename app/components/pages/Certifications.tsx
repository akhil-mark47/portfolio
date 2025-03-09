'use client';

import GlassSection from '../GlassSection';
import { motion } from 'framer-motion';

interface Certificate {
  id: number;
  title: string;
  category: 'Tech' | 'AI' | 'Cloud' | 'Other';
  date: string;
  image: string;
}

const certificatesData: Certificate[] = [
  { id: 1, title: 'AWS Certified Solutions Architect', category: 'Cloud', date: '2023-06', image: '/assets/certificates/oracle.jpg' },
//   { id: 2, title: 'TensorFlow Developer Certificate', category: 'AI', date: '2023-03', image: '/assets/certificates/tensorflow.jpg' },
//   { id: 3, title: 'Google Cloud Professional DevOps', category: 'Cloud', date: '2022-12', image: '/assets/certificates/gcp.jpg' },
//   { id: 4, title: 'Full Stack Web Development', category: 'Tech', date: '2022-09', image: '/assets/certificates/fullstack.jpg' },
  // Add your certificates
];

const Certifications: React.FC = () => {
  return (
    <GlassSection id="certifications" title="Certifications">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/assets/videos/public_videos_skills-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Horizontal Infinite Loop for Certificate Images */}
        <div className="overflow-hidden mb-8">
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20, // Adjust speed of the loop
                ease: 'linear',
              },
            }}
          >
            {/* Duplicate certificates to create seamless loop */}
            {[...certificatesData, ...certificatesData].map((cert, index) => (
              <div key={`${cert.id}-${index}`} className="flex-shrink-0 mx-4">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-64 h-40 object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Certificate Details in Cards */}
        <div className="space-y-6">
          {certificatesData.map((cert) => (
            <div key={cert.id} className="gradient-border p-4">
              <h3 className="text-xl font-bold text-gradient">{cert.title}</h3>
              <p className="font-[JetBrains Mono] text-gray-400">{cert.category} | {cert.date}</p>
              <p>Certificate in {cert.category} specialization</p>
            </div>
          ))}
        </div>
      </div>
    </GlassSection>
  );
};

export default Certifications;