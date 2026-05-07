import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/api";
import CTAButton from "@/components/CTAButton";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BotIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  InstagramIcon,
  PlugIcon,
  RocketIcon,
  SendIcon,
  SparklesIcon,
  ZapIcon,
} from "@/components/icons";

/* ============================================================
   404DEV — DIGITAL GROWTH AGENCY · 7 SERVICE PRACTICES
   Each entry packages services around a business outcome
   (more leads, faster ops, stronger brand, growing traffic),
   not as a flat list of deliverables.
   Full multilingual SEO keyword arrays per practice.
   ============================================================ */

type Practice = {
  slug: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: { uz: string; ru: string; en: string };
  title: { uz: string; ru: string; en: string };
  /** One-line outcome promise */
  tagline: { uz: string; ru: string; en: string };
  /** "Why this matters for your business" — positioning paragraph */
  what: { uz: string; ru: string; en: string };
  /** Capabilities packaged inside this practice */
  canDo: { uz: string[]; ru: string[]; en: string[] };
  /** How we deliver it — typical engagement steps */
  steps: { uz: string[]; ru: string[]; en: string[] };
  /** Business problems this practice solves */
  problems: { uz: string[]; ru: string[]; en: string[] };
  /** Outcomes the client gets */
  benefits: { uz: string[]; ru: string[]; en: string[] };
  /** Stack / partners — also signals depth to crawlers */
  stack: string[];
  /** SEO keywords for this practice — used in metadata */
  keywords: { uz: string[]; ru: string[]; en: string[] };
};

