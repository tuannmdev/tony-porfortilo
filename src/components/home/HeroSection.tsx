"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";

const statusConfig = {
  available: {
    color: "text-accent-green",
    bgColor: "bg-accent-green",
    label: "AVAILABLE FOR HIRE",
    icon: "check_circle",
  },
  busy: {
    color: "text-accent-yellow",
    bgColor: "bg-accent-yellow",
    label: "CURRENTLY BUSY",
    icon: "schedule",
  },
  unavailable: {
    color: "text-accent-red",
    bgColor: "bg-accent-red",
    label: "UNAVAILABLE",
    icon: "cancel",
  },
};

export default function HeroSection() {
  const { data: profile, isLoading } = useProfile();
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = [
    "FULL-STACK DEVELOPER",
    "SENIOR ENGINEER",
    "TECH ENTHUSIAST",
    "PROBLEM SOLVER",
  ];

  // Typewriter effect
  useEffect(() => {
    if (!profile) return;

    let timeout: NodeJS.Timeout;
    const currentText = texts[currentTextIndex];

    if (displayedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, currentTextIndex, profile]);

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin border-4 border-primary border-r-transparent" />
            <p className="mt-4 text-text-muted">LOADING...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  const status = statusConfig[profile.availability_status];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 border-2 border-border-retro bg-panel-retro px-4 py-2 shadow-retro">
            <span className={`h-2 w-2 ${status.bgColor} animate-pulse`} />
            <span className={`text-sm font-bold ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* Name & Title */}
          <div>
            <div className="mb-2 flex items-center space-x-2 text-sm text-text-muted">
              <span className="material-symbols-outlined text-base">
                account_circle
              </span>
              <span>PLAYER PROFILE</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary uppercase mb-4 leading-none">
              {profile.name}
            </h1>
            <div className="h-12 border-2 border-border-retro bg-panel-retro px-4 flex items-center shadow-retro">
              <span className="text-xl font-bold text-text-main">
                {displayedText}
                <span className="animate-pulse">▊</span>
              </span>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="border-l-4 border-primary bg-panel-retro p-4 shadow-retro">
              <p className="text-text-main leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-border-retro bg-panel-retro p-4 shadow-retro">
              <div className="text-3xl font-bold text-primary">
                {profile.years_experience}+
              </div>
              <div className="text-sm text-text-muted">YEARS EXP</div>
            </div>
            <div className="border-2 border-border-retro bg-panel-retro p-4 shadow-retro">
              <div className="text-3xl font-bold text-primary">LVL 5</div>
              <div className="text-sm text-text-muted">ENGINEER</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group relative inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-6 py-3 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
            >
              <span className="material-symbols-outlined">extension</span>
              <span className="font-bold">VIEW PROJECTS</span>
            </Link>
            <Link
              href="/contact"
              className="group relative inline-flex items-center space-x-2 border-2 border-border-retro bg-panel-retro px-6 py-3 text-primary shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
            >
              <span className="material-symbols-outlined">mail</span>
              <span className="font-bold">CONTACT ME</span>
            </Link>
          </div>
        </div>

        {/* Right Column - Avatar & Info */}
        <div className="space-y-6">
          {/* Avatar */}
          <div className="relative">
            <div className="border-4 border-border-retro bg-panel-retro p-6 shadow-retro-card">
              <div className="aspect-square border-2 border-border-retro bg-bg-retro flex items-center justify-center">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-9xl text-text-muted">
                    account_circle
                  </span>
                )}
              </div>
              {/* Status Indicator */}
              <div className="mt-4 flex items-center justify-center space-x-2 border-t-2 border-border-retro pt-4">
                <span className={`material-symbols-outlined ${status.color}`}>
                  {status.icon}
                </span>
                <span className="text-sm font-bold text-text-main">
                  STATUS: {status.label}
                </span>
              </div>
            </div>
            {/* Level Badge */}
            <div className="absolute -top-4 -right-4 border-2 border-border-retro bg-accent-yellow px-4 py-2 shadow-retro-btn">
              <div className="text-sm font-bold text-border-retro">
                SENIOR
              </div>
            </div>
          </div>

          {/* Contact Info Panel */}
          <div className="border-2 border-border-retro bg-panel-retro p-4 shadow-retro space-y-2">
            <div className="text-sm font-bold text-primary mb-3 flex items-center">
              <span className="material-symbols-outlined text-base mr-2">
                info
              </span>
              CONTACT INFO
            </div>
            {profile.location && (
              <div className="flex items-start space-x-2 text-sm">
                <span className="material-symbols-outlined text-base text-text-muted">
                  location_on
                </span>
                <span className="text-text-main">{profile.location}</span>
              </div>
            )}
            {profile.email && (
              <div className="flex items-start space-x-2 text-sm">
                <span className="material-symbols-outlined text-base text-text-muted">
                  mail
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-primary hover:underline"
                >
                  {profile.email}
                </a>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-start space-x-2 text-sm">
                <span className="material-symbols-outlined text-base text-text-muted">
                  phone
                </span>
                <a
                  href={`tel:${profile.phone}`}
                  className="text-primary hover:underline"
                >
                  {profile.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
