"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Skill } from "@/types/database";

interface SkillsManagerProps {
  initialSkills: Skill[];
}

type SkillFormData = Omit<Skill, "id" | "created_at" | "updated_at">;

const SKILL_CATEGORIES = [
  { value: "primary", label: "Primary Skills" },
  { value: "secondary", label: "Secondary Skills" },
  { value: "tools", label: "Tools & Technologies" },
  { value: "soft-skills", label: "Soft Skills" },
  { value: "languages", label: "Languages" },
];

const PROFICIENCY_LEVELS = [
  { value: 1, label: "Beginner" },
  { value: 2, label: "Elementary" },
  { value: 3, label: "Intermediate" },
  { value: 4, label: "Advanced" },
  { value: 5, label: "Expert" },
];

export function SkillsManager({ initialSkills }: SkillsManagerProps) {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const emptyForm: SkillFormData = {
    name: "",
    category: "primary",
    proficiency: 3,
    icon_url: null,
    color: null,
    is_featured: false,
    order_index: skills.length,
  };

  const [formData, setFormData] = useState<SkillFormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({ ...emptyForm, order_index: skills.length });
    setEditingId(null);
    setIsAddingNew(false);
    setMessage(null);
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon_url: skill.icon_url,
      color: skill.color,
      is_featured: skill.is_featured,
      order_index: skill.order_index,
    });
    setEditingId(skill.id);
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

    try {
      const supabase = createClient();

      if (editingId) {
        // Update existing skill
        const updateData = {
          name: formData.name,
          category: formData.category,
          proficiency: formData.proficiency,
          icon_url: formData.icon_url,
          color: formData.color,
          is_featured: formData.is_featured,
          order_index: formData.order_index,
        };

        const { error } = await supabase
          .from("skills")
          // @ts-ignore - Supabase type generation issue with skills table
          .update(updateData)
          .eq("id", editingId);

        if (error) throw error;

        setSkills((prev) =>
          prev.map((skill) =>
            skill.id === editingId
              ? { ...skill, ...formData, updated_at: new Date().toISOString() }
              : skill
          )
        );

        setMessage({ type: "success", text: "Skill updated successfully!" });
      } else {
        // Create new skill
        const insertData = {
          name: formData.name,
          category: formData.category,
          proficiency: formData.proficiency,
          icon_url: formData.icon_url,
          color: formData.color,
          is_featured: formData.is_featured,
          order_index: formData.order_index,
        };

        const { data, error } = await supabase
          .from("skills")
          // @ts-ignore - Supabase type generation issue with skills table
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;

        setSkills((prev) => [...prev, data]);
        setMessage({ type: "success", text: "Skill created successfully!" });
      }

      router.refresh();
      setTimeout(resetForm, 1500);
    } catch (error: any) {
      console.error("Error saving skill:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to save skill",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("skills").delete().eq("id", id);

      if (error) throw error;

      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      setMessage({ type: "success", text: "Skill deleted successfully!" });
      router.refresh();

      if (editingId === id) {
        resetForm();
      }
    } catch (error: any) {
      console.error("Error deleting skill:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to delete skill",
      });
    }
  };

  const moveSkill = async (id: string, direction: "up" | "down") => {
    const currentIndex = skills.findIndex((s) => s.id === id);
    if (currentIndex === -1) return;
    if (direction === "up" && currentIndex === 0) return;
    if (direction === "down" && currentIndex === skills.length - 1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newSkills = [...skills];
    const [movedSkill] = newSkills.splice(currentIndex, 1);
    newSkills.splice(newIndex, 0, movedSkill);

    // Update order_index for all affected skills
    const updates = newSkills.map((skill, index) => ({
      id: skill.id,
      order_index: index,
    }));

    setSkills(newSkills.map((skill, index) => ({ ...skill, order_index: index })));

    try {
      const supabase = createClient();

      // Update all order indices
      for (const update of updates) {
        await supabase
          .from("skills")
          // @ts-ignore - Supabase type generation issue with skills table
          .update({ order_index: update.order_index })
          .eq("id", update.id);
      }

      router.refresh();
    } catch (error: any) {
      console.error("Error reordering skills:", error);
      setMessage({
        type: "error",
        text: "Failed to reorder skills",
      });
      // Revert on error
      setSkills(initialSkills);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Skills List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-main">
            ALL SKILLS ({skills.length})
          </h2>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold border-2 border-border-retro shadow-retro-btn transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span>
              ADD NEW SKILL
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

        {skills.length === 0 ? (
          <div className="p-8 border-2 border-border-retro bg-panel-retro text-center">
            <p className="text-text-muted">No skills yet. Add your first skill!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className={`p-4 border-2 border-border-retro bg-panel-retro shadow-retro transition-all ${
                  editingId === skill.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {skill.icon_url && (
                        <span className="material-symbols-outlined text-primary">
                          {skill.icon_url}
                        </span>
                      )}
                      <h3 className="font-bold text-text-main">{skill.name}</h3>
                      {skill.is_featured && (
                        <span className="px-2 py-1 bg-accent-yellow text-xs font-bold">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-muted mb-2">
                      <span className="px-2 py-1 bg-bg-retro border border-border-retro">
                        {skill.category}
                      </span>
                      <span>
                        Proficiency:{" "}
                        {PROFICIENCY_LEVELS.find((p) => p.value === skill.proficiency)
                          ?.label || skill.proficiency}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Reorder buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveSkill(skill.id, "up")}
                        disabled={index === 0}
                        className="px-2 py-1 bg-bg-retro border border-border-retro hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <span className="material-symbols-outlined text-sm">
                          keyboard_arrow_up
                        </span>
                      </button>
                      <button
                        onClick={() => moveSkill(skill.id, "down")}
                        disabled={index === skills.length - 1}
                        className="px-2 py-1 bg-bg-retro border border-border-retro hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <span className="material-symbols-outlined text-sm">
                          keyboard_arrow_down
                        </span>
                      </button>
                    </div>

                    {/* Edit button */}
                    <button
                      onClick={() => handleEdit(skill)}
                      className="px-3 py-2 bg-accent-blue hover:bg-accent-blue/80 text-white font-bold border border-border-retro"
                      title="Edit skill"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="px-3 py-2 bg-accent-red hover:bg-accent-red/80 text-white font-bold border border-border-retro"
                      title="Delete skill"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
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
        <div className="sticky top-6 p-6 border-2 border-border-retro bg-panel-retro shadow-retro">
          <h2 className="text-xl font-bold text-text-main mb-4">
            {editingId ? "EDIT SKILL" : isAddingNew ? "ADD NEW SKILL" : "SELECT A SKILL"}
          </h2>

          {(isAddingNew || editingId) && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Skill Name <span className="text-accent-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  required
                  placeholder="e.g., React, Node.js"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Category <span className="text-accent-red">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as "primary" | "secondary" | "tools" | "soft-skills" | "languages" })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  required
                >
                  {SKILL_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Proficiency <span className="text-accent-red">*</span>
                </label>
                <select
                  value={formData.proficiency}
                  onChange={(e) =>
                    setFormData({ ...formData, proficiency: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  required
                >
                  {PROFICIENCY_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.value} - {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Icon URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.icon_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, icon_url: e.target.value || null })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  placeholder="https://example.com/icon.svg"
                />
                <p className="text-xs text-text-muted mt-1">
                  URL to skill icon image
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1">
                  Color (Hex Code)
                </label>
                <input
                  type="text"
                  value={formData.color || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value || null })
                  }
                  className="w-full px-3 py-2 border-2 border-border-retro bg-bg-retro focus:outline-none focus:border-primary"
                  placeholder="#3b82f6"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) =>
                    setFormData({ ...formData, is_featured: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="is_featured" className="text-sm font-bold text-text-main">
                  Featured Skill (show on home page)
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
              Click on a skill to edit it, or click &quot;ADD NEW SKILL&quot; to create a new one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
