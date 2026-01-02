"use client";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-40 bg-panel-retro border-t-2 border-border-retro px-4 py-2 flex items-center justify-between text-base font-bold uppercase tracking-wider text-text-muted shadow-[0_-4px_0px_rgba(89,64,48,0.1)]">
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-accent-red">
            favorite
          </span>
          <span>HP: 100%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-accent-blue">
            water_drop
          </span>
          <span>MP: 85%</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-accent-green">
            wifi
          </span>
          <span>Connected</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-lg text-primary">
          public
        </span>
        <span>Loc: Internet</span>
      </div>
    </footer>
  );
}
