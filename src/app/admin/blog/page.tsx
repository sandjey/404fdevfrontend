"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/admin/client";
import type { BlogPost, Paged } from "@/lib/api";

const LANGS = ["uz", "ru", "en"] as const;

function pickPrimary(p: BlogPost) {
  for (const l of LANGS) {
    const t = p.translations?.[l];
    if (t?.title) return { title: t.title, slug: t.slug, lang: l };
  }
  return { title: "(no title)", slug: "", lang: "uz" as const };
}

function languageBadges(p: BlogPost) {
  return LANGS.map((l) => {
    const filled = !!p.translations?.[l]?.title;
    return (
      <span
        key={l}
        className={
          "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider " +
          (filled ? "bg-emerald-100 text-emerald-800" : "bg-ink-100 text-ink-400")
        }
      >
        {l}
      </span>
    );
  });
}

export default function AdminBlogList() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      params.set("page_size", "100");
      const res = await adminApi.rawJson<Paged<BlogPost>>(`/admin/blog?${params.toString()}`);
      setItems(res.data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function onDelete(id: string) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await adminApi.delete(`/admin/blog/${id}`);
    load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-ink-900">Blog</h1>
        <Link href="/admin/blog/new" className="btn btn-primary text-sm py-2">+ Yangi</Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="admin-input max-w-[180px]">
          <option value="">Barcha statuslar</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50">
            <tr className="text-left text-xs uppercase text-ink-500">
              <th className="px-4 py-3">Sarlavha</th>
              <th className="px-4 py-3">Tarjimalar</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-ink-500">Yuklanmoqda...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-ink-500">Hozircha yozuvlar yo'q.</td></tr>
            ) : items.map((p) => {
              const primary = pickPrimary(p);
              return (
                <tr key={p.id} className="border-t border-ink-100">
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${p.id}`} className="font-medium text-ink-900 hover:text-brand-700">
                      {primary.title}
                    </Link>
                    <div className="text-xs text-ink-500 font-mono">{primary.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">{languageBadges(p)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${p.status === "published" ? "bg-green-100 text-green-800" : "bg-ink-100 text-ink-700"}`}>
                      {p.status}
                    </span>
                  </td>
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
