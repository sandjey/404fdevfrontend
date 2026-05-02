"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/admin/client";
import type { Project, Paged } from "@/lib/api";

export default function AdminProjectsList() {
  const [items, setItems] = useState<Project[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      params.set("page_size", "100");
      const res = await adminApi.rawJson<Paged<Project>>(`/admin/projects?${params.toString()}`);
      setItems(res.data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [status]);

  async function onDelete(id: string) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await adminApi.delete(`/admin/projects/${id}`);
    load();
  }

  function pickTitle(p: Project) {
    return p.translations?.uz?.title || p.translations?.ru?.title || p.translations?.en?.title || "(no title)";
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-ink-900">Portfolio</h1>
        <Link href="/admin/portfolio/new" className="btn btn-primary text-sm py-2">+ Yangi loyiha</Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="admin-input max-w-[170px]">
          <option value="">Barcha statuslar</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50">
            <tr className="text-left text-xs uppercase text-ink-500">
              <th className="px-4 py-3">Loyiha</th>
              <th className="px-4 py-3">Tarjimalar</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-ink-500">Yuklanmoqda...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-ink-500">Hozircha loyihalar yo'q.</td></tr>
            ) : items.map((p) => {
              const t = p.translations || {};
              const langs: string[] = ["uz", "ru", "en"].filter((l) => (t as any)[l]?.title);
              return (
                <tr key={p.id} className="border-t border-ink-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.cover_image} alt="" className="h-10 w-14 rounded object-cover bg-ink-100" />
                      ) : (
                        <div className="h-10 w-14 rounded bg-ink-100" />
                      )}
                      <Link href={`/admin/portfolio/${p.id}`} className="font-medium text-ink-900 hover:text-brand-700">
                        {pickTitle(p)}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {(["uz", "ru", "en"] as const).map((l) => (
                        <span
                          key={l}
                          className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                            langs.includes(l) ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-400"
                          }`}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${p.status === "published" ? "bg-green-100 text-green-800" : "bg-ink-100 text-ink-700"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-600 font-mono">{p.order}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => onDelete(p.id)} className="text-xs text-red-600 hover:underline">O'chirish</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
