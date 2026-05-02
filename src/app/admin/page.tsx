"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/admin/client";

type Stats = {
  blog: number;
  lessons: number;
  contact: number;
  projects: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ blog: 0, lessons: 0, contact: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [blog, tree, contact, projects] = await Promise.all([
          adminApi.rawJson<{ meta: { total: number } }>("/admin/blog?page_size=1"),
          adminApi.get<{ sections: { lessons: unknown[] }[] }[]>("/admin/learn/tree"),
          adminApi.rawJson<{ meta: { total: number } }>("/admin/contact?page_size=1"),
          adminApi.rawJson<{ meta: { total: number } }>("/admin/projects?page_size=1"),
        ]);
        const lessons = tree.reduce((acc, t) => acc + t.sections.reduce((s, sec) => s + sec.lessons.length, 0), 0);
        setStats({
          blog: blog?.meta?.total ?? 0,
          lessons,
          contact: contact?.meta?.total ?? 0,
          projects: projects?.meta?.total ?? 0,
        });
      } catch {}
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink-900">Dashboard</h1>
        <p className="text-sm text-ink-500">404Dev platformasiga xush kelibsiz.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Blog yozuvlari" value={loading ? "…" : stats.blog} href="/admin/blog" />
        <Card label="Loyihalar" value={loading ? "…" : stats.projects} href="/admin/portfolio" />
        <Card label="Darslar" value={loading ? "…" : stats.lessons} href="/admin/learn" />
        <Card label="Murojaatlar" value={loading ? "…" : stats.contact} href="/admin/contact" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/admin/blog/new" className="card p-5 hover:bg-brand-50">
          <h3 className="font-semibold text-ink-900">+ Yangi blog</h3>
          <p className="mt-1 text-sm text-ink-500">3 til (uz, ru, en) uchun alohida yozing.</p>
        </Link>
        <Link href="/admin/portfolio/new" className="card p-5 hover:bg-brand-50">
          <h3 className="font-semibold text-ink-900">+ Yangi loyiha</h3>
          <p className="mt-1 text-sm text-ink-500">5 ta rasm, 5 ta link, 3 tilda kontent.</p>
        </Link>
        <Link href="/admin/learn" className="card p-5 hover:bg-brand-50">
          <h3 className="font-semibold text-ink-900">+ Yangi dars</h3>
          <p className="mt-1 text-sm text-ink-500">Texnologiya/bo'lim/mavzu boshqaruvi.</p>
        </Link>
      </div>
    </div>
  );
}

function Card({ label, value, href }: { label: string; value: string | number; href: string }) {
  return (
    <Link href={href} className="card p-5">
      <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">{label}</span>
      <p className="mt-2 text-3xl font-bold text-ink-900">{value}</p>
    </Link>
  );
}
