"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "HOME", icon: "home" },
  { href: "/about", label: "QUEST LOG", icon: "menu_book" },
  { href: "/projects", label: "PROJECTS", icon: "extension" },
  { href: "/contact", label: "CONTACT", icon: "mail" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-border-retro bg-panel-retro shadow-retro">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-10 w-10 border-2 border-border-retro bg-primary shadow-retro-btn transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5">
              <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-2xl text-panel-retro">
                code
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold tracking-tight text-primary">
                TONY.DEV
              </div>
              <div className="text-xs text-text-muted">
                LVL 5 ENGINEER
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center space-x-2 border-2 px-4 py-2 transition-all",
                    isActive
                      ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
                      : "border-transparent text-text-main hover:border-border-retro hover:bg-primary hover:text-panel-retro hover:shadow-retro-btn"
                  )}
                >
                  <span className="material-symbols-outlined text-lg">
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold tracking-wide">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 bg-accent-green" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center h-10 w-10 border-2 border-border-retro bg-primary text-panel-retro shadow-retro-btn hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t-2 border-border-retro py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 border-2 px-4 py-3 transition-all",
                    isActive
                      ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
                      : "border-transparent text-text-main hover:border-border-retro hover:bg-primary hover:text-panel-retro"
                  )}
                >
                  <span className="material-symbols-outlined">
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold tracking-wide">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="ml-auto h-2 w-2 bg-accent-green" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
