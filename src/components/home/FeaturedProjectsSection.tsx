"use client";

import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";

const statusConfig = {
  planning: {
    label: "PLANNING",
    color: "text-accent-yellow",
    bgColor: "bg-accent-yellow",
    icon: "psychology",
  },
  "in-progress": {
    label: "IN PROGRESS",
    color: "text-accent-blue",
    bgColor: "bg-accent-blue",
    icon: "construction",
  },
  completed: {
    label: "COMPLETED",
    color: "text-accent-green",
    bgColor: "bg-accent-green",
    icon: "check_circle",
  },
  archived: {
    label: "ARCHIVED",
    color: "text-text-muted",
    bgColor: "bg-text-muted",
    icon: "archive",
  },
};

export default function FeaturedProjectsSection() {
  const { data: projects, isLoading } = useProjects({ featured: true, limit: 3 });

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center text-text-muted">Loading projects...</div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-16 bg-panel-retro/50">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-4 py-2 text-panel-retro shadow-retro-btn mb-4">
          <span className="material-symbols-outlined">extension</span>
          <span className="text-sm font-bold">FEATURED QUESTS</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-primary uppercase">
          Selected Projects
        </h2>
        <p className="mt-4 text-text-muted max-w-2xl mx-auto">
          Showcasing my best work and achievements
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {projects.map((project) => {
          const status = statusConfig[project.status as keyof typeof statusConfig];

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block border-2 border-border-retro bg-panel-retro shadow-retro hover:shadow-retro-card transition-all overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative aspect-video border-b-2 border-border-retro bg-bg-retro overflow-hidden">
                {project.cover_image_url ? (
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-text-muted">
                      image
                    </span>
                  </div>
                )}
                {/* Status Badge */}
                <div
                  className={`absolute top-2 right-2 flex items-center space-x-1 border-2 border-border-retro ${status.bgColor} px-2 py-1 text-xs font-bold text-white shadow-retro`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {status.icon}
                  </span>
                  <span>{status.label}</span>
                </div>
                {/* Featured Star */}
                {project.featured && (
                  <div className="absolute top-2 left-2 border-2 border-border-retro bg-accent-yellow px-2 py-1 shadow-retro">
                    <span className="material-symbols-outlined text-sm text-border-retro">
                      star
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-primary mb-2 uppercase group-hover:text-primary-hover transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-muted mb-4 line-clamp-2">
                  {project.short_description}
                </p>

                {/* Technologies */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="border border-border-retro bg-bg-retro px-2 py-1 text-xs text-text-main"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="border border-border-retro bg-bg-retro px-2 py-1 text-xs text-text-muted">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between border-t border-border-retro pt-4 text-xs text-text-muted">
                  <div className="flex items-center space-x-1">
                    <span className="material-symbols-outlined text-sm">
                      visibility
                    </span>
                    <span>{project.view_count} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.github_url && (
                      <span className="material-symbols-outlined text-sm">
                        code
                      </span>
                    )}
                    {project.live_demo_url && (
                      <span className="material-symbols-outlined text-sm">
                        open_in_new
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All Projects Button */}
      <div className="text-center">
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-8 py-4 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
        >
          <span className="font-bold text-lg">VIEW ALL PROJECTS</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
