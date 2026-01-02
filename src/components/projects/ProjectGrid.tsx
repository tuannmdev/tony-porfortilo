"use client";

import Link from "next/link";
import type { Project } from "@/types/database";

interface ProjectGridProps {
  projects: Project[];
}

const statusConfig = {
  completed: { label: "Active", color: "bg-accent-green" },
  "in-progress": { label: "WIP", color: "bg-accent-yellow" },
  planning: { label: "Planning", color: "bg-accent-blue" },
  archived: { label: "Offline", color: "bg-accent-red" },
};

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    web: "language",
    mobile: "smartphone",
    api: "cloud",
    desktop: "computer",
    "ai-ml": "smart_toy",
    other: "extension",
  };
  return icons[category] || "code";
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted">
        <span className="material-symbols-outlined text-6xl mb-4">
          sentiment_sad
        </span>
        <p className="text-xl">No projects found for this filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        const status =
          statusConfig[project.status as keyof typeof statusConfig] ||
          statusConfig.planning;
        const categoryIcon = getCategoryIcon(project.category);

        return (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group relative bg-panel-retro border-4 border-border-retro shadow-retro hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex flex-col h-full"
          >
            {/* Project Image */}
            <div className="aspect-video w-full bg-border-retro relative border-b-4 border-border-retro overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: project.cover_image_url
                    ? `url('${project.cover_image_url}')`
                    : "linear-gradient(135deg, #8c5a3c 0%, #594030 100%)",
                  mixBlendMode: "luminosity",
                }}
              />
              <div className="absolute inset-0 bg-primary/30 mix-blend-color" />

              {/* Category Icon */}
              <div className="absolute top-2 right-2 bg-panel-retro border-2 border-border-retro p-1">
                <span className="material-symbols-outlined text-border-retro text-lg">
                  {categoryIcon}
                </span>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-border-retro text-lg font-bold uppercase mb-2 group-hover:text-primary">
                {project.title}
              </h3>

              {/* Tech Tags */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {project.technologies?.slice(0, 2).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-bg-retro border border-border-retro text-xs font-bold text-border-retro"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-border-retro/80 text-lg leading-tight mb-4 flex-grow">
                {project.short_description?.substring(0, 80)}
                {(project.short_description?.length || 0) > 80 ? "..." : ""}
              </p>

              {/* Status & Arrow */}
              <div className="flex justify-between items-center mt-auto pt-3 border-t-2 border-border-retro/20 border-dashed">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 ${status.color} border border-border-retro`} />
                  <span className="text-sm text-border-retro font-bold uppercase">
                    {status.label}
                  </span>
                </div>
                <span className="material-symbols-outlined text-border-retro text-xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </Link>
        );
      })}

      {/* Add New Project Card */}
      <div className="group relative bg-panel-retro/50 border-4 border-border-retro border-dashed flex flex-col h-full items-center justify-center p-8 opacity-80 hover:opacity-100 hover:border-solid hover:bg-panel-retro transition-all cursor-pointer">
        <div className="w-20 h-20 rounded-none border-4 border-border-retro flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-panel-retro transition-colors shadow-retro-sm">
          <span className="material-symbols-outlined text-4xl">add</span>
        </div>
        <h3 className="text-border-retro text-lg font-bold uppercase text-center group-hover:text-primary">
          NEW_PROJECT
        </h3>
        <p className="text-sm text-border-retro/60 mt-2 text-center uppercase tracking-widest">
          Initialize...
        </p>
      </div>
    </div>
  );
}
