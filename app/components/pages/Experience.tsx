import GlassSection from '../GlassSection';

export default function Experience() {
  return (
    <GlassSection id="experience" title="Experience">
                <div className="space-y-6">
                  <div className="gradient-border p-4">
                    <h3 className="text-xl font-bold text-gradient">Backend Development Intern</h3>
                    <p className="font-[JetBrains Mono] text-gray-400">Laminin Digital LTD (Remote), England, UK | Feb 2026 - Apr 2026</p>
                    <p>Architected an end-to-end Computer Vision pipeline (YOLO26n-seg + ByteTrack) hitting 0.995 mAP with 7.5ms inference for real-time SaaS deployment.</p>
                  </div>
                  <div className="gradient-border p-4">
                    <h3 className="text-xl font-bold text-gradient">Backend Intern</h3>
                    <p className="font-[JetBrains Mono] text-gray-400">Fluition Sphere LLP, Hyderabad | June 2025 - July 2025</p>
                    <p>Built modular REST APIs with Next.js, Prisma & PostgreSQL, adding JWT auth, Azure Blob Storage and Postmark email for a React Native app.</p>
                  </div>
                  <div className="gradient-border p-4">
                    <h3 className="text-xl font-bold text-gradient">Full Stack Developer (Freelance)</h3>
                    <p className="font-[JetBrains Mono] text-gray-400">Navaidix Solutions Pvt. Ltd., Hyderabad | Jan 2025 - May 2025</p>
                    <p>Shipped a scalable recruitment platform (React, Node.js, MongoDB) serving 500+ users, improving hiring efficiency 40% and performance 35% with CI/CD.</p>
                  </div>
                </div>
             </GlassSection>
  );
}
