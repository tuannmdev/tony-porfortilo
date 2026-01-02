"use client";

import { useSkills } from "@/hooks/useSkills";

const proficiencyLabels = {
  1: "BEGINNER",
  2: "NOVICE",
  3: "INTERMEDIATE",
  4: "ADVANCED",
  5: "EXPERT",
};

const proficiencyColors = {
  1: "bg-accent-red",
  2: "bg-accent-yellow",
  3: "bg-accent-blue",
  4: "bg-accent-green",
  5: "bg-primary",
};

export default function TechStackSection() {
  const { data: skills, isLoading } = useSkills({ category: "primary" });

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center text-text-muted">Loading skills...</div>
      </section>
    );
  }

  if (!skills || skills.length === 0) {
    return null;
  }

  // Show top 6 skills
  const topSkills = skills.slice(0, 6);

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-4 py-2 text-panel-retro shadow-retro-btn mb-4">
          <span className="material-symbols-outlined">stars</span>
          <span className="text-sm font-bold">SKILL TREE</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-primary uppercase">
          Tech Stack
        </h2>
        <p className="mt-4 text-text-muted max-w-2xl mx-auto">
          My arsenal of technologies and tools
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topSkills.map((skill) => (
          <div
            key={skill.id}
            className="group border-2 border-border-retro bg-panel-retro p-6 shadow-retro hover:shadow-retro-card transition-all"
          >
            {/* Skill Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {skill.icon_url ? (
                  <img
                    src={skill.icon_url}
                    alt={skill.name}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <div
                    className="h-8 w-8 border-2 border-border-retro flex items-center justify-center"
                    style={{
                      backgroundColor: skill.color || "#8c5a3c",
                    }}
                  >
                    <span className="text-xs font-bold text-white">
                      {skill.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-primary">
                  {skill.name}
                </h3>
              </div>
              {skill.is_featured && (
                <span className="material-symbols-outlined text-accent-yellow">
                  star
                </span>
              )}
            </div>

            {/* Proficiency Label */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-text-main">
                  {proficiencyLabels[skill.proficiency as keyof typeof proficiencyLabels]}
                </span>
                <span className="text-text-muted">
                  LVL {skill.proficiency}/5
                </span>
              </div>

              {/* Proficiency Bar */}
              <div className="relative h-4 border-2 border-border-retro bg-bg-retro overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    proficiencyColors[skill.proficiency as keyof typeof proficiencyColors]
                  }`}
                  style={{
                    width: `${(skill.proficiency / 5) * 100}%`,
                  }}
                />
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>

            {/* XP Bar (decorative) */}
            <div className="flex items-center space-x-2 text-xs text-text-muted">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
              <div className="flex-1 h-1 bg-bg-retro border border-border-retro">
                <div
                  className="h-full bg-accent-green"
                  style={{
                    width: `${Math.min(
                      ((skill.proficiency * 20) % 100) + 20,
                      100
                    )}%`,
                  }}
                />
              </div>
              <span>{(skill.proficiency * 20) % 100}% TO NEXT LVL</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-12 text-center">
        <a
          href="/about"
          className="inline-flex items-center space-x-2 border-2 border-border-retro bg-panel-retro px-6 py-3 text-primary shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
        >
          <span className="font-bold">VIEW ALL SKILLS</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
