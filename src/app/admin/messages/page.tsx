import { createClient } from "@/lib/supabase/server";
import MessagesList from "@/components/admin/MessagesList";
import AdminGuard from "@/components/admin/AdminGuard";

export default async function AdminMessagesPage() {
  const supabase = await createClient();

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminGuard>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="border-2 border-border-retro bg-panel-retro p-6 shadow-retro">
          <h1 className="text-3xl font-bold text-primary uppercase flex items-center">
            <span className="material-symbols-outlined text-4xl mr-3">mail</span>
            MESSAGES
          </h1>
          <p className="text-text-muted mt-2">
            View and manage contact form submissions
          </p>
        </div>

        {/* Messages List */}
        {messages && <MessagesList messages={messages} />}
      </div>
    </AdminGuard>
  );
}
