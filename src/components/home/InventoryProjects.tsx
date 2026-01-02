"use client";

import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";

const rarityColors = {
  legendary: "bg-accent-yellow/20 border-accent-yellow",
  epic: "bg-purple-500/20 border-purple-500",
  rare: "bg-accent-blue/20 border-accent-blue",
  common: "bg-bg-retro border-border-retro",
};

export default function InventoryProjects() {
  const { data: projects, isLoading } = useProjects({ featured: true });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold uppercase flex items-center gap-2 px-1 text-text-main">
          <span className="material-symbols-outlined text-primary text-3xl">
            backpack
          </span>
          Inventory (Projects)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-panel-retro border-2 border-border-retro rounded-sm p-4 animate-pulse"
            >
              <div className="h-32 bg-bg-retro rounded-sm mb-3" />
              <div className="h-6 bg-bg-retro rounded mb-2" />
              <div className="h-4 bg-bg-retro rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Get featured projects (max 3)
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold uppercase flex items-center gap-2 px-1 text-text-main">
        <span className="material-symbols-outlined text-primary text-3xl">
          backpack
        </span>
        Inventory (Projects)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredProjects.map((project) => {
          // Determine rarity based on status or featured
          const rarity = project.featured
            ? "legendary"
            : project.status === "completed"
              ? "rare"
              : "common";
          const rarityClass = rarityColors[rarity];

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-panel-retro border-2 border-border-retro rounded-sm hover:border-primary transition-colors p-4 flex flex-col gap-3 cursor-pointer shadow-retro-card"
            >
              {/* Project Image */}
              <div
                className="h-32 rounded-sm bg-cover bg-center border-2 border-border-retro group-hover:opacity-90"
                style={{
                  backgroundImage: project.cover_image_url
                    ? `url('${project.cover_image_url}')`
                    : "linear-gradient(135deg, #ccb09c 0%, #8c5a3c 100%)",
                }}
              />

              {/* Project Info */}
              <div>
                <h4 className="text-text-main font-bold text-xl uppercase">
                  {project.title}
                </h4>
                <p className="text-text-muted text-base mt-1 line-clamp-1">
                  {project.technologies?.slice(0, 3).join(", ")}
                </p>
              </div>

              {/* Rarity Badge */}
              <div className="mt-auto flex justify-end">
                <span
                  className={`text-sm ${rarityClass} border text-text-main px-2 py-0.5 rounded-sm uppercase font-bold`}
                >
                  {rarity}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All Link */}
      {featuredProjects.length > 0 && (
        <Link
          href="/projects"
          className="text-primary hover:underline text-lg font-bold uppercase tracking-wide flex items-center gap-2 justify-center mt-2"
        >
          <span>View All Projects</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      )}
    </div>
  );
}
