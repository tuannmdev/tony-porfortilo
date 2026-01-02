import { createClient } from "@/lib/supabase/server";
import ProfileEditForm from "@/components/admin/ProfileEditForm";
import AdminGuard from "@/components/admin/AdminGuard";

export default async function AdminProfilePage() {
  const supabase = await createClient();

  const { data: profile } = await supabase.from("profile").select("*").single();

  return (
    <AdminGuard>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
        <h1 className="text-3xl font-bold text-primary uppercase flex items-center">
          <span className="material-symbols-outlined text-4xl mr-3">
            account_circle
          </span>
          PROFILE MANAGEMENT
        </h1>
        <p className="text-text-muted mt-2">
          Update your profile information and settings
        </p>
      </div>

      {/* Profile Form */}
      {profile && <ProfileEditForm initialData={profile} />}
      </div>
    </AdminGuard>
  );
}
