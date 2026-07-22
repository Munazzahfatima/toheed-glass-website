"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", imageUrl: "", category: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/gallery");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", imageUrl: "", category: "" });
    setSaving(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this gallery item?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Gallery</h1>

      <form onSubmit={handleAdd} className="mt-6 card-luxe grid gap-4 p-6 sm:grid-cols-3">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold" />
        <input required placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold" />
        <button disabled={saving} className="btn-primary justify-center"><Plus className="h-4 w-4" /> Add Image</button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div key={g.id} className="group relative overflow-hidden rounded-xl border border-navy/10">
            <div className="relative aspect-square bg-navy/5">
              <Image src={g.imageUrl} alt={g.title} fill className="object-cover" />
            </div>
            <button onClick={() => remove(g.id)} className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 opacity-0 transition group-hover:opacity-100">
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
            <p className="p-2 text-xs font-medium text-navy">{g.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
