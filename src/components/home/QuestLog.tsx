"use client";

import { useExperience } from "@/hooks/useExperience";

export default function QuestLog() {
  const { data: experiences, isLoading } = useExperience();

  if (isLoading) {
    return (
      <div className="bg-panel-retro border-2 border-border-retro rounded-sm p-6 shadow-retro-card">
        <div className="animate-pulse">
          <div className="h-8 bg-bg-retro rounded w-1/3 mb-6" />
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-bg-retro rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-bg-retro rounded w-3/4" />
                    <div className="h-4 bg-bg-retro rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Get top 2 experiences (current and most recent past)
  const topExperiences = experiences?.slice(0, 2) || [];

  return (
    <div className="bg-panel-retro border-2 border-border-retro rounded-sm p-6 shadow-retro-card">
      <h3 className="text-2xl font-bold uppercase flex items-center gap-2 mb-6 text-text-main">
        <span className="material-symbols-outlined text-primary text-3xl">
          explore
        </span>
        Quest Log
      </h3>

      <div className="flex flex-col gap-6">
        {topExperiences.map((exp, index) => {
          const isCurrent = exp.is_current;
          const icon = isCurrent ? "stars" : "check_circle";
          const iconColor = isCurrent ? "text-accent-yellow" : "text-accent-green";
          const questType = isCurrent ? "Main Quest" : "Side Quest";
          const dateRange = isCurrent
            ? `${new Date(exp.start_date).getFullYear()} - Present`
            : `${new Date(exp.start_date).getFullYear()} - ${exp.end_date ? new Date(exp.end_date).getFullYear() : "Present"}`;

          return (
            <div key={exp.id}>
              <div className="flex gap-4 items-start">
                <div className="mt-1">
                  <span className={`material-symbols-outlined ${iconColor} text-3xl`}>
                    {icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-text-main font-bold text-xl uppercase">
                    {questType}: {exp.position} at {exp.company}
                  </h4>
                  <p className="text-text-muted text-lg mt-1 leading-relaxed">
                    {exp.description ||
                      `Working as ${exp.position}. ${exp.achievements?.[0] || ""}`}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-base border border-border-retro bg-bg-retro px-2 py-0.5 rounded-sm text-text-muted">
                      {dateRange}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider between experiences */}
              {index < topExperiences.length - 1 && (
                <div className="h-0.5 bg-border-retro/30 border-t border-dashed border-border-retro w-full ml-12 mt-6" />
              )}
            </div>
          );
        })}

        {/* View Full Quest Log Link */}
        {topExperiences.length > 0 && (
          <a
            href="/about#experience"
            className="text-primary hover:underline text-lg font-bold uppercase tracking-wide flex items-center gap-2 justify-center mt-2"
          >
            <span>View Full Quest Log</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        )}
      </div>
    </div>
  );
}
