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
      // ===== Positioning (top-priority) =====
      "digital growth агентство Ташкент",
      "digital marketing агентство Узбекистан",
      "growth marketing Узбекистан",
      "automation агентство",
      "growth система для бизнеса",
      "технический маркетинг",
      "engineering-driven digital agency",
      // ===== Influencer marketing — competitor & intent =====
      "реклама у блогеров Ташкент",
      "реклама у блогеров Узбекистан",
      "Instagram блогеры Ташкент",
      "TikTok блогеры Узбекистан",
      "Telegram блогер реклама",
      "YouTube блогеры Узбекистан",
      "блогер по рекламе в Ташкенте",
      "как связаться с блогерами Узбекистана",
      "агентство маркетинга в Узбекистане",
      "агентство рекламы Узбекистан",
      "инфлюенс агентство Ташкент",
      "influence lab",
      "influence lab Узбекистан",
      "лаб инфлюенс",
      "инфлюенс лаб",
      "boburazz",
      "boburazz реклама",
      "промо персонал в Узбекистане",
      "промо персонал Ташкент",
      "innovation marketing компания Узбекистан",
      "innovation marketing Ташкент",
      "курсы от узбекистанских агентств рекламы",
      "стоимость рекламы у блогера",
      "сколько стоит реклама у блогера",
      // ===== SEO & Growth =====
      "SEO Ташкент",
      "SEO Узбекистан",
      "технический SEO аудит",
      "programmatic SEO",
      "контент-стратегия",
      "продвижение в Google",
      "продвижение в Яндексе",
      "локальный SEO Google Business",
      "Яндекс Карты продвижение",
      "мультиязычное SEO hreflang",
      "Core Web Vitals оптимизация",
      "оптимизация скорости сайта",
      // ===== Lead generation =====
      "лидогенерация Узбекистан",
      "лид-воронка под ключ",
      "CRO оптимизация конверсии",
      "marketing automation",
      "автоматизация продаж",
      "CRM интеграция",
      "AmoCRM интеграция",
      "Bitrix24 интеграция",
      "HubSpot интеграция",
      "call tracking Ташкент",
      "WhatsApp Business API",
      "A/B тестирование",
      "аудит конверсии",
      // ===== AI & Automation =====
      "AI интеграция",
      "интеграция искусственного интеллекта",
      "ChatGPT интеграция",
      "GPT API интеграция",
      "Gemini API интеграция",
      "разработка AI чат-бота",
      "AI ассистент для бизнеса",
      "LLM интеграция",
      "RAG решение",
      "AI автоматизация",
      "n8n Узбекистан",
      "workflow automation",
      "AI оператор",
      "голосовой AI агент",
      // ===== Web / sites =====
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
      // ===== Positioning (top-priority) =====
      "digital growth agency Tashkent",
      "digital marketing agency Uzbekistan",
      "growth marketing Uzbekistan",
      "automation agency",
      "growth system for business",
      "technical marketing agency",
      "engineering-driven digital agency",
      "lead generation agency Uzbekistan",
      // ===== Influencer marketing — competitor & intent =====
      "influencer marketing Uzbekistan",
      "influencer marketing Tashkent",
      "influencer agency Tashkent",
      "Instagram influencers Tashkent",
      "TikTok influencers Uzbekistan",
      "Telegram influencer ads",
      "YouTube influencers Uzbekistan",
      "Uzbek bloggers advertising",
      "Uzbek influencers agency",
      "advertising agency Tashkent",
      "marketing agency Uzbekistan",
      "influence lab Uzbekistan",
      "boburazz advertising",
      "promo staff Tashkent",
      "innovation marketing Uzbekistan",
      "creator economy Uzbekistan",
      "how to contact bloggers Uzbekistan",
      "influencer marketing courses Uzbekistan",
      // ===== SEO & Growth =====
      "SEO agency Tashkent",
      "SEO agency Uzbekistan",
      "technical SEO audit",
      "programmatic SEO",
      "content strategy",
      "Google ranking",
      "Yandex ranking",
      "local SEO Google Business",
      "Yandex Maps optimisation",
      "multilingual SEO hreflang",
      "Core Web Vitals optimisation",
      "site speed optimisation",
      // ===== Lead generation =====
      "lead generation Uzbekistan",
      "lead funnel agency",
      "CRO conversion optimisation",
      "marketing automation",
      "sales automation",
      "CRM integration",
      "AmoCRM integration",
      "Bitrix24 integration",
      "HubSpot integration",
      "call tracking Tashkent",
      "WhatsApp Business API",
      "A/B testing agency",
      "conversion audit",
      // ===== AI & Automation =====
      "AI integration agency",
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
      "n8n agency",
      "workflow automation",
      "voice AI agent",
      "AI operator",
      // ===== Web / sites =====
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
    // ===== Positioning (top-priority) =====
    "digital growth agentligi Toshkent",
    "digital marketing agentligi O'zbekiston",
    "growth marketing O'zbekiston",
    "automation agentligi",
    "biznes uchun o'sish tizimi",
    "texnik marketing",
    "engineering-driven digital agency",
    "lead generation O'zbekiston",
    // ===== Influencer marketing — kalit so'zlar =====
    "blogerlar reklama Toshkent",
    "blogerlar reklama O'zbekiston",
    "Instagram blogerlar O'zbekiston",
    "TikTok blogerlar reklama",
    "Telegram bloger reklamasi",
    "YouTube blogerlar O'zbekiston",
    "blogerga reklama buyurtma",
    "blogerga ulanish O'zbekiston",
    "blogerlar bilan ishlash",
    "influence agentligi Toshkent",
    "marketing agentligi O'zbekiston",
    "reklama agentligi Toshkent",
    "promo personal Toshkent",
    "promo personal O'zbekiston",
    "boburazz reklama",
    "lab influence O'zbekiston",
    "influence lab",
    "blogerlar narxi",
    "reklama narxi blogerda",
    "innovation marketing O'zbekiston",
    "blogerlarga reklama qancha turadi",
    "blogerga qanday murojaat qilish",
    // ===== SEO & Growth =====
    "SEO Toshkent",
    "SEO O'zbekiston",
    "texnik SEO audit",
    "programmatic SEO",
    "kontent strategiya",
    "Google reyting ko'tarish",
    "Yandex reyting ko'tarish",
    "lokal SEO Google Business",
    "Yandex Maps reyting",
    "ko'p tilli SEO hreflang",
    "Core Web Vitals optimizatsiya",
    "sayt tezligi optimizatsiya",
    // ===== Lead generation =====
    "lid voronkasi yaratish",
    "CRO konversiya optimizatsiyasi",
    "marketing automation",
    "sotuv avtomatlashtirish",
    "CRM integratsiya",
    "AmoCRM integratsiya",
    "Bitrix24 integratsiya",
    "HubSpot integratsiya",
    "call tracking O'zbekiston",
    "WhatsApp Business API integratsiya",
    "A/B test sayt",
    "konversiya audit",
    // ===== AI & Automation =====
    "AI integratsiya",
    "sun'iy intellekt integratsiya",
    "GPT integratsiya",
    "ChatGPT bot yaratish",
    "Gemini API integratsiya",
    "AI chatbot yaratish",
    "AI assistent yaratish",
    "LLM integratsiya",
    "RAG yechim",
    "AI avtomatlashtirish",
    "n8n O'zbekiston",
    "workflow automation",
    "AI operator",
    "ovozli AI agent",
    // ===== Web / sayt =====
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
      "404Dev — Digital Growth & Automation Agency based in Tashkent, Uzbekistan. We build growth systems for modern businesses: SEO and programmatic SEO, influencer marketing (Instagram, TikTok, Telegram, YouTube creators), lead generation and CRO, AI automation (GPT, Gemini, RAG), CRM/ERP, brand identity, conversion-focused websites and infrastructure.",
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
      "SEO optimisation",
      "Programmatic SEO",
      "Lead generation",
      "Conversion rate optimisation (CRO)",
      "Influencer marketing",
      "Creator marketing",
      "Instagram influencer ads",
      "TikTok influencer ads",
      "Telegram influencer ads",
      "Promo staff for events",
      "Marketing automation",
      "AI integration",
      "GPT / LLM integration",
      "AI chatbot development",
      "Workflow automation",
      "Web development",
      "E-commerce development",
      "SaaS development",
      "Brand identity",
      "Brand book",
      "UI/UX design",
      "Design system",
      "CRM development",
      "ERP development",
      "Business automation",
      "Cloud infrastructure",
      "DevOps",
      "API integration",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital growth & automation services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Growth (Google + Yandex)" },           priceCurrency: "USD", price: 800,  availability: "https://schema.org/InStock" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Generation & CRO" },                    priceCurrency: "USD", price: 1200, availability: "https://schema.org/InStock" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Influencer Marketing (Instagram, TikTok, Telegram, YouTube)" }, priceCurrency: "USD", price: 1000, availability: "https://schema.org/InStock" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & Automation (GPT, Gemini, LLM, RAG)" },  priceCurrency: "USD", price: 800,  availability: "https://schema.org/InStock" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development (sites, landings, SaaS)" },  priceCurrency: "USD", price: 800,  availability: "https://schema.org/InStock" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Design (brand identity, UI/UX)" }, priceCurrency: "USD", price: 1500, availability: "https://schema.org/InStock" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Systems (CRM, ERP, SaaS)" },        priceCurrency: "USD", price: 2500, availability: "https://schema.org/InStock" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Infrastructure & Technical (DevOps, API)" }, priceCurrency: "USD", price: 1000, availability: "https://schema.org/InStock" },
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

