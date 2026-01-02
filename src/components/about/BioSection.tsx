"use client";

import { useProfile } from "@/hooks/useProfile";
import { useSocialLinks } from "@/hooks/useSocialLinks";

export default function BioSection() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: socialLinks, isLoading: socialLoading } = useSocialLinks();

  if (profileLoading || socialLoading) {
    return (
      <section className="container mx-auto px-4">
        <div className="text-center text-text-muted">Loading...</div>
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section className="container mx-auto px-4">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-4 py-2 text-panel-retro shadow-retro-btn mb-4">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="text-sm font-bold">QUEST LOG</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-primary uppercase mb-4">
          About Me
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          My journey as a software engineer
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Character Stats */}
        <div className="md:col-span-1 space-y-6">
          {/* Character Card */}
          <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro-card">
            <div className="mb-4 text-center">
              <div className="mx-auto h-32 w-32 border-2 border-border-retro bg-bg-retro flex items-center justify-center mb-4">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-6xl text-text-muted">
                    account_circle
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-primary uppercase">
                {profile.name}
              </h2>
              <p className="text-sm text-text-muted">{profile.title}</p>
            </div>

            {/* Stats */}
            <div className="border-t-2 border-border-retro pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">CLASS</span>
                <span className="text-sm font-bold text-primary">
                  ENGINEER
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">LEVEL</span>
                <span className="text-sm font-bold text-primary">
                  {profile.years_experience || 5}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">STATUS</span>
                <span className="text-sm font-bold text-accent-green">
                  {profile.availability_status.toUpperCase()}
                </span>
              </div>
              {profile.location && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">LOCATION</span>
                  <span className="text-sm font-bold text-text-main">
                    {profile.location}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
              <h3 className="text-sm font-bold text-primary mb-4 flex items-center">
                <span className="material-symbols-outlined text-base mr-2">
                  link
                </span>
                EXTERNAL LINKS
              </h3>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 border border-border-retro bg-bg-retro px-3 py-2 text-sm hover:bg-primary hover:text-panel-retro transition-colors group"
                  >
                    <span className="material-symbols-outlined text-base">
                      {link.icon_name}
                    </span>
                    <span className="flex-1 font-bold">
                      {link.platform}
                    </span>
                    <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100 transition-opacity">
                      arrow_forward
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Resume Download */}
          {profile.resume_url && (
            <a
              href={profile.resume_url}
              download
              className="flex items-center justify-center space-x-2 border-2 border-border-retro bg-primary px-6 py-3 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
            >
              <span className="material-symbols-outlined">download</span>
              <span className="font-bold">DOWNLOAD RESUME</span>
            </a>
          )}
        </div>

        {/* Right Column - Bio Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Main Bio */}
          <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
            <div className="mb-4 flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary">
                description
              </span>
              <h3 className="text-xl font-bold text-primary uppercase">
                Character Background
              </h3>
            </div>
            {profile.bio ? (
              <div className="prose prose-retro max-w-none">
                <p className="text-text-main leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            ) : (
              <p className="text-text-muted">
                No background story available yet.
              </p>
            )}
          </div>

          {/* Quick Facts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-border-retro bg-panel-retro p-4 shadow-retro">
              <div className="flex items-center space-x-2 mb-2">
                <span className="material-symbols-outlined text-accent-green">
                  workspace_premium
                </span>
                <h4 className="font-bold text-primary text-sm">
                  EXPERIENCE
                </h4>
              </div>
              <p className="text-2xl font-bold text-text-main">
                {profile.years_experience}+ Years
              </p>
              <p className="text-xs text-text-muted">
                Professional Development
              </p>
            </div>

            <div className="border-2 border-border-retro bg-panel-retro p-4 shadow-retro">
              <div className="flex items-center space-x-2 mb-2">
                <span className="material-symbols-outlined text-accent-blue">
                  code
                </span>
                <h4 className="font-bold text-primary text-sm">
                  SPECIALIZATION
                </h4>
              </div>
              <p className="text-2xl font-bold text-text-main">
                Full-Stack
              </p>
              <p className="text-xs text-text-muted">
                Web Development
              </p>
            </div>
          </div>

          {/* Values/Approach */}
          <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
            <div className="mb-4 flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary">
                lightbulb
              </span>
              <h3 className="text-xl font-bold text-primary uppercase">
                Core Values
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-accent-green bg-bg-retro p-4">
                <h4 className="font-bold text-text-main mb-2">
                  Clean Code
                </h4>
                <p className="text-sm text-text-muted">
                  Writing maintainable, scalable, and well-documented code
                </p>
              </div>
              <div className="border-l-4 border-accent-blue bg-bg-retro p-4">
                <h4 className="font-bold text-text-main mb-2">
                  User-Centric
                </h4>
                <p className="text-sm text-text-muted">
                  Building solutions that solve real user problems
                </p>
              </div>
              <div className="border-l-4 border-accent-yellow bg-bg-retro p-4">
                <h4 className="font-bold text-text-main mb-2">
                  Continuous Learning
                </h4>
                <p className="text-sm text-text-muted">
                  Always exploring new technologies and best practices
                </p>
              </div>
              <div className="border-l-4 border-accent-red bg-bg-retro p-4">
                <h4 className="font-bold text-text-main mb-2">
                  Team Collaboration
                </h4>
                <p className="text-sm text-text-muted">
                  Working effectively with cross-functional teams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
