import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import AdminGuard from "@/components/admin/AdminGuard";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch stats
  const projectsData = await supabase
    .from("projects")
    .select("id, status, featured");
  const messagesData = await supabase
    .from("contact_messages")
    .select("id, is_read, priority");
  const skillsData = await supabase.from("skills").select("id");
  const experienceData = await supabase.from("experience").select("id");

  const stats = {
    totalProjects: projectsData.data?.length || 0,
    featuredProjects:
      projectsData.data?.filter((p: any) => p.featured).length || 0,
    completedProjects:
      projectsData.data?.filter((p: any) => p.status === "completed").length || 0,
    unreadMessages:
      messagesData.data?.filter((m: any) => !m.is_read).length || 0,
    totalMessages: messagesData.data?.length || 0,
    urgentMessages:
      messagesData.data?.filter((m: any) => m.priority === "urgent").length || 0,
    totalSkills: skillsData.data?.length || 0,
    totalExperience: experienceData.data?.length || 0,
  };

  // Get recent messages
  const { data: recentMessages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <AdminGuard>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
        <h1 className="text-3xl font-bold text-primary uppercase flex items-center">
          <span className="material-symbols-outlined text-4xl mr-3">
            dashboard
          </span>
          DASHBOARD
        </h1>
        <p className="text-text-muted mt-2">
          Welcome to your admin panel. Manage your portfolio content here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects Stats */}
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-3xl text-accent-blue">
              extension
            </span>
            <span className="text-xs font-bold text-text-muted">PROJECTS</span>
          </div>
          <div className="text-4xl font-bold text-primary mb-2">
            {stats.totalProjects}
          </div>
          <div className="text-sm text-text-muted space-y-1">
            <div>{stats.completedProjects} completed</div>
            <div>{stats.featuredProjects} featured</div>
          </div>
        </div>

        {/* Messages Stats */}
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-3xl text-accent-green">
              mail
            </span>
            <span className="text-xs font-bold text-text-muted">MESSAGES</span>
          </div>
          <div className="text-4xl font-bold text-primary mb-2">
            {stats.totalMessages}
          </div>
          <div className="text-sm text-text-muted space-y-1">
            <div className="flex items-center space-x-1">
              <span className="text-accent-yellow">●</span>
              <span>{stats.unreadMessages} unread</span>
            </div>
            {stats.urgentMessages > 0 && (
              <div className="flex items-center space-x-1">
                <span className="text-accent-red">●</span>
                <span>{stats.urgentMessages} urgent</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills Stats */}
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-3xl text-accent-yellow">
              psychology
            </span>
            <span className="text-xs font-bold text-text-muted">SKILLS</span>
          </div>
          <div className="text-4xl font-bold text-primary mb-2">
            {stats.totalSkills}
          </div>
          <div className="text-sm text-text-muted">Total skills listed</div>
        </div>

        {/* Experience Stats */}
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-3xl text-accent-red">
              timeline
            </span>
            <span className="text-xs font-bold text-text-muted">
              EXPERIENCE
            </span>
          </div>
          <div className="text-4xl font-bold text-primary mb-2">
            {stats.totalExperience}
          </div>
          <div className="text-sm text-text-muted">Work experiences</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
        <h2 className="text-xl font-bold text-primary uppercase mb-4 flex items-center">
          <span className="material-symbols-outlined mr-2">bolt</span>
          QUICK ACTIONS
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/admin/projects"
            className="flex items-center space-x-3 border-2 border-border-retro bg-bg-retro px-4 py-3 hover:bg-primary hover:text-panel-retro transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="font-bold text-sm">Add New Project</span>
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center space-x-3 border-2 border-border-retro bg-bg-retro px-4 py-3 hover:bg-primary hover:text-panel-retro transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="font-bold text-sm">Add New Skill</span>
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center space-x-3 border-2 border-border-retro bg-bg-retro px-4 py-3 hover:bg-primary hover:text-panel-retro transition-all"
          >
            <span className="material-symbols-outlined">mail</span>
            <span className="font-bold text-sm">View Messages</span>
          </Link>
        </div>
      </div>

      {/* Recent Messages */}
      {recentMessages && recentMessages.length > 0 && (
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary uppercase flex items-center">
              <span className="material-symbols-outlined mr-2">inbox</span>
              RECENT MESSAGES
            </h2>
            <Link
              href="/admin/messages"
              className="text-sm text-primary hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.map((message: any) => (
              <div
                key={message.id}
                className={`border-2 border-border-retro p-4 ${
                  message.is_read ? "bg-bg-retro" : "bg-accent-yellow/10"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-text-main">{message.name}</p>
                    <p className="text-sm text-text-muted">{message.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!message.is_read && (
                      <span className="text-xs font-bold text-accent-yellow border border-border-retro px-2 py-1">
                        NEW
                      </span>
                    )}
                    {message.priority === "urgent" && (
                      <span className="text-xs font-bold text-white bg-accent-red px-2 py-1">
                        URGENT
                      </span>
                    )}
                  </div>
                </div>
                {message.subject && (
                  <p className="text-sm font-bold text-text-main mb-1">
                    {message.subject}
                  </p>
                )}
                <p className="text-sm text-text-muted line-clamp-2">
                  {message.message}
                </p>
                <p className="text-xs text-text-muted mt-2">
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </AdminGuard>
  );
}