const PRACTICES: Practice[] = [
  /* ============================================================
     1 — SEO & GROWTH (lead with growth — strongest positioning)
     ============================================================ */
  {
    slug: "seo-growth",
    Icon: ZapIcon,
    badge: { uz: "01 / Growth", ru: "01 / Growth", en: "01 / Growth" },
    title: {
      uz: "SEO & Growth — qidiruv va organik o'sish",
      ru: "SEO & Growth — поисковая система роста",
      en: "SEO & Growth — organic growth engine",
    },
    tagline: {
      uz: "Texnik SEO, programmatic SEO va kontent strategiya — har oy o'sayotgan organik trafik.",
      ru: "Технический SEO, programmatic SEO и контент-стратегия — органический трафик, который растёт каждый месяц.",
      en: "Technical SEO, programmatic SEO and content strategy — organic traffic that compounds every month.",
    },
    what: {
      uz: "Reklamada har bir klik uchun to'laysiz, SEO esa bir marta to'g'ri qurilsa yillab natija beradi. Biz mijoz qidiruv natijalarining birinchi sahifasida sizni ko'radigan, raqobatchidan oldin bosadigan va sizning mijozingizga aylanadigan texnik infratuzilmani quramiz.",
      ru: "В рекламе вы платите за каждый клик. SEO, построенное правильно, продолжает приводить клиентов годами. Мы создаём техническую инфраструктуру, после которой клиент видит вас раньше конкурента и приходит именно к вам.",
      en: "Paid ads charge you for every click. SEO, when built right, keeps bringing clients for years. We build the technical infrastructure that makes clients find you before competitors — and choose you.",
    },
    canDo: {
      uz: [
        "Texnik SEO audit (Core Web Vitals, indexing, schema)",
        "On-page optimizatsiya (title, meta, heading, content)",
        "SEO arxitekturasi (URL strukturasi, internal linking)",
        "Programmatic SEO — minglab landing sahifalar avtomatik",
        "Lokal SEO — Google Business va Yandex Maps",
        "Ko'p tilli SEO (uz / ru / en) hreflang tarkibi bilan",
        "Kontent strategiya va keyword research",
        "Backlink yaratish va monitoring",
        "Google va Yandex'da brand SERP kuzatish",
        "Sayt tezligi va Core Web Vitals optimizatsiya",
      ],
      ru: [
        "Технический SEO-аудит (Core Web Vitals, индексация, schema)",
        "On-page оптимизация (title, meta, heading, content)",
        "SEO-архитектура (структура URL, перелинковка)",
        "Programmatic SEO — тысячи landing-страниц автоматически",
        "Локальный SEO — Google Business и Яндекс Карты",
        "Мультиязычное SEO (uz / ru / en) с hreflang",
        "Контент-стратегия и анализ ключей",
        "Наработка бэклинков и мониторинг",
        "Отслеживание брендового SERP в Google и Яндекс",
        "Оптимизация скорости сайта и Core Web Vitals",
      ],
      en: [
        "Technical SEO audit (Core Web Vitals, indexing, schema)",
        "On-page optimisation (title, meta, headings, content)",
        "SEO architecture (URL structure, internal linking)",
        "Programmatic SEO — thousands of landing pages automatically",
        "Local SEO — Google Business and Yandex Maps",
        "Multilingual SEO (uz / ru / en) with proper hreflang",
        "Content strategy and keyword research",
        "Backlink acquisition and monitoring",
        "Brand SERP tracking on Google and Yandex",
        "Site speed and Core Web Vitals optimisation",
      ],
    },
    steps: {
      uz: [
        "Audit — bugungi holat, raqobat va kalit so'zlar tahlili",
        "Strategiya — qaysi cluster'lar va qaysi sahifalar prioritet",
        "Texnik tuzatishlar (sayt tezligi, schema, sitemap, hreflang)",
        "Kontent yaratish va publishing taqvimi",
        "Backlink yig'ish va PR signal'lar",
        "Oylik hisobot — pozitsiya, trafik, konversiya",
      ],
      ru: [
        "Аудит — текущее состояние, конкуренты, ключи",
        "Стратегия — приоритетные кластеры и страницы",
        "Технические правки (скорость, schema, sitemap, hreflang)",
        "Контент-план и публикации",
        "Наращивание бэклинков и PR-сигналов",
        "Ежемесячный отчёт — позиции, трафик, конверсии",
      ],
      en: [
        "Audit — current state, competitors, keyword landscape",
        "Strategy — priority clusters and pages",
        "Technical fixes (speed, schema, sitemap, hreflang)",
        "Content roadmap and publishing",
        "Backlink acquisition and PR signals",
        "Monthly reporting — rankings, traffic, conversions",
      ],
    },
    problems: {
      uz: [
        "Sayt qidiruvda 5-sahifadan keyin",
        "Reklama byudjeti yondi, organik trafik 0",
        "Yandex'da bor, Google'da yo'q yoki teskari",
        "Yangi raqobatchi bizdan tepada chiqadi",
        "Sayt tezligi past, Core Web Vitals qizil",
      ],
      ru: [
        "Сайт болтается дальше 5-й страницы выдачи",
        "Бюджет на рекламу выгорает, органики ноль",
        "В Яндексе есть, в Google нет (или наоборот)",
        "Новый конкурент стоит выше нас",
        "Скорость сайта низкая, Core Web Vitals красные",
      ],
      en: [
        "Site lingers past page five of search",
        "Ad budget burns and organic traffic stays at zero",
        "Ranks on Yandex but not Google, or vice versa",
        "New competitors outrank you",
        "Slow site, Core Web Vitals in the red",
      ],
    },
    benefits: {
      uz: [
        "Har oy o'sayotgan organik trafik — birja emas, mehnatga investitsiya",
        "Mijoz reklamadan 5-10x arzonroq",
        "Brend qidirilishi tobora oshadi",
        "Yandex va Google'da bir vaqtda ko'rinasiz",
        "Lighthouse 95+, Core Web Vitals yashil",
      ],
      ru: [
        "Растущий органический трафик каждый месяц — это инвестиция, а не лотерея",
        "Клиент в 5-10 раз дешевле, чем из контекста",
        "Растёт брендовый трафик",
        "Видны в Google и Яндекс одновременно",
        "Lighthouse 95+, Core Web Vitals в зелёной зоне",
      ],
      en: [
        "Compounding organic traffic month over month — investment, not a lottery",
        "Customers 5–10x cheaper than from paid ads",
        "Branded search keeps growing",
        "Visible on both Google and Yandex",
        "Lighthouse 95+, Core Web Vitals all green",
      ],
    },
    stack: ["Google Search Console", "Yandex Webmaster", "Ahrefs", "Schema.org", "Lighthouse", "GSC API", "BigQuery"],
    keywords: {
      uz: [
        "SEO Toshkent", "SEO O'zbekiston", "SEO optimizatsiya", "Google SEO", "Yandex SEO",
        "qidiruvga chiqarish", "saytni 1-sahifaga olib chiqish", "texnik SEO audit",
        "kontent strategiyasi", "kalit so'zlar tahlili", "programmatic SEO",
        "lokal SEO Google Business", "Yandex Maps reyting", "ko'p tilli SEO",
        "backlink yaratish", "Core Web Vitals optimizatsiya", "sayt tezligi optimizatsiya",
        "growth marketing", "organik trafik o'stirish", "404Dev SEO",
      ],
      ru: [
        "SEO Ташкент", "SEO Узбекистан", "поисковое продвижение", "продвижение в Google", "продвижение в Яндексе",
        "технический SEO аудит", "контент-стратегия", "анализ ключевых слов", "programmatic SEO",
        "локальное SEO Google Business", "Яндекс Карты продвижение", "мультиязычное SEO",
        "наработка бэклинков", "оптимизация Core Web Vitals", "оптимизация скорости сайта",
        "growth marketing", "рост органического трафика", "вывод сайта в топ", "404Dev SEO",
      ],
      en: [
        "SEO Tashkent", "SEO Uzbekistan", "search engine optimisation", "Google SEO", "Yandex SEO",
        "technical SEO audit", "content strategy", "keyword research", "programmatic SEO",
        "local SEO Google Business", "Yandex Maps optimisation", "multilingual SEO hreflang",
        "backlink building", "Core Web Vitals optimisation", "site speed optimisation",
        "growth marketing", "organic traffic growth", "page one rankings", "404Dev SEO agency",
      ],
    },
  },

  /* ============================================================
     2 — LEAD GENERATION SYSTEMS
     ============================================================ */
  {
    slug: "lead-generation",
    Icon: RocketIcon,
    badge: { uz: "02 / Leads", ru: "02 / Leads", en: "02 / Leads" },
    title: {
      uz: "Lead Generation tizimlari — saytdan haqiqiy mijoz oqimi",
      ru: "Lead Generation — поток клиентов с сайта, а не «трафик»",
      en: "Lead Generation Systems — a real customer pipeline, not just traffic",
    },
    tagline: {
      uz: "Lid voronkalari, CRO, CRM va analitika — har bir tashrif lid'ga, har bir lid mijozga aylanadi.",
      ru: "Лид-воронки, CRO, CRM и аналитика — каждый визит становится лидом, каждый лид — клиентом.",
      en: "Lead funnels, CRO, CRM and analytics — every visitor becomes a lead, every lead becomes a customer.",
    },
    what: {
      uz: "Trafik o'zi pul keltirmaydi. Pul keltiradigan narsa — bu lid'ni ushlash, sotuv menejeriga yetkazish, eslatma va follow-up tizimi. Biz 360° tijoriy infratuzilmani o'rnatamiz: lead voronkasi, marketing automation, CRM va dashboard'lar.",
      ru: "Трафик сам по себе не приносит денег. Деньги приносит система: захват лида, передача менеджеру, напоминания и follow-up. Мы строим 360° коммерческую инфраструктуру — воронки, автоматизацию маркетинга, CRM и дашборды.",
      en: "Traffic alone doesn't make money. The system around it does: capture, hand-off to sales, reminders, and follow-ups. We set up the full commercial infrastructure — funnels, marketing automation, CRM and dashboards.",
    },
    canDo: {
      uz: [
        "Lead voronkalari (landing → forma → CRM)",
        "Konversiya optimizatsiyasi (CRO) va A/B test",
        "CRM integratsiyasi (Bitrix24, AmoCRM, HubSpot, custom)",
        "Marketing automation va trigger-based email/SMS",
        "Call tracking va WhatsApp/Telegram integratsiya",
        "Foydalanuvchi xulqi analitikasi (Hotjar, Microsoft Clarity)",
        "Sales dashboard va real-time hisobot",
        "Lid scoring va mijoz segmentatsiya",
        "Retargeting va lookalike auditoriyalar",
        "Konversiya audit va voronka diagnostikasi",
      ],
      ru: [
        "Лид-воронки (лендинг → форма → CRM)",
        "Конверсионная оптимизация (CRO) и A/B-тесты",
        "Интеграция CRM (Bitrix24, AmoCRM, HubSpot, custom)",
        "Marketing automation и триггерные email/SMS",
        "Call tracking и интеграция WhatsApp/Telegram",
        "Аналитика поведения (Hotjar, Microsoft Clarity)",
        "Sales-дашборд и real-time отчётность",
        "Скоринг лидов и сегментация клиентов",
        "Ретаргетинг и lookalike-аудитории",
        "Аудит конверсии и диагностика воронки",
      ],
      en: [
        "Lead funnels (landing → form → CRM)",
        "Conversion rate optimisation (CRO) and A/B testing",
        "CRM integration (Bitrix24, AmoCRM, HubSpot, custom)",
        "Marketing automation and trigger-based email/SMS",
        "Call tracking and WhatsApp/Telegram integration",
        "User behaviour analytics (Hotjar, Microsoft Clarity)",
        "Sales dashboards and real-time reporting",
        "Lead scoring and customer segmentation",
        "Retargeting and lookalike audiences",
        "Conversion audit and funnel diagnostics",
      ],
    },
    steps: {
      uz: [
        "Voronka audit — lid qayerda yo'qolayapti",
        "Hozirgi traffic va konversiya tahlili",
        "Voronka qayta loyiha (sahifa, forma, CRM oqim)",
        "CRM va marketing avtomatlashtirish o'rnatish",
        "Analytics dashboard va KPI o'lchov",
        "Iterativ optimizatsiya (A/B, segment, content)",
      ],
      ru: [
        "Аудит воронки — где теряется лид",
        "Анализ текущего трафика и конверсии",
        "Редизайн воронки (страницы, формы, поток в CRM)",
        "Настройка CRM и marketing automation",
        "Аналитика и KPI-дашборд",
        "Итеративная оптимизация (A/B, сегменты, контент)",
      ],
      en: [
        "Funnel audit — where leads drop off",
        "Current traffic and conversion analysis",
        "Funnel redesign (pages, forms, CRM flow)",
        "CRM and marketing automation setup",
        "Analytics and KPI dashboard",
        "Iterative optimisation (A/B, segments, content)",
      ],
    },
    problems: {
      uz: [
        "Trafik bor, ariza yo'q",
        "Lidlar Excel'da yo'qoladi yoki o'qilmaydi",
        "Sotuv menejeri kim, qachon, kimga zvonok qildi — bilinmaydi",
        "Marketing reklama'ga to'laydi, sotuv esa lid kelmaganidan shikoyat qiladi",
        "Reklama ROI ko'rinmaydi",
      ],
      ru: [
        "Трафик есть, заявок нет",
        "Лиды теряются в Excel или не дочитываются",
        "Не видно, кто и когда звонил клиенту",
        "Маркетинг платит за рекламу, продажи говорят «лидов нет»",
        "ROI рекламы не видно",
      ],
      en: [
        "You have traffic but no leads",
        "Leads get lost in Excel or never followed up",
        "No visibility into who called the lead, when",
        "Marketing buys traffic; sales says 'no leads'",
        "Ad ROI is invisible",
      ],
    },
    benefits: {
      uz: [
        "Konversiya 2-5x oshadi (real loyihalardan o'rtacha)",
        "Har bir lid avtomatik CRM'ga, hech qaysisi yo'qolmaydi",
        "Marketing va sotuv bitta dashboardda",
        "Reklama ROI shaffof — qaysi kanal foydali",
        "Sotuv menejeri kerakli vaqtda eslatma oladi",
      ],
      ru: [
        "Конверсия растёт в 2–5 раз (среднее по нашим проектам)",
        "Каждый лид сразу в CRM, ничего не теряется",
        "Маркетинг и продажи в одном дашборде",
        "Прозрачный ROI рекламы — какой канал зарабатывает",
        "Менеджеру приходят напоминания вовремя",
      ],
      en: [
        "Conversion lifts 2–5x (typical across our projects)",
        "Every lead lands in CRM — nothing is lost",
        "Marketing and sales in a single dashboard",
        "Ad ROI is transparent — which channel actually earns",
        "Reps get reminders at the right moment",
      ],
    },
    stack: ["GA4", "Google Tag Manager", "Yandex Metrica", "Hotjar", "Microsoft Clarity", "AmoCRM", "Bitrix24", "HubSpot", "Make / n8n", "Twilio", "WhatsApp Business API"],
    keywords: {
      uz: [
        "lead generation O'zbekiston", "lid voronkasi yaratish", "CRO konversiya optimizatsiyasi",
        "CRM integratsiya", "AmoCRM integratsiya", "Bitrix24 integratsiya", "HubSpot integratsiya",
        "marketing automation", "sales avtomatlashtirish", "call tracking O'zbekiston",
        "WhatsApp Business API integratsiya", "Telegram lid integratsiya",
        "analitika dashboard", "Yandex Metrica sozlash", "Google Analytics 4 sozlash",
        "lid scoring", "retargeting", "A/B test sayt", "konversiya audit",
      ],
      ru: [
        "лидогенерация Узбекистан", "лид-воронка под ключ", "CRO оптимизация конверсии",
        "интеграция CRM", "интеграция AmoCRM", "интеграция Bitrix24", "интеграция HubSpot",
        "marketing automation", "автоматизация продаж", "call tracking Ташкент",
        "интеграция WhatsApp Business API", "интеграция Telegram CRM",
        "аналитика дашборд", "настройка Яндекс Метрика", "настройка GA4",
        "скоринг лидов", "ретаргетинг", "A/B тестирование сайта", "аудит конверсии",
      ],
      en: [
        "lead generation Uzbekistan", "lead funnel agency", "conversion rate optimisation CRO",
        "CRM integration", "AmoCRM integration", "Bitrix24 integration", "HubSpot integration",
        "marketing automation", "sales automation", "call tracking Tashkent",
        "WhatsApp Business API integration", "Telegram CRM integration",
        "analytics dashboard", "Yandex Metrica setup", "GA4 setup",
        "lead scoring", "retargeting", "A/B testing", "conversion audit",
      ],
    },
  },

  /* ============================================================
     3 — INFLUENCER MARKETING (work with creators)
     ============================================================ */
  {
    slug: "influencer-marketing",
    Icon: InstagramIcon,
    badge: { uz: "03 / Influence", ru: "03 / Influence", en: "03 / Influence" },
    title: {
      uz: "Influencer Marketing — blogerlar bilan reklama",
      ru: "Influencer Marketing — реклама у блогеров",
      en: "Influencer Marketing — work with creators",
    },
    tagline: {
      uz: "O'zbekistonning eng kuchli blogerlari, sinovdan o'tgan formatlar — barcha vazifani biz o'z zimmamizga olamiz.",
      ru: "Лучшие блогеры Узбекистана, проверенные форматы — всю работу мы берём на себя.",
      en: "Uzbekistan's strongest creators and proven formats — we handle the entire workflow for you.",
    },
    what: {
      uz: "O'zbekistonda mijozning aksariyati Instagram, TikTok va Telegram'da. Lekin blogerlar bilan ishlash — bu bir necha haftalik kutish, kelishuv, tekst-kreativ tahriri va kim haqiqatan ham ishlayotganini bilmaslik. Biz bu zanjirning hammasini sizdan olib qo'yamiz: bloger tanlash, kelishuv, postni nazorat qilish va natijani o'lchash. Siz faqat byudjet va KPI'ni belgilaysiz.",
      ru: "В Узбекистане большинство клиентов сидят в Instagram, TikTok и Telegram. Но работа с блогерами — это недели ожидания ответа, согласования, правок текстов и непонимания, кто реально работает. Мы снимаем эту цепочку с вас целиком: подбор блогеров, переговоры, контроль публикаций и аналитика. От вас — только бюджет и KPI.",
      en: "In Uzbekistan, most customers live on Instagram, TikTok and Telegram. But working with creators means weeks of waiting, negotiating, editing copy, and never knowing who actually performs. We take that whole chain off your desk: creator selection, negotiation, publishing control and analytics. You only set the budget and KPIs.",
    },
    canDo: {
      uz: [
        "Sizning nishingiz va byudjetingizga mos blogerlarni tanlash",
        "Top, o'rta va nano-influencer'lar bilan ishlash",
        "Instagram, TikTok, Telegram, YouTube — barcha kanallar",
        "Reels, Stories, prymoy efir, integratsiya formatlari",
        "Tekst, ssenariy va kreativ tayyorlash",
        "Brend tone of voice'ni saqlash",
        "Bir vaqtda 5–50 bloger bilan kampaniya",
        "Promo personal — offline tadbirlar uchun",
        "Reklama oldidan va keyingi qamrov tahlili",
        "ROI hisobotlari — qancha bosish, lid, sotuv",
      ],
      ru: [
        "Подбор блогеров под нишу и бюджет",
        "Работа с топами, средними и nano-инфлюенсерами",
        "Instagram, TikTok, Telegram, YouTube — все каналы",
        "Reels, Stories, прямые эфиры, интеграции",
        "Подготовка текстов, сценариев, креативов",
        "Сохранение tone of voice бренда",
        "Кампании с 5–50 блогерами одновременно",
        "Промо-персонал на оффлайн-мероприятиях",
        "Аналитика охватов до и после публикации",
        "ROI-отчёт — клики, лиды, продажи",
      ],
      en: [
        "Creator picks tailored to your niche and budget",
        "Work with top, mid-tier and nano influencers",
        "Instagram, TikTok, Telegram, YouTube — every channel",
        "Reels, Stories, live streams, native integrations",
        "Copy, scripts and creatives prepared for you",
        "Brand tone of voice preserved",
        "Campaigns running 5–50 creators in parallel",
        "Promo staff for offline events",
        "Pre/post-publication reach analytics",
        "ROI reporting — clicks, leads, sales",
      ],
    },
    steps: {
      uz: [
        "Brif — auditoriya, byudjet, KPI va deadline",
        "Bloger va format tanlash (sizga ro'yxat tasdiqlash uchun)",
        "Kelishuv va shartnoma — narx tasdiqlanadi",
        "Tekst, ssenariy, kreativ tayyorlash",
        "Publish va real-time nazorat",
        "Yakuniy ROI hisobot va tavsiyalar",
      ],
      ru: [
        "Бриф — аудитория, бюджет, KPI и сроки",
        "Подбор блогеров и форматов (вы утверждаете список)",
        "Переговоры и договор — цена фиксируется",
        "Подготовка текстов, сценариев, креативов",
        "Публикация и контроль в реальном времени",
        "Финальный ROI-отчёт и рекомендации",
      ],
      en: [
        "Brief — audience, budget, KPIs and deadline",
        "Creator and format shortlist (you approve)",
        "Negotiation and contract — price locked",
        "Copy, script and creative production",
        "Publishing and real-time control",
        "Final ROI report and recommendations",
      ],
    },
    problems: {
      uz: [
        "Bloger 1–2 hafta davomida javob bermaydi",
        "Reklama qimmatga tushadi, lekin qamrov kam",
        "Qaysi bloger sizning nishingizga mos — bilmaysiz",
        "Tekst kelishuvi bir oy davom etadi",
        "Statistika kelgan, lekin natija borligini tushunmadingiz",
        "Bloger pul olib post chiqarmadi yoki tezda o'chirib tashladi",
      ],
      ru: [
        "Блогер не отвечает по 1–2 недели",
        "Реклама стоит дорого, а охватов мало",
        "Не знаете, какой блогер ваш",
        "Согласование текста длится месяц",
        "Статистика пришла, но непонятно — был результат или нет",
        "Блогер взял деньги, а пост не вышел или быстро удалил",
      ],
      en: [
        "Creators ghost you for 1–2 weeks",
        "Ads are expensive but reach is poor",
        "You don't know which creator fits your niche",
        "Copy approval drags on for a month",
        "Stats arrive but you can't tell if anything worked",
        "Creator took the money, never published — or pulled the post",
      ],
    },
    benefits: {
      uz: [
        "Siz blogerga emas, bizga yozasiz — tezroq javob",
        "Pulingiz xavfsiz: to'lov bosqichlarga bo'lingan",
        "Bloger nishingizga mos — tasodifiy emas, ma'lumot asosida",
        "Tekst, dizayn va publish — biz uchun, sizga deadline'gacha",
        "Shaffof ROI hisobot — har bir so'm qayerga ketganini ko'rasiz",
        "Bir kampaniyada o'nlab bloger — bitta shartnoma",
      ],
      ru: [
        "Вам не надо ждать блогера — пишете нам, отвечаем сразу",
        "Деньги в безопасности: оплата делится на этапы",
        "Подбор блогера под нишу — не наугад, на данных",
        "Тексты, дизайн и публикация — на нашей стороне, к дедлайну",
        "Прозрачный ROI — видите, куда ушёл каждый сум",
        "Десятки блогеров в одной кампании — один договор",
      ],
      en: [
        "You don't chase creators — you write to us, we respond fast",
        "Money is safe: payment is split into stages",
        "Creator picks driven by data, not gut",
        "Copy, design and publishing on us, on time",
        "Transparent ROI — every dollar accounted for",
        "Dozens of creators per campaign, under one contract",
      ],
    },
    stack: ["Instagram", "TikTok", "Telegram", "YouTube", "HypeAuditor", "trendHERO", "Yandex Metrica", "GA4", "UTM", "Bitly"],
    keywords: {
      uz: [
        "blogerlar reklama Toshkent", "blogerlar reklama O'zbekiston",
        "Instagram blogerlar O'zbekiston", "TikTok blogerlar reklama",
        "Telegram bloger reklamasi", "YouTube blogerlar O'zbekiston",
        "blogerlar bilan ishlash", "influence agentligi Toshkent",
        "blogerga reklama buyurtma", "blogerga ulanish O'zbekiston",
        "marketing agentligi O'zbekiston", "reklama agentligi Toshkent",
        "promo personal Toshkent", "promo personal O'zbekiston",
        "boburazz reklama", "lab influence O'zbekiston",
        "influence lab", "blogerlar narxi", "reklama narxi blogerda",
        "innovation marketing O'zbekiston", "404Dev influencer",
      ],
      ru: [
        "реклама у блогеров Ташкент", "реклама у блогеров Узбекистан",
        "Instagram блогеры Ташкент", "TikTok блогеры Узбекистан",
        "Telegram блогер реклама", "YouTube блогеры Узбекистан",
        "блогер по рекламе в Ташкенте", "как связаться с блогерами Узбекистана",
        "агентство маркетинга в Узбекистане", "агентство рекламы Узбекистан",
        "инфлюенс агентство Ташкент", "influence lab", "лаб инфлюенс",
        "инфлюенс лаб", "boburazz реклама", "boburazz блогер",
        "промо персонал в Узбекистане", "промо персонал Ташкент",
        "innovation marketing компания Узбекистан", "innovation marketing Ташкент",
        "курсы от узбекистанских агентств рекламы", "стоимость рекламы у блогера",
        "сколько стоит реклама у блогера", "404Dev инфлюенс",
      ],
      en: [
        "influencer marketing Uzbekistan", "influencer marketing Tashkent",
        "Instagram influencers Tashkent", "TikTok influencers Uzbekistan",
        "Telegram influencer ads", "YouTube influencers Uzbekistan",
        "Uzbek bloggers advertising", "Uzbek influencers agency",
        "marketing agency Uzbekistan", "advertising agency Tashkent",
        "influence lab Uzbekistan", "boburazz advertising",
        "promo staff Tashkent", "innovation marketing Uzbekistan",
        "creator economy Uzbekistan", "influencer marketing courses Uzbekistan",
        "how to contact bloggers Uzbekistan", "404Dev influencer agency",
      ],
    },
  },

  /* ============================================================
     4 — AI & AUTOMATION
     ============================================================ */
  {
    slug: "ai-automation",
    Icon: SparklesIcon,
    badge: { uz: "04 / AI", ru: "04 / AI", en: "04 / AI" },
    title: {
      uz: "AI & Automation — aqlli avtomatlashtirish",
      ru: "AI & Automation — умная автоматизация бизнеса",
      en: "AI & Automation — intelligent business automation",
    },
    tagline: {
      uz: "AI chatbotlar, Telegram avtomatlashtirish, ish jarayonlari va aqlli yordamchilar — kompaniyaga 24/7 ishlovchi raqamli xodim.",
      ru: "AI чат-боты, автоматизация Telegram, рабочие процессы и умные ассистенты — цифровой сотрудник, который работает 24/7.",
      en: "AI chatbots, Telegram automation, workflows and smart assistants — a digital employee that works 24/7.",
    },
    what: {
      uz: "2026-yil — bu “AI orqali ishlash” yili. GPT, Gemini va custom LLM'lar mijozlarga javob bera oladi, hujjat tahlil qiladi, yetakchilarga hisobot tayyorlaydi va menejer o'rniga marshrut tuzadi. Biz buni biznes jarayoningizga professional integratsiya qilamiz — chiqaradigan natijasi bilan.",
      ru: "2026 — год «работы через AI». GPT, Gemini и кастомные LLM умеют отвечать клиентам, анализировать документы, готовить отчёты для CEO и составлять маршруты вместо менеджера. Мы профессионально встраиваем это в ваши процессы — с измеримым результатом.",
      en: "2026 is the year of working through AI. GPT, Gemini and custom LLMs can answer customers, analyse documents, prepare CEO reports and plan routes in place of a dispatcher. We integrate this into your business with measurable outcomes.",
    },
    canDo: {
      uz: [
        "AI chatbot (sayt + Telegram + WhatsApp) — RAG bilan",
        "AI support agent — biznes bilim bazasi asosida",
        "Telegram avtomatlashtirish — buyurtma, to'lov, marshrut",
        "Workflow automation (n8n, Make, Zapier, custom)",
        "Hujjat tahlili va kontent generatsiya",
        "Ovozli AI agentlar (call automation)",
        "Smart analytics — ma'lumotdan tezkor xulosa",
        "AI operator (sotuv, qo'llab-quvvatlash)",
        "OpenAI, Anthropic, Gemini, custom model integratsiya",
        "AI safety, prompt versioning, observability",
      ],
      ru: [
        "AI чат-бот (сайт + Telegram + WhatsApp) с RAG",
        "AI support agent на базе вашей базы знаний",
        "Автоматизация Telegram — заказы, оплата, маршруты",
        "Workflow automation (n8n, Make, Zapier, custom)",
        "Анализ документов и генерация контента",
        "Голосовые AI-агенты (автоматизация звонков)",
        "Smart analytics — выводы из данных в один клик",
        "AI-оператор (продажи, поддержка)",
        "Интеграция OpenAI, Anthropic, Gemini и кастомных моделей",
        "AI safety, версионирование промптов, observability",
      ],
      en: [
        "AI chatbot (site + Telegram + WhatsApp) with RAG",
        "AI support agent grounded in your knowledge base",
        "Telegram automation — orders, payments, routing",
        "Workflow automation (n8n, Make, Zapier, custom)",
        "Document analysis and content generation",
        "Voice AI agents (call automation)",
        "Smart analytics — insights from raw data",
        "AI operator (sales, support)",
        "OpenAI, Anthropic, Gemini and custom model integration",
        "AI safety, prompt versioning, observability",
      ],
    },
    steps: {
      uz: [
        "Process audit — qaysi vazifani AI bajarishi mumkin",
        "Bilim bazasi tayyorlash (vector store + RAG)",
        "Prompt strategiya va guardrail",
        "Integratsiya (sayt, Telegram, CRM, telefon)",
        "Test (real user simulyatsiya)",
        "Production launch + monitoring",
      ],
      ru: [
        "Process audit — какие задачи может закрыть AI",
        "Сборка базы знаний (vector store + RAG)",
        "Промпт-стратегия и guardrail",
        "Интеграция (сайт, Telegram, CRM, телефон)",
        "Тестирование (симуляция реальных пользователей)",
        "Запуск в production + мониторинг",
      ],
      en: [
        "Process audit — which tasks AI can close",
        "Knowledge base build (vector store + RAG)",
        "Prompt strategy and guardrails",
        "Integration (site, Telegram, CRM, phone)",
        "Testing (real-user simulation)",
        "Production launch + monitoring",
      ],
    },
    problems: {
      uz: [
        "Mijoz tunda yozadi — operator yo'q",
        "Operatorlar bir xil savolga 100 marta javob beradi",
        "Hujjat tahlili kuniga 4 soat oladi",
        "Telefon orqali sotuv — kechki vaqtga yetib bormaydi",
        "Bilim ish stolida o'tirgan kishi miyasida — u ketsa, yo'qoladi",
      ],
      ru: [
        "Клиент пишет ночью — оператора нет",
        "Операторы 100 раз отвечают на одно и то же",
        "Анализ документов отнимает по 4 часа в день",
        "Телефонные продажи не успевают до вечера",
        "Знание сидит в голове сотрудника — уйдёт он, уйдёт и оно",
      ],
      en: [
        "Customers message at night — no agent on shift",
        "Agents answer the same question 100 times",
        "Document review eats 4 hours a day",
        "Phone sales can't reach prospects in time",
        "Knowledge lives in employees' heads — they leave, it leaves",
      ],
    },
    benefits: {
      uz: [
        "Mijozlar 24/7 javob oladi, NPS ko'tariladi",
        "Operator vaqti 60-80% gacha tejaladi",
        "Hujjat tahlili sekundlarda",
        "Bilim bazasi kompaniyaga tegishli — xodim ketsa ham qoladi",
        "Sotuv qo'ng'iroqlari avtomatlashtirilgan",
      ],
      ru: [
        "Клиент получает ответ 24/7 — растёт NPS",
        "Время оператора экономится на 60–80%",
        "Анализ документов за секунды",
        "Знание принадлежит компании, а не сотруднику",
        "Продажные звонки автоматизированы",
      ],
      en: [
        "Customers get answers 24/7 — NPS goes up",
        "Operator time saved by 60–80%",
        "Document analysis in seconds",
        "Knowledge belongs to the company, not the employee",
        "Sales calls are automated",
      ],
    },
    stack: ["OpenAI", "Anthropic Claude", "Gemini", "LangChain", "LlamaIndex", "Pinecone", "pgvector", "n8n", "Make", "Telegram Bot API", "Twilio", "ElevenLabs"],
    keywords: {
      uz: [
        "AI integratsiya", "sun'iy intellekt", "GPT integratsiya", "ChatGPT bot yaratish",
        "Gemini API integratsiya", "AI chatbot", "AI assistent yaratish", "RAG yechim",
        "Telegram avtomatlashtirish", "workflow automation", "n8n O'zbekiston",
        "Make Zapier integratsiya", "AI support agent", "AI operator", "ovozli AI",
        "biznes avtomatlashtirish", "AI sotuv", "ChatGPT biznes uchun", "404Dev AI agency",
      ],
      ru: [
        "AI интеграция", "искусственный интеллект", "GPT интеграция", "ChatGPT бот разработка",
        "Gemini API интеграция", "AI чат-бот", "AI ассистент для бизнеса", "RAG решение",
        "автоматизация Telegram", "workflow automation", "n8n Узбекистан",
        "интеграция Make Zapier", "AI support агент", "AI оператор", "голосовой AI",
        "автоматизация бизнеса", "AI продажи", "ChatGPT для бизнеса", "404Dev AI agency",
      ],
      en: [
        "AI integration", "artificial intelligence", "GPT integration", "ChatGPT bot development",
        "Gemini API integration", "AI chatbot", "AI business assistant", "RAG solution",
        "Telegram automation", "workflow automation", "n8n agency",
        "Make Zapier integration", "AI support agent", "AI operator", "voice AI",
        "business automation", "AI sales agent", "ChatGPT for business", "404Dev AI agency",
      ],
    },
  },

  /* ============================================================
     5 — WEB DEVELOPMENT
     ============================================================ */
  {
    slug: "web-development",
    Icon: CodeIcon,
    badge: { uz: "05 / Web", ru: "05 / Web", en: "05 / Web" },
    title: {
      uz: "Web Development — yuqori konversiya saytlari va platformalar",
      ru: "Web Development — конверсионные сайты и платформы",
      en: "Web Development — high-conversion sites and platforms",
    },
    tagline: {
      uz: "Korporativ sayt, landing, e-commerce va SaaS platformalar — Next.js, tezkor, SEO-tayyor.",
      ru: "Корпоративные сайты, лендинги, e-commerce и SaaS-платформы — Next.js, быстро, SEO-готово.",
      en: "Corporate sites, landings, e-commerce and SaaS platforms — Next.js, fast, SEO-ready.",
    },
    what: {
      uz: "Sayt — bu shunchaki vizit kartochka emas, bu eng arzon va tinmas sotuvchingiz. Biz sayt yasashda dizaynni emas, biznes natijani birinchi qo'yamiz: konversiya, tezlik, SEO va keyingi o'sishga tayyorlik. Har bir piksel — sotishga ishlaydi.",
      ru: "Сайт — это не визитка, а самый дешёвый и неутомимый продавец. Мы строим не «красиво», а «прибыльно»: конверсия, скорость, SEO и готовность к росту. Каждый пиксель должен зарабатывать.",
      en: "A website isn't a business card — it's your cheapest and most tireless sales rep. We build for outcomes, not aesthetics: conversion, speed, SEO and readiness for scale. Every pixel earns.",
    },
    canDo: {
      uz: [
        "Korporativ saytlar va landing page'lar",
        "High-performance saytlar (Lighthouse 95+)",
        "E-commerce platformalar (Click, Payme, Uzum, Stripe)",
        "Multi-tenant SaaS platformalar",
        "Custom admin panel va headless CMS",
        "Multi-language saytlar (uz / ru / en) hreflang bilan",
        "Konversiya-driven UX/UI (CTA, voronka, micro-copy)",
        "A/B testing va personalizatsiya",
        "Booking, rezervatsiya, ko'p bosqichli formalar",
        "Subscription / membership saytlar",
      ],
      ru: [
        "Корпоративные сайты и лендинги",
        "High-performance сайты (Lighthouse 95+)",
        "E-commerce платформы (Click, Payme, Uzum, Stripe)",
        "Multi-tenant SaaS-платформы",
        "Кастомные админ-панели и headless CMS",
        "Мультиязычные сайты (uz / ru / en) с hreflang",
        "Конверсионный UX/UI (CTA, воронка, микрокопи)",
        "A/B-тестирование и персонализация",
        "Booking, бронирование, многошаговые формы",
        "Subscription / membership сайты",
      ],
      en: [
        "Corporate sites and landing pages",
        "High-performance sites (Lighthouse 95+)",
        "E-commerce platforms (Click, Payme, Uzum, Stripe)",
        "Multi-tenant SaaS platforms",
        "Custom admin panels and headless CMS",
        "Multilingual sites (uz / ru / en) with hreflang",
        "Conversion-driven UX/UI (CTA, funnel, microcopy)",
        "A/B testing and personalisation",
        "Booking, reservations, multi-step forms",
        "Subscription / membership sites",
      ],
    },
    steps: {
      uz: [
        "Brif — biznes maqsad, mijoz va voronka",
        "Information arxitektura va wireframe",
        "Brand-aligned UX/UI dizayn",
        "Frontend (Next.js) + backend + CMS",
        "SEO va tezlik optimizatsiya",
        "QA, deploy va analytics sozlash",
      ],
      ru: [
        "Бриф — бизнес-цель, клиент, воронка",
        "Информационная архитектура и wireframe",
        "Brand-aligned UX/UI-дизайн",
        "Frontend (Next.js) + бэкенд + CMS",
        "SEO и оптимизация скорости",
        "QA, деплой и настройка аналитики",
      ],
      en: [
        "Brief — business goal, customer, funnel",
        "Information architecture and wireframes",
        "Brand-aligned UX/UI design",
        "Frontend (Next.js) + backend + CMS",
        "SEO and speed optimisation",
        "QA, deploy and analytics setup",
      ],
    },
    problems: {
      uz: [
        "Eski sayt sekin, mobilda buziladi, Google'da chiqmaydi",
        "Mijoz qaytib kelmaydi, konversiya past",
        "Kontentni o'zingiz boshqara olmaysiz",
        "E-commerce uchun to'lov tizimi noaniq",
        "Sayt brand'ni kuchsiz aks ettiradi",
      ],
      ru: [
        "Старый сайт медленный, на мобильном ломается, в Google не виден",
        "Клиенты не возвращаются, конверсия низкая",
        "Контентом нельзя управлять самостоятельно",
        "Платежи на сайте не настроены",
        "Сайт слабо отражает бренд",
      ],
      en: [
        "Old site is slow, breaks on mobile, invisible in Google",
        "Visitors don't come back, conversion is low",
        "You can't manage content yourself",
        "E-commerce payments aren't set up properly",
        "The site barely reflects your brand",
      ],
    },
    benefits: {
      uz: [
        "Lighthouse 95+, Core Web Vitals yashil",
        "Schema.org va sitemap → tezroq indexing",
        "Kontentni o'zingiz tahrirlaysiz",
        "To'lov, yetkazib berish, CRM — hammasi ulangan",
        "Brand identitysi har sahifada hissiyot uyg'otadi",
      ],
      ru: [
        "Lighthouse 95+, Core Web Vitals в зелёном",
        "Schema.org и sitemap → быстрая индексация",
        "Управляете контентом сами",
        "Оплата, доставка, CRM — всё подключено",
        "Брендовая идентичность работает на каждой странице",
      ],
      en: [
        "Lighthouse 95+, Core Web Vitals all green",
        "Schema.org and sitemap → fast indexing",
        "You manage content yourself",
        "Payments, delivery and CRM — all wired up",
        "Brand identity is felt on every page",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Sanity / Strapi", "PostgreSQL", "Vercel", "AWS", "Click / Payme / Uzum"],
    keywords: {
      uz: [
        "sayt yaratish Toshkent", "sayt yasash", "sayt buyurtma berish",
        "korporativ sayt", "landing page yasash", "e-commerce sayt",
        "internet do'kon yaratish", "Next.js sayt", "tezkor sayt",
        "Lighthouse 95+", "ko'p tilli sayt", "headless CMS",
        "konversiya optimizatsiyasi sayt", "SaaS platforma yaratish",
        "premium web studio Toshkent", "custom admin panel",
      ],
      ru: [
        "разработка сайтов Ташкент", "сайт под ключ", "заказать сайт",
        "корпоративный сайт", "лендинг под ключ", "e-commerce разработка",
        "интернет магазин под ключ", "сайт на Next.js", "быстрый сайт",
        "Lighthouse 95+", "мультиязычный сайт", "headless CMS",
        "оптимизация конверсии сайта", "SaaS-платформа разработка",
        "премиум веб студия Ташкент", "кастомная админ панель",
      ],
      en: [
        "web development Tashkent", "custom website development", "order a website",
        "corporate website", "landing page development", "e-commerce development",
        "online store development", "Next.js website", "fast website",
        "Lighthouse 95+", "multilingual website", "headless CMS",
        "conversion website optimisation", "SaaS platform development",
        "premium web studio Tashkent", "custom admin panel development",
      ],
    },
  },

  /* ============================================================
     6 — BUSINESS SYSTEMS (CRM/ERP/SaaS)
     ============================================================ */
  {
    slug: "business-systems",
    Icon: DatabaseIcon,
    badge: { uz: "06 / Systems", ru: "06 / Systems", en: "06 / Systems" },
    title: {
      uz: "Business Systems — ichki platformalar va SaaS",
      ru: "Business Systems — внутренние платформы и SaaS",
      en: "Business Systems — internal platforms and SaaS",
    },
    tagline: {
      uz: "CRM, ERP, dispatch, logistika va SaaS platformalar — kompaniyaning butun jarayoni bitta tizimda.",
      ru: "CRM, ERP, dispatch, логистика и SaaS-платформы — все процессы компании в одной системе.",
      en: "CRM, ERP, dispatch, logistics and SaaS platforms — every company process in one system.",
    },
    what: {
      uz: "Excel'da ishlash — bir necha xodimgacha. 10+ xodim bo'lganda hujjatlar yo'qoladi, hisobotlar uch kunda chiqadi va direktor real holatni bilolmaydi. Biz B2B-darajadagi muhandislik bilan custom CRM, ERP, dispatch va SaaS qiluvchi tizimlarni yaratamiz — har bir biznes mantig'iga moslashtirilgan.",
      ru: "Excel работает до нескольких сотрудников. На 10+ начинают теряться документы, отчёты делаются 3 дня, а директор не видит реальное положение. Мы строим custom CRM, ERP, dispatch и SaaS на инженерном B2B-уровне — под каждую бизнес-логику.",
      en: "Excel works for a few people. With 10+ documents get lost, reports take three days and the CEO can't see what's really going on. We build custom CRM, ERP, dispatch and SaaS at engineering-grade B2B quality — tailored to your business logic.",
    },
    canDo: {
      uz: [
        "CRM tizimlari (sales pipeline, lid bazasi, marketing)",
        "ERP tizimlari (omborxona, hujjatlar, hisobot)",
        "Logistika va dispatch platformalari",
        "Multi-tenant SaaS mahsulotlar",
        "Rol va ruxsat tizimi (ABAC/RBAC)",
        "Real-time analytics dashboard",
        "Document workflow va e-imzo",
        "1C, MoySklad va boshqa accounting integratsiya",
        "Mobile-friendly admin panel",
        "Custom API va integratsiya qatlami",
      ],
      ru: [
        "CRM-системы (sales pipeline, база лидов, маркетинг)",
        "ERP-системы (склад, документы, отчётность)",
        "Платформы логистики и диспатча",
        "Multi-tenant SaaS-продукты",
        "Система ролей и прав (ABAC/RBAC)",
        "Real-time дашборды",
        "Документооборот и e-подпись",
        "Интеграция с 1C, МойСклад и др. учётными",
        "Mobile-friendly админ-панель",
        "Кастомный API и слой интеграций",
      ],
      en: [
        "CRM systems (sales pipeline, lead database, marketing)",
        "ERP systems (inventory, documents, reporting)",
        "Logistics and dispatch platforms",
        "Multi-tenant SaaS products",
        "Role and permission systems (ABAC/RBAC)",
        "Real-time analytics dashboards",
        "Document workflow and e-signature",
        "1C, MoySklad and other accounting integrations",
        "Mobile-friendly admin panel",
        "Custom API and integration layer",
      ],
    },
    steps: {
      uz: [
        "Biznes process audit — kim, nima qiladi, qachon",
        "Tizim arxitekturasi va modullar rejasi",
        "Backend, dashboard, mobil access",
        "Mavjud ma'lumotlar import",
        "Xodimlarni o'qitish va onboarding",
        "Production launch va support",
      ],
      ru: [
        "Аудит бизнес-процессов",
        "Архитектура системы и модули",
        "Backend, дашборд, мобильный доступ",
        "Импорт существующих данных",
        "Обучение команды и onboarding",
        "Production launch и сопровождение",
      ],
      en: [
        "Business process audit",
        "System architecture and modules",
        "Backend, dashboard, mobile access",
        "Import existing data",
        "Team training and onboarding",
        "Production launch and support",
      ],
    },
    problems: {
      uz: [
        "Excel hamma joyda — hech kim aniq bilmaydi",
        "Hisobotlar 3 kun yig'iladi, eskirgan",
        "Xodim ketsa — ma'lumot yo'qoladi",
        "Direktor real holatni ko'ra olmaydi",
        "Bir buyurtma 3 ta tizimga qo'lda yoziladi",
      ],
      ru: [
        "Excel везде, никто точно не знает",
        "Отчёты собираются 3 дня и устаревают",
        "Уходит сотрудник — теряются данные",
        "Директор не видит реальное положение",
        "Один заказ — три системы вручную",
      ],
      en: [
        "Excel everywhere, nobody knows for sure",
        "Reports take 3 days and arrive stale",
        "Employee leaves — data is lost",
        "CEO can't see the real picture",
        "One order entered into three systems by hand",
      ],
    },
    benefits: {
      uz: [
        "Real-time tijoriy ko'rsatkichlar",
        "Xodim ketsa ham ish to'xtamaydi",
        "Hujjat qidirib kun ketmaydi",
        "Direktor uchun yagona dashboard",
        "Kompaniya skalable — yangi shahar/tarmoq oson",
      ],
      ru: [
        "Бизнес-метрики в real-time",
        "Уход сотрудника — не катастрофа",
        "Документы за секунды",
        "Один дашборд для CEO",
        "Компания масштабируется без боли",
      ],
      en: [
        "Real-time business metrics",
        "Losing a person isn't a disaster",
        "Documents in seconds",
        "One dashboard for the CEO",
        "Company scales without pain",
      ],
    },
    stack: ["Go", "Node.js", "PostgreSQL", "React", "Redis", "S3", "Kafka", "RabbitMQ", "Kubernetes"],
    keywords: {
      uz: [
        "CRM tizim yaratish", "ERP tizim yaratish", "biznes avtomatlashtirish",
        "savdo avtomatlashtirish", "logistika platforma", "dispatch tizimi",
        "SaaS platforma yaratish", "B2B platforma", "ichki kompaniya tizimi",
        "rol va ruxsat tizimi", "real-time dashboard", "document workflow",
        "1C integratsiya", "MoySklad integratsiya", "custom admin panel",
      ],
      ru: [
        "разработка CRM", "разработка ERP", "автоматизация бизнеса",
        "автоматизация продаж", "логистическая платформа", "dispatch система",
        "разработка SaaS", "B2B платформа", "внутренняя система компании",
        "система ролей и прав", "real-time дашборд", "документооборот",
        "интеграция 1С", "интеграция МойСклад", "кастомная админ панель",
      ],
      en: [
        "CRM development", "ERP development", "business automation",
        "sales automation", "logistics platform", "dispatch system",
        "SaaS development", "B2B platform", "internal company system",
        "RBAC ABAC system", "real-time dashboard", "document workflow",
        "1C integration", "MoySklad integration", "custom admin panel",
      ],
    },
  },

  /* ============================================================
     7 — BRANDING & DESIGN
     ============================================================ */
  {
    slug: "branding-design",
    Icon: BotIcon,
    badge: { uz: "07 / Brand", ru: "07 / Brand", en: "07 / Brand" },
    title: {
      uz: "Branding & Design — premium darajadagi vizual identifikatsiya",
      ru: "Branding & Design — премиальная визуальная идентичность",
      en: "Branding & Design — premium visual identity",
    },
    tagline: {
      uz: "Brand identity, logo, brand book, UI/UX va design system — biznesingiz xalqaro his uyg'otadi.",
      ru: "Brand identity, лого, brand book, UI/UX и design system — бизнес ощущается на международном уровне.",
      en: "Brand identity, logo, brand book, UI/UX and design system — your business feels international.",
    },
    what: {
      uz: "Brand — bu logo emas, bu odamlar sizni qanday his qilishi. Premium narx, ishonch va xalqaro daraja birinchi 3 sekundda hal qilinadi. Biz brendingizning butun vizual va his qilinadigan tilini quramiz — logodan tortib mahsulot UX'gacha.",
      ru: "Бренд — это не лого, а ощущение, которое возникает у клиента. Премиальная цена, доверие и международный уровень — это решается в первые 3 секунды. Мы строим всю визуальную и тактильную систему бренда — от лого до UX продукта.",
      en: "A brand isn't a logo — it's the feeling people get from you. Premium pricing, trust and international perception are decided in the first 3 seconds. We build the full visual and experiential language — from logo to product UX.",
    },
    canDo: {
      uz: [
        "Brand identity (logo, palette, typography)",
        "Brand book va guideline",
        "Tone of voice va messaging",
        "UI/UX design (web, mobile, dashboard)",
        "Design system va component library",
        "Marketing materiallar (social, presentation, banner)",
        "Pitch deck va investor materiallar",
        "Brand naming va positioning",
        "Iconography va illustration",
        "Motion design va micro-animation",
      ],
      ru: [
        "Brand identity (лого, палитра, типографика)",
        "Brand book и гайдлайны",
        "Tone of voice и messaging",
        "UI/UX дизайн (web, mobile, dashboard)",
        "Design system и библиотека компонентов",
        "Маркетинговые материалы (соцсети, презентации, баннеры)",
        "Pitch deck и материалы для инвесторов",
        "Brand naming и позиционирование",
        "Иконография и иллюстрации",
        "Motion design и микро-анимация",
      ],
      en: [
        "Brand identity (logo, palette, typography)",
        "Brand book and guidelines",
        "Tone of voice and messaging",
        "UI/UX design (web, mobile, dashboard)",
        "Design system and component library",
        "Marketing materials (social, presentation, banners)",
        "Pitch decks and investor materials",
        "Brand naming and positioning",
        "Iconography and illustration",
        "Motion design and micro-animation",
      ],
    },
    steps: {
      uz: [
        "Brand discovery — qadriyat, mijoz, raqobatchi",
        "Positioning va tone of voice",
        "Visual exploration (mood-board, direction)",
        "Logo, palette va typography",
        "Brand book va guideline",
        "UI kit va asset eksport",
      ],
      ru: [
        "Brand discovery — ценности, клиент, конкуренты",
        "Позиционирование и tone of voice",
        "Визуальное исследование (мудборд, направления)",
        "Лого, палитра и типографика",
        "Brand book и гайдлайны",
        "UI kit и экспорт ассетов",
      ],
      en: [
        "Brand discovery — values, customer, competitors",
        "Positioning and tone of voice",
        "Visual exploration (mood-boards, direction)",
        "Logo, palette and typography",
        "Brand book and guidelines",
        "UI kit and asset export",
      ],
    },
    problems: {
      uz: [
        "Brand “arzon” bo'lib ko'rinadi, premium narx olishni qiyin qiladi",
        "Logo va materiallar bir-biriga mos kelmaydi",
        "Yangi xodim brendni qanday tatbiq qilishni bilmaydi",
        "Sayt va Instagram boshqa-boshqa kompaniyaga o'xshaydi",
        "Investorga ko'rsatish uchun jiddiy materiallar yo'q",
      ],
      ru: [
        "Бренд выглядит «дёшево» — мешает ставить премиальную цену",
        "Лого и материалы не сочетаются между собой",
        "Новые сотрудники не знают, как применять бренд",
        "Сайт и Instagram выглядят как две разные компании",
        "Нет серьёзных материалов для инвесторов",
      ],
      en: [
        "Brand looks 'cheap' — blocks premium pricing",
        "Logo and assets don't speak the same language",
        "New employees don't know how to use the brand",
        "Site and Instagram look like two different companies",
        "No serious materials for investors",
      ],
    },
    benefits: {
      uz: [
        "Brend xalqaro darajada his qilinadi",
        "Premium narx — odamlar tushunadi nima uchun",
        "Brand book — har bir xodim brand'ni to'g'ri qo'llaydi",
        "Barcha kanallar bitta brendni gapiradi",
        "Investor va B2B mijozlar uchun jiddiy",
      ],
      ru: [
        "Бренд ощущается на международном уровне",
        "Премиальная цена — клиент понимает, за что платит",
        "Brand book — все сотрудники применяют бренд правильно",
        "Все каналы говорят одним языком бренда",
        "Серьёзный для инвесторов и B2B-клиентов",
      ],
      en: [
        "Brand feels international",
        "Premium pricing — customers understand the value",
        "Brand book — everyone applies the brand consistently",
        "Every channel speaks one brand language",
        "Serious for investors and B2B clients",
      ],
    },
    stack: ["Figma", "Adobe Illustrator", "After Effects", "Lottie", "Storybook", "Tailwind CSS"],
    keywords: {
      uz: [
        "brand identity yaratish", "logo yaratish", "brand book", "brending O'zbekiston",
        "UI UX dizayn", "design system", "premium dizayn studio", "korporativ dizayn",
        "tone of voice", "brand positioning", "naming", "iconography",
        "motion design", "pitch deck dizayn", "social media branding",
      ],
      ru: [
        "разработка brand identity", "разработка логотипа", "brand book", "брендинг Узбекистан",
        "UI UX дизайн", "design system", "премиум дизайн студия", "корпоративный дизайн",
        "tone of voice", "позиционирование бренда", "нейминг", "иконография",
        "motion design", "дизайн pitch deck", "social media брендинг",
      ],
      en: [
        "brand identity development", "logo design", "brand book", "branding Uzbekistan",
        "UI UX design", "design system", "premium design studio", "corporate design",
        "tone of voice", "brand positioning", "naming", "iconography",
        "motion design", "pitch deck design", "social media branding",
      ],
    },
  },

  /* ============================================================
     8 — INFRASTRUCTURE & TECHNICAL
     ============================================================ */
  {
    slug: "infrastructure",
    Icon: PlugIcon,
    badge: { uz: "08 / Infra", ru: "08 / Infra", en: "08 / Infra" },
    title: {
      uz: "Infrastructure & Technical — cloud, DevOps va integratsiyalar",
      ru: "Infrastructure & Technical — cloud, DevOps и интеграции",
      en: "Infrastructure & Technical — cloud, DevOps and integrations",
    },
    tagline: {
      uz: "Cloud, CI/CD, mikrosservislar, API va xavfsizlik — texnik fundament barqaror va skalable.",
      ru: "Cloud, CI/CD, микросервисы, API и безопасность — техническая основа стабильна и масштабируема.",
      en: "Cloud, CI/CD, microservices, APIs and security — a stable, scalable technical foundation.",
    },
    what: {
      uz: "Mahsulot tez yuklansa, hech qachon yiqilmasa va xavfsiz bo'lsa — bu marketing emas, bu muhandislik. Biz infratuzilmani biznes uchun ko'rinmas, lekin har soat ishlovchi qilib quramiz: serverlar, deploy pipeline, mikrosservislar va xavfsizlik.",
      ru: "Когда продукт грузится быстро, никогда не падает и защищён — это не маркетинг, это инженерия. Мы собираем инфраструктуру так, чтобы для бизнеса она была невидимой, но работала каждую секунду: серверы, CI/CD, микросервисы и безопасность.",
      en: "When a product loads fast, never falls over and is secure — that's not marketing, that's engineering. We build infrastructure that's invisible to the business but runs every second: servers, CI/CD, microservices and security.",
    },
    canDo: {
      uz: [
        "Cloud infrastructure (AWS, GCP, Azure, Hetzner)",
        "DevOps va CI/CD pipeline",
        "Mikrosservislar arxitekturasi",
        "Containerization (Docker, Kubernetes)",
        "API development (REST, GraphQL, gRPC, Webhook)",
        "Click, Payme, Uzum, 1C, marketplace integratsiyalar",
        "Xavfsizlik audit va GDPR/PCI-DSS compliance",
        "Performance optimizatsiya",
        "Monitoring va observability (Grafana, Prometheus, Sentry)",
        "Database engineering (PostgreSQL, ClickHouse, Redis)",
      ],
      ru: [
        "Cloud-инфраструктура (AWS, GCP, Azure, Hetzner)",
        "DevOps и CI/CD-пайплайны",
        "Микросервисная архитектура",
        "Containerization (Docker, Kubernetes)",
        "Разработка API (REST, GraphQL, gRPC, Webhook)",
        "Интеграции Click, Payme, Uzum, 1C, маркетплейсы",
        "Аудит безопасности и GDPR/PCI-DSS compliance",
        "Оптимизация производительности",
        "Monitoring и observability (Grafana, Prometheus, Sentry)",
        "Database engineering (PostgreSQL, ClickHouse, Redis)",
      ],
      en: [
        "Cloud infrastructure (AWS, GCP, Azure, Hetzner)",
        "DevOps and CI/CD pipelines",
        "Microservices architecture",
        "Containerisation (Docker, Kubernetes)",
        "API development (REST, GraphQL, gRPC, Webhook)",
        "Click, Payme, Uzum, 1C, marketplace integrations",
        "Security audit and GDPR/PCI-DSS compliance",
        "Performance optimisation",
        "Monitoring and observability (Grafana, Prometheus, Sentry)",
        "Database engineering (PostgreSQL, ClickHouse, Redis)",
      ],
    },
    steps: {
      uz: [
        "Texnik audit — bugungi bottleneck va xavf",
        "Arxitektura va capacity planning",
        "Cloud setup va CI/CD",
        "Migratsiya / o'tish",
        "Monitoring va alerts",
        "On-call va support",
      ],
      ru: [
        "Технический аудит — узкие места и риски",
        "Архитектура и capacity planning",
        "Cloud setup и CI/CD",
        "Миграция / переход",
        "Monitoring и алерты",
        "On-call и сопровождение",
      ],
      en: [
        "Technical audit — bottlenecks and risks",
        "Architecture and capacity planning",
        "Cloud setup and CI/CD",
        "Migration / cut-over",
        "Monitoring and alerts",
        "On-call and support",
      ],
    },
    problems: {
      uz: [
        "Sayt yuk paytida yiqiladi",
        "Deploy 2 soat oladi va bug keltiradi",
        "Bir buyurtma 3 ta tizimga qo'lda kiritiladi",
        "To'lov keldi-kelmadi — bilmaysiz",
        "Xavfsizlik audit'da xato 0 emas",
      ],
      ru: [
        "Сайт падает под нагрузкой",
        "Деплой занимает 2 часа и приносит баги",
        "Один заказ — 3 системы вручную",
        "Не видно, оплачено или нет",
        "В аудите безопасности — не ноль ошибок",
      ],
      en: [
        "Site falls over under load",
        "Deploys take 2 hours and ship bugs",
        "One order goes into 3 systems by hand",
        "You can't tell if a payment landed",
        "Security audit isn't at zero issues",
      ],
    },
    benefits: {
      uz: [
        "99.9% uptime",
        "Deploy minutda, rollback bir bosish",
        "Inson xato darajasi 0% ga yaqin",
        "To'lov, buyurtma, hisobot — sekundlarda",
        "PCI-DSS / GDPR — xavfsiz va qonuniy",
      ],
      ru: [
        "99.9% uptime",
        "Деплой за минуту, откат в один клик",
        "Человеческие ошибки около 0%",
        "Оплата, заказ, отчёт — за секунды",
        "PCI-DSS / GDPR — безопасно и легально",
      ],
      en: [
        "99.9% uptime",
        "Deploy in a minute, rollback in one click",
        "Human errors near zero",
        "Payments, orders, reports — in seconds",
        "PCI-DSS / GDPR — safe and compliant",
      ],
    },
    stack: ["AWS", "GCP", "Hetzner", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Grafana", "Prometheus", "Sentry", "PostgreSQL", "ClickHouse", "Redis", "Kafka", "RabbitMQ"],
    keywords: {
      uz: [
        "DevOps O'zbekiston", "CI CD pipeline", "Kubernetes Toshkent",
        "cloud infrastructure", "AWS GCP O'zbekiston", "mikroservis arxitekturasi",
        "API development", "REST GraphQL gRPC", "webhook integratsiya",
        "Click Payme Uzum integratsiya", "1C integratsiya", "marketplace integratsiya",
        "performance optimizatsiya", "xavfsizlik audit", "PCI DSS GDPR",
        "monitoring observability Grafana", "database engineering PostgreSQL",
      ],
      ru: [
        "DevOps Узбекистан", "CI CD пайплайн", "Kubernetes Ташкент",
        "cloud-инфраструктура", "AWS GCP Узбекистан", "микросервисная архитектура",
        "разработка API", "REST GraphQL gRPC", "интеграция webhook",
        "интеграция Click Payme Uzum", "интеграция 1C", "интеграция маркетплейс",
        "оптимизация производительности", "аудит безопасности", "PCI DSS GDPR",
        "monitoring observability Grafana", "database engineering PostgreSQL",
      ],
      en: [
        "DevOps Uzbekistan", "CI CD pipeline", "Kubernetes Tashkent",
        "cloud infrastructure", "AWS GCP agency", "microservices architecture",
        "API development", "REST GraphQL gRPC", "webhook integration",
        "Click Payme Uzum integration", "1C integration", "marketplace integration",
        "performance optimisation", "security audit", "PCI DSS GDPR compliance",
        "monitoring observability Grafana", "database engineering PostgreSQL",
      ],
    },
  },
];

/* ============================================================ */

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const seoTitle =
    params.locale === "ru"
      ? "Услуги: реклама у блогеров, SEO, лидогенерация, AI | 404Dev — Digital Growth Agency"
      : params.locale === "en"
      ? "Services: influencer marketing, SEO, lead generation, AI | 404Dev — Digital Growth Agency"
      : "Xizmatlar: blogerlar bilan reklama, SEO, lead generation, AI | 404Dev — Digital Growth Agency";

  const seoDesc =
    params.locale === "ru"
      ? "404Dev — digital growth & automation агентство. Реклама у блогеров Узбекистана (Instagram, TikTok, Telegram, YouTube), SEO и programmatic SEO, лидогенерация и CRO, AI-автоматизация (GPT, Gemini), brand identity, разработка сайтов и SaaS, CRM/ERP и инфраструктура — единая система роста."
      : params.locale === "en"
      ? "404Dev is a digital growth & automation agency. Influencer marketing in Uzbekistan (Instagram, TikTok, Telegram, YouTube), SEO and programmatic SEO, lead generation and CRO, AI automation (GPT, Gemini), brand identity, web and SaaS development, CRM/ERP and infrastructure — one growth engine."
      : "404Dev — digital growth va automation agentligi. O'zbekiston blogerlari bilan reklama (Instagram, TikTok, Telegram, YouTube), SEO va programmatic SEO, lead generation va CRO, AI avtomatlashtirish (GPT, Gemini), brand identity, web va SaaS development, CRM/ERP va infrastructure — yagona o'sish mexanizmida.";

  // Aggregate keywords from all practices for the services index page
  const aggKeywords = PRACTICES.flatMap((p) => p.keywords[params.locale]).slice(0, 60);

  return buildMetadata({
    title: seoTitle,
    description: seoDesc,
    path: `/${params.locale}/services`,
    locale: params.locale,
    keywords: aggKeywords,
  });
}

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);
  const baseUrl = `${SITE_URL}/${params.locale}/services`;

  // SEO — JSON-LD: ItemList of Services + BreadcrumbList
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRACTICES.map((p, i) => ({
      "@type": "Service",
      position: i + 1,
      name: p.title[params.locale],
      description: p.tagline[params.locale],
      url: `${baseUrl}#${p.slug}`,
      provider: { "@type": "Organization", name: "404Dev", url: SITE_URL },
      areaServed: [
        { "@type": "Country", name: "Uzbekistan" },
        { "@type": "Place", name: "Worldwide" },
      ],
      serviceType: p.title.en,
      keywords: p.keywords[params.locale].join(", "),
    })),
  };

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "404Dev", item: `${SITE_URL}/${params.locale}` },
      { "@type": "ListItem", position: 2, name: t.services.title, item: baseUrl },
    ],
  };

  const sectionLabels = {
    uz: { canDo: "Nima kiradi", steps: "Qanday yetkazamiz", problems: "Qanday muammolarni yechadi", benefits: "Natija", stack: "Stack" },
    ru: { canDo: "Что входит", steps: "Как доставляем", problems: "Какие проблемы решает", benefits: "Результат", stack: "Стек" },
    en: { canDo: "What's inside", steps: "How we deliver", problems: "Problems it solves", benefits: "Outcome", stack: "Stack" },
  }[params.locale];

  const contactCta = params.locale === "ru" ? "Связаться" : params.locale === "en" ? "Contact us" : "Bog'lanish";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-100">
        <div aria-hidden className="absolute inset-0 -z-10 aurora opacity-40" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-50" />

        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">/ {t.services.title}</span>
            <h1 className="display-1 mt-4">
              {params.locale === "uz" ? (
                <>
                  Biz <span className="text-brand-500">o'sish tizimlarini</span> quramiz
                </>
              ) : params.locale === "ru" ? (
                <>
                  Мы строим <span className="text-brand-500">системы роста</span>
                </>
              ) : (
                <>
                  We build <span className="text-brand-500">growth systems</span>
                </>
              )}
            </h1>
            <p className="mt-6 text-ink-700 text-lg max-w-2xl">{t.services.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton source="services-hero" variant="accent" size="lg">
                <SendIcon size={18} /> {params.locale === "ru" ? "Бесплатный growth-аудит" : params.locale === "en" ? "Free growth audit" : "Bepul growth audit"}
              </CTAButton>
              <Link href={`/${params.locale}/portfolio`} className="btn btn-ghost btn-lg">
                {t.cta.viewAll}
              </Link>
            </div>
          </div>

          {/* Quick anchors — 7 practices */}
          <nav className="mt-10 flex flex-wrap gap-2">
            {PRACTICES.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="pill hover:bg-ink-900 hover:text-cream-50 transition"
              >
                <span className="inline-block h-1 w-1 bg-brand-500" />
                {p.title[params.locale].split("—")[0].trim()}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Practice detail sections */}
      {PRACTICES.map((p, i) => {
        const isOdd = i % 2 === 1;
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={
              "scroll-mt-24 relative overflow-hidden " +
              (isOdd ? "bg-ink-900 text-cream-50" : "bg-paper text-ink-900")
            }
          >
            <div className="container py-16 md:py-24 relative">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* LEFT — heading + tagline + stack + CTA */}
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                  <span
                    className={
                      "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] " +
                      (isOdd ? "text-cream-50/70" : "text-ink-700")
                    }
                  >
                    <span className={"inline-block h-1.5 w-1.5 " + (isOdd ? "bg-brand-400" : "bg-brand-500")} />
                    {p.badge[params.locale]}
                  </span>

                  <div
                    className={
                      "mt-5 grid h-14 w-14 place-items-center " +
                      (isOdd
                        ? "bg-brand-500 text-ink-900 brutal-border"
                        : "bg-brand-500 text-ink-900 brutal-border")
                    }
                  >
                    <p.Icon size={26} />
                  </div>

                  <h2
                    className={
                      "mt-5 font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] " +
                      (isOdd ? "text-cream-50" : "text-ink-900")
                    }
                    style={{ letterSpacing: "-0.035em" }}
                  >
                    {p.title[params.locale]}
                  </h2>

                  <p
                    className={
                      "mt-5 text-lg leading-relaxed " + (isOdd ? "text-cream-50/85" : "text-ink-800")
                    }
                  >
                    {p.tagline[params.locale]}
                  </p>

                  <p
                    className={
                      "mt-4 text-sm leading-7 " + (isOdd ? "text-cream-50/70" : "text-ink-600")
                    }
                  >
                    {p.what[params.locale]}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className={
                          "px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider " +
                          (isOdd
                            ? "bg-cream-50/10 text-cream-50/90 border border-cream-50/20"
                            : "bg-cream-50 text-ink-900 border-2 border-ink-900")
                        }
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <CTAButton source={`services-${p.slug}`} variant="accent" size="md">
                      <SendIcon size={16} /> {contactCta}
                    </CTAButton>
                    <Link
                      href={`/${params.locale}/portfolio`}
                      className={
                        "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold uppercase tracking-wider transition border-2 " +
                        (isOdd
                          ? "border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-ink-900"
                          : "border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-cream-50")
                      }
                    >
                      {t.cta.viewAll} <ArrowUpRightIcon size={14} />
                    </Link>
                  </div>
                </div>

                {/* RIGHT — detailed lists */}
                <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
                  <DetailBlock
                    isOdd={isOdd}
                    label={sectionLabels.canDo}
                    icon={<RocketIcon size={14} />}
                    items={p.canDo[params.locale]}
                  />
                  <DetailBlock
                    isOdd={isOdd}
                    label={sectionLabels.steps}
                    numbered
                    items={p.steps[params.locale]}
                  />
                  <DetailBlock
                    isOdd={isOdd}
                    label={sectionLabels.problems}
                    icon={<ZapIcon size={14} />}
                    danger
                    items={p.problems[params.locale]}
                  />
                  <DetailBlock
                    isOdd={isOdd}
                    label={sectionLabels.benefits}
                    icon={<CheckIcon size={14} />}
                    items={p.benefits[params.locale]}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="section-tight bg-cream-100">
        <div className="container">
          <div className="card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow">{params.locale === "ru" ? "/ начнём" : params.locale === "en" ? "/ let's start" : "/ boshlaymiz"}</span>
              <h3 className="display-3 mt-3">
                {params.locale === "ru"
                  ? "Какой канал роста запустим первым?"
                  : params.locale === "en"
                  ? "Which growth channel do we launch first?"
                  : "Qaysi o'sish kanalini birinchi ishga tushiramiz?"}
              </h3>
              <p className="mt-3 text-ink-700">
                {params.locale === "ru"
                  ? "Бесплатный growth-аудит — оценим текущий маркетинг и автоматизацию, покажем самый быстрый канал роста."
                  : params.locale === "en"
                  ? "Free growth audit — we evaluate your marketing and automation maturity and recommend the fastest channel."
                  : "Bepul growth audit — bugungi marketing va avtomatlashtirish darajangizni baholaymiz va eng tezkor kanalni ko'rsatamiz."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <CTAButton source="services-bottom" variant="accent" size="lg">
                <SendIcon size={18} /> {contactCta}
              </CTAButton>
              <Link href={`/${params.locale}`} className="btn btn-ghost btn-lg">
                {params.locale === "ru" ? "На главную" : params.locale === "en" ? "Home" : "Bosh sahifa"}
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailBlock({
  isOdd,
  label,
  items,
  icon,
  numbered,
  danger,
}: {
  isOdd: boolean;
  label: string;
  items: string[];
  icon?: React.ReactNode;
  numbered?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={
        "p-5 md:p-6 border-2 " +
        (isOdd
          ? "bg-cream-50/[.04] border-cream-50/20"
          : "bg-cream-50 border-ink-900 brutal-shadow-sm")
      }
    >
      <div
        className={
          "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] font-bold " +
          (isOdd ? "text-cream-50/70" : "text-ink-900")
        }
      >
        <span className={"inline-block h-1.5 w-1.5 " + (danger ? "bg-brand-500" : isOdd ? "bg-brand-400" : "bg-brand-500")} />
        {label}
      </div>

      <ul className={"mt-4 space-y-2.5 " + (isOdd ? "text-cream-50/90" : "text-ink-900")}>
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-6">
            {numbered ? (
              <span
                className={
                  "shrink-0 mt-0.5 grid h-5 w-5 place-items-center font-mono text-[10px] font-bold border " +
                  (isOdd ? "bg-brand-500 text-ink-900 border-brand-500" : "bg-ink-900 text-cream-50 border-ink-900")
                }
              >
                {i + 1}
              </span>
            ) : danger ? (
              <span
                className={
                  "shrink-0 mt-0.5 grid h-5 w-5 place-items-center border " +
                  (isOdd ? "bg-brand-500 text-ink-900 border-brand-500" : "bg-brand-500 text-ink-900 border-ink-900")
                }
              >
                <span className="font-mono text-[11px] font-bold">!</span>
              </span>
            ) : (
              <span
                className={
                  "shrink-0 mt-0.5 grid h-5 w-5 place-items-center border " +
                  (isOdd ? "bg-brand-500 text-ink-900 border-brand-500" : "bg-brand-500 text-ink-900 border-ink-900")
                }
              >
                {icon ?? <CheckIcon size={11} />}
              </span>
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
