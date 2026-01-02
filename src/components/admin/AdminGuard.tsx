import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg-retro">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
