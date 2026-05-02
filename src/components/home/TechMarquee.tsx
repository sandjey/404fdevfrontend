import { type Locale } from "@/lib/i18n/config";

const TECHS = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
  "Go", "Gin", "Python", "FastAPI", "PostgreSQL",
  "MongoDB", "Redis", "Docker", "AWS", "GCP",
  "Cloudinary", "Stripe", "Telegram Bot API", "GraphQL", "tRPC",
];

const HEAD = {
  uz: { eyebrow: "Texnologiya stek", title: "Eng zamonaviy va sinovdan o'tgan vositalar" },
  ru: { eyebrow: "Технологический стек", title: "Современные и проверенные инструменты" },
  en: { eyebrow: "Tech stack", title: "Modern and battle-tested tools" },
};

export default function TechMarquee({ locale }: { locale: Locale }) {
  const head = HEAD[locale];
  const row = [...TECHS, ...TECHS]; // double for seamless loop
  return (
    <section className="section-tight">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">/ {head.eyebrow}</span>
          <h2 className="display-3 mt-3">{head.title}</h2>
        </div>
      </div>

      <div
        className="relative mt-10 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="flex w-max gap-3"
          style={{ animation: "marquee 50s linear infinite" }}
        >
          {row.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="rounded-full bg-cream-50 px-5 py-2 text-sm font-mono font-medium text-ink-800 ring-1 ring-ink-200 shadow-soft whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* keyframes via inline style — already animation: marquee */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
