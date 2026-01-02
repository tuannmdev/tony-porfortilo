"use client";

import { useSkills } from "@/hooks/useSkills";

// Color mapping based on design mockup
// Skills should use different colors for variety
const skillColors = ["bg-accent-blue", "bg-accent-green", "bg-accent-yellow", "bg-accent-red"];

const getColorForIndex = (index: number) => {
  return skillColors[index % skillColors.length];
};

export default function AttributePoints() {
  const { data: skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <div className="bg-panel-retro border-2 border-border-retro rounded-sm p-6 shadow-retro-card">
        <div className="animate-pulse">
          <div className="h-8 bg-bg-retro rounded w-1/3 mb-6" />
          <div className="space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-bg-retro rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Get primary skills (up to 4)
  const primarySkills = skills?.filter((s) => s.is_featured).slice(0, 4) || [];

  return (
    <div className="bg-panel-retro border-2 border-border-retro rounded-sm p-6 shadow-retro-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold uppercase flex items-center gap-2 text-text-main">
          <span className="material-symbols-outlined text-primary text-3xl">
            bar_chart
          </span>
          Attribute Points
        </h3>
        <span className="text-lg font-bold font-mono text-primary bg-bg-retro border border-border-retro px-2 py-1 rounded-sm shadow-sm">
          ver 2.0.4
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {primarySkills.map((skill, index) => {
          const proficiency = skill.proficiency || 3;
          const percentage = (proficiency / 5) * 100;
          const colorClass = getColorForIndex(index);

          return (
            <div key={skill.id} className="flex flex-col gap-1">
              <div className="flex justify-between text-lg uppercase font-bold">
                <span className="text-text-main">{skill.name}</span>
                <span className="text-primary">{proficiency * 20}/100</span>
              </div>
              <div className="h-6 w-full bg-bg-retro rounded-sm p-1 border-2 border-border-retro shadow-inner">
                <div
                  className={`h-full ${colorClass} border-r-2 border-border-retro relative overflow-hidden`}
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
