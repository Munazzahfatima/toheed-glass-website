import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/pricing";
import { Package, ShoppingCart, MessageSquareText, Palette } from "lucide-react";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, inquiryCount, colorCount, pendingOrders, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.ledColor.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({ _sum: { totalPrice: true } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { product: true },
  });

  const stats = [
    { label: "Total Products", value: productCount, icon: Package },
    { label: "Total Orders", value: orderCount, icon: ShoppingCart },
    { label: "New Inquiries", value: inquiryCount, icon: MessageSquareText },
    { label: "LED Colors", value: colorCount, icon: Palette },
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

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-luxe p-6 lg:col-span-2">
          <h2 className="font-serif text-lg font-semibold text-navy">Recent Orders</h2>
          <div className="mt-4 divide-y divide-navy/5">
            {recentOrders.length === 0 && <p className="py-4 text-sm text-navy/50">No orders yet.</p>}
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-navy">{o.orderNumber} — {o.product.name}</p>
                  <p className="text-xs text-navy/50">{o.customerName} · {o.customerCity}</p>
                </div>
                <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">{o.status.replaceAll("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-luxe p-6">
          <h2 className="font-serif text-lg font-semibold text-navy">Quick Stats</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-navy/50">Pending Orders</span><span className="font-semibold text-navy">{pendingOrders}</span></div>
            <div className="flex justify-between"><span className="text-navy/50">Total Order Value</span><span className="font-semibold text-navy">PKR {formatPKR(Number(revenue._sum.totalPrice || 0))}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
