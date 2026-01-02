"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AdminHeader({ user }: { user: User }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b-4 border-border-retro bg-panel-retro">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="material-symbols-outlined text-primary">
            location_on
          </span>
          <span className="text-text-muted">Admin Panel</span>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="flex items-center space-x-3 border-2 border-border-retro bg-bg-retro px-4 py-2">
            <span className="material-symbols-outlined text-primary">
              account_circle
            </span>
            <div className="text-sm">
              <p className="font-bold text-text-main">{user.email}</p>
              <p className="text-xs text-text-muted">Administrator</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 border-2 border-border-retro bg-accent-red px-4 py-2 text-white shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="font-bold text-sm">LOGOUT</span>
          </button>
        </div>
      </div>
    </header>
  );
}
