import GlassSection from '../GlassSection';

export default function Volunteering() {
  return (
    <GlassSection id="volunteering" title="Volunteering">
      <div className="space-y-6">
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">Technical Volunteer</h3>
          <p className="font-[JetBrains Mono] text-gray-400">VJ Data Questers | 2024 - Present</p>
          <p>Assisting in organizing technical events and data science workshops, fostering tech enthusiasm among peers.</p>
        </div>
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">App Development Volunteer</h3>
          <p className="font-[JetBrains Mono] text-gray-400">Google Developer Groups On Campus | 2024 - Present</p>
          <p>Contributing to mobile app development initiatives, promoting hands-on learning and app development among students.</p>
        </div>
        <div className="gradient-border p-4">
          <h3 className="text-xl font-bold text-gradient">Secretary</h3>
          <p className="font-[JetBrains Mono] text-gray-400">Cloud Community Club | 2023 - 2024</p>
          <p>Led cloud-based technical events, workshops, and meetups to promote cloud computing knowledge.</p>
        </div>
      </div>
    </GlassSection>
  );
}