/* ============================================================
   Learn — programming course / lesson structured data
   - courseLD: Schema.org Course (rich result eligible — "Course" carousel
     in Google: appears for queries like "JavaScript darslari", "React
     o'zbek tilida", "free Python course Uzbek").
   - learningResourceLD: per-lesson LearningResource + Article hybrid.
   - learnKeywords: per-technology keyword expansion. We hit:
     * native Uzbek phrasing (latin + cyrillic)
     * common transliterations (ru speakers searching for uz programming
       content; uz speakers searching with ru words like "уроки")
     * long-tail intent ("bepul", "o'rganish", "narxsiz", "kursi")
     * brand affinity ("404Dev darslari")
   ============================================================ */

export function courseLD(args: {
  name: string;
  description: string;
  url: string;
  // tech slug used as @id
  slug: string;
  // Optional: list of section/lesson titles for hasPart
  sections?: { title: string; url: string; lessons: { title: string; url: string }[] }[];
  totalLessons?: number;
  image?: string;
}) {
  const courseInstance = {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: args.totalLessons ? `PT${Math.max(1, args.totalLessons)}H` : undefined,
    inLanguage: "uz-UZ",
    isAccessibleForFree: true,
    location: { "@type": "VirtualLocation", url: args.url },
  };

  const hasPart =
    args.sections?.flatMap((s) => [
      // Each section as a Course (sub-course)
      {
        "@type": "Course",
        name: s.title,
        url: s.url,
        provider: { "@id": `${SITE_URL}/#organization` },
        // Lessons inside the section
        hasPart: s.lessons.map((l) => ({
          "@type": "LearningResource",
          name: l.title,
          url: l.url,
          inLanguage: "uz-UZ",
          isAccessibleForFree: true,
          learningResourceType: "Lesson",
        })),
      },
    ]) ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${args.url}#course`,
    name: args.name,
    description: args.description,
    url: args.url,
    inLanguage: "uz-UZ",
    isAccessibleForFree: true,
    image: args.image || `${SITE_URL}/og-default.svg`,
    educationalLevel: "Beginner to Advanced",
    teaches: args.name,
    provider: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    // Required by Google's Course rich result spec
    offers: {
      "@type": "Offer",
      category: "Free",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: courseInstance,
    ...(hasPart.length > 0 ? { hasPart } : {}),
  };
}

