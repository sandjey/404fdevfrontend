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
   Keywords per locale — extremely broad coverage of the way real users
   in Uzbekistan search:
     - native locale phrasing
     - common transliterations (uz speakers typing in Cyrillic; ru
       speakers using uz spelling; mixed-language queries)
     - long-tail intent ("narxi", "buyurtma", "zakaz qilish", "kim qiladi")
     - domain-specific verticals (restoran, do'kon, taksi, yetkazib berish)
     - city/region variants (Toshkent / Ташкент / Tashkent / Samarqand /
       Buxoro / Andijon — biz O'zbekiston bo'ylab xizmat ko'rsatamiz)
   Google ignores the meta keywords tag, but Yandex still factors it in
   (UZ va RU bozori uchun muhim) and Bing/DuckDuckGo'ning ba'zi indexers
   ham hisobga oladi.
   ============================================================ */
export function defaultKeywords(locale: Locale): string[] {
  if (locale === "ru") {
    return [
      // Web / sites — keep just one Tashkent/Uzbekistan anchor each
      "разработка сайтов Ташкент",
      "создание сайта под ключ",
      "заказать сайт",
      "сайт на заказ",
      "веб студия",
      "разработка лендинга",
      "лендинг под ключ",
      "корпоративный сайт",
      "сайт для бизнеса",
      "стоимость разработки сайта",
      "сколько стоит сайт",
      // E-commerce
      "разработка интернет магазина",
      "интернет магазин под ключ",
      "разработка маркетплейса",
      // Telegram bot
      "разработка Telegram-бота",
      "разработка телеграм бота",
      "телеграм бот на заказ",
      "заказать телеграм бота",
      "телеграм бот для бизнеса",
      "бот для приёма заказов",
      "бот для оплаты",
      "бот с CRM",
      "Telegram bot na zakaz",
      // Mobile
      "мобильное приложение разработка",
      "iOS разработка",
      "Android разработка",
      "приложение под ключ",
      "приложение для доставки",
      "приложение для такси",
      // CRM/ERP
      "CRM система разработка",
      "ERP система разработка",
      "автоматизация бизнес процессов",
      "автоматизация продаж",
      "учётная система",
      // AI / LLM — yangi xizmat
      "AI интеграция",
      "интеграция искусственного интеллекта",
      "ChatGPT интеграция",
      "GPT API интеграция",
      "Gemini API интеграция",
      "разработка AI чат-бота",
      "AI ассистент для бизнеса",
      "LLM интеграция",
      "нейросеть для бизнеса",
      "AI автоматизация",
      "RAG решение",
      // SEO / promo
      "SEO продвижение Узбекистан",
      "SEO Яндекс Google",
      "продвижение сайта в Google",
      "продвижение в Яндексе",
      "поисковая оптимизация",
      // Integrations
      "интеграция Click Payme",
      "Uzum интеграция",
      "1C интеграция",
      "API интеграция",
      // Industry verticals
      "сайт для ресторана",
      "сайт для доставки еды",
      "сайт для клиники",
      "сайт для салона красоты",
      "сайт для образования",
      "сайт для логистики",
      "сайт для такси",
      // Stack / tech
      "Next.js разработка",
      "React разработка",
      "Go разработчик",
      "TypeScript разработка",
      "Node.js разработка",
      // Generic
      "outsourcing разработка",
      "аутсорсинг разработки ПО",
      "IT компания Ташкент",
      "цифровое агентство Узбекистан",
      "404Dev",
      "404 Dev",
      "404Dev Ташкент",
    ];
  }
  if (locale === "en") {
    return [
      // Web / sites
      "web development Uzbekistan",
      "website agency Tashkent",
      "build a website",
      "order a website",
      "custom website development",
      "landing page development",
      "corporate website development",
      "e-commerce development",
      "online store development",
      // Telegram bot
      "Telegram bot development",
      "order a Telegram bot",
      "Telegram bot for business",
      "Telegram bot with payment",
      "Telegram bot CRM integration",
      // Mobile
      "mobile app development",
      "iOS app development",
      "Android app development",
      "React Native development",
      "Flutter development",
      // CRM / ERP / automation
      "CRM system development",
      "custom CRM development",
      "ERP software development",
      "business automation",
      "process automation",
      // AI / LLM
      "AI integration",
      "AI development",
      "GPT integration",
      "ChatGPT integration",
      "OpenAI API integration",
      "Gemini API integration",
      "AI chatbot development",
      "AI assistant development",
      "LLM integration",
      "RAG solution development",
      "AI automation",
      // SEO
      "SEO Google Yandex",
      "SEO Tashkent",
      "search engine optimisation",
      // Integrations
      "Click integration",
      "Payme integration",
      "Uzum integration",
      "payment gateway integration",
      "1C integration",
      // Generic
      "outsourcing software development",
      "IT outsourcing",
      "Next.js development agency",
      "React development agency",
      "Go backend development",
      "Tashkent software studio",
      "digital agency Uzbekistan",
      "404Dev agency",
      "404 Dev",
      "404Dev Tashkent",
    ];
  }
  // uz
  return [
    // Web / sayt
    "sayt yaratish",
    "sayt yasash",
    "sayt yasab beruvchi",
    "sayt buyurtma berish",
    "sayt zakaz qilish",
    "arzon sayt yaratish",
    "sayt yasash narxi",
    "korporativ sayt yaratish",
    "kompaniya sayti yaratish",
    "landing yasash",
    "landing page yasash",
    "vizitka sayt yaratish",
    "biznes sayt yaratish",
    "sayt na zakaz",
    "vebsayt yaratish",
    // Cyrillic-mix (uz speakers searching in Cyrillic)
    "сайт ясатиш",
    "сайт ясаш",
    "сайт нархи",
    "сайт буюртма",
    // E-commerce
    "internet do'kon yaratish",
    "online do'kon yaratish",
    "do'kon sayti yaratish",
    "marketplace yaratish",
    // Telegram bot
    "Telegram bot ishlab chiqish",
    "Telegram bot yaratish",
    "Telegram bot yasash",
    "Telegram bot zakaz qilish",
    "Telegram bot na zakaz",
    "tg bot yaratish",
    "telegram bot biznes uchun",
    "buyurtma qabul qiluvchi bot",
    "to'lov boti yasash",
    "telegram bot narxi",
    "телеграм бот ясатиш",
    // Mobile
    "mobil ilova yaratish",
    "ilova yasash narxi",
    "iOS ilova yaratish",
    "Android ilova yaratish",
    "iOS Android dasturchilari",
    "ilova buyurtma berish",
    "yetkazib berish ilovasi",
    "taksi ilovasi yaratish",
    // CRM/ERP/automation
    "CRM tizim yaratish",
    "ERP tizim yaratish",
    "biznes avtomatlashtirish",
    "savdo avtomatlashtirish",
    "ofis avtomatlashtirish",
    "hisobot tizimi yaratish",
    // AI / LLM — yangi xizmat
    "AI integratsiya",
    "sun'iy intellekt loyihaga ulash",
    "suniy intellekt integratsiya",
    "GPT integratsiya",
    "ChatGPT integratsiya",
    "ChatGPT bot yaratish",
    "Gemini API integratsiya",
    "AI chatbot yaratish",
    "AI assistent yaratish",
    "LLM integratsiya",
    "neyrotarmoq biznes uchun",
    "AI avtomatlashtirish",
    "RAG yechim",
    // SEO
    "SEO Google Yandex",
    "SEO Toshkent",
    "Google reyting ko'tarish",
    "Yandex reyting ko'tarish",
    "saytni 1-sahifaga chiqarish",
    "qidiruvga chiqarish",
    // Integrations
    "Click integratsiya",
    "Payme integratsiya",
    "Uzum integratsiya",
    "1C integratsiya",
    "to'lov tizimi integratsiyasi",
    "API integratsiya",
    // Industry verticals
    "restoran sayti",
    "yetkazib berish boti",
    "klinika sayti",
    "go'zallik saloni sayti",
    "ta'lim sayti",
    "logistika sayti",
    "taksi sayti",
    "do'kon boti",
    // Stack / tech
    "Next.js sayt yaratish",
    "React dasturchi",
    "Go backend dasturchi",
    "TypeScript dasturchi",
    // Generic
    "outsourcing dasturlash",
    "aurtsorsing dasturchi",
    "raqamli agentlik",
    "IT kompaniya Toshkent",
    "IT studiya",
    "dasturchilar Toshkent",
    "dasturchi yollash",
    "freelancer dasturchi",
    "404Dev",
    "404 Dev",
    "404Dev Toshkent",
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
    alternateName: ["404 Dev", "404Dev Studio", "404Dev Tashkent", "404Dev Toshkent"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-default.svg`,
    description:
      "404Dev — outsourcing software studio in Tashkent, Uzbekistan. We help digitalize services in Uzbekistan and around the world: web, Telegram bots, mobile apps, CRM/ERP, SEO and business automation.",
    foundingDate: "2020",
    email: "hello@404dev.uz",
    telephone: "+998331108810",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
      addressRegion: "Tashkent Region",
    },
    areaServed: ["UZ", "RU", "KZ", "TJ", "KG", "Worldwide"],
    knowsLanguage: ["uz", "ru", "en"],
    sameAs: ["https://t.me/sanjar_3210"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+998331108810",
        contactType: "sales",
        availableLanguage: ["uz", "ru", "en"],
        areaServed: ["UZ", "RU", "KZ", "TJ", "KG"],
      },
      {
        "@type": "ContactPoint",
        email: "hello@404dev.uz",
        contactType: "customer support",
        availableLanguage: ["uz", "ru", "en"],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "60",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function localBusinessLD() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "404Dev",
    alternateName: ["404 Dev", "404Dev Tashkent", "404Dev Toshkent"],
    image: `${SITE_URL}/og-default.svg`,
    url: SITE_URL,
    telephone: "+998331108810",
    email: "hello@404dev.uz",
    priceRange: "$$",
    currenciesAccepted: "UZS, USD, RUB",
    paymentAccepted: "Bank transfer, Click, Payme, Uzum, USDT",
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
    areaServed: [
      { "@type": "City",    name: "Tashkent" },
      { "@type": "City",    name: "Samarkand" },
      { "@type": "City",    name: "Bukhara" },
      { "@type": "City",    name: "Andijan" },
      { "@type": "City",    name: "Namangan" },
      { "@type": "City",    name: "Fergana" },
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "Country", name: "Kazakhstan" },
      { "@type": "Country", name: "Russia" },
      { "@type": "Place",   name: "Central Asia" },
    ],
    serviceType: [
      "Web development",
      "Telegram bot development",
      "Mobile app development",
      "CRM/ERP development",
      "SEO optimisation",
      "Business automation",
      "API integration",
      "E-commerce development",
      "UI/UX design",
      "AI integration",
      "GPT / LLM integration",
      "AI chatbot development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Website development", serviceType: "Web development" },
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: 500, maxPrice: 15000 },
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Telegram bot development", serviceType: "Bot development" },
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: 300, maxPrice: 8000 },
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Mobile app development", serviceType: "Mobile development" },
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: 2000, maxPrice: 40000 },
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "CRM / ERP development", serviceType: "Business software" },
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: 1500, maxPrice: 50000 },
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "SEO optimisation (Google + Yandex)", serviceType: "SEO" },
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: 200, maxPrice: 3000 },
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Business automation & integrations", serviceType: "Business automation" },
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: 500, maxPrice: 10000 },
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "AI integration (GPT, Gemini, custom LLM)", serviceType: "AI integration" },
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: 500, maxPrice: 20000 },
          availability: "https://schema.org/InStock",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "60",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function websiteLD(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "404Dev",
    alternateName: ["404 Dev", "404Dev Tashkent"],
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

/* WebPage LD — per-page metadata that Google uses for the rich result
   "About this result" panel. Lighter than Article — fits home/services. */
export function webPageLD(args: {
  url: string;
  name: string;
  description: string;
  locale: Locale;
  breadcrumbId?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${args.url}#webpage`,
    url: args.url,
    name: args.name,
    description: args.description,
    inLanguage: args.locale === "uz" ? "uz-UZ" : args.locale === "ru" ? "ru-RU" : "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-default.svg`,
    },
    ...(args.breadcrumbId ? { breadcrumb: { "@id": args.breadcrumbId } } : {}),
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

/* ============================================================
   Home services ItemList — a curated list of all key services with
   per-locale phrasing, used as structured data on the homepage so
   Google/Yandex can surface rich service results for queries like
   "сайт ясатиш", "telegram bot na zakaz", "разработка сайтов Ташкент".
   ============================================================ */
export function homeServicesItemListLD(locale: Locale) {
  type Svc = {
    slug: string;
    name: { uz: string; ru: string; en: string };
    desc: { uz: string; ru: string; en: string };
    serviceType: string;
    minPrice: number;
    maxPrice: number;
    keywords: { uz: string; ru: string; en: string };
  };
  const services: Svc[] = [
    {
      slug: "websites",
      name:        { uz: "Web sayt yaratish", ru: "Разработка сайтов", en: "Website development" },
      desc:        { uz: "Korporativ sayt, landing va internet do'kon — Next.js, tezkor yuklanish, SEO-tayyor.",
                     ru: "Корпоративные сайты, лендинги и интернет-магазины — Next.js, быстро, SEO-готово.",
                     en: "Corporate sites, landings and online stores — Next.js, fast, SEO-ready." },
      serviceType: "Web development",
      minPrice: 500,  maxPrice: 15000,
      keywords:    { uz: "sayt yaratish, sayt yasash, sayt buyurtma, sayt narxi, korporativ sayt, landing yasash, internet do'kon",
                     ru: "разработка сайтов, заказать сайт, сайт под ключ, лендинг, корпоративный сайт, интернет магазин",
                     en: "website development, order website, landing page, corporate site, e-commerce" },
    },
    {
      slug: "telegram-bots",
      name:        { uz: "Telegram bot yaratish", ru: "Разработка Telegram-бота", en: "Telegram bot development" },
      desc:        { uz: "Buyurtma, to'lov va CRM bilan bog'langan Telegram bot — biznes uchun 24/7 sotuvchi.",
                     ru: "Telegram-боты с приёмом заказов, оплатой и интеграцией с CRM — продавец 24/7.",
                     en: "Telegram bots with orders, payments and CRM integration — a 24/7 salesperson." },
      serviceType: "Bot development",
      minPrice: 300,  maxPrice: 8000,
      keywords:    { uz: "Telegram bot yaratish, telegram bot zakaz qilish, bot na zakaz, to'lov boti",
                     ru: "разработка телеграм бота, телеграм бот на заказ, бот для бизнеса, бот с оплатой",
                     en: "Telegram bot development, order Telegram bot, bot with payments" },
    },
    {
      slug: "mobile-apps",
      name:        { uz: "Mobil ilova yaratish", ru: "Разработка мобильных приложений", en: "Mobile app development" },
      desc:        { uz: "iOS va Android ilovalar — yetkazib berish, taksi, do'kon, fitnes va boshqalar.",
                     ru: "Приложения iOS и Android — доставка, такси, магазин, фитнес и многое другое.",
                     en: "iOS and Android apps — delivery, taxi, store, fitness and more." },
      serviceType: "Mobile development",
      minPrice: 2000, maxPrice: 40000,
      keywords:    { uz: "mobil ilova yaratish, ilova yasash, iOS Android ilova, ilova buyurtma",
                     ru: "разработка мобильного приложения, приложение под ключ, iOS Android разработка",
                     en: "mobile app development, iOS Android app development, app for delivery" },
    },
    {
      slug: "crm-erp",
      name:        { uz: "CRM va ERP tizim yaratish", ru: "Разработка CRM и ERP систем", en: "CRM & ERP development" },
      desc:        { uz: "Mijozlar, savdo, omborni boshqarish, hisobot va biznes avtomatlashtirish tizimlari.",
                     ru: "Системы управления клиентами, продажами, складом и автоматизация бизнес-процессов.",
                     en: "Customer, sales and inventory management systems, plus business automation." },
      serviceType: "Business software",
      minPrice: 1500, maxPrice: 50000,
      keywords:    { uz: "CRM tizim, ERP tizim, biznes avtomatlashtirish, hisobot tizimi",
                     ru: "разработка CRM, разработка ERP, автоматизация бизнеса",
                     en: "CRM development, ERP software, business automation" },
    },
    {
      slug: "seo",
      name:        { uz: "Google va Yandex SEO", ru: "SEO в Google и Яндекс", en: "Google & Yandex SEO" },
      desc:        { uz: "Texnik audit, kontent va backlink — saytni 1-sahifaga olib chiqamiz.",
                     ru: "Технический аудит, контент, бэклинки — выводим сайт на 1 страницу выдачи.",
                     en: "Technical audit, content and backlinks — to land on page one." },
      serviceType: "SEO",
      minPrice: 200,  maxPrice: 3000,
      keywords:    { uz: "SEO Toshkent, SEO O'zbekiston, qidiruvga chiqarish, Yandex SEO, Google SEO",
                     ru: "SEO Ташкент, SEO Узбекистан, продвижение в Яндексе, продвижение в Google",
                     en: "SEO Tashkent, SEO Uzbekistan, Google ranking, Yandex ranking" },
    },
    {
      slug: "automation",
      name:        { uz: "Biznes avtomatlashtirish va integratsiya", ru: "Автоматизация бизнеса и интеграции", en: "Business automation & integrations" },
      desc:        { uz: "Click, Payme, Uzum, 1C va API integratsiyalari — tizimlar bir-biriga ulansin.",
                     ru: "Интеграции Click, Payme, Uzum, 1C и API — все системы говорят между собой.",
                     en: "Click, Payme, Uzum, 1C and API integrations — systems that talk to each other." },
      serviceType: "Business automation",
      minPrice: 500,  maxPrice: 10000,
      keywords:    { uz: "Click integratsiya, Payme integratsiya, 1C integratsiya, API integratsiya",
                     ru: "интеграция Click Payme, интеграция 1C, API интеграция",
                     en: "Click integration, Payme integration, 1C integration, API integration" },
    },
    {
      slug: "ai",
      name:        { uz: "AI integratsiya — GPT, Gemini va LLM",
                     ru: "AI-интеграция — GPT, Gemini и LLM",
                     en: "AI integration — GPT, Gemini and custom LLM" },
      desc:        { uz: "Sun'iy intellektni mahsulotingizga professional qo'shamiz: GPT/Gemini chatbot, kontent generatsiya, hujjat tahlili, biznes assistent va RAG yechimlari.",
                     ru: "Профессиональная интеграция искусственного интеллекта в продукт: GPT/Gemini чат-боты, генерация контента, анализ документов, бизнес-ассистенты и RAG-решения.",
                     en: "Professional AI integration into your product: GPT/Gemini chatbots, content generation, document analysis, business assistants and RAG solutions." },
      serviceType: "AI integration",
      minPrice: 500,  maxPrice: 20000,
      keywords:    { uz: "AI integratsiya, sun'iy intellekt, GPT integratsiya, ChatGPT bot, Gemini API, AI chatbot, AI assistent, LLM integratsiya, suniy intellekt loyihaga ulash",
                     ru: "AI интеграция, искусственный интеллект, GPT интеграция, ChatGPT бот, Gemini API, AI чат-бот, AI ассистент, LLM интеграция, нейросеть для бизнеса",
                     en: "AI integration, artificial intelligence, GPT integration, ChatGPT bot, Gemini API, AI chatbot, AI assistant, LLM integration, RAG solution" },
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/${locale}#services-itemlist`,
    name:
      locale === "ru"
        ? "Услуги цифровизации в Узбекистане"
        : locale === "en"
        ? "Digital services in Uzbekistan"
        : "O'zbekistonda raqamli xizmatlar",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${locale}/services/${s.slug}`,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/${locale}/services/${s.slug}#service`,
        name: s.name[locale],
        description: s.desc[locale],
        serviceType: s.serviceType,
        url: `${SITE_URL}/${locale}/services/${s.slug}`,
        keywords: s.keywords[locale],
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Uzbekistan" },
          { "@type": "Country", name: "Kazakhstan" },
          { "@type": "Country", name: "Russia" },
          { "@type": "Place",   name: "Worldwide" },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/${locale}/services/${s.slug}`,
          serviceLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressCountry: "UZ",
              addressLocality: "Tashkent",
            },
          },
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: s.minPrice,
            maxPrice: s.maxPrice,
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Uzbekistan" },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "12",
          bestRating: "5",
          worstRating: "1",
        },
      },
    })),
  };
}
