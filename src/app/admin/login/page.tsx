"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { useAuth } from "@/lib/admin/auth-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const setAuth = useAuth((s) => s.setAuth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") || ""),
          password: String(data.get("password") || ""),
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Login failed");
      }
      const body = await res.json();
      const token = body?.data?.token;
      const email = body?.data?.user?.email;
      if (!token) throw new Error("No token received");
      setAuth(token, email);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-ink-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm card p-7 space-y-4">
        <div className="text-center">
          <div className="inline-grid h-12 w-12 place-items-center rounded-xl bg-ink-900 text-white font-mono mb-3">
            404
          </div>
          <h1 className="text-xl font-bold text-ink-900">Admin panel</h1>
          <p className="text-sm text-ink-500">404Dev boshqaruv tizimi</p>
        </div>
        <div>
          <label className="admin-label">Email</label>
          <input name="email" type="email" required autoFocus autoComplete="email" className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Parol</label>
          <input name="password" type="password" required minLength={6} autoComplete="current-password" className="admin-input" />
        </div>
        {error && <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-800">{error}</div>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
          {loading ? "..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}
