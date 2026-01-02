import { createClient } from "@/lib/supabase/server";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import AdminGuard from "@/components/admin/AdminGuard";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">
              PROJECTS MANAGEMENT
            </h1>
            <p className="text-text-muted">
              Manage your portfolio projects and showcase work
            </p>
          </div>
        </div>

        <ProjectsManager initialProjects={projects || []} />
      </div>
    </AdminGuard>
  );
}
