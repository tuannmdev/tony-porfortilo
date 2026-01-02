import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="border-2 border-border-retro bg-panel-retro p-8 shadow-retro-card">
          <div className="mb-6">
            <span className="material-symbols-outlined text-9xl text-text-muted animate-pulse">
              search_off
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-primary uppercase mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-text-main uppercase mb-4">
            LOCATION NOT FOUND
          </h2>
          <p className="text-text-muted mb-8">
            The page you&apos;re looking for doesn&apos;t exist in this dimension. It may
            have been moved, deleted, or never existed in the first place.
          </p>

          <div className="border-2 border-border-retro bg-bg-retro p-4 mb-8 text-left">
            <p className="text-sm font-bold text-primary mb-2">
              TRY THESE INSTEAD:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-accent-green">▸</span>
                <Link href="/" className="text-primary hover:underline">
                  Return to Home Base
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent-green">▸</span>
                <Link href="/projects" className="text-primary hover:underline">
                  Browse Projects Archive
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent-green">▸</span>
                <Link href="/about" className="text-primary hover:underline">
                  View Quest Log
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent-green">▸</span>
                <Link href="/contact" className="text-primary hover:underline">
                  Send Message
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-8 py-4 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-bold text-lg">RETURN HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
