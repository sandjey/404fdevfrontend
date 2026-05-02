import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n/config";
import { api, SITE_URL } from "@/lib/api";

type LessonPath = { TechSlug: string; SectionSlug: string; LessonSlug: string; UpdatedAt: string };

/* Static page priorities — Google docs ni o'qimaydi, lekin Yandex va boshqa
   crawler'lar uchun foydali. */
const STATIC: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "",            priority: 1.0, changeFrequency: "weekly"  },
  { path: "/services",   priority: 0.9, changeFrequency: "weekly"  },
  { path: "/portfolio",  priority: 0.8, changeFrequency: "weekly"  },
  { path: "/about",      priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog",       priority: 0.8, changeFrequency: "daily"   },
  { path: "/contact",    priority: 0.6, changeFrequency: "yearly"  },
];

function altLanguages(suffix: string) {
  // "languages" property: { uz: url, ru: url, en: url }
  return Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${suffix}`]));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const items: MetadataRoute.Sitemap = [];

  /* ============ Localised static pages ============ */
  for (const { path, priority, changeFrequency } of STATIC) {
    for (const locale of LOCALES) {
      items.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: altLanguages(path) },
      });
    }
  }

  /* ============ Blog posts ============ */
  // Har til uchun published slug'larini olamiz va alohida sitemap entry sifatida qo'shamiz.
  // Trilingual blog: bitta yozuv 3 tilda turli slug'da bo'lishi mumkin.
  for (const locale of LOCALES) {
    try {
      const slugs = await api.get<string[] | null>(
        `/blog/sitemap?lang=${locale}`,
        { next: { revalidate: 600 } }
      );
      for (const slug of Array.isArray(slugs) ? slugs : []) {
        items.push({
          url: `${SITE_URL}/${locale}/blog/${slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    } catch {}
  }

  /* ============ Learn (uz only) ============ */
  items.push({
    url: `${SITE_URL}/learn`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  });
  try {
    const paths = await api.get<LessonPath[] | null>(`/learn/sitemap`, { next: { revalidate: 600 } });
    for (const p of Array.isArray(paths) ? paths : []) {
      items.push({
        url: `${SITE_URL}/learn/${p.TechSlug}/${p.SectionSlug}/${p.LessonSlug}`,
        lastModified: p.UpdatedAt ? new Date(p.UpdatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch {}

  return items;
}
