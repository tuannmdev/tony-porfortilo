"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectGrid from "@/components/projects/ProjectGrid";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <main className="flex-1 px-4 md:px-8 py-8 flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="text-center text-text-muted text-xl">
            Loading projects...
          </div>
        </div>
      </main>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <main className="flex-1 px-4 md:px-8 py-8 flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="text-center text-text-muted text-xl">
            No projects available
          </div>
        </div>
      </main>
    );
  }

  // Get featured project (first featured project)
  const featuredProject = projects.find((p) => p.featured) || projects[0];

  // Filter projects based on active filter
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category === activeFilter;
  });

  return (
    <main className="flex-1 px-4 md:px-8 py-8 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        {/* Hero Banner */}
        <div className="border-4 border-border-retro bg-panel-retro p-1 shadow-retro">
          <div className="bg-panel-retro border-2 border-border-retro border-dashed p-8 text-center relative overflow-hidden">
            <h1 className="text-3xl md:text-5xl font-bold text-text-main mb-4 uppercase">
              Projects Showcase
            </h1>
            <p className="text-primary text-xl tracking-widest uppercase bg-bg-retro inline-block px-4 py-1 border-2 border-border-retro/20">
              Select a cartridge to view details
            </p>
          </div>
        </div>

        {/* Featured Project Hero */}
        <ProjectHero project={featuredProject} />

        {/* Filters & Projects Grid */}
        <section className="flex flex-col gap-6">
          <ProjectFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <ProjectGrid projects={filteredProjects} />
        </section>
      </div>
    </main>
  );
}