export function learningResourceLD(args: {
  name: string;
  description: string;
  url: string;
  technologyName: string;
  technologyUrl: string;
  sectionName: string;
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${args.url}#lesson`,
    name: args.name,
    description: args.description,
    url: args.url,
    inLanguage: "uz-UZ",
    isAccessibleForFree: true,
    learningResourceType: "Lesson",
    educationalLevel: "Beginner to Advanced",
    teaches: args.technologyName,
    image: args.image || `${SITE_URL}/og-default.svg`,
    datePublished: args.publishedAt || args.updatedAt,
    dateModified: args.updatedAt || args.publishedAt,
    isPartOf: {
      "@type": "Course",
      "@id": `${args.technologyUrl}#course`,
      name: `${args.technologyName} darslari`,
      url: args.technologyUrl,
    },
    about: {
      "@type": "Thing",
      name: args.sectionName,
    },
    provider: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/* Per-technology keyword set — extends defaultKeywords(uz) with technology
   name variants, transliterations and intent modifiers. Search engines pick
   up the broader phrase coverage. */
export function learnKeywords(opts?: { name?: string; slug?: string }): string[] {
  const baseLearn: string[] = [
    // Generic learning intent (uz)
    "dasturlash darslari",
    "dasturlashni o'rganish",
    "dasturlash kursi",
    "bepul dasturlash darslari",
    "online dasturlash kursi",
    "kod yozishni o'rganish",
    "dasturchi bo'lish",
    "dasturchi kursi",
    "frontend o'rganish",
    "backend o'rganish",
    "web dasturlash o'rganish",
    "dasturchi uchun darsliklar",
    "dasturlash o'zbek tilida",
    "dasturlash uz",
    "ona tilimda dasturlash",
    // Cyrillic-mix
    "дастурлаш дарслари",
    "дастурлаш урганиш",
    "дастурлаш курси",
    // Long-tail intent
    "noldan dasturlash",
    "boshlanganlar uchun dasturlash",
    "dasturchilik kasbi",
    "qaysi tilni o'rganish",
    // Russian (uz speakers occasionally search in ru)
    "уроки программирования на узбекском",
    "программирование с нуля",
    "бесплатные уроки программирования",
    "курс программирования",
    // English
    "programming tutorials in Uzbek",
    "learn programming Uzbek",
    "free programming course",
    // Brand
    "404Dev Learn",
    "404Dev darslari",
    "404 Dev kurs",
  ];

  const name = opts?.name?.trim();
  const slug = opts?.slug?.trim();
  if (!name && !slug) return baseLearn;

  // Build per-tech variants
  const tech = name || slug || "";
  const techVariants: string[] = [
    `${tech} darslari`,
    `${tech} o'rganish`,
    `${tech} kursi`,
    `${tech} o'zbek tilida`,
    `${tech} bepul darslari`,
    `${tech} dasturlash`,
    `${tech} asoslari`,
    `${tech} amaliyot`,
    `${tech} qo'llanma`,
    `${tech} darslik`,
    `${tech} tutorial uz`,
    // Russian intents
    `${tech} уроки`,
    `${tech} с нуля`,
    `${tech} курс`,
    `${tech} бесплатно`,
    // English intents
    `learn ${tech}`,
    `${tech} tutorial`,
    `${tech} course`,
    `${tech} for beginners`,
    // Comparative
    `${tech} qanday o'rganish kerak`,
    `${tech} qayerdan boshlash`,
  ];

  return [...techVariants, ...baseLearn];
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
      slug: "seo-growth",
      name:        { uz: "SEO & Growth — qidiruv va organik o'sish",
                     ru: "SEO & Growth — поисковая система роста",
                     en: "SEO & Growth — organic growth engine" },
      desc:        { uz: "Texnik SEO, programmatic SEO va kontent strategiya — Google va Yandex'da 1-sahifa va organik o'sish.",
                     ru: "Технический SEO, programmatic SEO и контент-стратегия — 1 страница в Google и Яндекс и органический рост.",
                     en: "Technical SEO, programmatic SEO and content strategy — page-one rankings on Google and Yandex." },
      serviceType: "SEO",
      minPrice: 800,  maxPrice: 8000,
      keywords:    { uz: "SEO Toshkent, SEO O'zbekiston, texnik SEO audit, programmatic SEO, kontent strategiya, Yandex SEO, Google SEO, lokal SEO, ko'p tilli SEO, Core Web Vitals, growth marketing",
                     ru: "SEO Ташкент, SEO Узбекистан, технический SEO аудит, programmatic SEO, контент-стратегия, Яндекс SEO, Google SEO, локальный SEO, мультиязычное SEO, Core Web Vitals, growth marketing",
                     en: "SEO Tashkent, SEO Uzbekistan, technical SEO audit, programmatic SEO, content strategy, Yandex SEO, Google SEO, local SEO, multilingual SEO, Core Web Vitals, growth marketing" },
    },
    {
      slug: "lead-generation",
      name:        { uz: "Lead Generation tizimlari — saytdan mijoz oqimi",
                     ru: "Lead Generation — поток клиентов с сайта",
                     en: "Lead Generation Systems — a real customer pipeline" },
      desc:        { uz: "Lid voronkalari, CRO, CRM va analitika — har bir tashrif lid'ga, har bir lid mijozga aylanadi.",
                     ru: "Лид-воронки, CRO, CRM и аналитика — каждый визит становится лидом, каждый лид — клиентом.",
                     en: "Lead funnels, CRO, CRM and analytics — every visitor becomes a lead, every lead becomes a customer." },
      serviceType: "Lead generation",
      minPrice: 1200, maxPrice: 12000,
      keywords:    { uz: "lead generation O'zbekiston, lid voronkasi, CRO konversiya, marketing automation, sotuv avtomatlashtirish, CRM integratsiya, AmoCRM, Bitrix24, HubSpot, call tracking, A/B test",
                     ru: "лидогенерация Узбекистан, лид-воронка, CRO конверсия, marketing automation, автоматизация продаж, CRM интеграция, AmoCRM, Bitrix24, HubSpot, call tracking, A/B тест",
                     en: "lead generation Uzbekistan, lead funnel, CRO conversion, marketing automation, sales automation, CRM integration, AmoCRM, Bitrix24, HubSpot, call tracking, A/B testing" },
    },
    {
      slug: "influencer-marketing",
      name:        { uz: "Influencer Marketing — blogerlar bilan reklama",
                     ru: "Influencer Marketing — реклама у блогеров",
                     en: "Influencer Marketing — work with creators" },
      desc:        { uz: "Blogerlarni nishingizga mos tanlash, kelishuv, tekst va publish — barcha vazifani biz bajaramiz. To'lov bosqichlarga bo'lingan, ROI shaffof.",
                     ru: "Подбор блогеров под нишу, переговоры, тексты и публикация — всю работу берём на себя. Оплата делится на этапы, ROI прозрачный.",
                     en: "Niche-matched creator picks, negotiation, copy and publishing — we handle the full workflow. Staged payment, transparent ROI." },
      serviceType: "Influencer marketing",
      minPrice: 1000, maxPrice: 50000,
      keywords:    { uz: "blogerlar reklama Toshkent, Instagram blogerlar O'zbekiston, TikTok blogerlar, Telegram bloger reklamasi, blogerga reklama buyurtma, influence agentligi, promo personal, marketing agentligi, boburazz reklama, lab influence",
                     ru: "реклама у блогеров Ташкент, Instagram блогеры Узбекистан, TikTok блогеры, Telegram блогер реклама, как связаться с блогерами Узбекистана, инфлюенс агентство, агентство маркетинга в Узбекистане, влоблогер по рекламе в Ташкенте, boburazz, influence lab, лаб инфлюенс, промо персонал, innovation marketing, стоимость рекламы у блогера",
                     en: "influencer marketing Uzbekistan, Instagram influencers Tashkent, TikTok influencers, Telegram influencer ads, Uzbek bloggers advertising, marketing agency Uzbekistan, influence lab, boburazz advertising, promo staff Tashkent, innovation marketing" },
    },
    {
      slug: "ai-automation",
      name:        { uz: "AI & Automation — aqlli avtomatlashtirish",
                     ru: "AI & Automation — умная автоматизация бизнеса",
                     en: "AI & Automation — intelligent business automation" },
      desc:        { uz: "AI chatbotlar, Telegram avtomatlashtirish, ish jarayonlari va aqlli yordamchilar — GPT, Gemini va custom LLM.",
                     ru: "AI чат-боты, автоматизация Telegram, рабочие процессы и умные ассистенты — GPT, Gemini и кастомные LLM.",
                     en: "AI chatbots, Telegram automation, workflows and smart assistants — GPT, Gemini and custom LLMs." },
      serviceType: "AI integration",
      minPrice: 800,  maxPrice: 25000,
      keywords:    { uz: "AI integratsiya, sun'iy intellekt, GPT integratsiya, ChatGPT bot, Gemini API, AI chatbot, AI assistent, LLM integratsiya, RAG yechim, n8n, workflow automation, AI operator",
                     ru: "AI интеграция, искусственный интеллект, GPT интеграция, ChatGPT бот, Gemini API, AI чат-бот, AI ассистент, LLM интеграция, RAG решение, n8n, workflow automation, AI оператор",
                     en: "AI integration, artificial intelligence, GPT integration, ChatGPT bot, Gemini API, AI chatbot, AI assistant, LLM integration, RAG solution, n8n, workflow automation, AI operator" },
    },
    {
      slug: "web-development",
      name:        { uz: "Web Development — yuqori konversiyali saytlar va platformalar",
                     ru: "Web Development — конверсионные сайты и платформы",
                     en: "Web Development — high-conversion sites and platforms" },
      desc:        { uz: "Korporativ sayt, landing, e-commerce va SaaS — Next.js, Lighthouse 95+, SEO-tayyor.",
                     ru: "Корпоративные сайты, лендинги, e-commerce и SaaS — Next.js, Lighthouse 95+, SEO-готово.",
                     en: "Corporate sites, landings, e-commerce and SaaS — Next.js, Lighthouse 95+, SEO-ready." },
      serviceType: "Web development",
      minPrice: 800,  maxPrice: 30000,
      keywords:    { uz: "sayt yaratish Toshkent, korporativ sayt, landing page, e-commerce sayt, internet do'kon, Next.js sayt, SaaS platforma, headless CMS",
                     ru: "разработка сайтов Ташкент, корпоративный сайт, лендинг, e-commerce, интернет магазин, сайт на Next.js, SaaS-платформа, headless CMS",
                     en: "web development Tashkent, corporate website, landing page, e-commerce, online store, Next.js website, SaaS platform, headless CMS" },
    },
    {
      slug: "business-systems",
      name:        { uz: "Business Systems — ichki platformalar va SaaS",
                     ru: "Business Systems — внутренние платформы и SaaS",
                     en: "Business Systems — internal platforms and SaaS" },
      desc:        { uz: "CRM, ERP, dispatch, logistika va SaaS platformalar — kompaniyaning butun jarayoni bitta tizimda.",
                     ru: "CRM, ERP, dispatch, логистика и SaaS-платформы — все процессы компании в одной системе.",
                     en: "CRM, ERP, dispatch, logistics and SaaS platforms — every company process in one system." },
      serviceType: "Business software",
      minPrice: 2500, maxPrice: 80000,
      keywords:    { uz: "CRM tizim, ERP tizim, biznes avtomatlashtirish, logistika platforma, dispatch tizimi, SaaS yaratish, B2B platforma, custom admin panel",
                     ru: "разработка CRM, разработка ERP, автоматизация бизнеса, логистическая платформа, dispatch система, разработка SaaS, B2B платформа, кастомная админ-панель",
                     en: "CRM development, ERP development, business automation, logistics platform, dispatch system, SaaS development, B2B platform, custom admin panel" },
    },
    {
      slug: "branding-design",
      name:        { uz: "Branding & Design — premium vizual identifikatsiya",
                     ru: "Branding & Design — премиальная визуальная идентичность",
                     en: "Branding & Design — premium visual identity" },
      desc:        { uz: "Brand identity, logo, brand book, UI/UX va design system — biznes xalqaro his uyg'otadi.",
                     ru: "Brand identity, лого, brand book, UI/UX и design system — бизнес ощущается на международном уровне.",
                     en: "Brand identity, logo, brand book, UI/UX and design system — business that feels international." },
      serviceType: "Brand identity",
      minPrice: 1500, maxPrice: 25000,
      keywords:    { uz: "brand identity, logo yaratish, brand book, UI UX dizayn, design system, premium dizayn, korporativ dizayn, naming, motion design",
                     ru: "разработка brand identity, разработка логотипа, brand book, UI UX дизайн, design system, премиум дизайн, корпоративный дизайн, нейминг, motion design",
                     en: "brand identity development, logo design, brand book, UI UX design, design system, premium design, corporate design, naming, motion design" },
    },
    {
      slug: "infrastructure",
      name:        { uz: "Infrastructure & Technical — cloud, DevOps va integratsiyalar",
                     ru: "Infrastructure & Technical — cloud, DevOps и интеграции",
                     en: "Infrastructure & Technical — cloud, DevOps and integrations" },
      desc:        { uz: "Cloud, CI/CD, mikrosservislar, API integratsiyalari va xavfsizlik — 99.9% uptime va PCI-DSS / GDPR.",
                     ru: "Cloud, CI/CD, микросервисы, API-интеграции и безопасность — 99.9% uptime и PCI-DSS / GDPR.",
                     en: "Cloud, CI/CD, microservices, API integrations and security — 99.9% uptime and PCI-DSS / GDPR compliance." },
      serviceType: "Infrastructure",
      minPrice: 1000, maxPrice: 30000,
      keywords:    { uz: "DevOps O'zbekiston, CI CD pipeline, Kubernetes, cloud infrastructure, AWS GCP, mikroservis, API development, Click Payme Uzum integratsiya, 1C integratsiya, performance optimizatsiya, PCI DSS GDPR",
                     ru: "DevOps Узбекистан, CI CD пайплайн, Kubernetes, cloud-инфраструктура, AWS GCP, микросервис, разработка API, интеграция Click Payme Uzum, интеграция 1C, оптимизация производительности, PCI DSS GDPR",
                     en: "DevOps Uzbekistan, CI CD pipeline, Kubernetes, cloud infrastructure, AWS GCP, microservices, API development, Click Payme Uzum integration, 1C integration, performance optimisation, PCI DSS GDPR" },
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/${locale}#services-itemlist`,
    name:
      locale === "ru"
        ? "Digital growth & automation услуги в Узбекистане"
        : locale === "en"
        ? "Digital growth & automation services in Uzbekistan"
        : "O'zbekistonda digital growth va automation xizmatlari",
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
        // Inline Organization (Google ba'zida @id-only ref'larni tushunmaydi
        // va "<parent_node>" xatosi beradi). To'liq inline berib qo'yamiz.
        provider: {
          "@type": "Organization",
          name: "404Dev",
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Uzbekistan",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: s.minPrice,
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}
