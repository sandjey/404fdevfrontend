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
  PlugIcon,
  RocketIcon,
  SendIcon,
  SmartphoneIcon,
  ZapIcon,
} from "@/components/icons";

/* ============================================================
   PRODUCT CATALOG — rich, SEO-friendly content per service.
   Each entry has:
     - what (qisqa qiymat),
     - canDo (mahsulot orqali nima qilinadi),
     - steps (qadamlar),
     - problems (qanday muammolarni yechadi),
     - benefits (foyda).
   ============================================================ */

type Product = {
  slug: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: { uz: string; ru: string; en: string };
  title: { uz: string; ru: string; en: string };
  tagline: { uz: string; ru: string; en: string };
  what: { uz: string; ru: string; en: string };
  canDo: { uz: string[]; ru: string[]; en: string[] };
  steps: { uz: string[]; ru: string[]; en: string[] };
  problems: { uz: string[]; ru: string[]; en: string[] };
  benefits: { uz: string[]; ru: string[]; en: string[] };
  /** SEO-relevant tech keywords */
  stack: string[];
};

const PRODUCTS: Product[] = [
  {
    slug: "websites",
    Icon: CodeIcon,
    badge: { uz: "01 / Web", ru: "01 / Web", en: "01 / Web" },
    title: { uz: "Web saytlar", ru: "Веб-сайты", en: "Websites" },
    tagline: {
      uz: "Korporativ sayt, landing va e-commerce — Next.js, tezkor, SEO-tayyor.",
      ru: "Корпоративные сайты, лендинги и e-commerce — Next.js, быстро, SEO-готово.",
      en: "Corporate sites, landings and e-commerce — Next.js, fast, SEO-ready.",
    },
    what: {
      uz: "Sayt — sizning eng arzon va eng samarali sotuvchingiz. 24/7 ishlaydi, charchamaydi va to'g'ri qurilgan bo'lsa, har oy yangi mijozlar olib keladi.",
      ru: "Сайт — это самый дешёвый и самый эффективный продавец. Работает 24/7, не устаёт, и при правильной архитектуре каждый месяц приводит новых клиентов.",
      en: "A site is your cheapest and most effective sales rep — always on, never tired, and when built right, brings new clients every month.",
    },
    canDo: {
      uz: [
        "Korporativ sayt va ko'p sahifali landing",
        "E-commerce do'kon (Click, Payme, Uzum to'lov)",
        "CMS — kontentni o'zingiz boshqaring",
        "Ko'p tilli (uz / ru / en)",
        "Schema.org va to'liq SEO meta",
      ],
      ru: [
        "Корпоративный сайт и многостраничный лендинг",
        "E-commerce магазин (Click, Payme, Uzum)",
        "CMS — управляйте контентом сами",
        "Мультиязычный (uz / ru / en)",
        "Schema.org и полная SEO-разметка",
      ],
      en: [
        "Corporate site and multi-page landing",
        "E-commerce store (Click, Payme, Uzum payments)",
        "CMS — own your content",
        "Multilingual (uz / ru / en)",
        "Schema.org and full SEO metadata",
      ],
    },
    steps: {
      uz: [
        "Brif va biznes maqsad — kim, nima uchun, qancha",
        "Struktura va wireframe — sahifalar daraxti",
        "Brand-aligned UX/UI dizayn",
        "Frontend (Next.js) + backend + CMS",
        "SEO sozlash, tezlik audit, deploy",
      ],
      ru: [
        "Бриф и бизнес-цели — кто, зачем, сколько",
        "Структура и wireframe — карта страниц",
        "Brand-aligned UX/UI-дизайн",
        "Frontend (Next.js) + бэкенд + CMS",
        "SEO-настройка, аудит скорости, деплой",
      ],
      en: [
        "Brief and business goals — who, why, how much",
        "Structure and wireframe — page tree",
        "Brand-aligned UX/UI design",
        "Frontend (Next.js) + backend + CMS",
        "SEO setup, speed audit, deploy",
      ],
    },
    problems: {
      uz: [
        "Eski sayt sekin yuklanadi va Google'da chiqmaydi",
        "Mobilda sayt buzilib turadi",
        "Mijozlar sizning xizmatlaringizni topa olmayapti",
        "Konversiya past — odamlar kelib ketmoqda",
      ],
      ru: [
        "Старый сайт грузится медленно и не виден в Google",
        "На мобильном вёрстка ломается",
        "Клиенты не находят ваши услуги",
        "Низкая конверсия — люди уходят",
      ],
      en: [
        "Old site loads slowly and doesn't rank on Google",
        "Mobile layout breaks",
        "Customers can't find your services",
        "Low conversion — visitors bounce",
      ],
    },
    benefits: {
      uz: [
        "PageSpeed 90+ ball, Core Web Vitals yashil",
        "Schema.org + sitemap → tezroq indexing",
        "Mobil-first dizayn, har joyda chiroyli",
        "Mijoz so'rovini avtomatik yuboruvchi forma",
      ],
      ru: [
        "PageSpeed 90+, Core Web Vitals в зелёном",
        "Schema.org + sitemap → быстрая индексация",
        "Mobile-first, выглядит везде",
        "Форма с автоматической отправкой заявок",
      ],
      en: [
        "PageSpeed 90+, Core Web Vitals green",
        "Schema.org + sitemap → faster indexing",
        "Mobile-first, looks great everywhere",
        "Form that auto-routes leads to your team",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity / Strapi", "Vercel"],
  },
  {
    slug: "telegram-bots",
    Icon: BotIcon,
    badge: { uz: "02 / Bot", ru: "02 / Bot", en: "02 / Bot" },
    title: { uz: "Telegram botlar", ru: "Telegram-боты", en: "Telegram bots" },
    tagline: {
      uz: "Buyurtma qabul, to'lov, CRM — bir bot 24/7 ishlovchi sotuvchi.",
      ru: "Приём заявок, оплата, CRM — бот, который работает 24/7.",
      en: "Lead intake, payments, CRM — a bot that sells 24/7.",
    },
    what: {
      uz: "O'zbekistondagi mijozlarning aksariyati Telegram'da. Bot orqali ular forma to'ldirmasdan, sayt ochmasdan, telefon qilmasdan buyurtma berib, to'lov qilib ketishadi.",
      ru: "Большинство клиентов в Узбекистане сидят в Telegram. Через бота они оформляют заказ и оплачивают, не открывая сайт и не звоня.",
      en: "Most customers in Uzbekistan live in Telegram. With a bot they place orders and pay without opening a site or calling.",
    },
    canDo: {
      uz: [
        "Buyurtma qabul qilish va admin'ga yetkazish",
        "Click / Payme orqali to'lov",
        "Mahsulot katalogi va savatcha",
        "Yetkazib berish trekingi",
        "Mijoz yozuvi va CRM bilan bog'lanish",
      ],
      ru: [
        "Приём заказов и автоотправка администратору",
        "Оплата через Click / Payme",
        "Каталог товаров и корзина",
        "Трекинг доставки",
        "Запись клиента и интеграция с CRM",
      ],
      en: [
        "Order intake and auto-routing to admin",
        "Click / Payme payments",
        "Catalog and cart",
        "Delivery tracking",
        "Customer records and CRM sync",
      ],
    },
    steps: {
      uz: [
        "Bot scenariy — qaysi tugma nima qiladi",
        "Mahsulot/menu strukturasi",
        "To'lov va yetkazib berish integratsiya",
        "Admin panel (web yoki Telegram)",
        "Test va ishga tushirish",
      ],
      ru: [
        "Сценарий бота — какая кнопка что делает",
        "Структура товаров/меню",
        "Интеграция оплаты и доставки",
        "Админ-панель (web или Telegram)",
        "Тестирование и запуск",
      ],
      en: [
        "Bot flow — what each button does",
        "Catalog / menu structure",
        "Payment and delivery integration",
        "Admin panel (web or Telegram)",
        "QA and launch",
      ],
    },
    problems: {
      uz: [
        "Operatorlar telefon qabul qilishga ulgurmaydi",
        "Buyurtmalar Excel'da yo'qolib ketadi",
        "Mijoz statusini bilolmaydi",
        "Tunda buyurtma bermoqchi — hech kim javob bermaydi",
      ],
      ru: [
        "Операторы не успевают принимать звонки",
        "Заказы теряются в Excel",
        "Клиент не знает статус заказа",
        "Хочет заказать ночью — никто не отвечает",
      ],
      en: [
        "Operators can't keep up with calls",
        "Orders get lost in Excel",
        "Customer doesn't know order status",
        "Wants to order at night — nobody answers",
      ],
    },
    benefits: {
      uz: [
        "24/7 buyurtma qabul",
        "Inson xato qilmaydi — hammasi ma'lumotlar bazasida",
        "Mijoz buyurtma statusini o'zi ko'radi",
        "Operator vaqtini 60% gacha tejaydi",
      ],
      ru: [
        "Приём заказов 24/7",
        "Без человеческих ошибок — всё в БД",
        "Клиент сам видит статус",
        "Экономит до 60% времени операторов",
      ],
      en: [
        "Orders 24/7",
        "No human error — everything in DB",
        "Customer self-tracks status",
        "Saves up to 60% of operator time",
      ],
    },
    stack: ["Telegram Bot API", "Node.js / Go", "PostgreSQL", "Click / Payme", "Webhook"],
  },
  {
    slug: "seo",
    Icon: ZapIcon,
    badge: { uz: "03 / SEO", ru: "03 / SEO", en: "03 / SEO" },
    title: {
      uz: "Google va Yandex SEO optimizatsiya",
      ru: "SEO в Google и Яндекс",
      en: "SEO for Google and Yandex",
    },
    tagline: {
      uz: "Texnik audit, kontent va backlinklar — qidiruvda 1-sahifaga chiqasiz.",
      ru: "Технический аудит, контент и бэклинки — выходите на 1 страницу выдачи.",
      en: "Technical audit, content and backlinks — land on page one.",
    },
    what: {
      uz: "Mijoz Google yoki Yandex'da xizmatingizni qidirsa va sizni topmasa, u raqobatchiga ketadi. SEO — bu kontekst reklamadan farqli o'laroq, bir marta kiritilgan investitsiya yillab natija beradi.",
      ru: "Если клиент гуглит ваше услугу и не находит вас — он уходит к конкуренту. В отличие от контекста, SEO — это инвестиция, которая работает годами.",
      en: "If a client searches for your service and doesn't find you, they go to a competitor. Unlike paid ads, SEO is an investment that pays off for years.",
    },
    canDo: {
      uz: [
        "Texnik SEO audit (PageSpeed, indexing, schema)",
        "Kalit so'zlar tahlili va kontent strategiyasi",
        "On-page optimizatsiya (title, meta, struktura)",
        "Lokal SEO — Google Business va Yandex Maps",
        "Backlink yaratish va monitoring",
      ],
      ru: [
        "Технический SEO-аудит (PageSpeed, индексация, schema)",
        "Анализ ключевых слов и контент-стратегия",
        "On-page оптимизация (title, meta, структура)",
        "Локальный SEO — Google Business и Яндекс Карты",
        "Наработка бэклинков и мониторинг",
      ],
      en: [
        "Technical SEO audit (PageSpeed, indexing, schema)",
        "Keyword research and content strategy",
        "On-page optimisation (title, meta, structure)",
        "Local SEO — Google Business and Yandex Maps",
        "Backlink acquisition and monitoring",
      ],
    },
    steps: {
      uz: [
        "Audit — bugungi holat va raqobat tahlili",
        "Kalit so'zlar va sahifa strukturasi rejasi",
        "Texnik tuzatishlar (sayt tezligi, schema, sitemap)",
        "Kontent yaratish va o'rnatish",
        "Oylik hisobot va backlink yig'ish",
      ],
      ru: [
        "Аудит — текущее состояние и конкуренты",
        "План ключей и структуры страниц",
        "Технические правки (скорость, schema, sitemap)",
        "Создание и публикация контента",
        "Ежемесячный отчёт и наработка ссылок",
      ],
      en: [
        "Audit — current state and competitor map",
        "Keyword and page-structure plan",
        "Technical fixes (speed, schema, sitemap)",
        "Content creation and publishing",
        "Monthly report and link building",
      ],
    },
    problems: {
      uz: [
        "Sayt qidiruvda chiqmaydi yoki 5-sahifalarda turadi",
        "Reklama'ga ko'p pul ketadi, lekin SEO trafik yo'q",
        "Yandex'da chiqib, Google'da chiqmaydi (yoki teskari)",
        "Site audit'da yuzlab xatolar bor",
      ],
      ru: [
        "Сайт не виден в выдаче или болтается на 5-й странице",
        "Много тратите на рекламу, но SEO-трафика нет",
        "В Яндексе есть — в Google нет (или наоборот)",
        "Аудит показывает сотни ошибок",
      ],
      en: [
        "Site doesn't show up or lingers on page 5",
        "You're burning ad budget but have zero organic traffic",
        "You rank on Yandex but not Google (or vice versa)",
        "Audit shows hundreds of issues",
      ],
    },
    benefits: {
      uz: [
        "Tasodifiy emas — har oy o'sayotgan organik trafik",
        "Click reklamadan 5-10x arzonroq mijoz",
        "Brend qidirilishi tobora oshadi",
        "Raqobatchidan oldinda ko'rinasiz",
      ],
      ru: [
        "Не разово, а растущий органический трафик каждый месяц",
        "Клиент в 5-10x дешевле, чем из контекста",
        "Растущий брендовый трафик",
        "Видны выше конкурентов",
      ],
      en: [
        "Not a spike — organic traffic that grows month over month",
        "Customers 5-10x cheaper than from paid ads",
        "Branded search keeps growing",
        "You appear above competitors",
      ],
    },
    stack: ["Google Search Console", "Yandex Webmaster", "Ahrefs", "Schema.org", "Lighthouse"],
  },
  {
    slug: "mobile-apps",
    Icon: SmartphoneIcon,
    badge: { uz: "04 / Mobile", ru: "04 / Mobile", en: "04 / Mobile" },
    title: { uz: "Mobil ilovalar", ru: "Мобильные приложения", en: "Mobile apps" },
    tagline: {
      uz: "iOS + Android — bitta kod bazada, App Store va Google Play'da.",
      ru: "iOS + Android — одна кодовая база, в App Store и Google Play.",
      en: "iOS + Android — one codebase, on App Store and Google Play.",
    },
    what: {
      uz: "Mobil ilova — bu sayt emas, bu mijoz cho'ntagidagi sizning kompaniyangiz. Push-bildirishnomalar, oflayn rejim, kamera, geo-pozitsiya — saytda bo'lmagan imkoniyatlar.",
      ru: "Мобильное приложение — это не сайт, это ваша компания в кармане клиента. Push, оффлайн-режим, камера, геопозиция — то, чего сайт не умеет.",
      en: "A mobile app isn't a site — it's your company in the customer's pocket. Push, offline, camera, GPS — capabilities the web can't match.",
    },
    canDo: {
      uz: [
        "iOS + Android cross-platform (React Native / Flutter)",
        "Push-bildirishnomalar va segmentlash",
        "Oflayn rejim va kesh",
        "Kamera, QR, geo, biometrik kirish",
        "App Store va Google Play'da publish",
      ],
      ru: [
        "iOS + Android cross-platform (React Native / Flutter)",
        "Push-уведомления и сегментация",
        "Оффлайн-режим и кэш",
        "Камера, QR, гео, биометрия",
        "Публикация в App Store и Google Play",
      ],
      en: [
        "iOS + Android cross-platform (React Native / Flutter)",
        "Push notifications and segmentation",
        "Offline mode and caching",
        "Camera, QR, GPS, biometrics",
        "App Store and Google Play release",
      ],
    },
    steps: {
      uz: [
        "Mahsulot va MVP doirasi",
        "UX flow va prototip",
        "Backend API va dizayn-tizim",
        "iOS + Android development",
        "QA, store submission, release",
      ],
      ru: [
        "Продукт и объём MVP",
        "UX-flow и прототип",
        "Backend API и дизайн-система",
        "Разработка iOS + Android",
        "QA, выкладка в сторы, релиз",
      ],
      en: [
        "Product and MVP scope",
        "UX flow and prototype",
        "Backend API and design system",
        "iOS + Android development",
        "QA, store submission, release",
      ],
    },
    problems: {
      uz: [
        "Mijoz har safar saytni qidirib ochmoqchi emas",
        "Push yuborib, qaytib kelishini tezlashtirish kerak",
        "Mobil tarmoqsiz joylarda ham ishlashi kerak",
        "Sayt ko'rinishidan zo'r mahsulot tajribasi kerak",
      ],
      ru: [
        "Клиент не хочет каждый раз искать сайт",
        "Надо возвращать клиента через push",
        "Должно работать без сети",
        "Нужен опыт лучше веб-сайта",
      ],
      en: [
        "Customers don't want to hunt for your site every time",
        "You need push to bring them back",
        "Must work offline / on bad network",
        "You want product experience above what web allows",
      ],
    },
    benefits: {
      uz: [
        "Bitta kod bazada — vaqt va byudjet tejaydi",
        "Push orqali retention 2-3x oshadi",
        "Brend cho'ntakda — har kuni ko'rinadi",
        "App Store / Google Play'da rasmiy",
      ],
      ru: [
        "Одна кодовая база — экономия времени и бюджета",
        "Push увеличивает retention в 2-3 раза",
        "Бренд в кармане — на виду каждый день",
        "Официально в App Store / Google Play",
      ],
      en: [
        "One codebase — time and budget saved",
        "Push lifts retention 2-3x",
        "Brand in pocket — seen every day",
        "Official on App Store / Google Play",
      ],
    },
    stack: ["React Native", "Flutter", "Firebase", "OneSignal", "Fastlane"],
  },
  {
    slug: "crm-erp",
    Icon: DatabaseIcon,
    badge: { uz: "05 / CRM", ru: "05 / CRM", en: "05 / CRM" },
    title: { uz: "CRM / ERP tizimlar", ru: "CRM / ERP системы", en: "CRM / ERP systems" },
    tagline: {
      uz: "Mijoz, omborxona, hisobot — kompaniyaning hamma jarayoni bitta panelda.",
      ru: "Клиенты, склад, отчёты — все процессы в одной панели.",
      en: "Customers, inventory, reports — all processes in one place.",
    },
    what: {
      uz: "Excel'da ishlash — bir necha xodimgacha. 10+ xodim bo'lganda hujjatlar yo'qoladi, hisobotlar uch kunda chiqadi va direktor real holatni bilolmaydi. CRM/ERP shu jarayonni avtomatlashtiradi.",
      ru: "Excel работает до нескольких сотрудников. На 10+ начинают теряться документы, отчёты делаются 3 дня, а директор не видит реальное положение. CRM/ERP это автоматизирует.",
      en: "Excel works up to a few people. With 10+ employees documents get lost, reports take three days and the CEO can't see what's really going on. CRM/ERP fixes that.",
    },
    canDo: {
      uz: [
        "Mijoz va lid bazasi (sales pipeline)",
        "Omborxona va mahsulot harakati",
        "Hujjat aylanishi (kontrakt, hisob-faktura)",
        "KPI va real-time hisobot dashboard",
        "Rol va ruxsatlar tizimi",
      ],
      ru: [
        "База клиентов и лидов (sales pipeline)",
        "Склад и движение товаров",
        "Документооборот (договоры, инвойсы)",
        "KPI и real-time дашборд",
        "Роли и права доступа",
      ],
      en: [
        "Clients and leads (sales pipeline)",
        "Inventory and stock movement",
        "Document flow (contracts, invoices)",
        "KPIs and real-time dashboard",
        "Roles and permissions",
      ],
    },
    steps: {
      uz: [
        "Biznes audit — qaysi jarayon qaysi xodimda",
        "Tizim arxitekturasi va modullar",
        "Backend, dashboard, mobil access",
        "Mavjud ma'lumotlarni import qilish",
        "Xodimlarni o'qitish va deploy",
      ],
      ru: [
        "Аудит бизнес-процессов",
        "Архитектура системы и модули",
        "Backend, дашборд, мобильный доступ",
        "Импорт существующих данных",
        "Обучение команды и деплой",
      ],
      en: [
        "Business process audit",
        "System architecture and modules",
        "Backend, dashboard, mobile access",
        "Import existing data",
        "Team training and deploy",
      ],
    },
    problems: {
      uz: [
        "Excel'da hamma narsa, hech kim aniq bilmaydi",
        "Hisobotlar 3 kun yig'iladi va eskirgan bo'ladi",
        "Xodim ketsa — ma'lumot yo'qoladi",
        "Direktor real holatni ko'ra olmaydi",
      ],
      ru: [
        "Всё в Excel, никто точно не знает",
        "Отчёты собираются 3 дня и устаревают",
        "Уходит сотрудник — теряются данные",
        "Директор не видит реальное положение",
      ],
      en: [
        "Everything's in Excel, nobody knows for sure",
        "Reports take 3 days and arrive stale",
        "Employee leaves — data is lost",
        "CEO can't see the real picture",
      ],
    },
    benefits: {
      uz: [
        "Real vaqtda tijoriy ko'rsatkichlar",
        "Xodim yo'q bo'lsa ham ish to'xtamaydi",
        "Hujjat qidirib bir kun ketmaydi",
        "Direktor uchun bitta dashboard — barcha javoblar",
      ],
      ru: [
        "Бизнес-метрики в реальном времени",
        "Уход сотрудника — не катастрофа",
        "Документы за секунды",
        "Один дашборд для CEO — все ответы",
      ],
      en: [
        "Real-time business metrics",
        "Losing a person isn't a disaster",
        "Documents in seconds",
        "One dashboard for the CEO — all answers",
      ],
    },
    stack: ["Go / Node.js", "PostgreSQL", "React", "Redis", "S3"],
  },
  {
    slug: "integrations",
    Icon: PlugIcon,
    badge: { uz: "06 / API", ru: "06 / API", en: "06 / API" },
    title: { uz: "API integratsiyalar", ru: "API интеграции", en: "API integrations" },
    tagline: {
      uz: "Click, Payme, Uzum, 1C, marketplace'lar — tizimlaringiz orasida ko'prik.",
      ru: "Click, Payme, Uzum, 1C, маркетплейсы — мост между системами.",
      en: "Click, Payme, Uzum, 1C, marketplaces — a bridge between systems.",
    },
    what: {
      uz: "Saytingiz, CRM'ingiz va to'lov tizimi alohida ishlasa — xodimlar ma'lumotni qo'lda ko'chiradi va xato qiladi. Integratsiya — bu tizimlar bir-biri bilan o'zi gaplashishi.",
      ru: "Если сайт, CRM и платежи живут отдельно — сотрудники переписывают данные руками и ошибаются. Интеграция — это когда системы общаются сами.",
      en: "When your site, CRM and payments live in silos, staff copy data by hand and make errors. Integration is letting the systems talk on their own.",
    },
    canDo: {
      uz: [
        "Click / Payme / Uzum to'lov integratsiyasi",
        "1C, MySklad va boshqa accounting tizimlar",
        "Marketplace'lar (Uzum, Yandex Market)",
        "SMS, Telegram, Email avtomatlashtirish",
        "REST / GraphQL / Webhook arxitektura",
      ],
      ru: [
        "Интеграция Click / Payme / Uzum",
        "1C, МойСклад и другие учётные",
        "Маркетплейсы (Uzum, Yandex Market)",
        "SMS, Telegram, Email автоматизация",
        "REST / GraphQL / Webhook архитектура",
      ],
      en: [
        "Click / Payme / Uzum payment integration",
        "1C, MoySklad and other ERPs",
        "Marketplaces (Uzum, Yandex Market)",
        "SMS, Telegram, Email automation",
        "REST / GraphQL / Webhook architecture",
      ],
    },
    steps: {
      uz: [
        "Aktsiya — qaysi tizim qaysi tizim bilan",
        "API audit va data mapping",
        "Xavfsiz ulanish (token, webhook)",
        "Test va xato qaytarish stsenariy",
        "Monitoring va alert",
      ],
      ru: [
        "Карта — какая система с какой",
        "API-аудит и data mapping",
        "Безопасное соединение (токен, webhook)",
        "Тесты и сценарии ошибок",
        "Мониторинг и алерты",
      ],
      en: [
        "Map — which system to which",
        "API audit and data mapping",
        "Secure connection (token, webhook)",
        "Tests and error scenarios",
        "Monitoring and alerts",
      ],
    },
    problems: {
      uz: [
        "Bir buyurtma 3 ta tizimga qo'lda kiritiladi",
        "Hisob-faktura yarim soat yasaladi",
        "To'lov keldi-kelmadi — bilmaysiz",
        "Marketplace'da narx yangilanmagan",
      ],
      ru: [
        "Один заказ — 3 системы вручную",
        "Счёт делается полчаса",
        "Не видно: оплачено или нет",
        "На маркетплейсе старая цена",
      ],
      en: [
        "One order entered into 3 systems by hand",
        "Invoice takes half an hour",
        "Can't tell if it was paid",
        "Stale price on marketplace",
      ],
    },
    benefits: {
      uz: [
        "Inson xato qilish darajasi 0% ga yaqin",
        "Buyurtmadan to'lovgacha sekundlarda",
        "Bitta o'zgarish — hamma joyda",
        "Skalable: yangi tizim qo'shish oson",
      ],
      ru: [
        "Человеческие ошибки около 0%",
        "От заказа до оплаты — секунды",
        "Одно изменение — везде",
        "Легко добавить новую систему",
      ],
      en: [
        "Human errors near zero",
        "From order to payment in seconds",
        "Change once — everywhere",
        "Easy to plug in a new system",
      ],
    },
    stack: ["REST", "GraphQL", "Webhooks", "OAuth 2", "RabbitMQ / Kafka"],
  },
];

/* ============================================================ */

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  const seoTitle =
    params.locale === "ru"
      ? "Услуги: разработка сайтов, ботов, мобильных приложений, CRM, SEO | 404Dev"
      : params.locale === "en"
      ? "Services: web, Telegram bots, mobile apps, CRM, SEO | 404Dev"
      : "Xizmatlar: sayt, bot, mobil ilova, CRM, SEO yaratish | 404Dev";

  const seoDesc =
    params.locale === "ru"
      ? "Полный список наших услуг: веб-сайты на Next.js, Telegram-боты с Click/Payme, iOS/Android приложения, CRM/ERP, SEO в Google и Яндекс, API-интеграции."
      : params.locale === "en"
      ? "Full list of our services: Next.js websites, Telegram bots with Click/Payme, iOS/Android apps, CRM/ERP, SEO for Google and Yandex, API integrations."
      : "Bizning to'liq xizmatlar ro'yxati: Next.js saytlar, Click/Payme bilan Telegram-botlar, iOS/Android ilovalari, CRM/ERP, Google va Yandex SEO, API integratsiyalar.";

  return buildMetadata({
    title: seoTitle,
    description: seoDesc,
    path: `/${params.locale}/services`,
    locale: params.locale,
  });
}

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);
  const baseUrl = `${SITE_URL}/${params.locale}/services`;

  // SEO — JSON-LD: ItemList of Services + BreadcrumbList
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "Service",
      position: i + 1,
      name: p.title[params.locale],
      description: p.tagline[params.locale],
      url: `${baseUrl}#${p.slug}`,
      provider: { "@type": "Organization", name: "404Dev", url: SITE_URL },
      areaServed: { "@type": "Country", name: "Uzbekistan" },
      serviceType: p.title.en,
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
    uz: { canDo: "Nima qilamiz", steps: "Qadamlar", problems: "Qanday muammolarni yechadi", benefits: "Foyda", stack: "Stack" },
    ru: { canDo: "Что делаем", steps: "Шаги", problems: "Какие проблемы решает", benefits: "Польза", stack: "Стек" },
    en: { canDo: "What we do", steps: "Steps", problems: "Problems it solves", benefits: "Benefits", stack: "Stack" },
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
        <div aria-hidden className="absolute inset-0 -z-10 aurora opacity-50" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div aria-hidden className="absolute -top-32 -right-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-brand-500/15 blur-3xl animate-blob" />

        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">/ {t.services.title}</span>
            <h1 className="display-1 mt-4">
              {params.locale === "uz" ? (<><span className="text-brand-500">G'oyadan</span> tayyor mahsulotgacha</>) :
              params.locale === "ru" ? (<><span className="text-brand-500">От идеи</span> до готового продукта</>) :
              (<><span className="text-brand-500">From idea</span> to launch</>)}
            </h1>
            <p className="mt-6 text-ink-700 text-lg max-w-2xl">{t.services.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton source="services-hero" variant="accent" size="lg">
                <SendIcon size={18} /> {t.cta.sendRequest}
              </CTAButton>
              <Link href={`/${params.locale}/portfolio`} className="btn btn-ghost btn-lg">
                {t.cta.viewAll}
              </Link>
            </div>
          </div>

          {/* Quick anchors */}
          <nav className="mt-10 flex flex-wrap gap-2">
            {PRODUCTS.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream-50 ring-1 ring-ink-200 px-3 py-1.5 text-xs font-mono text-ink-700 hover:bg-ink-900 hover:text-cream-50 transition"
              >
                <span className="inline-block h-1 w-1 rounded-full bg-brand-500" />
                {p.title[params.locale]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Product detail sections */}
      {PRODUCTS.map((p, i) => {
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
            {/* Coral glow accent */}
            <div
              aria-hidden
              className={
                "absolute pointer-events-none rounded-full blur-3xl " +
                (isOdd
                  ? "-top-32 -right-24 h-96 w-96 bg-brand-500/30"
                  : "-bottom-32 -left-24 h-96 w-96 bg-brand-500/10")
              }
            />

            <div className="container py-16 md:py-24 relative">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* LEFT — heading + tagline + stack + CTA */}
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                  <span
                    className={
                      "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] " +
                      (isOdd ? "text-cream-50/60" : "text-ink-600")
                    }
                  >
                    <span className={"inline-block h-1 w-1 rounded-full " + (isOdd ? "bg-brand-400" : "bg-brand-500")} />
                    {p.badge[params.locale]}
                  </span>

                  <div
                    className={
                      "mt-4 grid h-14 w-14 place-items-center rounded-2xl " +
                      (isOdd
                        ? "bg-brand-500/20 text-brand-400 ring-1 ring-brand-500/30"
                        : "bg-brand-50 text-brand-600 ring-1 ring-brand-100")
                    }
                  >
                    <p.Icon size={26} />
                  </div>

                  <h2
                    className={
                      "mt-5 font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tightest leading-tight " +
                      (isOdd ? "text-cream-50" : "text-ink-900")
                    }
                  >
                    {p.title[params.locale]}
                  </h2>

                  <p
                    className={
                      "mt-4 text-lg leading-relaxed " + (isOdd ? "text-cream-50/80" : "text-ink-700")
                    }
                  >
                    {p.tagline[params.locale]}
                  </p>

                  <p
                    className={
                      "mt-4 text-sm leading-7 " + (isOdd ? "text-cream-50/65" : "text-ink-600")
                    }
                  >
                    {p.what[params.locale]}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className={
                          "rounded-full px-2.5 py-1 text-[11px] font-mono " +
                          (isOdd
                            ? "bg-cream-50/10 text-cream-50/85 ring-1 ring-cream-50/15"
                            : "bg-cream-50 text-ink-700 ring-1 ring-ink-200")
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
                        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition " +
                        (isOdd
                          ? "bg-cream-50/10 text-cream-50 hover:bg-cream-50/20"
                          : "bg-cream-50 text-ink-900 ring-1 ring-ink-200 hover:ring-ink-300")
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
                  ? "Какой продукт интересует?"
                  : params.locale === "en"
                  ? "Which product is right for you?"
                  : "Sizga qaysi mahsulot kerak?"}
              </h3>
              <p className="mt-3 text-ink-700">
                {params.locale === "ru"
                  ? "Бесплатная консультация 30 минут — обсудим вашу задачу и предложим лучшее решение."
                  : params.locale === "en"
                  ? "Free 30-min consultation — we'll discuss your goal and recommend the best path."
                  : "Bepul 30-daqiqalik konsultatsiya — masalangizni muhokama qilamiz va eng to'g'ri yo'lni taklif etamiz."}
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
        "rounded-2xl p-5 md:p-6 " +
        (isOdd
          ? "bg-cream-50/[.04] ring-1 ring-cream-50/10"
          : "bg-cream-50 ring-1 ring-ink-200")
      }
    >
      <div
        className={
          "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] " +
          (isOdd ? "text-cream-50/60" : "text-ink-600")
        }
      >
        <span className={"inline-block h-1 w-1 rounded-full " + (danger ? "bg-brand-500" : isOdd ? "bg-brand-400" : "bg-brand-500")} />
        {label}
      </div>

      <ul className={"mt-3 space-y-2.5 " + (isOdd ? "text-cream-50/85" : "text-ink-800")}>
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-6">
            {numbered ? (
              <span
                className={
                  "shrink-0 mt-0.5 grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] font-bold " +
                  (isOdd ? "bg-brand-500/20 text-brand-400" : "bg-brand-500 text-cream-50")
                }
              >
                {i + 1}
              </span>
            ) : danger ? (
              <span
                className={
                  "shrink-0 mt-0.5 grid h-5 w-5 place-items-center rounded-full " +
                  (isOdd ? "bg-brand-500/20 text-brand-400" : "bg-brand-100 text-brand-700")
                }
              >
                <span className="font-mono text-[11px] font-bold">!</span>
              </span>
            ) : (
              <span
                className={
                  "shrink-0 mt-0.5 grid h-5 w-5 place-items-center rounded-full " +
                  (isOdd ? "bg-brand-500/20 text-brand-400" : "bg-brand-50 text-brand-600 ring-1 ring-brand-100")
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
