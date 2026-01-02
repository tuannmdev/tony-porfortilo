import { createClient } from "@/lib/supabase/server";
import { SkillsManager } from "@/components/admin/SkillsManager";
import AdminGuard from "@/components/admin/AdminGuard";

export default async function AdminSkillsPage() {
  const supabase = await createClient();

  const { data: skills, error } = await supabase
    .from("skills")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching skills:", error);
  }

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">SKILLS MANAGEMENT</h1>
            <p className="text-text-muted">
              Manage your technical skills and proficiency levels
            </p>
          </div>
        </div>

        <SkillsManager initialSkills={skills || []} />
      </div>
    </AdminGuard>
  );
}
