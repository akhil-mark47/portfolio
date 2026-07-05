import GlassSection from '../GlassSection';

export default function Volunteering() {
  return (
    <GlassSection id="volunteering" title="Positions of Responsibility">
      <div className="space-y-6">
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">CFP Reviewer</h3>
          <p className="font-[JetBrains Mono] text-gray-400">PyConf Hyderabad 2026 | Dec 2025 - Present</p>
          <p>Review and evaluate conference talk proposals for technical depth, relevance, and clarity within a large open-source community.</p>
        </div>
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">App Development Coordinator</h3>
          <p className="font-[JetBrains Mono] text-gray-400">Google Developer Groups On Campus | Oct 2024 - Present</p>
          <p>Lead Flutter &amp; AI app-development workshops, mentoring 50+ students and driving 20+ deployed student projects.</p>
        </div>
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">Joint Secretary</h3>
          <p className="font-[JetBrains Mono] text-gray-400">VJ Data Questers | Nov 2024 - Present</p>
          <p>Drive open-source data initiatives and mentor members in architecting analytics solutions across campus.</p>
        </div>
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">Facilitator - AI Days 2025</h3>
          <p className="font-[JetBrains Mono] text-gray-400">Swecha | Apr 2025</p>
          <p>Mentored 50+ student teams at SparkCamp on problem formulation, AI solution design, and feasibility under tight timelines.</p>
        </div>
      </div>
    </GlassSection>
  );
}
