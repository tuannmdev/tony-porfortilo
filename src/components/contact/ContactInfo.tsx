"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useSocialLinks } from "@/hooks/useSocialLinks";

export default function ContactInfo() {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Signal Origin */}
      <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
        <h3 className="text-lg font-bold text-primary uppercase mb-4 flex items-center">
          <span className="material-symbols-outlined mr-2">location_on</span>
          SIGNAL ORIGIN
        </h3>
        <div className="space-y-3">
          {profile?.location && (
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-accent-green">
                pin_drop
              </span>
              <div>
                <p className="text-sm font-bold text-text-main">LOCATION</p>
                <p className="text-xs text-text-muted">{profile.location}</p>
              </div>
            </div>
          )}
          {profile?.email && (
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-accent-blue">
                alternate_email
              </span>
              <div>
                <p className="text-sm font-bold text-text-main">EMAIL</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs text-primary hover:underline"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          )}
          {profile?.phone && (
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-accent-yellow">
                phone
              </span>
              <div>
                <p className="text-sm font-bold text-text-main">PHONE</p>
                <a
                  href={`tel:${profile.phone}`}
                  className="text-xs text-primary hover:underline"
                >
                  {profile.phone}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* External Uplinks */}
      {socialLinks && socialLinks.length > 0 && (
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <h3 className="text-lg font-bold text-primary uppercase mb-4 flex items-center">
            <span className="material-symbols-outlined mr-2">link</span>
            EXTERNAL UPLINKS
          </h3>
          <div className="space-y-2">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-border-retro bg-bg-retro px-3 py-2 text-sm hover:bg-primary hover:text-panel-retro transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-base">
                    {link.icon_name}
                  </span>
                  <span className="font-bold">{link.platform}</span>
                </div>
                <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100 transition-opacity">
                  open_in_new
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
        <h3 className="text-lg font-bold text-primary uppercase mb-4 flex items-center">
          <span className="material-symbols-outlined mr-2">
            online_prediction
          </span>
          SYSTEM STATUS
        </h3>
        <div className="space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">STATUS:</span>
            <span className="text-accent-green flex items-center">
              <span className="animate-pulse mr-1">●</span>
              ONLINE
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">LISTENING PORT:</span>
            <span className="text-text-main">443</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">UPTIME:</span>
            <span className="text-text-main">{formatUptime(uptime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">CONNECTION:</span>
            <span className="text-accent-green">STABLE</span>
          </div>
        </div>
        <div className="mt-4 border-t border-border-retro pt-4">
          <div className="flex items-center justify-center text-xs text-text-muted animate-pulse">
            <span className="mr-2">▊</span>
            <span>AWAITING INPUT...</span>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="border-2 border-border-retro bg-panel-retro p-4 shadow-retro">
        <div className="flex items-center space-x-2 text-sm">
          <span className="material-symbols-outlined text-accent-blue">
            schedule
          </span>
          <div>
            <p className="font-bold text-text-main">RESPONSE TIME</p>
            <p className="text-xs text-text-muted">
              Usually within 24-48 hours
            </p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="border-2 border-border-retro bg-bg-retro p-4 shadow-retro">
        <div className="aspect-square flex items-center justify-center text-center">
          <div>
            <span className="material-symbols-outlined text-4xl text-text-muted mb-2">
              map
            </span>
            <p className="text-xs text-text-muted">COORDINATES</p>
            <p className="text-sm font-bold text-primary font-mono">
              {profile?.location || "LOCATION UNKNOWN"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
