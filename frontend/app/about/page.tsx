import ProfileHeader from "@/components/about/ProfileHeader";
import SkillsSection from "@/components/about/SkillsSection";
import EducationSection from "@/components/about/EducationSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import ProjectsSection from "@/components/about/ProjectsSection";
import AskAIWidget from "@/components/about/AskAIWidget";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen p-8 pb-24">
      <div className="max-w-2xl">
        <ProfileHeader />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
      </div>
      <AskAIWidget />
    </div>
  );
}