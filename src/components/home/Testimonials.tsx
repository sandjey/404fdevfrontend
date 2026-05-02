import { QuoteIcon, StarIcon } from "@/components/icons";
import { type Locale } from "@/lib/i18n/config";

type Item = { name: string; role: string; quote: string; avatar: string };

const ITEMS: Record<Locale, Item[]> = {
  uz: [
    { name: "Bekzod", role: "MChJ direktori", avatar: "B", quote: "Saytni o'z vaqtida, sifatli yetkazib berishdi. Yangi mijozlar kelishidan boshlanib, hozir bizning eng samarali kanal." },
    { name: "Madina", role: "Marketing menejer", avatar: "M", quote: "Telegram bot orqali zayavkalarni avtomatlashtirdik — xodimlarimizning vaqti 3 baravar tejaldi." },
    { name: "Jasur", role: "Online do'kon egasi", avatar: "J", quote: "CRM tizim biznesimizni butunlay o'zgartirdi. Hisobotlar bir tugma bosishda paydo bo'ladi." },
  ],
  ru: [
    { name: "Бекзод", role: "Директор ООО", avatar: "Б", quote: "Сайт сдали в срок и качественно. С момента запуска — наш самый эффективный канал для новых клиентов." },
    { name: "Мадина", role: "Маркетолог", avatar: "М", quote: "Автоматизировали заявки через Telegram-бота — высвободили время команды втрое." },
    { name: "Жасур", role: "Владелец интернет-магазина", avatar: "Ж", quote: "CRM полностью изменил наш бизнес. Отчёты в один клик." },
  ],
  en: [
    { name: "Bekzod", role: "CEO, LLC", avatar: "B", quote: "Delivered the site on time and with quality. It became our most effective channel for new clients." },
    { name: "Madina", role: "Marketing Manager", avatar: "M", quote: "Automating leads via Telegram bot saved our team 3x time." },
    { name: "Jasur", role: "E-commerce Owner", avatar: "J", quote: "The CRM transformed our business. Reports in a single click." },
  ],
};

const HEAD = {
  uz: { eyebrow: "Mijozlarimiz fikri", title: "Bizga ishongan jamoalar nima deyishadi" },
  ru: { eyebrow: "Отзывы клиентов", title: "Что говорят те, кто нам доверился" },
  en: { eyebrow: "What our clients say", title: "Hear from teams who trusted us" },
};

const COLORS = ["#FF4D2E", "#0F0F0F", "#FF6B47", "#0F0F0F", "#FF4D2E", "#0F0F0F"];

export default function Testimonials({ locale }: { locale: Locale }) {
  const items = ITEMS[locale];
  const head = HEAD[locale];

  return (
    <section className="section relative">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">/ {head.eyebrow}</span>
          <h2 className="display-2 mt-3">{head.title}</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <figure key={i} className="card card-hover p-7 relative">
              <QuoteIcon size={28} className="text-brand-300" />
              <blockquote className="mt-3 text-ink-800 leading-relaxed">{it.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-ink-200">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full text-cream-50 font-bold"
                  style={{ background: COLORS[i % COLORS.length] }}
                >
                  {it.avatar}
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink-900">{it.name}</div>
                  <div className="text-xs text-ink-600">{it.role}</div>
                </div>
                <span className="ml-auto inline-flex items-center gap-0.5 text-brand-500">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <StarIcon key={k} size={12} />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
