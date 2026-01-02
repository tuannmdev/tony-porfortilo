import { Metadata } from "next";
import BioSection from "@/components/about/BioSection";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import SkillsMatrix from "@/components/about/SkillsMatrix";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "About - Quest Log",
  description:
    "My professional journey, skills, and experience as a Senior Software Engineer. Explore my background, expertise, and career timeline.",
  url: "/about",
  keywords: ["About", "Experience", "Skills", "Career", "Background"],
});

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8">
      <BioSection />
      <ExperienceTimeline />
      <SkillsMatrix />
    </div>
  );
}
