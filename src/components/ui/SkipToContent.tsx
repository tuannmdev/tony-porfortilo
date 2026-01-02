"use client";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:border-2 focus:border-border-retro focus:bg-primary focus:px-6 focus:py-3 focus:text-panel-retro focus:shadow-retro-btn focus:font-bold"
    >
      SKIP TO MAIN CONTENT
    </a>
  );
}
