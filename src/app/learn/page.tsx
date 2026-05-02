import type { Metadata } from "next";
import Link from "next/link";
import { api, type TechnologyTree } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { ArrowUpRightIcon, BotIcon, CodeIcon, DatabaseIcon, GlobeIcon, RocketIcon, SparklesIcon, ZapIcon } from "@/components/icons";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Bepul dasturlash darslari — 404Dev Learn",
    description:
      "JavaScript, Go, Python, Java, React va boshqa texnologiyalar bo'yicha o'zbek tilidagi bepul darsliklar. Asoslar, amaliyot, real misollar.",
    path: "/learn",
    locale: "uz",
  });
}

const FALLBACK_ICONS = [CodeIcon, GlobeIcon, BotIcon, DatabaseIcon, RocketIcon, ZapIcon];

const TECH_GRADIENTS = [
  "from-brand-500/20 to-cyan-500/20",
  "from-violet-500/20 to-pink-500/20",
  "from-emerald-500/20 to-cyan-500/20",
  "from-amber-500/20 to-rose-500/20",
  "from-blue-500/20 to-indigo-500/20",
  "from-fuchsia-500/20 to-purple-500/20",
];

export default async function LearnIndexPage() {
  let tree: TechnologyTree[] = [];
  try {
    const res = await api.get<TechnologyTree[] | null>(`/learn/tree`, { next: { revalidate: 300 } });
    tree = Array.isArray(res) ? res : [];
  } catch {
    tree = [];
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-brand-950 text-white">
        <div aria-hidden className="absolute inset-0 -z-10 aurora opacity-90" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-15" />
        <div aria-hidden className="absolute -top-40 left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-400/30 blur-3xl animate-blob" />
        <div aria-hidden className="absolute -bottom-32 right-1/4 h-[26rem] w-[26rem] rounded-full bg-brand-500/40 blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />

        <div className="container py-20 md:py-28 text-center relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold ring-1 ring-white/15 backdrop-blur">
            <SparklesIcon size={13} className="text-yellow-300" />
            404Dev Learn
            <span className="ml-1 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">BEPUL</span>
          </span>
          <h1 className="mt-6 max-w-4xl mx-auto text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05] text-glow-brand">
            Dasturlashni <span className="gradient-text-cyan">o'zbek tilida</span><br className="hidden sm:block" />
            bosqichma-bosqich o'rganing
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-ink-200">
            Asoslardan amaliyotgacha — soddadan murakkabga, real misollar va vazifalar bilan. Har bir mavzu tushunarli va aniq.
          </p>
          <div className="mt-9 flex items-center justify-center gap-2 text-xs text-ink-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
            <span>Yangilanib boriladi · Practice-driven · O'zbek tilida</span>
          </div>
        </div>
      </section>

      {/* Tech grid */}
      <section className="section-tight">
        <div className="container">
          {tree.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-200 bg-ink-50 p-14 text-center">
              <p className="text-ink-500">Tez orada bu yerda birinchi darsliklar paydo bo'ladi.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tree.map((tech, i) => {
                const totalLessons = tech.sections.reduce((acc, s) => acc + s.lessons.length, 0);
                const Icon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
                const grad = TECH_GRADIENTS[i % TECH_GRADIENTS.length];
                return (
                  <Link
                    key={tech.id}
                    href={`/learn/${tech.slug}`}
                    className="group card card-hover p-7 relative overflow-hidden"
                  >
                    <div aria-hidden className={`absolute inset-0 -z-10 bg-gradient-to-br ${grad} opacity-0 group-hover:opacity-100 transition`} />
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 text-2xl">
                        {tech.icon ? tech.icon : <Icon size={26} />}
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-xl font-bold text-ink-900 tracking-tight group-hover:text-brand-700 transition truncate">
                          {tech.name}
                        </h2>
                        <p className="text-xs text-ink-500 mt-0.5">
                          {tech.sections.length} bo'lim · {totalLessons} mavzu
                        </p>
                      </div>
                      <ArrowUpRightIcon size={16} className="ml-auto text-ink-400 group-hover:text-brand-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                    </div>
                    {tech.description && (
                      <p className="mt-5 text-sm text-ink-600 line-clamp-3 leading-6">{tech.description}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
