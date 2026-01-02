"use client";

import { useState } from "react";
import { useExperience } from "@/hooks/useExperience";

const employmentTypeLabels = {
  "full-time": "MAIN STORY",
  "part-time": "SIDE QUEST",
  contract: "CONTRACT",
  internship: "TUTORIAL",
};

const employmentTypeColors = {
  "full-time": "border-accent-green",
  "part-time": "border-accent-blue",
  contract: "border-accent-yellow",
  internship: "border-accent-red",
};

export default function ExperienceTimeline() {
  const { data: experiences, isLoading } = useExperience();
  const [filter, setFilter] = useState<string>("all");

  if (isLoading) {
    return (
      <section className="container mx-auto px-4">
        <div className="text-center text-text-muted">Loading experience...</div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const filteredExperiences =
    filter === "all"
      ? experiences
      : experiences.filter((exp) => exp.employment_type === filter);

  const formatDuration = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? "s" : ""}`;
    } else {
      return `${years} year${years !== 1 ? "s" : ""}, ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="container mx-auto px-4">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-4 py-2 text-panel-retro shadow-retro-btn mb-4">
          <span className="material-symbols-outlined">timeline</span>
          <span className="text-sm font-bold">QUEST HISTORY</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-primary uppercase">
          Experience
        </h2>
        <p className="mt-4 text-text-muted max-w-2xl mx-auto">
          My professional journey and achievements
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
            filter === "all"
              ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
              : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
          }`}
        >
          ALL QUESTS
        </button>
        <button
          onClick={() => setFilter("full-time")}
          className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
            filter === "full-time"
              ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
              : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
          }`}
        >
          MAIN STORY
        </button>
        <button
          onClick={() => setFilter("part-time")}
          className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
            filter === "part-time"
              ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
              : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
          }`}
        >
          SIDE QUESTS
        </button>
        <button
          onClick={() => setFilter("contract")}
          className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
            filter === "contract"
              ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
              : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
          }`}
        >
          CONTRACTS
        </button>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto space-y-6">
        {filteredExperiences.map((exp, index) => (
          <div
            key={exp.id}
            className={`relative border-l-4 ${
              employmentTypeColors[exp.employment_type as keyof typeof employmentTypeColors]
            } bg-panel-retro border-2 border-border-retro shadow-retro hover:shadow-retro-card transition-all`}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-3 top-6 h-5 w-5 border-2 border-border-retro bg-primary" />

            {/* Current Badge */}
            {exp.is_current && (
              <div className="absolute -top-3 right-4 border-2 border-border-retro bg-accent-green px-3 py-1 text-xs font-bold text-white shadow-retro-btn flex items-center space-x-1">
                <span className="animate-pulse">●</span>
                <span>CURRENT</span>
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-bold text-text-muted border border-border-retro bg-bg-retro px-2 py-1">
                      {employmentTypeLabels[exp.employment_type as keyof typeof employmentTypeLabels]}
                    </span>
                    {exp.location && (
                      <span className="text-xs text-text-muted flex items-center">
                        <span className="material-symbols-outlined text-sm mr-1">
                          location_on
                        </span>
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-primary uppercase mb-1">
                    {exp.position}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {exp.company_logo_url && (
                      <img
                        src={exp.company_logo_url}
                        alt={exp.company}
                        className="h-6 w-6 object-contain border border-border-retro"
                      />
                    )}
                    <p className="text-lg font-bold text-text-main">
                      {exp.company}
                    </p>
                    {exp.company_website && (
                      <a
                        href={exp.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-hover"
                      >
                        <span className="material-symbols-outlined text-sm">
                          open_in_new
                        </span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <p className="text-sm font-bold text-text-main">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.end_date ? formatDate(exp.end_date) : "Present"}
                  </p>
                  <p className="text-xs text-text-muted">
                    {formatDuration(exp.duration_months)}
                  </p>
                </div>
              </div>

              {/* Description */}
              {exp.description && (
                <p className="text-text-main mb-4 leading-relaxed">
                  {exp.description}
                </p>
              )}

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-primary mb-2 flex items-center">
                    <span className="material-symbols-outlined text-base mr-1">
                      emoji_events
                    </span>
                    ACHIEVEMENTS
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-2 text-sm text-text-main"
                      >
                        <span className="text-accent-green mt-0.5">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-text-muted mb-2">
                    TECH STACK:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border border-border-retro bg-bg-retro px-2 py-1 text-xs font-bold text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="border-2 border-border-retro bg-panel-retro p-4 text-center shadow-retro">
          <div className="text-3xl font-bold text-primary">
            {experiences.length}
          </div>
          <div className="text-xs text-text-muted">TOTAL QUESTS</div>
        </div>
        <div className="border-2 border-border-retro bg-panel-retro p-4 text-center shadow-retro">
          <div className="text-3xl font-bold text-accent-green">
            {experiences.filter((e) => e.is_current).length}
          </div>
          <div className="text-xs text-text-muted">ACTIVE</div>
        </div>
        <div className="border-2 border-border-retro bg-panel-retro p-4 text-center shadow-retro">
          <div className="text-3xl font-bold text-accent-blue">
            {experiences.filter((e) => e.employment_type === "full-time").length}
          </div>
          <div className="text-xs text-text-muted">FULL-TIME</div>
        </div>
        <div className="border-2 border-border-retro bg-panel-retro p-4 text-center shadow-retro">
          <div className="text-3xl font-bold text-accent-yellow">
            {Math.round(
              experiences.reduce((sum, e) => sum + e.duration_months, 0) / 12
            )}
          </div>
          <div className="text-xs text-text-muted">YEARS TOTAL</div>
        </div>
      </div>
    </section>
  );
}
