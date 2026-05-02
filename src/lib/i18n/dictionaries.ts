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
      heroBadge: "404Dev — Toshkentdan raqamli agentlik",
      heroTitle: "O'zbekiston va butun dunyo bo'ylab xizmatlarni raqamlashtirishga yordam beramiz",
      heroSubtitle:
        "404Dev — Toshkentdagi outsourcing studiya. Web saytlar, Telegram botlar, mobil ilovalar, CRM/ERP tizimlar va biznes avtomatlashtirish — O'zbekiston biznesi uchun g'oyadan tayyor mahsulotgacha bir joyda.",
      statsProjects: "yakunlangan loyihalar",
      statsClients: "O'zbekistondagi mamnun mijozlar",
      statsYears: "yillik tajriba",
      servicesTitle: "Bizning xizmatlar",
      servicesSubtitle:
        "O'zbekiston bozoriga moslangan yechimlar — g'oyadan tortib ishga tushirish va keyingi qo'llab-quvvatlashgacha bir joyda.",
      techTitle: "Texnologiyalar",
      techSubtitle: "Biz ishonchli, sinovdan o'tgan texnologiya stekidan foydalanamiz.",
      ctaTitle: "Loyihangizni biz bilan boshlang",
      ctaSubtitle:
        "Bepul konsultatsiya oling — O'zbekistondagi biznesingiz uchun eng to'g'ri raqamli yechimni topamiz.",
    },
    services: {
      title: "Xizmatlarimiz",
      subtitle:
        "O'zbekiston biznesi va dunyo bo'ylab mijozlar uchun raqamli yechimlar — g'oyadan tayyor mahsulotgacha bir joyda.",
      items: [
        { title: "Web saytlar", description: "Korporativ saytlar, landing pagelar, e-commerce platformalar." },
        { title: "Telegram botlar", description: "Mijozlarni avtomatlashtirish, savdo va yetkazib berish botlari." },
        { title: "Mobil ilovalar", description: "iOS va Android uchun cross-platforma mobil yechimlar." },
        { title: "CRM / ERP tizimlar", description: "Kompaniya jarayonlarini avtomatlashtiruvchi maxsus tizimlar." },
        { title: "Biznes avtomatlashtirish", description: "Hujjat aylanishi, hisobot va integratsiyalarni avtomatlashtirish." },
        { title: "API integratsiya", description: "To'lov tizimlari, logistika, marketplace va boshqa servislar." },
      ],
    },
    about: {
      title: "Biz haqimizda",
      subtitle:
        "404Dev — Toshkent shahridagi outsourcing studiya. Biz O'zbekiston va butun dunyo bo'ylab xizmatlarni raqamlashtirishga yordam beramiz: raqamli mahsulotlarni yaratish va biznesni avtomatlashtirishga ixtisoslashganmiz.",
      missionTitle: "Bizning missiyamiz",
      mission:
        "O'zbekiston biznesiga zamonaviy texnologiyalar orqali o'sish va xalqaro bozorda raqobatbardosh bo'lishga yordam berish. Biz har bir loyihaga shaffof, professional va natijaga yo'naltirilgan yondashuvni qo'llaymiz.",
      valuesTitle: "Qadriyatlarimiz",
      values: [
        { title: "Sifat", description: "Har bir kod qatorida muhandislik standartlari." },
        { title: "Shaffoflik", description: "Mijoz har bosqichda jarayonni ko'radi." },
        { title: "Tezlik", description: "Tezkor yetkazib berish va kelishilgan deadline." },
        { title: "Qo'llab-quvvatlash", description: "Loyiha tugagandan keyin ham yoningizdamiz." },
      ],
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "O'zbekistondagi va xalqaro mijozlar uchun yakunlangan loyihalarimiz va keyslar.",
      empty: "Tez orada bu yerda yangi loyihalar paydo bo'ladi.",
    },
    blog: {
      title: "Blog",
      subtitle: "O'zbekiston bozori, texnologiyalar va biznes raqamlashtirish haqida maqolalarimiz.",
      empty: "Tez orada birinchi maqolalarimiz e'lon qilinadi.",
      readingTime: "min o'qish",
    },
    contact: {
      title: "Bog'lanish",
      subtitle: "Toshkentdan ish boshlaymiz, dunyo bo'ylab yetkazib beramiz. Loyihangiz haqida gaplashaylik — 1 ish kuni ichida javob beramiz.",
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
      heroBadge: "404Dev — цифровое агентство из Ташкента",
      heroTitle: "Помогаем цифровизировать услуги в Узбекистане и по всему миру",
      heroSubtitle:
        "404Dev — outsourcing-студия в Ташкенте. Мы создаём веб-сайты, Telegram-ботов, мобильные приложения, CRM/ERP системы и автоматизируем бизнес-процессы — от идеи до готового продукта в одном месте.",
      statsProjects: "завершённых проектов",
      statsClients: "довольных клиентов в Узбекистане",
      statsYears: "лет опыта",
      servicesTitle: "Наши услуги",
      servicesSubtitle: "Решения, адаптированные к рынку Узбекистана — от идеи до запуска и сопровождения в одном месте.",
      techTitle: "Технологии",
      techSubtitle: "Мы используем надёжный, проверенный технологический стек.",
      ctaTitle: "Начните проект с нами",
      ctaSubtitle: "Бесплатная консультация — подберём оптимальное цифровое решение для вашего бизнеса в Узбекистане.",
    },
    services: {
      title: "Наши услуги",
      subtitle: "Цифровые решения для бизнеса в Узбекистане и клиентов по всему миру — от идеи до готового продукта.",
      items: [
        { title: "Веб-сайты", description: "Корпоративные сайты, лендинги, e-commerce." },
        { title: "Telegram боты", description: "Автоматизация клиентов, продажи, логистика." },
        { title: "Мобильные приложения", description: "Cross-platform решения для iOS и Android." },
        { title: "CRM / ERP", description: "Кастомные системы автоматизации компании." },
        { title: "Автоматизация бизнеса", description: "Документооборот, отчётность, интеграции." },
        { title: "API интеграции", description: "Платежи, логистика, маркетплейсы и др." },
      ],
    },
    about: {
      title: "О нас",
      subtitle:
        "404Dev — outsourcing-студия из Ташкента, Узбекистан. Помогаем цифровизировать услуги в Узбекистане и по всему миру: специализируемся на создании цифровых продуктов и автоматизации бизнеса.",
      missionTitle: "Наша миссия",
      mission:
        "Помогать бизнесу в Узбекистане расти и оставаться конкурентным на международном рынке с помощью современных технологий. Прозрачно, профессионально, с фокусом на результат.",
      valuesTitle: "Наши ценности",
      values: [
        { title: "Качество", description: "Инженерные стандарты в каждой строке кода." },
        { title: "Прозрачность", description: "Клиент видит процесс на каждом этапе." },
        { title: "Скорость", description: "Соблюдаем дедлайны." },
        { title: "Поддержка", description: "Не оставляем после релиза." },
      ],
    },
    portfolio: {
      title: "Портфолио",
      subtitle: "Наши завершённые проекты и кейсы — для клиентов в Узбекистане и за рубежом.",
      empty: "Скоро здесь появятся новые проекты.",
    },
    blog: {
      title: "Блог",
      subtitle: "Статьи о рынке Узбекистана, технологиях и цифровизации бизнеса.",
      empty: "Скоро будут опубликованы первые статьи.",
      readingTime: "мин чтения",
    },
    contact: {
      title: "Контакты",
      subtitle: "Работаем из Ташкента, доставляем по всему миру. Давайте обсудим ваш проект — ответим в течение одного рабочего дня.",
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
      heroBadge: "404Dev — digital agency from Tashkent, Uzbekistan",
      heroTitle: "We help digitalize services in Uzbekistan and around the world",
      heroSubtitle:
        "404Dev is an outsourcing studio based in Tashkent, Uzbekistan. We build websites, Telegram bots, mobile apps, CRM/ERP systems, and automate business workflows — from idea to finished product in one place.",
      statsProjects: "projects delivered",
      statsClients: "happy clients across Uzbekistan",
      statsYears: "years of experience",
      servicesTitle: "Our services",
      servicesSubtitle: "Solutions tailored to the Uzbekistan market — from idea to launch and ongoing support, all in one place.",
      techTitle: "Technologies",
      techSubtitle: "We use a reliable, battle-tested technology stack.",
      ctaTitle: "Start your project with us",
      ctaSubtitle: "Free consultation — we'll find the right digital solution for your business in Uzbekistan.",
    },
    services: {
      title: "Our services",
      subtitle: "Digital solutions for businesses in Uzbekistan and clients worldwide — from idea to launch.",
      items: [
        { title: "Websites", description: "Corporate sites, landing pages, e-commerce." },
        { title: "Telegram bots", description: "Customer automation, sales, delivery bots." },
        { title: "Mobile apps", description: "Cross-platform iOS & Android solutions." },
        { title: "CRM / ERP", description: "Custom systems to automate your company." },
        { title: "Business automation", description: "Document flow, reporting, integrations." },
        { title: "API integrations", description: "Payments, logistics, marketplaces, more." },
      ],
    },
    about: {
      title: "About us",
      subtitle:
        "404Dev is an outsourcing studio based in Tashkent, Uzbekistan. We help digitalize services in Uzbekistan and around the world — focused on building digital products and automating businesses.",
      missionTitle: "Our mission",
      mission:
        "Help Uzbekistan businesses grow and stay competitive in the global market through modern technology. Transparent, professional, results-driven.",
      valuesTitle: "Our values",
      values: [
        { title: "Quality", description: "Engineering standards in every line of code." },
        { title: "Transparency", description: "Clients see the process at every stage." },
        { title: "Speed", description: "We meet deadlines." },
        { title: "Support", description: "We stay with you after release." },
      ],
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Completed projects and case studies — for clients in Uzbekistan and abroad.",
      empty: "New projects coming soon.",
    },
    blog: {
      title: "Blog",
      subtitle: "Articles about the Uzbekistan market, technology and business digitalization.",
      empty: "Our first articles will be published soon.",
      readingTime: "min read",
    },
    contact: {
      title: "Contact",
      subtitle: "Based in Tashkent, delivering worldwide. Let's talk about your project — we reply within one business day.",
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
