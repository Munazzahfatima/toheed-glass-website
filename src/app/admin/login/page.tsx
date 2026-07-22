"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-glass-gradient px-5">
      <div className="glass-panel w-full max-w-md rounded-3xl p-10">
        <div className="flex flex-col items-center">
          <Image src="/images/logo.png" alt="Logo" width={64} height={64} className="h-16 w-16 object-contain" />
          <h1 className="mt-4 font-serif text-2xl font-bold text-navy">Admin Login</h1>
          <p className="mt-1 text-sm text-navy/50">New Toheed Glass &amp; Accessories</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
