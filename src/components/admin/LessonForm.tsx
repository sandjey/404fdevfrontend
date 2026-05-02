"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin/client";
import Editor from "@/components/admin/Editor";
import type { Lesson } from "@/lib/api";

type Props = {
  initial?: Lesson & { section_id: string };
  sectionId?: string;
  mode: "create" | "edit";
};

export default function LessonForm({ initial, sectionId, mode }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [order, setOrder] = useState<number>(initial?.order ?? 0);
  const [status, setStatus] = useState(initial?.status || "draft");
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title || "");
  const [seoDesc, setSeoDesc] = useState(initial?.seo_description || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        section_id: initial?.section_id || sectionId,
        title,
        slug,
        excerpt,
        content,
        order,
        status,
        seo_title: seoTitle,
        seo_description: seoDesc,
      };
      if (mode === "create") {
        const res = await adminApi.post<Lesson>("/admin/lessons", payload);
        router.push(`/admin/learn/lessons/${res.id}`);
      } else if (initial) {
        await adminApi.put(`/admin/lessons/${initial.id}`, payload);
        router.push("/admin/learn");
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
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="admin-label">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="admin-input" placeholder="auto" />
          </div>
          <div>
            <label className="admin-label">Tartib</label>
            <input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value || "0"))} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} className="admin-input">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div>
          <label className="admin-label">Qisqa tavsif</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="admin-input" />
        </div>
      </div>

      <div>
        <label className="admin-label">Kontent</label>
        <Editor value={content} onChange={setContent} placeholder="Mavzuni yozing... Code blocklar — { } Kod tugmasidan." />
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-ink-900 mb-3">SEO</h3>
        <div className="space-y-3">
          <div>
            <label className="admin-label">SEO Title</label>
            <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="admin-input" maxLength={70} />
          </div>
          <div>
            <label className="admin-label">SEO Description</label>
            <textarea value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} rows={3} maxLength={170} className="admin-input" />
          </div>
        </div>
      </div>

      {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">{error}</div>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={submitting} className="btn btn-primary disabled:opacity-60">
          {submitting ? "..." : mode === "create" ? "Yaratish" : "Saqlash"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn btn-ghost">Bekor qilish</button>
      </div>
    </form>
  );
}
