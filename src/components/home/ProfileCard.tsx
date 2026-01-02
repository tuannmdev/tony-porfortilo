"use client";

import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";

const statusConfig = {
  available: {
    color: "text-accent-green",
    label: "ONLINE",
  },
  busy: {
    color: "text-accent-yellow",
    label: "BUSY",
  },
  unavailable: {
    color: "text-accent-red",
    label: "OFFLINE",
  },
};

export default function ProfileCard() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="flex flex-col bg-panel-retro border-2 border-border-retro rounded-sm overflow-hidden shadow-retro-card animate-pulse">
          <div className="relative w-full aspect-square bg-bg-retro" />
          <div className="p-5 h-48 bg-panel-retro" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const status = statusConfig[profile.availability_status];

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Card */}
      <div className="flex flex-col bg-panel-retro border-2 border-border-retro rounded-sm overflow-hidden shadow-retro-card group">
        {/* Avatar */}
        <div className="relative w-full aspect-square bg-bg-retro flex items-center justify-center border-b-2 border-border-retro overflow-hidden p-4">
          <div
            className="w-full h-full bg-cover bg-center border-2 border-border-retro rounded-sm shadow-sm"
            style={{
              backgroundImage: profile.avatar_url
                ? `url('${profile.avatar_url}')`
                : `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdmvy6FIJc1it9ALIk4Hsyg9dUiuPnFxPYYnjTY9dXTwhbRPxHA3zuLTAoF21hAWyQSonPG73B8-o7_eqqSABfvX9sN-ljV-adux0uBw3hS3SzZnR5_RPGfyjpql9rcPzq39hSR6j6phteWqYqvZ0HDmuOVlcO8po-d9rFjNnOzjEsrmaIHDUc9sVWYq9-K_6ug-aE7dT26eXntlJliAfshUmP5ILs_Mm4XNuhgLSrTL5J3emrH7CqIVNl8C7hXhjApgIqrrR8WjQ')`,
              imageRendering: "pixelated",
            }}
          />
          {/* Status Badge */}
          <div className="absolute bottom-6 right-6 bg-panel-retro/90 backdrop-blur-sm px-2 py-1 rounded-sm border-2 border-border-retro shadow-retro-btn">
            <p className={`text-base font-bold ${status.color} animate-pulse`}>
              ● {status.label}
            </p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-5 flex flex-col gap-3">
          <div>
            <h2 className="text-text-main text-3xl font-bold uppercase tracking-tight">
              {profile.name}
            </h2>
            <p className="text-primary text-xl font-bold tracking-wide uppercase">
              {profile.title}
            </p>
          </div>

          <div className="h-0.5 bg-border-retro/20 w-full border-t border-dashed border-border-retro" />

          <div className="flex flex-col gap-2 text-lg text-text-muted">
            <div className="flex justify-between">
              <span>Class:</span>
              <span className="text-text-main font-bold">Full-Stack Mage</span>
            </div>
            {profile.location && (
              <div className="flex justify-between">
                <span>Server:</span>
                <span className="text-text-main font-bold">
                  {profile.location}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Level:</span>
              <span className="text-text-main font-bold">
                {profile.years_experience || 5}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col bg-panel-retro border-2 border-border-retro rounded-sm p-3 gap-2 shadow-retro-card">
        <Link
          href="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-bg-retro border border-transparent hover:border-border-retro transition-all group text-left"
        >
          <span className="material-symbols-outlined text-text-muted group-hover:text-primary">
            visibility
          </span>
          <div className="flex flex-col">
            <span className="text-text-main text-lg font-bold uppercase">
              View Source Code
            </span>
            <span className="text-text-muted text-base leading-none">
              Analyze github repos
            </span>
          </div>
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-3 px-4 py-3 rounded-sm bg-primary/10 border-2 border-primary hover:bg-primary/20 transition-colors group text-left"
        >
          <span className="material-symbols-outlined text-primary">mail</span>
          <div className="flex flex-col">
            <span className="text-text-main text-lg font-bold uppercase">
              Send Scroll
            </span>
            <span className="text-text-muted text-base leading-none">
              Initiate communication
            </span>
          </div>
        </Link>

        <a
          href={profile.resume_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-bg-retro border border-transparent hover:border-border-retro transition-all group text-left"
          onClick={(e) => {
            if (!profile.resume_url) {
              e.preventDefault();
              alert("Resume not available yet. Please check back later!");
            }
          }}
        >
          <span className="material-symbols-outlined text-text-muted group-hover:text-primary">
            download
          </span>
          <div className="flex flex-col">
            <span className="text-text-main text-lg font-bold uppercase">
              Export Data
            </span>
            <span className="text-text-muted text-base leading-none">
              Download Resume.pdf
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
