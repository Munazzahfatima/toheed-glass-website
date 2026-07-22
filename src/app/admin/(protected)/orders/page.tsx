"use client";

import { useEffect, useState } from "react";
import { formatPKR } from "@/lib/pricing";

const STATUSES = ["PENDING", "CONFIRMED", "IN_PRODUCTION", "READY_FOR_DELIVERY", "DELIVERED"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (search) params.set("search", search);
    const res = await fetch(`/api/orders?${params.toString()}`);
    setOrders(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateStatus(id: string, newStatus: string) {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    load();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Orders</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          placeholder="Search by name, phone, order #"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          className="w-64 rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold"
        />
        <button onClick={load} className="btn-secondary">Search</button>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-navy/10 px-4 py-2.5 text-sm">
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replaceAll("_", " ")}</option>)}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy/[0.03] text-navy/60">
            <tr>
              <th className="p-4">Order #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td className="p-4" colSpan={6}>Loading...</td></tr>}
            {!loading && orders.length === 0 && <tr><td className="p-4" colSpan={6}>No orders found.</td></tr>}
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-navy/5 align-top">
                <td className="p-4 font-medium text-navy">{o.orderNumber}</td>
                <td className="p-4">
                  <p className="font-medium text-navy">{o.customerName}</p>
                  <p className="text-xs text-navy/50">{o.customerPhone} · {o.customerCity}</p>
                </td>
                <td className="p-4">
                  <p className="text-navy">{o.product?.name}</p>
                  {o.color && <p className="text-xs text-navy/50">{o.color.name}</p>}
                  {o.widthInches && <p className="text-xs text-navy/50">{Number(o.widthInches)} x {Number(o.heightInches)} in</p>}
                </td>
                <td className="p-4 font-medium text-navy">PKR {formatPKR(Number(o.totalPrice))}</td>
                <td className="p-4">
                  <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="rounded-lg border border-navy/10 px-2 py-1 text-xs">
                    {STATUSES.map((s) => <option key={s} value={s}>{s.replaceAll("_", " ")}</option>)}
                  </select>
                </td>
                <td className="p-4 text-xs text-navy/50">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
