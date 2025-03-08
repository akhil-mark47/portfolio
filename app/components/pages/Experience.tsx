import GlassSection from '../GlassSection';

export default function Experience() {
  return (
    <GlassSection id="experience" title="Experience">
                <div className="space-y-6">
                  <div className="gradient-border p-4">
                    <h3 className="text-xl font-bold text-gradient">Web Developer</h3>
                    <p className="font-[JetBrains Mono] text-gray-400">NAVAIDIX SOLUTIONS | Jan 2025 - Present</p>
                    <p>Building a dynamic staff recruitment website using React to enhance candidate hiring experience.</p>
                  </div>
                  <div className="gradient-border p-4">
                    <h3 className="text-xl font-bold text-gradient">Industrial Trainee</h3>
                    <p className="font-[JetBrains Mono] text-gray-400">NSIC Technical Services Centre, ECIL | June 2023 - Nov 2023</p>
                    <p>Created web scraping tool using Beautiful Soup, reducing manual search time by 70-80%</p>
                  </div>
                </div>
             </GlassSection>
  );
}