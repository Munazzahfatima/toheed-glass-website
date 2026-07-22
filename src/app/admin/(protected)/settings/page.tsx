"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [pwStatus, setPwStatus] = useState("");

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setSettings);
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwStatus("Saving...");
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordForm),
    });
    setPwStatus(res.ok ? "Password updated." : "Failed to update password.");
  }

  if (!settings) return <p className="text-sm text-navy/50">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-bold text-navy">Settings</h1>

      <form onSubmit={handleSave} className="card-luxe mt-6 space-y-4 p-6">
        <h2 className="font-serif text-lg font-semibold text-navy">Installation &amp; Delivery</h2>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={settings.installationEnabled} onChange={(e) => setSettings({ ...settings, installationEnabled: e.target.checked })} className="accent-gold" />
          Enable Installation Service
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-navy/60">Installation Charge (PKR)</label>
            <input type="number" value={settings.installationCharge} onChange={(e) => setSettings({ ...settings, installationCharge: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="text-sm text-navy/60">Default Delivery Charge (PKR)</label>
            <input type="number" value={settings.defaultDeliveryCharge} onChange={(e) => setSettings({ ...settings, defaultDeliveryCharge: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="text-sm text-navy/60">Free Delivery Threshold (PKR)</label>
            <input type="number" value={settings.freeDeliveryThreshold} onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="text-sm text-navy/60">WhatsApp Number</label>
            <input value={settings.whatsappNumber} onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="text-sm text-navy/60">Est. Production Days</label>
            <input type="number" value={settings.estimatedProductionDays} onChange={(e) => setSettings({ ...settings, estimatedProductionDays: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="text-sm text-navy/60">Est. Delivery Days</label>
            <input type="number" value={settings.estimatedDeliveryDays} onChange={(e) => setSettings({ ...settings, estimatedDeliveryDays: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <button disabled={saving} className="btn-primary">{saving ? "Saving..." : "Save Settings"}</button>
      </form>

      <form onSubmit={handlePasswordChange} className="card-luxe mt-6 space-y-4 p-6">
        <h2 className="font-serif text-lg font-semibold text-navy">Change Password</h2>
        <input type="password" required placeholder="Current Password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm" />
        <input type="password" required placeholder="New Password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="w-full rounded-xl border border-navy/10 px-4 py-2.5 text-sm" />
        <button className="btn-primary">Update Password</button>
        {pwStatus && <p className="text-sm text-navy/60">{pwStatus}</p>}
      </form>
    </div>
  );
}
