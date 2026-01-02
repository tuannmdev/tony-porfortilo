import { createClient } from "@/lib/supabase/server";
import { ExperienceManager } from "@/components/admin/ExperienceManager";
import AdminGuard from "@/components/admin/AdminGuard";

export default async function AdminExperiencePage() {
  const supabase = await createClient();

  const { data: experiences, error } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching experiences:", error);
  }

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">
              EXPERIENCE MANAGEMENT
            </h1>
            <p className="text-text-muted">
              Manage your work experience and employment history
            </p>
          </div>
        </div>

        <ExperienceManager initialExperiences={experiences || []} />
      </div>
    </AdminGuard>
  );
}
