"use client";

import { useState } from "react";
import { useSkills } from "@/hooks/useSkills";

const categoryLabels = {
  primary: "PRIMARY SKILLS",
  secondary: "SECONDARY SKILLS",
  tools: "TOOLS & PLATFORMS",
  "soft-skills": "SOFT SKILLS",
  languages: "LANGUAGES",
};

const categoryIcons = {
  primary: "stars",
  secondary: "code",
  tools: "build",
  "soft-skills": "psychology",
  languages: "translate",
};

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

export default function SkillsMatrix() {
  const { data: allSkills, isLoading } = useSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (isLoading) {
    return (
      <section className="container mx-auto px-4">
        <div className="text-center text-text-muted">Loading skills...</div>
      </section>
    );
  }

  if (!allSkills || allSkills.length === 0) {
    return null;
  }

  // Group skills by category
  const skillsByCategory = allSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof allSkills>
  );

  const categories = Object.keys(skillsByCategory);

  const displayedCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat === selectedCategory);

  // Calculate overall proficiency
  const averageProficiency =
    allSkills.reduce((sum, skill) => sum + skill.proficiency, 0) /
    allSkills.length;

  return (
    <section className="container mx-auto px-4 pb-16">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-4 py-2 text-panel-retro shadow-retro-btn mb-4">
          <span className="material-symbols-outlined">psychology</span>
          <span className="text-sm font-bold">SKILL TREE</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-primary uppercase">
          Skills Matrix
        </h2>
        <p className="mt-4 text-text-muted max-w-2xl mx-auto">
          My technical expertise and capabilities
        </p>
      </div>

      {/* Overall Stats */}
      <div className="mb-12 grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="border-2 border-border-retro bg-panel-retro p-4 text-center shadow-retro">
          <div className="text-3xl font-bold text-primary">
            {allSkills.length}
          </div>
          <div className="text-xs text-text-muted">TOTAL SKILLS</div>
        </div>
        <div className="border-2 border-border-retro bg-panel-retro p-4 text-center shadow-retro">
          <div className="text-3xl font-bold text-accent-green">
            {allSkills.filter((s) => s.proficiency === 5).length}
          </div>
          <div className="text-xs text-text-muted">EXPERT LEVEL</div>
        </div>
        <div className="border-2 border-border-retro bg-panel-retro p-4 text-center shadow-retro">
          <div className="text-3xl font-bold text-accent-blue">
            {allSkills.filter((s) => s.is_featured).length}
          </div>
          <div className="text-xs text-text-muted">FEATURED</div>
        </div>
        <div className="border-2 border-border-retro bg-panel-retro p-4 text-center shadow-retro">
          <div className="text-3xl font-bold text-primary">
            {averageProficiency.toFixed(1)}
          </div>
          <div className="text-xs text-text-muted">AVG PROFICIENCY</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
            selectedCategory === "all"
              ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
              : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
          }`}
        >
          ALL SKILLS
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
              selectedCategory === category
                ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
                : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
            }`}
          >
            {categoryLabels[category as keyof typeof categoryLabels] || category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Skills by Category */}
      <div className="space-y-12 max-w-6xl mx-auto">
        {displayedCategories.map((category) => (
          <div key={category}>
            {/* Category Header */}
            <div className="mb-6 flex items-center space-x-3">
              <span className="material-symbols-outlined text-2xl text-primary">
                {categoryIcons[category as keyof typeof categoryIcons] || "circle"}
              </span>
              <h3 className="text-2xl font-bold text-primary uppercase">
                {categoryLabels[category as keyof typeof categoryLabels] || category}
              </h3>
              <div className="flex-1 border-t-2 border-border-retro" />
              <span className="text-sm text-text-muted font-bold">
                {skillsByCategory[category].length} SKILLS
              </span>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {skillsByCategory[category].map((skill) => (
                <div
                  key={skill.id}
                  className="border-2 border-border-retro bg-panel-retro p-4 shadow-retro hover:shadow-retro-card transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {skill.icon_url ? (
                        <img
                          src={skill.icon_url}
                          alt={skill.name}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <div
                          className="h-6 w-6 border border-border-retro flex items-center justify-center"
                          style={{
                            backgroundColor: skill.color || "#8c5a3c",
                          }}
                        >
                          <span className="text-xs font-bold text-white">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h4 className="font-bold text-text-main">
                        {skill.name}
                      </h4>
                    </div>
                    {skill.is_featured && (
                      <span className="material-symbols-outlined text-accent-yellow text-sm">
                        star
                      </span>
                    )}
                  </div>

                  {/* Proficiency Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-text-main">
                        {proficiencyLabels[skill.proficiency as keyof typeof proficiencyLabels]}
                      </span>
                      <span className="text-text-muted">
                        {skill.proficiency}/5
                      </span>
                    </div>
                    <div className="relative h-3 border-2 border-border-retro bg-bg-retro overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          proficiencyColors[skill.proficiency as keyof typeof proficiencyColors]
                        }`}
                        style={{
                          width: `${(skill.proficiency / 5) * 100}%`,
                        }}
                      />
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>

                  {/* Level Dots */}
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 w-2 border border-border-retro ${
                          level <= skill.proficiency
                            ? proficiencyColors[skill.proficiency as keyof typeof proficiencyColors]
                            : "bg-bg-retro"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Career Progress Arcs */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <h3 className="text-xl font-bold text-primary uppercase mb-6 text-center">
            Career Progression
          </h3>
          <div className="space-y-4">
            {/* Backend */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-text-main">
                  BACKEND DEVELOPMENT
                </span>
                <span className="text-sm text-text-muted">85%</span>
              </div>
              <div className="h-4 border-2 border-border-retro bg-bg-retro">
                <div
                  className="h-full bg-accent-green transition-all duration-1000"
                  style={{ width: "85%" }}
                />
              </div>
            </div>

            {/* Frontend */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-text-main">
                  FRONTEND DEVELOPMENT
                </span>
                <span className="text-sm text-text-muted">90%</span>
              </div>
              <div className="h-4 border-2 border-border-retro bg-bg-retro">
                <div
                  className="h-full bg-accent-blue transition-all duration-1000"
                  style={{ width: "90%" }}
                />
              </div>
            </div>

            {/* DevOps */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-text-main">
                  DEVOPS & INFRASTRUCTURE
                </span>
                <span className="text-sm text-text-muted">70%</span>
              </div>
              <div className="h-4 border-2 border-border-retro bg-bg-retro">
                <div
                  className="h-full bg-accent-yellow transition-all duration-1000"
                  style={{ width: "70%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
