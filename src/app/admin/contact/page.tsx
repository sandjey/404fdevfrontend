"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/admin/client";

type ContactRequest = {
  id: string;
  name: string;
  phone: string;
  telegram: string;
  email?: string; // legacy — only filled for old rows
  message: string;
  source: string;
  language: string;
  handled: boolean;
  created_at: string;
};

type Paged = { data: ContactRequest[]; meta: { total: number; page: number; page_size: number } };

export default function AdminContactPage() {
  const [items, setItems] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await adminApi.rawJson<Paged>(`/admin/contact?page_size=100`);
      setItems(res.data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function toggleHandled(id: string, current: boolean) {
    await adminApi.patch(`/admin/contact/${id}`, { handled: !current });
    load();
  }

  async function onDelete(id: string) {
    if (!confirm("O'chirilsinmi?")) return;
    await adminApi.delete(`/admin/contact/${id}`);
    load();
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-ink-900">Murojaatlar</h1>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50">
            <tr className="text-left text-xs uppercase text-ink-500">
              <th className="px-4 py-3">Ism</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Telegram</th>
              <th className="px-4 py-3">Xabar</th>
              <th className="px-4 py-3">Sana</th>
              <th className="px-4 py-3">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={7} className="px-4 py-6 text-center text-ink-500">Yuklanmoqda...</td></tr> :
              items.length === 0 ? <tr><td colSpan={7} className="px-4 py-6 text-center text-ink-500">Murojaatlar yo'q</td></tr> :
              items.map((c) => (
                <tr key={c.id} className="border-t border-ink-100 align-top">
                  <td className="px-4 py-3 font-medium text-ink-900">
                    {c.name}
                    {c.email && <div className="text-xs text-ink-500">{c.email}</div>}
                  </td>
                  <td className="px-4 py-3 font-mono">{c.phone || <span className="text-ink-300">—</span>}</td>
                  <td className="px-4 py-3 font-mono">{c.telegram || <span className="text-ink-300">—</span>}</td>
                  <td className="px-4 py-3 max-w-md whitespace-pre-wrap text-ink-700">{c.message}</td>
                  <td className="px-4 py-3 text-xs text-ink-500">{new Date(c.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleHandled(c.id, c.handled)}
                      className={`text-xs px-2 py-1 rounded-full ${c.handled ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {c.handled ? "Hal qilingan" : "Yangi"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => onDelete(c.id)} className="text-xs text-red-600 hover:underline">×</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
