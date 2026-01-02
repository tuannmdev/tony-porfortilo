"use client";

import Link from "next/link";
import type { Project } from "@/types/database";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="border-4 border-border-retro bg-panel-retro relative shadow-retro">
      {/* Corner decorations */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-border-retro border-2 border-panel-retro" />
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-border-retro border-2 border-panel-retro" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-border-retro border-2 border-panel-retro" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-border-retro border-2 border-panel-retro" />

      <div className="flex flex-col lg:flex-row">
        {/* Left: Project Image */}
        <div className="w-full lg:w-3/5 relative h-64 lg:h-auto min-h-[400px] border-b-4 lg:border-b-0 lg:border-r-4 border-border-retro bg-border-retro">
          <div className="absolute inset-2 border-2 border-panel-retro/20">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{
                backgroundImage: project.cover_image_url
                  ? `url('${project.cover_image_url}')`
                  : "linear-gradient(135deg, #8c5a3c 0%, #594030 100%)",
                imageRendering: "pixelated",
                mixBlendMode: "luminosity",
              }}
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            {/* Scanlines effect */}
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(74,59,50,0.05)_50%,rgba(74,59,50,0.05))] bg-[length:100%_4px]" />
          </div>
          <div className="absolute top-6 left-6 bg-panel-retro border-2 border-border-retro px-3 py-1 text-xs font-bold text-border-retro uppercase tracking-wider shadow-retro-sm">
            SELECTED_ITEM
          </div>
        </div>

        {/* Right: Project Details */}
        <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-between gap-6 bg-panel-retro">
          <div>
            {/* Title */}
            <div className="flex items-center justify-between mb-4 border-b-2 border-border-retro pb-2">
              <h2 className="text-2xl md:text-3xl font-bold text-border-retro uppercase">
                {project.title}
              </h2>
              <span className="material-symbols-outlined text-border-retro animate-spin text-2xl">
                settings
              </span>
            </div>

            {/* Description */}
            <p className="text-border-retro text-lg md:text-xl leading-relaxed mb-6 border-l-4 border-primary pl-4 bg-bg-retro py-2 pr-2">
              {project.short_description || project.full_description?.substring(0, 150)}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-panel-retro border-2 border-border-retro p-3 shadow-retro-sm relative group hover:-translate-y-1 transition-transform">
                <div className="absolute -top-2 -right-2 bg-border-retro text-panel-retro px-1">
                  <span className="material-symbols-outlined text-[14px]">code</span>
                </div>
                <p className="text-sm text-primary uppercase font-bold mb-1">Category</p>
                <p className="text-xl font-bold text-border-retro uppercase">
                  {project.category}
                </p>
              </div>
              <div className="bg-panel-retro border-2 border-border-retro p-3 shadow-retro-sm hover:-translate-y-1 transition-transform">
                <p className="text-sm text-primary uppercase font-bold mb-1">Tech Stack</p>
                <p className="text-xl font-bold text-border-retro">
                  {project.technologies?.[0] || "N/A"}
                </p>
              </div>
              <div className="bg-panel-retro border-2 border-border-retro p-3 shadow-retro-sm hover:-translate-y-1 transition-transform">
                <p className="text-sm text-primary uppercase font-bold mb-1">Status</p>
                <p className="text-xl font-bold text-border-retro uppercase">
                  {project.status}
                </p>
              </div>
              <div className="bg-panel-retro border-2 border-border-retro p-3 shadow-retro-sm hover:-translate-y-1 transition-transform">
                <p className="text-sm text-primary uppercase font-bold mb-1">Views</p>
                <p className="text-xl font-bold text-border-retro">
                  {project.view_count || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary hover:bg-border-retro text-panel-retro font-bold text-sm md:text-base h-14 flex items-center justify-center gap-3 transition-all active:translate-y-1 shadow-retro border-2 border-border-retro uppercase"
              >
                <span className="material-symbols-outlined text-xl">play_arrow</span>
                START GAME
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-panel-retro hover:bg-bg-retro text-border-retro border-2 border-border-retro font-bold text-sm md:text-base h-14 flex items-center justify-center gap-3 transition-all active:translate-y-1 shadow-retro uppercase"
              >
                <span className="material-symbols-outlined text-xl">code</span>
                VIEW SOURCE
              </a>
            )}
            {!project.live_demo_url && !project.github_url && (
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 bg-primary hover:bg-border-retro text-panel-retro font-bold text-sm md:text-base h-14 flex items-center justify-center gap-3 transition-all active:translate-y-1 shadow-retro border-2 border-border-retro uppercase"
              >
                <span className="material-symbols-outlined text-xl">info</span>
                VIEW DETAILS
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
