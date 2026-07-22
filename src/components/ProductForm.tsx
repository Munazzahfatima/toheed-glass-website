"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "DECORATIVE_GLASS", label: "Decorative Glass" },
  { value: "ARCHITECTURAL_GLASS", label: "Architectural Glass" },
];

const SHAPES = ["RECTANGLE", "SQUARE", "ROUND", "OVAL"];

export default function ProductForm({ initial, productId }: { initial?: any; productId?: string }) {
  const router = useRouter();
  const [colors, setColors] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: initial?.name || "",
    category: initial?.category || "DECORATIVE_GLASS",
    description: initial?.description || "",
    pricingType: initial?.pricingType || "PER_SQFT",
    pricePerSqft: initial?.pricePerSqft || "",
    fixedPrice: initial?.fixedPrice || "",
    fixedSize: initial?.fixedSize || "",
    shapes: initial?.shapes || SHAPES,
    isFeatured: initial?.isFeatured || false,
    hasCheckout: initial?.hasCheckout || false,
    isActive: initial?.isActive ?? true,
    images: initial?.images?.map((i: any) => i.url) || [""],
    colorIds: initial?.colors?.map((c: any) => c.color?.id || c.colorId) || [],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/colors").then((r) => r.json()).then(setColors);
  }, []);

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
      hasCheckout: form.hasCheckout,
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
        <label className="text-sm font-medium text-navy">Category</label>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold">
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
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

      {form.pricingType === "PER_SQFT" && (
        <div>
          <label className="text-sm font-medium text-navy">Available Shapes</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {SHAPES.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() =>
                  setForm({
                    ...form,
                    shapes: form.shapes.includes(s) ? form.shapes.filter((x: string) => x !== s) : [...form.shapes, s],
                  })
                }
                className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize ${form.shapes.includes(s) ? "border-gold bg-gold/10" : "border-navy/10"}`}
              >
                {s.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-navy">LED Colors Available</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() =>
                setForm({
                  ...form,
                  colorIds: form.colorIds.includes(c.id) ? form.colorIds.filter((x: string) => x !== c.id) : [...form.colorIds, c.id],
                })
              }
              className={`rounded-full border px-4 py-1.5 text-xs font-medium ${form.colorIds.includes(c.id) ? "border-gold bg-gold/10" : "border-navy/10"}`}
            >
              {c.name}
            </button>
          ))}
          {colors.length === 0 && <p className="text-xs text-navy/40">Add LED colors first from the LED Colors page.</p>}
        </div>
      </div>

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
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.hasCheckout} onChange={(e) => setForm({ ...form, hasCheckout: e.target.checked })} className="accent-gold" /> Has Checkout (Order Wizard)</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /> Active</label>
      </div>

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
        {saving ? "Saving..." : productId ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}
