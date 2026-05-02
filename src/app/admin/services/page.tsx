"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/admin/client";
import type { Service } from "@/lib/api";

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [lang, setLang] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (lang) params.set("lang", lang);
      setItems(await adminApi.get<Service[]>(`/admin/services?${params.toString()}`));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [lang]); // eslint-disable-line

  async function onDelete(id: string) {
    if (!confirm("O'chirilsinmi?")) return;
    await adminApi.delete(`/admin/services/${id}`);
    load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink-900">Xizmatlar</h1>
        <Link href="/admin/services/new" className="btn btn-primary text-sm py-2">+ Yangi</Link>
      </div>

      <select value={lang} onChange={(e) => setLang(e.target.value)} className="admin-input max-w-[150px]">
        <option value="">Barcha tillar</option>
        <option value="uz">UZ</option>
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50">
            <tr className="text-left text-xs uppercase text-ink-500">
              <th className="px-4 py-3">Sarlavha</th>
              <th className="px-4 py-3">Til</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={4} className="px-4 py-6 text-center text-ink-500">Yuklanmoqda...</td></tr> :
              items.length === 0 ? <tr><td colSpan={4} className="px-4 py-6 text-center text-ink-500">Bo'sh</td></tr> :
              items.map((s) => (
                <tr key={s.id} className="border-t border-ink-100">
                  <td className="px-4 py-3">
                    <Link href={`/admin/services/${s.id}`} className="font-medium text-ink-900 hover:text-brand-700">{s.title}</Link>
                    <div className="text-xs text-ink-500 font-mono">{s.slug}</div>
                  </td>
                  <td className="px-4 py-3 uppercase text-xs">{s.language}</td>
                  <td className="px-4 py-3">{s.status}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => onDelete(s.id)} className="text-xs text-red-600 hover:underline">O'chirish</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
