import type { Locale } from "./config";

type Dict = {
  nav: {
    home: string;
    services: string;
    about: string;
    portfolio: string;
    blog: string;
    contact: string;
    learn: string;
  };
  cta: {
    contactUs: string;
    sendRequest: string;
    readMore: string;
    learnMore: string;
    viewAll: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    statsProjects: string;
    statsClients: string;
    statsYears: string;
    servicesTitle: string;
    servicesSubtitle: string;
    techTitle: string;
    techSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    /** Mission / Education block on homepage */
    learnEyebrow: string;
    learnTitle: string;
    learnLead: string;
    learnMission: string;
    learnCTA: string;
    learnSecondaryCTA: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  about: {
    title: string;
    subtitle: string;
    missionTitle: string;
    mission: string;
    valuesTitle: string;
    values: { title: string; description: string }[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    empty: string;
  };
  blog: {
    title: string;
    subtitle: string;
    empty: string;
    readingTime: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    telegram: string;
    contactHint: string;
    contactRequired: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
  footer: {
    rights: string;
    quickLinks: string;
    contact: string;
    address: string;
  };
};

const dictionaries: Record<Locale, Dict> = {
  uz: {
    nav: {
      home: "Bosh sahifa",
      services: "Xizmatlar",
      about: "Biz haqimizda",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Kontakt",
      learn: "Darslar",
    },
    cta: {
      contactUs: "Bog'lanish",
      sendRequest: "So'rov yuborish",
      readMore: "Batafsil",
      learnMore: "Batafsil ko'rish",
      viewAll: "Barchasini ko'rish",
    },
    home: {
      heroBadge: "404Dev — Digital Growth & Automation Agency",
      heroTitle: "Brendlarni tanilgan va daromadli qilamiz",
      heroSubtitle:
        "Marketing va raqamlashtirish — bitta tizimda. Blogerlar bilan reklama, SEO, lead generation, AI avtomatlashtirish, brand identity va konversiyali sayt — O'zbekiston brendlari uchun yagona o'sish ekosistemasi.",
      statsProjects: "ishga tushirilgan o'sish tizimlari",
      statsClients: "O'zbekiston va xalqaro mijozlar",
      statsYears: "yillik muhandislik tajribasi",
      servicesTitle: "Bizning yo'nalishlar",
      servicesSubtitle:
        "Biz “sayt ishlab chiqaruvchi studio” emasmiz — biz biznesingizga lid keltiruvchi, savdoni avtomatlashtiradigan va brendni o'stiradigan to'liq ekosistemani quramiz.",
      techTitle: "Texnologiyalar va integratsiyalar",
      techSubtitle: "Biz growth, automation va data uchun zamonaviy, sinovdan o'tgan stack'dan foydalanamiz.",
      ctaTitle: "Biznesingizning navbatdagi o'sish bosqichini biz bilan boshlang",
      ctaSubtitle:
        "Bepul growth audit — bugungi marketing va avtomatlashtirish darajangizni baholaymiz va eng tezkor o'sish kanali nima ekanligini aytamiz.",
      learnEyebrow: "/ ta'lim missiyasi",
      learnTitle: "Bilim — bu ham eng kuchli marketing",
      learnLead:
        "Biz O'zbekistonda zamonaviy dasturchilar va digital mutaxassislar avlodini tarbiyalashga ishonamiz.",
      learnMission:
        "404Dev Learn — bu bepul, ona tilimizdagi dasturlash va marketing maktabi. Mijozlarimizdan tushgan har bir buyurtma ulushi yangi darslar tayyorlashga ketadi. Biz uchun bu shunchaki content marketing emas — bu mas'uliyat va mamlakat kelajagiga investitsiya.",
      learnCTA: "Bepul darslarni boshlash",
      learnSecondaryCTA: "Maktab haqida batafsil",
    },
    services: {
      title: "Bizning xizmatlar",
      subtitle:
        "Biz xizmatlarni alohida emas, biznes muammolari atrofida paketlaymiz: ko'proq lid, tezroq jarayonlar, kuchli brend va o'sayotgan organik trafik.",
      items: [
        { title: "Web Development", description: "Konversiyaga yo'naltirilgan korporativ saytlar, landinglar, e-commerce platformalar va SaaS." },
        { title: "SEO & Growth", description: "Texnik SEO, programmatic SEO, kontent strategiya, Google va Yandex'da 1-sahifa." },
        { title: "Lead Generation Systems", description: "Lid voronkalari, CRO, CRM va analitika — saytdan haqiqiy mijozlar oqimi." },
        { title: "AI & Automation", description: "AI chatbotlar, Telegram avtomatlashtirish, ish jarayonlari va aqlli yordamchilar." },
        { title: "Branding & Design", description: "Brand identity, logo, brand book, UI/UX va dizayn tizimlari." },
        { title: "Business Systems", description: "CRM, ERP, logistika, dispatch va ichki biznes platformalar — SaaS-darajadagi sifat bilan." },
        { title: "Infrastructure & Technical", description: "Cloud, DevOps, CI/CD, mikrosservislar, API va xavfsizlik optimizatsiya." },
      ],
    },
    about: {
      title: "Biz haqimizda",
      subtitle:
        "404Dev — Toshkentda joylashgan digital growth, marketing va avtomatlashtirish agentligi. Biz biznesga shunchaki sayt yoki ilova bermaymiz — biz ularga o'sish tizimlarini, ya'ni har oy mijoz keltiruvchi va savdoni avtomatlashtiradigan to'liq mexanizmni topshiramiz.",
      missionTitle: "Bizning missiyamiz",
      mission:
        "O'zbekiston biznesini muhandislik darajasidagi digital ekosistemalar bilan qurollantirish va xalqaro bozorda raqobatbardosh qilish. Bunga parallel ravishda — yangi avlod dasturchilar va digital mutaxassislarni bepul o'qitish.",
      valuesTitle: "Qadriyatlarimiz",
      values: [
        { title: "Engineering-driven", description: "Har bir yechim muhandislik standartlari asosida — soat-soat ishlaydi." },
        { title: "Growth-focused", description: "Biz dizayndan emas, raqamlardan boshlaymiz — har bir piksel mijoz keltirishi kerak." },
        { title: "Premium darajasi", description: "Brand, mahsulot va tajriba — xalqaro standartda his qilinadigan sifat." },
        { title: "Long-term partner", description: "Loyiha topshirilgandan keyin ham yoningizdamiz — o'sish davom etadi." },
      ],
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "O'zbekiston va xalqaro mijozlar uchun ishlab chiqilgan growth tizimlari va kompleks loyihalar.",
      empty: "Tez orada bu yerda yangi loyihalar paydo bo'ladi.",
    },
    blog: {
      title: "Blog",
      subtitle: "Digital marketing, SEO, AI avtomatlashtirish va biznes raqamlashtirish bo'yicha amaliy maqolalar.",
      empty: "Tez orada birinchi maqolalarimiz e'lon qilinadi.",
      readingTime: "min o'qish",
    },
    contact: {
      title: "Bog'lanish",
      subtitle: "Toshkentdan ish boshlaymiz, dunyo bo'ylab natija beramiz. Loyihangiz haqida gaplashaylik — 1 ish kuni ichida javob beramiz.",
      name: "Ismingiz",
      phone: "Telefon raqamingiz",
      telegram: "Telegram username",
      contactHint: "Telefon yoki Telegram'dan birini to'ldiring",
      contactRequired: "Telefon yoki Telegram'dan birini kiriting",
      message: "Xabar",
      submit: "Yuborish",
      success: "Rahmat! Murojaatingiz qabul qilindi. Tez orada bog'lanamiz.",
      error: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
    },
    footer: {
      rights: "Barcha huquqlar himoyalangan.",
      quickLinks: "Tezkor havolalar",
      contact: "Kontakt",
      address: "Toshkent, O'zbekiston",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      services: "Услуги",
      about: "О нас",
      portfolio: "Портфолио",
      blog: "Блог",
      contact: "Контакты",
      learn: "Уроки",
    },
    cta: {
      contactUs: "Связаться",
      sendRequest: "Отправить заявку",
      readMore: "Подробнее",
      learnMore: "Узнать больше",
      viewAll: "Смотреть все",
    },
    home: {
      heroBadge: "404Dev — Digital Growth & Automation Agency",
      heroTitle: "Сделаем бренды узнаваемыми и прибыльными",
      heroSubtitle:
        "Объединяем маркетинг и цифровизацию в единую систему. Реклама у блогеров, SEO, лидогенерация, AI-автоматизация, brand identity и конверсионный сайт — экосистема роста для брендов Узбекистана.",
      statsProjects: "запущенных growth-систем",
      statsClients: "клиентов в Узбекистане и за рубежом",
      statsYears: "лет инженерного опыта",
      servicesTitle: "Наши направления",
      servicesSubtitle:
        "Мы не «студия, которая делает сайты» — мы строим экосистему: лидогенерация, автоматизация продаж и сильный бренд. Всё, что превращает компанию в системно растущий бизнес.",
      techTitle: "Технологии и интеграции",
      techSubtitle: "Современный, проверенный стек для growth, automation и data.",
      ctaTitle: "Запустим следующий этап роста вашего бизнеса",
      ctaSubtitle:
        "Бесплатный growth-аудит — оценим текущий уровень маркетинга и автоматизации и покажем самый быстрый канал роста.",
      learnEyebrow: "/ образовательная миссия",
      learnTitle: "Знание — это самый сильный маркетинг",
      learnLead:
        "Мы инвестируем в новое поколение разработчиков и digital-специалистов в Узбекистане.",
      learnMission:
        "404Dev Learn — это бесплатная школа программирования и digital-навыков на узбекском. Часть от каждого клиентского контракта идёт на создание новых уроков. Для нас это не контент-маркетинг, а ответственность и инвестиция в будущее страны.",
      learnCTA: "Начать бесплатные уроки",
      learnSecondaryCTA: "О школе подробнее",
    },
    services: {
      title: "Наши услуги",
      subtitle:
        "Мы упаковываем услуги не списком, а вокруг бизнес-задач: больше лидов, быстрее процессы, сильный бренд и растущий органический трафик.",
      items: [
        { title: "Web Development", description: "Конверсионные корпоративные сайты, лендинги, e-commerce платформы и SaaS." },
        { title: "SEO & Growth", description: "Технический SEO, programmatic SEO, контент-стратегия, 1 страница в Google и Яндекс." },
        { title: "Lead Generation Systems", description: "Лид-воронки, CRO, CRM, аналитика — поток реальных клиентов с сайта." },
        { title: "AI & Automation", description: "AI чат-боты, автоматизация Telegram, рабочие процессы и умные ассистенты." },
        { title: "Branding & Design", description: "Brand identity, лого, brand book, UI/UX и дизайн-системы." },
        { title: "Business Systems", description: "CRM, ERP, логистика, диспатч и внутренние платформы — на уровне SaaS." },
        { title: "Infrastructure & Technical", description: "Cloud, DevOps, CI/CD, микросервисы, API и оптимизация безопасности." },
      ],
    },
    about: {
      title: "О нас",
      subtitle:
        "404Dev — digital growth, marketing и automation агентство из Ташкента. Мы не просто «делаем сайт» — мы передаём вам систему роста: маркетинг, лидогенерацию и автоматизацию, которые работают каждый месяц.",
      missionTitle: "Наша миссия",
      mission:
        "Дать бизнесу Узбекистана инженерные digital-экосистемы и сделать его конкурентным на международном рынке. Параллельно — бесплатно обучать новое поколение разработчиков и digital-специалистов.",
      valuesTitle: "Наши ценности",
      values: [
        { title: "Engineering-driven", description: "Каждое решение собрано как инженерная система — работает по часам." },
        { title: "Growth-focused", description: "Начинаем с цифр, не с дизайна — каждый пиксель должен приносить клиента." },
        { title: "Premium-уровень", description: "Бренд, продукт и опыт — на международном уровне ощущения качества." },
        { title: "Долгосрочное партнёрство", description: "После релиза остаёмся рядом — рост продолжается." },
      ],
    },
    portfolio: {
      title: "Портфолио",
      subtitle: "Growth-системы и комплексные проекты для клиентов в Узбекистане и за рубежом.",
      empty: "Скоро здесь появятся новые проекты.",
    },
    blog: {
      title: "Блог",
      subtitle: "Прикладные статьи о digital marketing, SEO, AI-автоматизации и цифровизации бизнеса.",
      empty: "Скоро будут опубликованы первые статьи.",
      readingTime: "мин чтения",
    },
    contact: {
      title: "Контакты",
      subtitle: "Работаем из Ташкента, доставляем результат по всему миру. Давайте обсудим ваш проект — ответим в течение одного рабочего дня.",
      name: "Ваше имя",
      phone: "Номер телефона",
      telegram: "Telegram username",
      contactHint: "Заполните телефон или Telegram",
      contactRequired: "Укажите телефон или Telegram",
      message: "Сообщение",
      submit: "Отправить",
      success: "Спасибо! Заявка принята. Мы скоро свяжемся.",
      error: "Произошла ошибка. Попробуйте ещё раз.",
    },
    footer: {
      rights: "Все права защищены.",
      quickLinks: "Быстрые ссылки",
      contact: "Контакты",
      address: "Ташкент, Узбекистан",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
      learn: "Learn",
    },
    cta: {
      contactUs: "Contact us",
      sendRequest: "Send request",
      readMore: "Read more",
      learnMore: "Learn more",
      viewAll: "View all",
    },
    home: {
      heroBadge: "404Dev — Digital Growth & Automation Agency",
      heroTitle: "We make brands recognizable and profitable",
      heroSubtitle:
        "Marketing meets digital engineering — in one system. Influencer marketing, SEO, lead generation, AI automation, brand identity and a conversion-focused site — one growth ecosystem for Uzbekistan's brands.",
      statsProjects: "growth systems shipped",
      statsClients: "clients across Uzbekistan & worldwide",
      statsYears: "years of engineering experience",
      servicesTitle: "Our practices",
      servicesSubtitle:
        "We're not just a web studio — we build the full ecosystem: lead generation, sales automation and a strong brand. Everything that turns a business into a systematically growing one.",
      techTitle: "Technology & integrations",
      techSubtitle: "A modern, battle-tested stack for growth, automation and data.",
      ctaTitle: "Let's launch the next stage of your growth",
      ctaSubtitle:
        "Free growth audit — we evaluate your current marketing and automation maturity and show the fastest channel for growth.",
      learnEyebrow: "/ education mission",
      learnTitle: "Knowledge is the strongest marketing of all",
      learnLead:
        "We invest in the next generation of developers and digital specialists in Uzbekistan.",
      learnMission:
        "404Dev Learn is a free school of programming and digital skills in Uzbek. A share of every client contract goes into producing new lessons. For us this isn't content marketing — it's a responsibility and an investment in the future of the country.",
      learnCTA: "Start free lessons",
      learnSecondaryCTA: "About the school",
    },
    services: {
      title: "Our services",
      subtitle:
        "We don't just list services — we package them around business outcomes: more leads, faster processes, a stronger brand, and growing organic traffic.",
      items: [
        { title: "Web Development", description: "Conversion-focused corporate sites, landing pages, e-commerce platforms and SaaS." },
        { title: "SEO & Growth", description: "Technical SEO, programmatic SEO, content strategy, page-one rankings on Google & Yandex." },
        { title: "Lead Generation Systems", description: "Lead funnels, CRO, CRM, analytics — a real flow of customers from your site." },
        { title: "AI & Automation", description: "AI chatbots, Telegram automation, workflows and smart business assistants." },
        { title: "Branding & Design", description: "Brand identity, logo, brand book, UI/UX and design systems." },
        { title: "Business Systems", description: "CRM, ERP, logistics, dispatch and internal platforms — at SaaS-grade quality." },
        { title: "Infrastructure & Technical", description: "Cloud, DevOps, CI/CD, microservices, APIs and security optimisation." },
      ],
    },
    about: {
      title: "About us",
      subtitle:
        "404Dev is a digital growth, marketing & automation agency based in Tashkent, Uzbekistan. We don't just hand you a website — we hand you a growth system: marketing, lead generation and automation that work every month.",
      missionTitle: "Our mission",
      mission:
        "Equip Uzbekistan's businesses with engineering-grade digital ecosystems and make them competitive in the global market. In parallel — train the next generation of developers and digital specialists for free.",
      valuesTitle: "Our values",
      values: [
        { title: "Engineering-driven", description: "Every solution is built like an engineering system — runs like clockwork." },
        { title: "Growth-focused", description: "We start from numbers, not design — every pixel must earn a customer." },
        { title: "Premium-grade", description: "Brand, product and experience that feel international." },
        { title: "Long-term partner", description: "We stay with you after launch — growth keeps going." },
      ],
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Growth systems and end-to-end projects for clients in Uzbekistan and abroad.",
      empty: "New projects coming soon.",
    },
    blog: {
      title: "Blog",
      subtitle: "Practical articles on digital marketing, SEO, AI automation and business digitalisation.",
      empty: "Our first articles will be published soon.",
      readingTime: "min read",
    },
    contact: {
      title: "Contact",
      subtitle: "Based in Tashkent, delivering results worldwide. Let's talk about your project — we reply within one business day.",
      name: "Your name",
      phone: "Phone number",
      telegram: "Telegram username",
      contactHint: "Fill in either phone or Telegram",
      contactRequired: "Please provide a phone or Telegram username",
      message: "Message",
      submit: "Send",
      success: "Thank you! Your request has been received. We'll get back to you shortly.",
      error: "An error occurred. Please try again.",
    },
    footer: {
      rights: "All rights reserved.",
      quickLinks: "Quick links",
      contact: "Contact",
      address: "Tashkent, Uzbekistan",
    },
  },
};

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries.uz;
}

export type { Dict };
