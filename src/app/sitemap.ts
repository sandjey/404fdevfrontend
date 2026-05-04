import type { MetadataRoute } from "next";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { api, rawPaged, SITE_URL, type ProjectView, type Service } from "@/lib/api";

type LessonPath = { TechSlug: string; SectionSlug: string; LessonSlug: string; UpdatedAt: string };

/* ============================================================
   STATIC ROUTES
   - priority: 1.0 = home, 0.9 = key landing, 0.7 = secondary, ...
   - changeFrequency hint Google'ga deyarli ta'sir qilmaydi, lekin
     Yandex va Bing kabi crawlers'lar uchun foydali.
   ============================================================ */
const STATIC: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "",           priority: 1.0, changeFrequency: "weekly"  },
  { path: "/services",  priority: 0.9, changeFrequency: "weekly"  },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly"  },
  { path: "/blog",      priority: 0.8, changeFrequency: "daily"   },
  { path: "/about",     priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact",   priority: 0.6, changeFrequency: "yearly"  },
];

/* hreflang alternates — har bir URL uchun barcha tillarni aniq belgilaymiz,
   shu jumladan x-default (Google ko'p tilli sayt uchun tanlangan default'ni
   bilishi uchun). Default — uz. */
function localizedAlternates(suffix: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}/${l}${suffix}`;
  }
  // x-default → default locale URL
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${suffix}`;
  return languages;
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
        alternates: { languages: localizedAlternates(path) },
      });
    }
  }

  /* ============ Blog posts ============
     Trilingual blog: bitta yozuv 3 tilda turli slug'da bo'lishi mumkin, shuning
     uchun har til alohida URL sifatida sitemapda turadi. Hreflang bog'lash uchun
     post ID bo'yicha cross-locale match kerak — bu yerda implement qilmaymiz. */
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

  /* ============ Portfolio (projects) ============
     Har bir loyiha har til uchun alohida slug bilan keladi. ID bo'yicha
     guruhlab hreflang qurmoqchi bo'lsak, 3 ta paged so'rov natijalarini
     birlashtirish kerak. */
  const projectsByLocale = await Promise.all(
    LOCALES.map(async (locale) => {
      try {
        const res = await rawPaged<ProjectView>(
          `/projects?lang=${locale}&page_size=500&status=published`,
          { next: { revalidate: 600 } }
        );
        return { locale, items: Array.isArray(res.data) ? res.data : [] };
      } catch {
        return { locale, items: [] as ProjectView[] };
      }
    })
  );

  // Build cross-locale map: id → { uz: slug, ru: slug, en: slug, lastUpdated }
  const projectAlt = new Map<
    string,
    { slugs: Partial<Record<string, string>>; lastUpdated: number }
  >();
  for (const { locale, items: list } of projectsByLocale) {
    for (const p of list) {
      const entry = projectAlt.get(p.id) || { slugs: {}, lastUpdated: 0 };
      entry.slugs[locale] = p.slug;
      const u = p.updated_at ? new Date(p.updated_at).getTime() : 0;
      if (u > entry.lastUpdated) entry.lastUpdated = u;
      projectAlt.set(p.id, entry);
    }
  }

  for (const { locale, items: list } of projectsByLocale) {
    for (const p of list) {
      const alt = projectAlt.get(p.id);
      const languages: Record<string, string> = {};
      if (alt) {
        for (const l of LOCALES) {
          if (alt.slugs[l]) {
            languages[l] = `${SITE_URL}/${l}/portfolio/${alt.slugs[l]}`;
          }
        }
        // x-default → default locale variant if present, else current
        languages["x-default"] =
          languages[DEFAULT_LOCALE] ?? `${SITE_URL}/${locale}/portfolio/${p.slug}`;
      }
      items.push({
        url: `${SITE_URL}/${locale}/portfolio/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "monthly",
        priority: 0.7,
        ...(Object.keys(languages).length > 0 ? { alternates: { languages } } : {}),
      });
    }
  }

  /* ============ Services (dynamic from API) ============
     Backend boshqaradigan xizmatlar (services/[slug] sahifasi). */
  const servicesByLocale = await Promise.all(
    LOCALES.map(async (locale) => {
      try {
        const res = await rawPaged<Service>(
          `/services?lang=${locale}&page_size=200&status=published`,
          { next: { revalidate: 600 } }
        );
        return { locale, items: Array.isArray(res.data) ? res.data : [] };
      } catch {
        return { locale, items: [] as Service[] };
      }
    })
  );

  const serviceAlt = new Map<string, { slugs: Partial<Record<string, string>> }>();
  for (const { locale, items: list } of servicesByLocale) {
    for (const s of list) {
      const entry = serviceAlt.get(s.id) || { slugs: {} };
      entry.slugs[locale] = s.slug;
      serviceAlt.set(s.id, entry);
    }
  }

  for (const { locale, items: list } of servicesByLocale) {
    for (const s of list) {
      const alt = serviceAlt.get(s.id);
      const languages: Record<string, string> = {};
      if (alt) {
        for (const l of LOCALES) {
          if (alt.slugs[l]) {
            languages[l] = `${SITE_URL}/${l}/services/${alt.slugs[l]}`;
          }
        }
        languages["x-default"] =
          languages[DEFAULT_LOCALE] ?? `${SITE_URL}/${locale}/services/${s.slug}`;
      }
      items.push({
        url: `${SITE_URL}/${locale}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        ...(Object.keys(languages).length > 0 ? { alternates: { languages } } : {}),
      });
    }
  }

  /* ============ Learn (uz only — bepul maktab) ============ */
  items.push({
    url: `${SITE_URL}/learn`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  });
  try {
    const paths = await api.get<LessonPath[] | null>(`/learn/sitemap`, {
      next: { revalidate: 600 },
    });
    for (const p of Array.isArray(paths) ? paths : []) {
      items.push({
        url: `${SITE_URL}/learn/${p.TechSlug}/${p.SectionSlug}/${p.LessonSlug}`,
        lastModified: p.UpdatedAt ? new Date(p.UpdatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {}

  return items;
}
