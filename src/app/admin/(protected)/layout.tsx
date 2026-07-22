import Providers from "@/components/Providers";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-navy/[0.02]">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </Providers>
  );
}
