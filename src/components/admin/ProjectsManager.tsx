"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { FileUpload } from "./FileUpload";
import type { Project } from "@/types/database";

interface ProjectsManagerProps {
  initialProjects: Project[];
}

type ProjectFormData = Omit<Project, "id" | "created_at" | "updated_at" | "views">;

const PROJECT_CATEGORIES = ["Web", "Mobile", "API", "Desktop", "AI-ML", "Other"];
const PROJECT_STATUSES = ["Planning", "In Progress", "Completed", "Archived"];
const PROJECT_TYPES = ["Personal", "Professional", "Open Source", "Client Work"];

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const emptyForm: ProjectFormData = {
    title: "",
    slug: "",
    short_description: "",
    full_description: "",
    category: "web",
    status: "in-progress",
    project_type: "personal",
    cover_image_url: null,
    images: [],
    technologies: [],
    live_demo_url: null,
    github_url: null,
    featured: false,
    order_index: projects.length,
    start_date: null,
    end_date: null,
    view_count: 0,
    likes_count: 0,
  };

  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [technologiesInput, setTechnologiesInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({ ...emptyForm, order_index: projects.length });
    setTechnologiesInput("");
    setEditingId(null);
    setIsAddingNew(false);
    setMessage(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      slug: project.slug,
      short_description: project.short_description || "",
      full_description: project.full_description || "",
      category: project.category,
      status: project.status,
      project_type: project.project_type,
      cover_image_url: project.cover_image_url,
      images: project.images,
      technologies: project.technologies || [],
      live_demo_url: project.live_demo_url,
      github_url: project.github_url,
      featured: project.featured,
      order_index: project.order_index,
      start_date: project.start_date,
      end_date: project.end_date,
      view_count: project.view_count,
      likes_count: project.likes_count,
    });
    setTechnologiesInput((project.technologies || []).join(", "));
    setEditingId(project.id);
    setIsAddingNew(false);
    setMessage(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Parse technologies
    const technologies = technologiesInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Generate slug if empty
    const slug = formData.slug || generateSlug(formData.title);

    try {
      const supabase = createClient();

      // Check if slug is unique (except for current project when editing)
      const { data: existingProject } = await supabase
        .from("projects")
        .select("id")
        .eq("slug", slug)
        .neq("id", editingId || "")
        .single();

      if (existingProject) {
        setMessage({
          type: "error",
          text: "A project with this slug already exists. Please use a different title or slug.",
        });
        setIsSubmitting(false);
        return;
      }

      const dataToSave = {
        title: formData.title,
        slug,
        short_description: formData.short_description || null,
        full_description: formData.full_description || null,
        category: formData.category,
        status: formData.status,
        type: formData.project_type,
        cover_image: formData.cover_image_url || null,
        images: formData.images && formData.images.length > 0 ? formData.images : null,
        technologies: technologies.length > 0 ? technologies : null,
        demo_url: formData.live_demo_url || null,
        github_url: formData.github_url || null,
        featured: formData.featured,
        order_index: formData.order_index,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
      };

      if (editingId) {
        // Update existing project
        const { error } = await (supabase as any)
          .from("projects")
          .update(dataToSave)
          .eq("id", editingId);

        if (error) throw error;

        // Refresh data from server
        const { data: updated } = await supabase
          .from("projects")
          .select("*")
          .eq("id", editingId)
          .single();

        if (updated) {
          setProjects((prev) =>
            prev.map((proj) => (proj.id === editingId ? updated : proj))
          );
        }

        setMessage({ type: "success", text: "Project updated successfully!" });
      } else {
        // Create new project
        const { data, error } = await (supabase as any)
          .from("projects")
          .insert(dataToSave)
          .select()
          .single();

        if (error) throw error;

        setProjects((prev) => [data, ...prev]);
        setMessage({ type: "success", text: "Project created successfully!" });
      }

      router.refresh();
      setTimeout(resetForm, 1500);
    } catch (error: any) {
      console.error("Error saving project:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to save project",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;

      setProjects((prev) => prev.filter((proj) => proj.id !== id));
      setMessage({ type: "success", text: "Project deleted successfully!" });
      router.refresh();

      if (editingId === id) {
        resetForm();
      }
    } catch (error: any) {
      console.error("Error deleting project:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to delete project",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Projects List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-main">
            ALL PROJECTS ({projects.length})
          </h2>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold border-2 border-border-retro shadow-retro-btn transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span>
              ADD NEW PROJECT
            </span>
          </button>
        </div>

        {message && (
          <div
            className={`p-4 border-2 ${
              message.type === "success"
                ? "bg-accent-green/20 border-accent-green"
                : "bg-accent-red/20 border-accent-red"
            }`}
          >
            <p
              className={
                message.type === "success"
                  ? "text-accent-green"
                  : "text-accent-red"
              }
            >
              {message.text}
            </p>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="p-8 border-2 border-border-retro bg-panel-retro text-center">
            <p className="text-text-muted">
              No projects yet. Add your first project!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`border-2 border-border-retro bg-panel-retro shadow-retro transition-all ${
                  editingId === project.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex gap-4">
                  {/* Cover Image */}
                  {project.cover_image_url && (
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={project.cover_image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-text-main">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="px-2 py-1 bg-accent-yellow text-xs font-bold">
                              FEATURED
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs font-bold ${
                              project.status === "completed"
                                ? "bg-accent-green text-white"
                                : project.status === "in-progress"
                                ? "bg-accent-blue text-white"
                                : "bg-bg-retro"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-2">
                          <span className="px-2 py-1 bg-bg-retro border border-border-retro">
                            {project.category}
                          </span>
                          <span>{project.project_type}</span>
                          <span>/{project.slug}</span>
                          {project.view_count > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">
                                visibility
                              </span>
                              {project.view_count} views
                            </span>
                          )}
                        </div>

                        {project.short_description && (
                          <p className="text-sm text-text-muted mb-2">
                            {project.short_description}
                          </p>
                        )}

                        <div className="flex gap-2 mb-2">
                          {project.live_demo_url && (
                            <a
                              href={project.live_demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-1 bg-accent-blue text-white hover:bg-accent-blue/80"
                            >
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">
                                  open_in_new
                                </span>
                                Demo
                              </span>
                            </a>
                          )}
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-1 bg-bg-retro border border-border-retro hover:bg-border-retro"
                            >
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">
                                  code
                                </span>
                                GitHub
                              </span>
                            </a>
                          )}
                        </div>

                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 5).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-primary/10 border border-primary text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 5 && (
                              <span className="px-2 py-1 text-xs text-text-muted">
                                +{project.technologies.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="px-3 py-2 bg-accent-blue hover:bg-accent-blue/80 text-white font-bold border border-border-retro"
                          title="Edit project"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>

                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-3 py-2 bg-accent-red hover:bg-accent-red/80 text-white font-bold border border-border-retro"
                          title="Delete project"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit/Add Form */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 p-6 border-2 border-border-retro bg-panel-retro shadow-retro max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-text-main mb-4">
            {editingId
              ? "EDIT PROJECT"
              : isAddingNew
              ? "ADD NEW PROJECT"
              : "SELECT A PROJECT"}
          </h2>

          {(isAddingNew || editingId) && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Project Title <span className="text-accent-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    // Auto-generate slug if not manually set
                    if (!editingId || formData.slug === generateSlug(formData.title)) {
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: generateSlug(e.target.value),
                      });
                    }
                  }}
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  required
                  placeholder="e.g., Portfolio Website"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  URL Slug <span className="text-accent-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary font-mono text-sm"
                  required
                  placeholder="portfolio-website"
                  pattern="[a-z0-9-]+"
                />
                <p className="text-xs text-text-muted mt-1">
                  URL: /projects/{formData.slug || "..."}
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Short Description
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) =>
                    setFormData({ ...formData, short_description: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary resize-none"
                  rows={2}
                  placeholder="Brief one-liner for project cards"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Full Description
                </label>
                <textarea
                  value={formData.full_description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, full_description: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary resize-none"
                  rows={4}
                  placeholder="Detailed project description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">
                    Category <span className="text-accent-red">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as "web" | "mobile" | "api" | "desktop" | "ai-ml" | "other" })
                    }
                    className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                    required
                  >
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">
                    Type <span className="text-accent-red">*</span>
                  </label>
                  <select
                    value={formData.project_type}
                    onChange={(e) =>
                      setFormData({ ...formData, project_type: e.target.value as "personal" | "work" | "freelance" | "open-source" })
                    }
                    className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                    required
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Status <span className="text-accent-red">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as "planning" | "in-progress" | "completed" | "archived" })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  required
                >
                  {PROJECT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Cover Image
                </label>
                <FileUpload
                  bucket="projects"
                  folder="covers"
                  onUploadComplete={(url) =>
                    setFormData({ ...formData, cover_image_url: url || null })
                  }
                  currentFile={formData.cover_image_url}
                  label="Upload cover image"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Technologies (comma-separated)
                </label>
                <textarea
                  value={technologiesInput}
                  onChange={(e) => setTechnologiesInput(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary resize-none"
                  rows={2}
                  placeholder="React, TypeScript, Next.js, Tailwind CSS"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={formData.live_demo_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, live_demo_url: e.target.value || null })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  placeholder="https://demo.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, github_url: e.target.value || null })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.start_date || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        start_date: e.target.value || null,
                      })
                    }
                    className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.end_date || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value || null })
                    }
                    className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-bold text-text-main">
                  Featured Project (show on home page)
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-accent-green hover:bg-accent-green/80 text-white font-bold border-2 border-border-retro shadow-retro-btn transition-all active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "SAVING..."
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg inline-block mr-2">
                        save
                      </span>
                      SAVE
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-bg-retro hover:bg-border-retro font-bold border-2 border-border-retro"
                >
                  CANCEL
                </button>
              </div>
            </form>
          )}

          {!isAddingNew && !editingId && (
            <p className="text-text-muted text-sm">
              Click on a project to edit it, or click &quot;ADD NEW PROJECT&quot; to create a
              new one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
