"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

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

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: allProjects, isLoading } = useProjects();
  const supabase = createClient();

  const project = allProjects?.find((p) => p.slug === slug);

  // Increment view count when project loads
  useEffect(() => {
    if (project) {
      (supabase.rpc as any)("increment_project_views", {
        project_id: project.id,
      });
    }
  }, [project?.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-text-muted">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <span className="material-symbols-outlined text-6xl text-text-muted">
            error
          </span>
          <h1 className="text-4xl font-bold text-primary">
            PROJECT NOT FOUND
          </h1>
          <p className="text-text-muted">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-6 py-3 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-bold">BACK TO PROJECTS</span>
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[project.status as keyof typeof statusConfig];

  // Get related projects (same category, different project)
  const relatedProjects = allProjects
    ?.filter(
      (p) => p.category === project.category && p.id !== project.id
    )
    .slice(0, 3);

  return (
    <div className="py-8">
      {/* Back Button */}
      <div className="container mx-auto px-4 mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-bold">BACK TO PROJECTS</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Project Image */}
          <div className="border-2 border-border-retro bg-bg-retro shadow-retro-card overflow-hidden">
            {project.cover_image_url ? (
              <img
                src={project.cover_image_url}
                alt={project.title}
                className="w-full h-auto"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center">
                <span className="material-symbols-outlined text-9xl text-text-muted">
                  image
                </span>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            {/* Title & Status */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                {project.featured && (
                  <span className="border-2 border-border-retro bg-accent-yellow px-2 py-1 text-xs font-bold text-border-retro shadow-retro flex items-center space-x-1">
                    <span className="material-symbols-outlined text-sm">
                      star
                    </span>
                    <span>FEATURED</span>
                  </span>
                )}
                <span
                  className={`border-2 border-border-retro ${status.bgColor} px-2 py-1 text-xs font-bold text-white shadow-retro flex items-center space-x-1`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {status.icon}
                  </span>
                  <span>{status.label}</span>
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary uppercase mb-3">
                {project.title}
              </h1>
              <p className="text-lg text-text-main leading-relaxed">
                {project.short_description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="border-2 border-border-retro bg-panel-retro p-4 shadow-retro">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-muted">CATEGORY:</span>
                  <p className="font-bold text-primary uppercase">
                    {project.category}
                  </p>
                </div>
                <div>
                  <span className="text-text-muted">TYPE:</span>
                  <p className="font-bold text-primary uppercase">
                    {project.project_type}
                  </p>
                </div>
                {project.start_date && (
                  <div>
                    <span className="text-text-muted">STARTED:</span>
                    <p className="font-bold text-text-main">
                      {new Date(project.start_date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-text-muted">VIEWS:</span>
                  <p className="font-bold text-text-main">
                    {project.view_count}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.live_demo_url && (
                <a
                  href={project.live_demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 border-2 border-border-retro bg-primary px-6 py-3 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                  <span className="font-bold">VIEW DEMO</span>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 border-2 border-border-retro bg-panel-retro px-6 py-3 text-primary shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
                >
                  <span className="material-symbols-outlined">code</span>
                  <span className="font-bold">VIEW SOURCE</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      {project.full_description && (
        <section className="container mx-auto px-4 mb-12">
          <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
            <h2 className="text-2xl font-bold text-primary uppercase mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">
                description
              </span>
              ABOUT THIS PROJECT
            </h2>
            <div className="prose prose-retro max-w-none">
              <p className="text-text-main leading-relaxed whitespace-pre-line">
                {project.full_description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      <section className="container mx-auto px-4 mb-12">
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <h2 className="text-2xl font-bold text-primary uppercase mb-4 flex items-center">
            <span className="material-symbols-outlined mr-2">build</span>
            TECH STACK
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="border-2 border-border-retro bg-bg-retro px-4 py-2 text-sm font-bold text-primary shadow-retro"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="container mx-auto px-4 mb-12">
          <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
            <h2 className="text-2xl font-bold text-primary uppercase mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">
                photo_library
              </span>
              GALLERY
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="border-2 border-border-retro bg-bg-retro overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-primary uppercase mb-6 text-center">
            RELATED PROJECTS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.id}
                href={`/projects/${relatedProject.slug}`}
                className="group block border-2 border-border-retro bg-panel-retro shadow-retro hover:shadow-retro-card transition-all overflow-hidden"
              >
                <div className="relative aspect-video border-b-2 border-border-retro bg-bg-retro overflow-hidden">
                  {relatedProject.cover_image_url ? (
                    <img
                      src={relatedProject.cover_image_url}
                      alt={relatedProject.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-text-muted">
                        image
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary uppercase group-hover:text-primary-hover transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-2 line-clamp-2">
                    {relatedProject.short_description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
