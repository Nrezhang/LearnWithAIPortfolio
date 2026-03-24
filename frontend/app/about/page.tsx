import ProfileHeader from "@/components/about/ProfileHeader";
import SkillsSection from "@/components/about/SkillsSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import AskAIWidget from "@/components/about/AskAIWidget";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen p-8 pb-24">
      <div className="max-w-2xl">
        <ProfileHeader />
        <SkillsSection />
        <ExperienceSection />
      </div>
      <AskAIWidget />
    </div>
  );
}