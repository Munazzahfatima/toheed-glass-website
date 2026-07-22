"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function AdminColorsPage() {
  const [colors, setColors] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", hexPreview: "#ffffff", description: "", extraCharge: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/colors");
    setColors(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/colors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, extraCharge: Number(form.extraCharge) || 0 }),
    });
    setForm({ name: "", hexPreview: "#ffffff", description: "", extraCharge: "" });
    setSaving(false);
    load();
  }

  async function toggle(c: any) {
    await fetch(`/api/colors/${c.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...c, isActive: !c.isActive }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this color?")) return;
    await fetch(`/api/colors/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">LED Colors</h1>

      <form onSubmit={handleAdd} className="mt-6 card-luxe grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-5">
        <input required placeholder="Color Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold" />
        <input type="color" value={form.hexPreview} onChange={(e) => setForm({ ...form, hexPreview: e.target.value })} className="h-11 w-full rounded-xl border border-navy/10" />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold" />
        <input type="number" placeholder="Extra Charge (PKR)" value={form.extraCharge} onChange={(e) => setForm({ ...form, extraCharge: e.target.value })} className="rounded-xl border border-navy/10 px-4 py-2.5 text-sm focus:border-gold" />
        <button disabled={saving} className="btn-primary justify-center"><Plus className="h-4 w-4" /> Add Color</button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((c) => (
          <div key={c.id} className="card-luxe flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border border-navy/10" style={{ backgroundColor: c.hexPreview || "#eee" }} />
              <div>
                <p className="text-sm font-semibold text-navy">{c.name}</p>
                <p className="text-xs text-navy/50">{c.extraCharge > 0 ? `+PKR ${c.extraCharge}` : "No extra charge"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggle(c)} className={`rounded-full px-3 py-1 text-xs font-medium ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {c.isActive ? "Active" : "Off"}
              </button>
              <button onClick={() => remove(c.id)} className="rounded-lg border border-navy/10 p-1.5 hover:border-red-400"><Trash2 className="h-3.5 w-3.5 text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
