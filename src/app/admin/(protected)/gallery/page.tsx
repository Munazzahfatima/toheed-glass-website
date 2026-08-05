"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, FolderKanban } from "lucide-react";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", imageUrl: "", category: "DECORATIVE" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.imageUrl) return;
    setSaving(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newItem = await res.json();
        setItems((prev) => [newItem, ...prev]);
        setForm({ title: "", imageUrl: "", category: "DECORATIVE" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this project from portfolio?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    } catch (e) {
      // ignore fallback error
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy flex items-center gap-2">
          <FolderKanban className="h-6 w-6 text-gold" /> Projects Portfolio
        </h1>
        <p className="mt-1 text-sm text-navy/60">
          View all completed projects and add new project references to show in your website portfolio.
        </p>
      </div>

      {/* Add Project Form */}
      <div className="card-luxe p-6">
        <h2 className="font-serif text-lg font-semibold text-navy mb-4">Add New Project</h2>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-3 items-end">
          <div>
            <label className="text-xs font-semibold text-navy/70 block mb-1">Project Title</label>
            <input
              required
              placeholder="e.g. Modern Glass Partition Installation"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-navy/70 block mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold outline-none bg-white"
            >
              <option value="DECORATIVE">Decorative Glass</option>
              <option value="RESIDENTIAL">Residential Glass</option>
              <option value="COMMERCIAL">Commercial Glass</option>
              <option value="SAFETY">Safety Glass</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-navy/70 block mb-1">Image URL or Path</label>
            <input
              required
              placeholder="e.g. /projects/stairs-railing-proj.jpg or https://..."
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold outline-none"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button disabled={saving} type="submit" className="btn-primary justify-center px-6">
              <Plus className="h-4 w-4" /> {saving ? "Adding..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="font-serif text-lg font-semibold text-navy mb-4">
          All Projects ({items.length})
        </h2>
        {loading ? (
          <p className="text-sm text-navy/50 py-4">Loading projects...</p>
        ) : items.length === 0 ? (
          <div className="card-luxe p-12 text-center text-navy/50">No projects added yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((g) => (
              <div key={g.id} className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-[4/3] bg-navy/5 overflow-hidden">
                  <Image src={g.imageUrl} alt={g.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                  <button
                    onClick={() => remove(g.id)}
                    title="Delete project"
                    className="absolute right-3 top-3 rounded-lg bg-white/90 p-2 text-red-600 shadow-sm opacity-0 transition group-hover:opacity-100 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {g.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-navy/80 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      {g.category}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-navy text-sm line-clamp-1">{g.title}</p>
                  <p className="text-xs text-navy/50 mt-1 truncate">{g.imageUrl}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

