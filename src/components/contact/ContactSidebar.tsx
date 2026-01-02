"use client";

import { useSocialLinks } from "@/hooks/useSocialLinks";

export default function ContactSidebar() {
  const { data: socialLinks } = useSocialLinks();

  // Get top 3 social links (GitHub, LinkedIn, Twitter/X)
  const displayLinks = socialLinks?.slice(0, 3) || [];

  // Map platform names to icons and descriptions
  const platformConfig: Record<string, { icon: string; description: string }> = {
    github: { icon: "code", description: "Code Repository" },
    linkedin: { icon: "work", description: "Network" },
    twitter: { icon: "alternate_email", description: "Updates" },
    x: { icon: "alternate_email", description: "Updates" },
  };

  return (
    <div className="p-8 flex flex-col gap-8 relative z-10 h-full">
      {/* Signal Origin - Map section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end border-b-2 border-border-retro pb-2 border-dashed">
          <h3 className="text-border-retro text-lg font-bold tracking-widest">
            SIGNAL ORIGIN
          </h3>
          <span className="text-border-retro/70 text-base font-mono">
            LAT: 34.05 | LON: -118.24
          </span>
        </div>
        <div className="relative w-full aspect-video rounded-sm overflow-hidden border-2 border-border-retro group shadow-retro-sm bg-[#d4b8a2]">
          <img
            alt="Digital map visualization showing abstract city grid with data overlays"
            className="w-full h-full object-cover opacity-60 sepia mix-blend-multiply group-hover:sepia-0 group-hover:opacity-80 transition-all duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnHyGdekeKLPkNOLQKjVjt40cB0PEqtfBLwKqnpofiAAYbnRgIdSxG-pmcakKXHkgO_wQHf_l9TLPgRTIgCLip7y9sdMESQVCyFwPzOMLsLD2GDrhrA5-RRcwU0rDpSMC_xkgIntdJwjOJ1FFhZE53RS5U9mxLm-svG7JIbhNHm53BGd_RVOSPMAvJnKd5ovHoKukCDuvzPRyneF85oHUDANgiCYN0y35QLG8nIOedBjzZ561v5EILPBuOJJz3bG3PJKpkagMGHw0"
          />
          {/* Ping animation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3 h-3 bg-red-500 rounded-sm animate-ping" />
            <div className="w-3 h-3 bg-red-500 rounded-sm absolute" />
          </div>
        </div>
      </div>

      {/* External Uplinks - Social Links */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end border-b-2 border-border-retro pb-2 border-dashed">
          <h3 className="text-border-retro text-lg font-bold tracking-widest">
            EXTERNAL UPLINKS
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          {displayLinks.map((link) => {
            const platformKey = link.platform.toLowerCase();
            const config = platformConfig[platformKey] || {
              icon: "link",
              description: "Link",
            };

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-panel-retro border-2 border-border-retro hover:bg-white rounded-sm group transition-all shadow-retro-sm hover:translate-x-1"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 flex items-center justify-center bg-[#eee4d6] border border-border-retro rounded-sm text-border-retro group-hover:text-primary">
                    <span className="material-symbols-outlined text-2xl">
                      {config.icon}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-border-retro group-hover:text-primary leading-none">
                      {link.platform}
                    </span>
                    <span className="text-sm text-border-retro/60 font-sans mt-1">
                      {config.description}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-border-retro/40 text-lg group-hover:text-primary">
                  arrow_forward
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* System Status Footer */}
      <div className="mt-auto flex flex-col gap-2 opacity-70">
        <div className="h-[2px] w-full bg-border-retro border-b border-white" />
        <div className="font-display text-base text-border-retro/70 flex flex-col gap-0 uppercase">
          <p>&gt; SYSTEM_READY</p>
          <p>&gt; LISTENING_PORT: 8080</p>
          <p>&gt; UPTIME: 41294s</p>
          <p className="text-primary font-bold animate-pulse">
            &gt; AWAITING_INPUT_
          </p>
        </div>
      </div>
    </div>
  );
}
