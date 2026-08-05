"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "DECORATIVE", label: "Decorative" },
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "SAFETY", label: "Safety" },
];

export default function ProductForm({ initial, productId }: { initial?: any; productId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial?.name || "",
    categories: initial?.categories && initial.categories.length ? initial.categories : ["DECORATIVE"],
    description: initial?.description || "",
    pricingType: initial?.pricingType || "PER_SQFT",
    pricePerSqft: initial?.pricePerSqft || "",
    fixedPrice: initial?.fixedPrice || "",
    fixedSize: initial?.fixedSize || "",
    isFeatured: initial?.isFeatured || false,
    isActive: initial?.isActive ?? true,
    images: initial?.images?.map((i: any) => i.url) || [""],
  });
  const [saving, setSaving] = useState(false);

  function updateImage(i: number, val: string) {
    const imgs = [...form.images];
    imgs[i] = val;
    setForm({ ...form, images: imgs });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      pricePerSqft: form.pricePerSqft ? Number(form.pricePerSqft) : null,
      fixedPrice: form.fixedPrice ? Number(form.fixedPrice) : null,
      images: form.images.filter(Boolean),
    };

    const res = await fetch(productId ? `/api/products/${productId}` : "/api/products", {
      method: productId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
      <div>
        <label className="text-sm font-medium text-navy">Product Name</label>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
      </div>

      <div>
        <label className="text-sm font-medium text-navy">Categories (select one or more)</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c.value}
              onClick={() =>
                setForm({
                  ...form,
                  categories: form.categories.includes(c.value)
                    ? form.categories.filter((x: string) => x !== c.value)
                    : [...form.categories, c.value],
                })
              }
              className={`rounded-full border px-4 py-1.5 text-xs font-medium ${form.categories.includes(c.value) ? "border-gold bg-gold/10" : "border-navy/10"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-navy">Description</label>
        <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
      </div>

      <div>
        <label className="text-sm font-medium text-navy">Pricing Type</label>
        <div className="mt-2 flex gap-3">
          <button type="button" onClick={() => setForm({ ...form, pricingType: "PER_SQFT" })} className={`flex-1 rounded-xl border py-2 text-sm font-medium ${form.pricingType === "PER_SQFT" ? "border-gold bg-gold/10" : "border-navy/10"}`}>Price per Sq Ft</button>
          <button type="button" onClick={() => setForm({ ...form, pricingType: "FIXED" })} className={`flex-1 rounded-xl border py-2 text-sm font-medium ${form.pricingType === "FIXED" ? "border-gold bg-gold/10" : "border-navy/10"}`}>Fixed Price</button>
        </div>
      </div>

      {form.pricingType === "PER_SQFT" ? (
        <div>
          <label className="text-sm font-medium text-navy">Price per Sq Ft (PKR)</label>
          <input type="number" required value={form.pricePerSqft} onChange={(e) => setForm({ ...form, pricePerSqft: e.target.value })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-navy">Fixed Price (PKR)</label>
            <input type="number" required value={form.fixedPrice} onChange={(e) => setForm({ ...form, fixedPrice: e.target.value })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
          </div>
          <div>
            <label className="text-sm font-medium text-navy">Fixed Size (e.g. 24 x 24)</label>
            <input value={form.fixedSize} onChange={(e) => setForm({ ...form, fixedSize: e.target.value })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-navy">Image URLs</label>
        <div className="mt-2 space-y-2">
          {form.images.map((img: string, i: number) => (
            <input key={i} placeholder="https://..." value={img} onChange={(e) => updateImage(i, e.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
          ))}
          <button type="button" onClick={() => setForm({ ...form, images: [...form.images, ""] })} className="text-xs font-medium text-gold">+ Add another image URL</button>
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-gold" /> Featured</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /> Active</label>
      </div>

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
        {saving ? "Saving..." : productId ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}
