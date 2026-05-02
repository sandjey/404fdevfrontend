"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin/client";
import Editor from "@/components/admin/Editor";
import type { Service } from "@/lib/api";

type Props = {
  initial?: Service;
  mode: "create" | "edit";
};

export default function ServiceForm({ initial, mode }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [language, setLanguage] = useState(initial?.language || "uz");
  const [status, setStatus] = useState(initial?.status || "published");
  const [order, setOrder] = useState<number>(initial?.order ?? 0);
  const [icon, setIcon] = useState(initial?.icon || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [coverImage, setCoverImage] = useState(initial?.cover_image || "");
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title || "");
  const [seoDesc, setSeoDesc] = useState(initial?.seo_description || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadCover(f: File) {
    try {
      const res = await adminApi.upload<{ secure_url: string; url: string }>("/admin/upload", f);
      setCoverImage(res.secure_url || res.url);
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        title, slug, excerpt, content, icon, cover_image: coverImage,
        language, order, status, seo_title: seoTitle, seo_description: seoDesc,
      };
      if (mode === "create") {
        const res = await adminApi.post<Service>("/admin/services", payload);
        router.push(`/admin/services/${res.id}`);
      } else if (initial) {
        await adminApi.put(`/admin/services/${initial.id}`, payload);
        router.push("/admin/services");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="card p-6 space-y-4">
        <div>
          <label className="admin-label">Sarlavha *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="admin-input text-lg" />
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="admin-label">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="admin-input" placeholder="auto" />
          </div>
          <div>
            <label className="admin-label">Til *</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value as "uz" | "ru" | "en")} className="admin-input">
              <option value="uz">UZ</option>
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} className="admin-input">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Tartib</label>
            <input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value || "0"))} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Icon (emoji yoki URL)</label>
            <input value={icon} onChange={(e) => setIcon(e.target.value)} className="admin-input" />
          </div>
        </div>
        <div>
          <label className="admin-label">Qisqa tavsif</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="admin-input" />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-ink-900 mb-3">Cover rasm</h3>
        {coverImage ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt="cover" className="max-h-48 rounded-lg" />
            <button type="button" onClick={() => setCoverImage("")} className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-red-600 text-white text-xs">×</button>
          </div>
        ) : (
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} className="text-sm" />
        )}
      </div>

      <div>
        <label className="admin-label">Kontent</label>
        <Editor value={content} onChange={setContent} />
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-ink-900 mb-3">SEO</h3>
        <div className="space-y-3">
          <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="admin-input" placeholder="SEO Title" maxLength={70} />
          <textarea value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} rows={3} className="admin-input" placeholder="SEO Description" maxLength={170} />
        </div>
      </div>

      {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">{error}</div>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={submitting} className="btn btn-primary disabled:opacity-60">
          {submitting ? "..." : mode === "create" ? "Yaratish" : "Saqlash"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn btn-ghost">Bekor</button>
      </div>
    </form>
  );
}
