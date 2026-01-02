"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Experience } from "@/types/database";

interface ExperienceManagerProps {
  initialExperiences: Experience[];
}

type ExperienceFormData = Omit<
  Experience,
  "id" | "created_at" | "updated_at" | "is_current" | "duration_months"
>;

const EMPLOYMENT_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

export function ExperienceManager({ initialExperiences }: ExperienceManagerProps) {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const emptyForm: ExperienceFormData = {
    company: "",
    position: "",
    employment_type: "full-time",
    location: "",
    start_date: "",
    end_date: null,
    description: "",
    achievements: [],
    technologies: [],
    company_logo_url: null,
    company_website: null,
    order_index: experiences.length,
  };

  const [formData, setFormData] = useState<ExperienceFormData>(emptyForm);
  const [achievementsInput, setAchievementsInput] = useState("");
  const [technologiesInput, setTechnologiesInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData(emptyForm);
    setAchievementsInput("");
    setTechnologiesInput("");
    setEditingId(null);
    setIsAddingNew(false);
    setMessage(null);
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      company: experience.company,
      position: experience.position,
      employment_type: experience.employment_type,
      location: experience.location || "",
      start_date: experience.start_date,
      end_date: experience.end_date,
      description: experience.description || "",
      achievements: experience.achievements || [],
      technologies: experience.technologies || [],
      company_logo_url: experience.company_logo_url,
      company_website: experience.company_website,
      order_index: experience.order_index,
    });
    setAchievementsInput((experience.achievements || []).join("\n"));
    setTechnologiesInput((experience.technologies || []).join(", "));
    setEditingId(experience.id);
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

    // Parse achievements and technologies
    const achievements = achievementsInput
      .split("\n")
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const technologies = technologiesInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      const supabase = createClient();

      const dataToSave = {
        company: formData.company,
        position: formData.position,
        employment_type: formData.employment_type,
        location: formData.location || null,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        description: formData.description || null,
        achievements: achievements.length > 0 ? achievements : null,
        technologies: technologies.length > 0 ? technologies : null,
        company_logo_url: formData.company_logo_url || null,
        company_website: formData.company_website || null,
        order_index: formData.order_index,
      };

      if (editingId) {
        // Update existing experience
        const { error } = await (supabase as any)
          .from("experience")
          .update(dataToSave)
          .eq("id", editingId);

        if (error) throw error;

        // Refresh data from server to get computed fields
        const { data: updated } = await supabase
          .from("experience")
          .select("*")
          .eq("id", editingId)
          .single();

        if (updated) {
          setExperiences((prev) =>
            prev.map((exp) => (exp.id === editingId ? updated : exp))
          );
        }

        setMessage({ type: "success", text: "Experience updated successfully!" });
      } else {
        // Create new experience
        const { data, error } = await (supabase as any)
          .from("experience")
          .insert(dataToSave)
          .select()
          .single();

        if (error) throw error;

        setExperiences((prev) => [data, ...prev]);
        setMessage({ type: "success", text: "Experience created successfully!" });
      }

      router.refresh();
      setTimeout(resetForm, 1500);
    } catch (error: any) {
      console.error("Error saving experience:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to save experience",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("experience").delete().eq("id", id);

      if (error) throw error;

      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
      setMessage({ type: "success", text: "Experience deleted successfully!" });
      router.refresh();

      if (editingId === id) {
        resetForm();
      }
    } catch (error: any) {
      console.error("Error deleting experience:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to delete experience",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Experience List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-main">
            ALL EXPERIENCE ({experiences.length})
          </h2>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold border-2 border-border-retro shadow-retro-btn transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span>
              ADD NEW EXPERIENCE
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

        {experiences.length === 0 ? (
          <div className="p-8 border-2 border-border-retro bg-panel-retro text-center">
            <p className="text-text-muted">
              No experience yet. Add your first experience!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className={`p-6 border-2 border-border-retro bg-panel-retro shadow-retro transition-all ${
                  editingId === exp.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-text-main">
                        {exp.position}
                      </h3>
                      {!exp.end_date && (
                        <span className="px-2 py-1 bg-accent-green text-white text-xs font-bold">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-lg text-primary font-bold">{exp.company}</p>
                      {exp.company_website && (
                        <a
                          href={exp.company_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-blue hover:underline"
                        >
                          <span className="material-symbols-outlined text-sm">
                            open_in_new
                          </span>
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          work
                        </span>
                        {exp.employment_type}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            location_on
                          </span>
                          {exp.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          calendar_today
                        </span>
                        {formatDate(exp.start_date)} -{" "}
                        {exp.end_date ? formatDate(exp.end_date) : "Present"}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-sm text-text-muted mb-3">{exp.description}</p>
                    )}

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-bold text-text-main mb-1">
                          Achievements:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-text-muted">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-bg-retro border border-border-retro text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="px-3 py-2 bg-accent-blue hover:bg-accent-blue/80 text-white font-bold border border-border-retro"
                      title="Edit experience"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="px-3 py-2 bg-accent-red hover:bg-accent-red/80 text-white font-bold border border-border-retro"
                      title="Delete experience"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
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
              ? "EDIT EXPERIENCE"
              : isAddingNew
              ? "ADD NEW EXPERIENCE"
              : "SELECT AN EXPERIENCE"}
          </h2>

          {(isAddingNew || editingId) && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Position <span className="text-accent-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  required
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Company <span className="text-accent-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  required
                  placeholder="e.g., Acme Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Employment Type <span className="text-accent-red">*</span>
                </label>
                <select
                  value={formData.employment_type}
                  onChange={(e) =>
                    setFormData({ ...formData, employment_type: e.target.value as "full-time" | "part-time" | "contract" | "internship" })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  required
                >
                  {EMPLOYMENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">
                    Start Date <span className="text-accent-red">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                    required
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
                      setFormData({
                        ...formData,
                        end_date: e.target.value || null,
                      })
                    }
                    className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Leave empty if current
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Company URL
                </label>
                <input
                  type="url"
                  value={formData.company_website || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company_website: e.target.value || null })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  placeholder="https://company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary resize-none"
                  rows={3}
                  placeholder="Brief overview of your role and responsibilities"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Achievements (one per line)
                </label>
                <textarea
                  value={achievementsInput}
                  onChange={(e) => setAchievementsInput(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary resize-none font-mono text-sm"
                  rows={5}
                  placeholder="Led migration to microservices&#10;Improved performance by 40%&#10;Mentored 5 junior developers"
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
                  placeholder="React, Node.js, PostgreSQL, AWS, Docker"
                />
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
              Click on an experience to edit it, or click &quot;ADD NEW EXPERIENCE&quot; to
              create a new one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
