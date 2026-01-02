"use client";

import { useProfile } from "@/hooks/useProfile";
import { useProjects } from "@/hooks/useProjects";

export default function QuickStats() {
  const { data: profile } = useProfile();
  const { data: projects } = useProjects();

  const stats = [
    {
      icon: "code",
      value: "99+",
      label: "Commits",
    },
    {
      icon: "coffee",
      value: "∞",
      label: "Caffeine Lvl",
    },
    {
      icon: "bug_report",
      value: "0",
      label: "Critical Bugs",
    },
    {
      icon: "timer",
      value: `${profile?.years_experience || 5}y`,
      label: "Play Time",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-panel-retro border-2 border-border-retro p-3 rounded-sm flex flex-col items-center justify-center text-center shadow-retro-card hover:-translate-y-1 transition-transform cursor-default"
        >
          <span className="material-symbols-outlined text-primary mb-1 text-3xl">
            {stat.icon}
          </span>
          <p className="text-3xl font-bold leading-none text-text-main">
            {stat.value}
          </p>
          <p className="text-base uppercase text-text-muted tracking-wider mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
