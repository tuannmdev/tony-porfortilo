"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

export default function ProfileEditForm({
  initialData,
}: {
  initialData: Profile;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const supabase = createClient();

      const { error } = await (supabase as any)
        .from("profile")
        .update({
          name: formData.name,
          title: formData.title,
          bio: formData.bio,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          availability_status: formData.availability_status,
          years_experience: formData.years_experience,
          github_username: formData.github_username,
          linkedin_username: formData.linkedin_username,
          website_url: formData.website_url,
        })
        .eq("id", formData.id);

      if (error) throw error;

      setMessage({ type: "success", text: "Profile updated successfully!" });
      router.refresh();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
        <h2 className="text-xl font-bold text-primary uppercase mb-4">
          BASIC INFORMATION
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              FULL NAME *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              JOB TITLE *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-text-main mb-2">
              BIO
            </label>
            <textarea
              value={formData.bio || ""}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              EMAIL
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              PHONE
            </label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              LOCATION
            </label>
            <input
              type="text"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              YEARS OF EXPERIENCE
            </label>
            <input
              type="number"
              value={formData.years_experience || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  years_experience: parseInt(e.target.value),
                })
              }
              min="0"
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              AVAILABILITY STATUS
            </label>
            <select
              value={formData.availability_status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  availability_status: e.target.value as any,
                })
              }
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              GITHUB USERNAME
            </label>
            <input
              type="text"
              value={formData.github_username || ""}
              onChange={(e) =>
                setFormData({ ...formData, github_username: e.target.value })
              }
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-main mb-2">
              LINKEDIN USERNAME
            </label>
            <input
              type="text"
              value={formData.linkedin_username || ""}
              onChange={(e) =>
                setFormData({ ...formData, linkedin_username: e.target.value })
              }
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-text-main mb-2">
              WEBSITE URL
            </label>
            <input
              type="url"
              value={formData.website_url || ""}
              onChange={(e) =>
                setFormData({ ...formData, website_url: e.target.value })
              }
              className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`border-2 p-4 flex items-start space-x-2 ${
            message.type === "success"
              ? "border-accent-green bg-accent-green/20 text-accent-green"
              : "border-accent-red bg-accent-red/20 text-accent-red"
          }`}
        >
          <span className="material-symbols-outlined">
            {message.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="font-bold text-sm">{message.text}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center space-x-2 border-2 border-border-retro bg-primary px-8 py-4 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin border-2 border-panel-retro border-r-transparent rounded-full" />
              <span className="font-bold">SAVING...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span>
              <span className="font-bold">SAVE CHANGES</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
