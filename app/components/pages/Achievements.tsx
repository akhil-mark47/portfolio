import GlassSection from '../GlassSection';

export default function Achievements() {
  return (
    <GlassSection id="achievements" title="Achievements">
      <div className="space-y-6">
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">Finalist - HACK4SDG Hackathon</h3>
          <p className="font-[JetBrains Mono] text-gray-400">AIESEC | 2024</p>
          <p>Reached the finals among 160+ teams by developing innovative solutions aligned with sustainable development goals.</p>
        </div>
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">Smart India Hackathon (SIH)</h3>
          <p className="font-[JetBrains Mono] text-gray-400">Ministry Of Education,India | 2024</p>
          <p>Participated in the internal round of Smart India Hackathon under the software category.</p>
        </div>
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">Finalist - Innovasia Hackathon</h3>
          <p className="font-[JetBrains Mono] text-gray-400">VCE | 2024</p>
          <p>Stood out among 180+ teams by proposing a groundbreaking solution during the Innovasia Hackathon.</p>
        </div>
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">&apos;C&apos; Certification - National Cadet Corps (NCC)</h3>
          <p className="font-[JetBrains Mono] text-gray-400">NCC | 2023</p>
          <p>Successfully completed &apos;C&apos; Certification with active participation in 30+ leadership workshops and diverse training exercises.</p>
        </div>
      </div>
    </GlassSection>
  );
}