"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPKR } from "@/lib/pricing";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/products?activeOnly=false");
    setProducts(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  }

  async function toggleActive(p: any) {
    await fetch(`/api/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, isActive: !p.isActive }),
    });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-navy">Products</h1>
        <Link href="/admin/products/new" className="btn-primary"><Plus className="h-4 w-4" /> Add Product</Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy/[0.03] text-navy/60">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Pricing</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td className="p-4" colSpan={6}>Loading...</td></tr>}
            {!loading && products.length === 0 && <tr><td className="p-4" colSpan={6}>No products yet.</td></tr>}
            {products.map((p) => (
              <tr key={p.id} className="border-t border-navy/5">
                <td className="p-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-navy/5">
                    {p.images[0] && <Image src={p.images[0].url} alt={p.name} fill className="object-cover" />}
                  </div>
                </td>
                <td className="p-4 font-medium text-navy">
                  {p.name} {p.isFeatured && <Star className="inline h-3.5 w-3.5 fill-gold text-gold" />}
                </td>
                <td className="p-4 text-navy/60">{p.category.replaceAll("_", " ")}</td>
                <td className="p-4 text-navy/60">
                  {p.pricingType === "PER_SQFT" ? `PKR ${formatPKR(Number(p.pricePerSqft))}/sqft` : `PKR ${formatPKR(Number(p.fixedPrice))}`}
                </td>
                <td className="p-4">
                  <button onClick={() => toggleActive(p)} className={`rounded-full px-3 py-1 text-xs font-medium ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${p.id}/edit`} className="rounded-lg border border-navy/10 p-2 hover:border-gold"><Pencil className="h-4 w-4" /></Link>
                    <button onClick={() => handleDelete(p.id)} className="rounded-lg border border-navy/10 p-2 hover:border-red-400"><Trash2 className="h-4 w-4 text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
