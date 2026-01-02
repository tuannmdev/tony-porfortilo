"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="border-2 border-border-retro bg-panel-retro p-8 shadow-retro-card">
          <span className="material-symbols-outlined text-6xl text-accent-red mb-4">
            error
          </span>
          <h1 className="text-4xl font-bold text-primary uppercase mb-4">
            SYSTEM ERROR
          </h1>
          <p className="text-text-main mb-6">
            Something went wrong! The system encountered an unexpected error.
          </p>
          <div className="border-l-4 border-accent-red bg-bg-retro p-4 text-left mb-6">
            <p className="text-sm text-text-muted font-mono">
              ERROR: {error.message || "Unknown error occurred"}
            </p>
            {error.digest && (
              <p className="text-xs text-text-muted font-mono mt-2">
                DIGEST: {error.digest}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center space-x-2 border-2 border-border-retro bg-primary px-6 py-3 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
            >
              <span className="material-symbols-outlined">refresh</span>
              <span className="font-bold">TRY AGAIN</span>
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center space-x-2 border-2 border-border-retro bg-panel-retro px-6 py-3 text-primary shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="font-bold">GO HOME</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
