import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Package, CheckCircle2, FolderKanban, MessageSquareText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, activeCount, galleryCount, newInquiryCount] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.galleryItem.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
  ]);

  const recentInquiries = await prisma.inquiry.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { label: "Total Products", value: productCount, icon: Package },
    { label: "Active Products", value: activeCount, icon: CheckCircle2 },
    { label: "Projects", value: galleryCount, icon: FolderKanban },
    { label: "New Inquiries", value: newInquiryCount, icon: MessageSquareText },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Dashboard Overview</h1>
      <p className="mt-1 text-sm text-navy/50">Welcome back to New Toheed Glass &amp; Accessories admin panel.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-luxe p-6">
            <s.icon className="h-6 w-6 text-gold" />
            <p className="mt-4 text-2xl font-bold text-navy">{s.value}</p>
            <p className="text-sm text-navy/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card-luxe p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-navy">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-xs font-medium text-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-4 divide-y divide-navy/5">
          {recentInquiries.length === 0 && (
            <p className="py-4 text-sm text-navy/50">No inquiries yet.</p>
          )}
          {recentInquiries.map((q) => (
            <div key={q.id} className="flex items-start justify-between gap-4 py-3 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-navy">
                  {q.name}
                  {q.city ? ` \u00b7 ${q.city}` : ""}
                </p>
                <p className="truncate text-xs text-navy/50">{q.message}</p>
              </div>
              <span className="shrink-0 rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
                {q.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
