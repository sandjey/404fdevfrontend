"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin/client";
import Editor from "@/components/admin/Editor";
import type { BlogPost, BlogTranslation } from "@/lib/api";

const MAX_IMAGES = 5;
const MAX_LINKS = 10;
const LANGS = ["uz", "ru", "en"] as const;
type Lang = (typeof LANGS)[number];

const LANG_LABEL: Record<Lang, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

const LANG_FLAG: Record<Lang, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

type Props = {
  initial?: BlogPost;
  mode: "create" | "edit";
};

const emptyT: BlogTranslation = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  seo_title: "",
  seo_description: "",
};

export default function BlogForm({ initial, mode }: Props) {
  const router = useRouter();

  const [translations, setTranslations] = useState<Record<Lang, BlogTranslation>>({
    uz: { ...emptyT, ...(initial?.translations?.uz || {}) },
    ru: { ...emptyT, ...(initial?.translations?.ru || {}) },
    en: { ...emptyT, ...(initial?.translations?.en || {}) },
  });

  const [coverImage, setCoverImage] = useState(initial?.cover_image || "");
  const [images, setImages] = useState(initial?.images || []);
  const [links, setLinks] = useState(initial?.links || []);
  const [category, setCategory] = useState(initial?.category || "");
  const [tagsStr, setTagsStr] = useState((initial?.tags || []).join(", "));
  const [status, setStatus] = useState<"draft" | "published">(initial?.status || "draft");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function patchT(lang: Lang, patch: Partial<BlogTranslation>) {
    setTranslations((s) => ({ ...s, [lang]: { ...s[lang], ...patch } }));
  }

  async function uploadCover(f: File) {
    try {
      const res = await adminApi.upload<{ secure_url: string; url: string }>("/admin/upload", f);
      setCoverImage(res.secure_url || res.url);
    } catch (err) {
      alert(`Xato: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async function uploadGalleryImage(f: File) {
    if (images.length >= MAX_IMAGES) {
      alert(`Maksimum ${MAX_IMAGES} ta rasm.`);
      return;
    }
    try {
      const res = await adminApi.upload<{ secure_url: string; url: string }>("/admin/upload", f);
      setImages([...images, { url: res.secure_url || res.url, alt: f.name }]);
    } catch (err) {
      alert(`Xato: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  function addLink() {
    if (links.length >= MAX_LINKS) {
      alert(`Maksimum ${MAX_LINKS} ta link.`);
      return;
    }
    setLinks([...links, { url: "", title: "" }]);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const tOut: Record<string, BlogTranslation> = {};
      (Object.keys(translations) as Lang[]).forEach((l) => {
        if (translations[l].title.trim()) tOut[l] = translations[l];
      });

      if (Object.keys(tOut).length === 0) {
        setError("Hech bo'lmaganda bitta tilda sarlavha kiriting.");
        setSubmitting(false);
        return;
      }

      const payload = {
        cover_image: coverImage,
        images,
        links: links.filter((l) => l.url),
        category,
        tags: tagsStr.split(",").map((t) => t.trim()).filter(Boolean),
        status,
        translations: tOut,
      };

      if (mode === "create") {
        const res = await adminApi.post<BlogPost>("/admin/blog", payload);
        router.push(`/admin/blog/${res.id}`);
      } else if (initial) {
        await adminApi.put(`/admin/blog/${initial.id}`, payload);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Meta — common across languages */}
      <div className="card p-6 space-y-4">
        <h3 className="font-bold text-ink-900">Umumiy ma'lumot</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="admin-label">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} className="admin-input">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Kategoriya</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="admin-input" placeholder="Engineering, Case, Design..." />
          </div>
          <div>
            <label className="admin-label">Teglar (vergul bilan)</label>
            <input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} className="admin-input" placeholder="js, react, tutorial" />
          </div>
        </div>
      </div>

      {/* Cover */}
      <div className="card p-6">
        <h3 className="font-bold text-ink-900 mb-3">Cover rasm</h3>
        {coverImage ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt="cover" className="max-h-48 rounded-lg" />
            <button type="button" onClick={() => setCoverImage("")} className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-red-600 text-white text-xs">×</button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
            className="text-sm"
          />
        )}
      </div>

      {/* Gallery */}
      <div className="card p-6">
        <h3 className="font-bold text-ink-900 mb-3">Galereya (max {MAX_IMAGES})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-ink-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt || ""} className="w-full h-full object-cover" />
              <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-red-600 text-white text-xs">×</button>
            </div>
          ))}
          {images.length < MAX_IMAGES && (
            <label className="aspect-square rounded-lg border-2 border-dashed border-ink-300 grid place-items-center cursor-pointer hover:border-brand-500">
              <span className="text-2xl text-ink-400">+</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && uploadGalleryImage(e.target.files[0])}
              />
            </label>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-ink-900">Havolalar (max {MAX_LINKS})</h3>
          <button type="button" onClick={addLink} className="btn btn-ghost text-xs py-1 px-3">+ Qo'shish</button>
        </div>
        <div className="space-y-2">
          {links.map((l, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                value={l.title}
                onChange={(e) => setLinks(links.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))}
                placeholder="Sarlavha"
                className="admin-input"
              />
              <input
                value={l.url}
                onChange={(e) => setLinks(links.map((x, idx) => idx === i ? { ...x, url: e.target.value } : x))}
                placeholder="https://..."
                className="admin-input"
              />
              <button type="button" onClick={() => setLinks(links.filter((_, idx) => idx !== i))} className="px-3 text-red-600 hover:bg-red-50 rounded-lg">×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Translations — 3 columns side-by-side */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-ink-900">Tarjimalar</h3>
          <span className="text-xs text-ink-500">3 til, hammasi bitta sahifada</span>
        </div>

        <TriField
          label="Sarlavha *"
          values={LANGS.map((l) => translations[l].title)}
          onChange={(i, v) => patchT(LANGS[i], { title: v })}
          big
        />

        <TriField
          label="Slug"
          values={LANGS.map((l) => translations[l].slug)}
          onChange={(i, v) => patchT(LANGS[i], { slug: v })}
          placeholder="auto"
          mono
        />

        <TriField
          label="Qisqa tavsif (excerpt)"
          values={LANGS.map((l) => translations[l].excerpt)}
          onChange={(i, v) => patchT(LANGS[i], { excerpt: v })}
          textarea
          maxLength={500}
        />

        <TriField
          label="SEO Title"
          values={LANGS.map((l) => translations[l].seo_title || "")}
          onChange={(i, v) => patchT(LANGS[i], { seo_title: v })}
          maxLength={70}
          showCount
        />

        <TriField
          label="SEO Description"
          values={LANGS.map((l) => translations[l].seo_description || "")}
          onChange={(i, v) => patchT(LANGS[i], { seo_description: v })}
          textarea
          maxLength={170}
          showCount
        />

        {/* Editor — har til alohida */}
        <div className="mt-5 space-y-5">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-600 font-mono">
            Kontent
          </div>
          {LANGS.map((l) => (
            <div key={l} className="rounded-xl ring-1 ring-ink-200 overflow-hidden">
              <div className="flex items-center gap-2 bg-ink-100 px-3 py-2 border-b border-ink-200">
                <LangBadge lang={l} />
                <span className="text-xs font-medium text-ink-700">{LANG_LABEL[l]}</span>
              </div>
              <Editor
                value={translations[l].content}
                onChange={(html) => patchT(l, { content: html })}
                placeholder={`${LANG_LABEL[l]} matni...`}
              />
            </div>
          ))}
        </div>
      </div>

      {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">{error}</div>}

      <div className="flex items-center gap-3 sticky bottom-0 bg-ink-50/90 backdrop-blur-md p-4 -mx-6 border-t border-ink-200">
        <button type="submit" disabled={submitting} className="btn btn-primary disabled:opacity-60">
          {submitting ? "..." : mode === "create" ? "Yaratish" : "Saqlash"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn btn-ghost">Bekor qilish</button>
      </div>
    </form>
  );
}

/* ============ Reusable: 3 inputs (uz / ru / en) per logical field ============ */
function TriField({
  label,
  values,
  onChange,
  placeholder,
  textarea,
  big,
  mono,
  maxLength,
  showCount,
}: {
  label: string;
  values: string[];
  onChange: (langIndex: number, value: string) => void;
  placeholder?: string;
  textarea?: boolean;
  big?: boolean;
  mono?: boolean;
  maxLength?: number;
  showCount?: boolean;
}) {
  return (
    <div className="mb-5">
      <label className="admin-label flex items-center gap-2">{label}</label>
      <div className="grid lg:grid-cols-3 gap-3">
        {LANGS.map((l, i) => {
          const v = values[i] || "";
          const cls =
            "admin-input " +
            (big ? "text-base font-medium " : "") +
            (mono ? "font-mono text-xs " : "");
          return (
            <div key={l} className="space-y-1">
              <div className="flex items-center justify-between">
                <LangBadge lang={l} />
                {showCount && maxLength && (
                  <span className={"text-[10px] " + (v.length > maxLength * 0.9 ? "text-amber-600" : "text-ink-400")}>
                    {v.length}/{maxLength}
                  </span>
                )}
              </div>
              {textarea ? (
                <textarea
                  rows={3}
                  value={v}
                  maxLength={maxLength}
                  onChange={(e) => onChange(i, e.target.value)}
                  className={cls + " resize-none"}
                  placeholder={placeholder ?? `${LANG_LABEL[l]}...`}
                />
              ) : (
                <input
                  value={v}
                  maxLength={maxLength}
                  onChange={(e) => onChange(i, e.target.value)}
                  className={cls}
                  placeholder={placeholder ?? `${LANG_LABEL[l]}...`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LangBadge({ lang }: { lang: Lang }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-ink-900 text-cream-50">
      <span className="inline-block h-1 w-1 rounded-full bg-brand-500" />
      {LANG_FLAG[lang]}
    </span>
  );
}
