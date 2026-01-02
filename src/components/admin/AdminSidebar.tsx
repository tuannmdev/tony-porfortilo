"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "dashboard",
  },
  {
    href: "/admin/profile",
    label: "Profile",
    icon: "account_circle",
  },
  {
    href: "/admin/skills",
    label: "Skills",
    icon: "psychology",
  },
  {
    href: "/admin/experience",
    label: "Experience",
    icon: "timeline",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: "extension",
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: "mail",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r-4 border-border-retro bg-panel-retro min-h-screen">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary uppercase flex items-center">
            <span className="material-symbols-outlined mr-2">admin_panel_settings</span>
            ADMIN
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 border-2 transition-all",
                  isActive
                    ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
                    : "border-transparent text-text-main hover:border-border-retro hover:bg-primary hover:text-panel-retro"
                )}
              >
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
                <span className="font-bold text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* View Site */}
        <div className="mt-8 pt-8 border-t-2 border-border-retro">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-3 border-2 border-border-retro text-primary hover:bg-primary hover:text-panel-retro transition-all"
          >
            <span className="material-symbols-outlined text-lg">
              open_in_new
            </span>
            <span className="font-bold text-sm">View Site</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
