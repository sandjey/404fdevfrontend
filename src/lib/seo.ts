import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/api";

/* ============================================================
   SEO library
   - buildMetadata(): canonical + hreflang + OG + Twitter + robots
   - JSON-LD generators: Organization, WebSite, LocalBusiness,
     Service, Article, BreadcrumbList, FAQPage
   - keywords helper (per-locale)
   ============================================================ */

type BuildMetaArgs = {
  title: string;
  description: string;
  /** /uz/blog/foo, /learn/...; canonical va hreflang shu yerdan quriladi */
  path: string;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
  /** ixtiyoriy kalit so'zlar (Yandex hali ham keywords meta'ni qisman o'qiydi) */
  keywords?: string[];
};

/**
 * Sahifa SEO metadatasini yaratadi (canonical + hreflang + OG + Twitter).
 *
 * Path `/uz/...`, `/ru/...`, `/en/...` bo'lsa hreflang generatsiya qilinadi,
 * boshqa hollarda faqat self-canonical.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale,
  image,
  type = "website",
  keywords,
}: BuildMetaArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-default.svg`;

  const localePrefix = path.match(/^\/(uz|ru|en)(\/|$)/);
  const languages: Record<string, string> = {};
  if (localePrefix) {
    const trimmed = path.replace(/^\/(uz|ru|en)/, "") || "";
    for (const l of LOCALES) {
      languages[l] = `${SITE_URL}/${l}${trimmed}`;
    }
    // x-default — Google'ning fallback til, biz uz'ni asosiy bozor deb belgilaymiz
    languages["x-default"] = `${SITE_URL}/uz${trimmed}`;
  }

  const finalKeywords = keywords ?? defaultKeywords(locale);

  // Per-locale verification kodlari .env orqali keladi (NEXT_PUBLIC_*).
  // Mavjud bo'lsa <head> ga `verification` orqali qo'shamiz.
  const verification: Metadata["verification"] = {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  };

  return {
    title,
    description,
    keywords: finalKeywords.join(", "),
    metadataBase: new URL(SITE_URL),
    applicationName: "404Dev",
    authors: [{ name: "404Dev", url: SITE_URL }],
    creator: "404Dev",
    publisher: "404Dev",
    category: "technology",
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length > 0 ? { languages } : {}),
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: "404Dev",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale:
        locale === "uz" ? ["ru_RU", "en_US"] : locale === "ru" ? ["uz_UZ", "en_US"] : ["uz_UZ", "ru_RU"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@sanjar_3210",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification,
    formatDetection: {
      telephone: true,
      email: false,
      address: true,
    },
  };
}

/* ============================================================
   Keywords per locale — used as default in <meta name="keywords"> +
   referenced in copy + sitemap term ideas. Yandex still partially uses
   the keywords meta; Google ignores it but it doesn't hurt.
   ============================================================ */
export function defaultKeywords(locale: Locale): string[] {
  if (locale === "ru") {
    return [
      "разработка сайтов Ташкент",
      "разработка сайтов Узбекистан",
      "веб-разработка Узбекистан",
      "создание сайта под ключ",
      "разработка Telegram-бота",
      "Telegram бот для бизнеса",
      "мобильное приложение разработка",
      "iOS разработка Узбекистан",
      "Android разработка Узбекистан",
      "CRM система разработка",
      "ERP система Узбекистан",
      "автоматизация бизнес процессов",
      "SEO продвижение Ташкент",
      "SEO Яндекс Google Узбекистан",
      "веб студия Ташкент",
      "разработка интернет магазина",
      "интеграция Click Payme",
      "outsourcing разработка",
      "404Dev",
    ];
  }
  if (locale === "en") {
    return [
      "web development Uzbekistan",
      "software development Tashkent",
      "Telegram bot development",
      "mobile app development Uzbekistan",
      "iOS Android development",
      "CRM system development",
      "ERP software Uzbekistan",
      "business automation",
      "SEO Google Yandex",
      "outsourcing software development",
      "Next.js development agency",
      "e-commerce development",
      "Click Payme integration",
      "404Dev agency",
    ];
  }
  // uz
  return [
    "sayt yaratish Toshkent",
    "web sayt yaratish O'zbekiston",
    "Telegram bot ishlab chiqish",
    "Telegram bot biznes uchun",
    "mobil ilova yaratish",
    "iOS Android dasturchilari",
    "CRM tizim yaratish",
    "ERP tizim O'zbekiston",
    "biznes avtomatlashtirish",
    "SEO Google Yandex O'zbekiston",
    "outsourcing dasturlash",
    "raqamli agentlik Toshkent",
    "internet do'kon yaratish",
    "Click Payme integratsiya",
    "Next.js sayt yaratish",
    "404Dev",
  ];
}

/* ============================================================
   JSON-LD generators
   ============================================================ */

export function organizationLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "404Dev",
    legalName: "404Dev",
    alternateName: ["404 Dev", "404Dev Studio"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-default.svg`,
    description:
      "404Dev — outsourcing software studio in Tashkent. Web, Telegram bots, mobile apps, CRM/ERP, SEO and business automation.",
    foundingDate: "2020",
    email: "hello@404dev.uz",
    telephone: "+998331108810",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
    },
    areaServed: ["UZ", "RU", "KZ", "Worldwide"],
    sameAs: ["https://t.me/sanjar_3210"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+998331108810",
        contactType: "sales",
        availableLanguage: ["uz", "ru", "en"],
        areaServed: ["UZ", "RU", "KZ"],
      },
    ],
  };
}

export function localBusinessLD() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "404Dev",
    image: `${SITE_URL}/og-default.svg`,
    url: SITE_URL,
    telephone: "+998331108810",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
      addressRegion: "Tashkent",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.2995,
      longitude: 69.2401,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: ["Tashkent", "Uzbekistan", "Central Asia"],
    serviceType: [
      "Web development",
      "Telegram bot development",
      "Mobile app development",
      "CRM/ERP development",
      "SEO optimisation",
      "Business automation",
      "API integration",
    ],
  };
}

export function websiteLD(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "404Dev",
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLD(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function articleLD(args: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt?: string | null;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
    headline: args.title,
    description: args.description,
    image: args.image ? [args.image] : [`${SITE_URL}/og-default.svg`],
    datePublished: args.publishedAt || args.updatedAt,
    dateModified: args.updatedAt || args.publishedAt,
    author: { "@type": "Organization", name: args.author || "404Dev", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: args.locale === "uz" ? "uz-UZ" : args.locale === "ru" ? "ru-RU" : "en-US",
    keywords: (args.tags ?? []).join(", "),
  };
}

export function serviceLD(args: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    serviceType: args.serviceType,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    url: args.url,
    inLanguage: args.locale === "uz" ? "uz-UZ" : args.locale === "ru" ? "ru-RU" : "en-US",
  };
}

export function faqPageLD(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
