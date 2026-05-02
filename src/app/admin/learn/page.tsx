"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/admin/client";
import type { Lesson, Section, Technology } from "@/lib/api";

type Tree = (Technology & { sections: (Section & { lessons: Lesson[] })[] })[];

export default function AdminLearnPage() {
  const [tree, setTree] = useState<Tree>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const t = await adminApi.get<Tree>("/admin/learn/tree");
      setTree(t || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function createTech() {
    const name = prompt("Texnologiya nomi:");
    if (!name) return;
    await adminApi.post("/admin/technologies", { name, status: "published" });
    load();
  }
  async function deleteTech(id: string) {
    if (!confirm("Texnologiya va uning ichidagi hamma narsa o'chiriladi. Tasdiqlaysizmi?")) return;
    await adminApi.delete(`/admin/technologies/${id}`);
    load();
  }
  async function createSection(techId: string) {
    const title = prompt("Bo'lim nomi:");
    if (!title) return;
    await adminApi.post("/admin/sections", { technology_id: techId, title, status: "published" });
    load();
  }
  async function deleteSection(id: string) {
    if (!confirm("Bo'lim va mavzular o'chiriladi. Tasdiqlaysizmi?")) return;
    await adminApi.delete(`/admin/sections/${id}`);
    load();
  }
  async function deleteLesson(id: string) {
    if (!confirm("Mavzu o'chirilsinmi?")) return;
    await adminApi.delete(`/admin/lessons/${id}`);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink-900">Darslar</h1>
        <button onClick={createTech} className="btn btn-primary text-sm py-2">+ Texnologiya</button>
      </div>

      {loading && <p className="text-ink-500">Yuklanmoqda...</p>}

      <div className="space-y-6">
        {tree.map((tech) => (
          <div key={tech.id} className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-ink-900">
                {tech.name}
                <span className="ml-2 text-xs font-normal text-ink-500 font-mono">{tech.slug}</span>
              </h2>
              <div className="flex items-center gap-2">
                <button onClick={() => createSection(tech.id)} className="text-xs text-brand-600 hover:underline">+ bo'lim</button>
                <button onClick={() => deleteTech(tech.id)} className="text-xs text-red-600 hover:underline">o'chirish</button>
              </div>
            </div>

            <div className="mt-4 space-y-3 pl-2">
              {tech.sections.map((s) => (
                <div key={s.id} className="rounded-lg bg-ink-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-ink-800">
                      {s.title}
                      <span className="ml-2 text-xs font-normal text-ink-500 font-mono">{s.slug}</span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/learn/lessons/new?section=${s.id}`} className="text-xs text-brand-600 hover:underline">+ mavzu</Link>
                      <button onClick={() => deleteSection(s.id)} className="text-xs text-red-600 hover:underline">o'chirish</button>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1 pl-2">
                    {s.lessons.map((l, i) => (
                      <li key={l.id} className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-white">
                        <Link href={`/admin/learn/lessons/${l.id}`} className="flex-1 text-sm text-ink-800 hover:text-brand-700">
                          <span className="text-ink-400 font-mono text-xs mr-2">{String(i + 1).padStart(2, "0")}</span>
                          {l.title}
                          <span className={`ml-2 inline-block rounded-full px-2 py-0.5 text-[10px] ${l.status === "published" ? "bg-green-100 text-green-800" : "bg-ink-200 text-ink-700"}`}>
                            {l.status}
                          </span>
                        </Link>
                        <button onClick={() => deleteLesson(l.id)} className="text-xs text-red-600 hover:underline">×</button>
                      </li>
                    ))}
                    {s.lessons.length === 0 && (
                      <li className="text-xs text-ink-500 italic">mavzular yo'q</li>
                    )}
                  </ul>
                </div>
              ))}
              {tech.sections.length === 0 && <p className="text-sm text-ink-500 italic">bo'limlar yo'q</p>}
            </div>
          </div>
        ))}
        {!loading && tree.length === 0 && (
          <div className="card p-10 text-center text-ink-500">
            Texnologiya qo'shing va o'qitish strukturasini boshlang.
          </div>
        )}
      </div>
    </div>
  );
}
