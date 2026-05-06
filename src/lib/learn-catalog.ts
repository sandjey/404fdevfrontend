// Curated technology catalog — visual metadata used to enrich API tech list.
// When the API returns a tech, we look up its slug here to apply colors,
// glyph and category. When the API list is empty (or partial), we still show
// these techs as "Tez orada" cards so the page never feels bare.

export type TechCategory =
  | "frontend"
  | "backend"
  | "mobile"
  | "database"
  | "ai"
  | "devops"
  | "language";

export type TechMeta = {
  slug: string;
  name: string;
  glyph: string;          // short text glyph (1-2 chars) used as icon fallback
  description: string;
  category: TechCategory;
  // Tailwind-friendly gradient + text classes — light theme cream surface.
  gradient: string;       // e.g. "from-amber-300/30 via-amber-200/20 to-rose-200/20"
  accent: string;         // e.g. "text-amber-700"
  ring: string;           // e.g. "ring-amber-200"
  bg: string;             // icon bg, e.g. "bg-amber-50"
};

export const TECH_CATEGORIES: { id: TechCategory; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobil" },
  { id: "database", label: "Ma'lumotlar bazasi" },
  { id: "ai", label: "AI / ML" },
  { id: "devops", label: "DevOps" },
  { id: "language", label: "Til" },
];

export const TECH_CATALOG: TechMeta[] = [
  {
    slug: "javascript",
    name: "JavaScript",
    glyph: "JS",
    description: "Web uchun eng ko'p ishlatiladigan dasturlash tili. Asoslardan modern ES2024 gacha.",
    category: "language",
    gradient: "from-amber-300/40 via-yellow-200/25 to-orange-200/20",
    accent: "text-amber-700",
    ring: "ring-amber-200",
    bg: "bg-amber-50",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    glyph: "TS",
    description: "Tip xavfsizligi bilan kuchaytirilgan JavaScript. Katta loyihalar uchun zarur.",
    category: "language",
    gradient: "from-sky-300/40 via-blue-200/25 to-indigo-200/20",
    accent: "text-sky-700",
    ring: "ring-sky-200",
    bg: "bg-sky-50",
  },
  {
    slug: "react",
    name: "React",
    glyph: "⚛",
    description: "Komponentlar asosidagi UI kutubxonasi. Hooks, state management, Next.js integratsiyasi.",
    category: "frontend",
    gradient: "from-cyan-300/40 via-sky-200/25 to-blue-200/20",
    accent: "text-cyan-700",
    ring: "ring-cyan-200",
    bg: "bg-cyan-50",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    glyph: "N",
    description: "Production-ready React framework. App Router, SSR, ISR, server actions.",
    category: "frontend",
    gradient: "from-ink-300/40 via-ink-200/25 to-ink-100/20",
    accent: "text-ink-900",
    ring: "ring-ink-300",
    bg: "bg-ink-100",
  },
  {
    slug: "go",
    name: "Go",
    glyph: "Go",
    description: "Tez, sodda va kuchli backend tili. Concurrency, microservices, CLI ilovalar.",
    category: "backend",
    gradient: "from-cyan-300/40 via-teal-200/25 to-emerald-200/20",
    accent: "text-teal-700",
    ring: "ring-teal-200",
    bg: "bg-teal-50",
  },
  {
    slug: "python",
    name: "Python",
    glyph: "Py",
    description: "Sodda sintaksis, kuchli kutubxonalar. Web, AI, ma'lumot tahlili uchun ideal.",
    category: "language",
    gradient: "from-blue-300/40 via-indigo-200/25 to-yellow-200/20",
    accent: "text-blue-700",
    ring: "ring-blue-200",
    bg: "bg-blue-50",
  },
  {
    slug: "java",
    name: "Java",
    glyph: "Jv",
    description: "Korporativ ilovalar uchun klassik OOP til. JVM, Spring, Android.",
    category: "language",
    gradient: "from-orange-300/40 via-red-200/25 to-amber-200/20",
    accent: "text-orange-700",
    ring: "ring-orange-200",
    bg: "bg-orange-50",
  },
  {
    slug: "html-css",
    name: "HTML & CSS",
    glyph: "</>",
    description: "Web sahifalarni qurish va dizayn qilish asoslari. Flex, Grid, animatsiyalar.",
    category: "frontend",
    gradient: "from-rose-300/40 via-pink-200/25 to-fuchsia-200/20",
    accent: "text-rose-700",
    ring: "ring-rose-200",
    bg: "bg-rose-50",
  },
  {
    slug: "nodejs",
    name: "Node.js",
    glyph: "N",
    description: "JavaScript bilan server yozish. Express, NestJS, real-time ilovalar.",
    category: "backend",
    gradient: "from-emerald-300/40 via-green-200/25 to-lime-200/20",
    accent: "text-emerald-700",
    ring: "ring-emerald-200",
    bg: "bg-emerald-50",
  },
  {
    slug: "sql",
    name: "SQL",
    glyph: "DB",
    description: "Ma'lumotlar bazasi tili. SELECT, JOIN, indekslar, optimizatsiya.",
    category: "database",
    gradient: "from-violet-300/40 via-purple-200/25 to-fuchsia-200/20",
    accent: "text-violet-700",
    ring: "ring-violet-200",
    bg: "bg-violet-50",
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    glyph: "Pg",
    description: "Eng kuchli open-source SQL DB. JSONB, indexing, performance tuning.",
    category: "database",
    gradient: "from-blue-300/40 via-cyan-200/25 to-indigo-200/20",
    accent: "text-blue-700",
    ring: "ring-blue-200",
    bg: "bg-blue-50",
  },
  {
    slug: "docker",
    name: "Docker",
    glyph: "🐳",
    description: "Konteynerlar bilan ilovalarni paketlash va deploy qilish.",
    category: "devops",
    gradient: "from-sky-300/40 via-blue-200/25 to-indigo-200/20",
    accent: "text-sky-700",
    ring: "ring-sky-200",
    bg: "bg-sky-50",
  },
  {
    slug: "git",
    name: "Git",
    glyph: "⎇",
    description: "Versiya nazorati: commit, branch, merge, rebase, GitHub workflow.",
    category: "devops",
    gradient: "from-orange-300/40 via-amber-200/25 to-red-200/20",
    accent: "text-orange-700",
    ring: "ring-orange-200",
    bg: "bg-orange-50",
  },
  {
    slug: "flutter",
    name: "Flutter",
    glyph: "F",
    description: "Bir kod bilan iOS, Android, web uchun mobil ilovalar yaratish.",
    category: "mobile",
    gradient: "from-cyan-300/40 via-sky-200/25 to-blue-200/20",
    accent: "text-cyan-700",
    ring: "ring-cyan-200",
    bg: "bg-cyan-50",
  },
  {
    slug: "ai",
    name: "AI & LLM",
    glyph: "✦",
    description: "Sun'iy intellekt, neyron tarmoqlar, LLM va prompt engineering asoslari.",
    category: "ai",
    gradient: "from-fuchsia-300/40 via-purple-200/25 to-pink-200/20",
    accent: "text-fuchsia-700",
    ring: "ring-fuchsia-200",
    bg: "bg-fuchsia-50",
  },
];

export function metaForSlug(slug: string): TechMeta | undefined {
  return TECH_CATALOG.find((t) => t.slug === slug);
}

// Stable visual metadata for any technology, even if it's not in the catalog.
// Falls back to a deterministic palette pick based on slug hash.
const FALLBACK_PALETTE: Pick<TechMeta, "gradient" | "accent" | "ring" | "bg">[] = [
  { gradient: "from-brand-300/40 via-brand-200/25 to-amber-200/20", accent: "text-brand-700", ring: "ring-brand-200", bg: "bg-brand-50" },
  { gradient: "from-cyan-300/40 via-sky-200/25 to-blue-200/20", accent: "text-cyan-700", ring: "ring-cyan-200", bg: "bg-cyan-50" },
  { gradient: "from-violet-300/40 via-purple-200/25 to-fuchsia-200/20", accent: "text-violet-700", ring: "ring-violet-200", bg: "bg-violet-50" },
  { gradient: "from-emerald-300/40 via-green-200/25 to-teal-200/20", accent: "text-emerald-700", ring: "ring-emerald-200", bg: "bg-emerald-50" },
  { gradient: "from-rose-300/40 via-pink-200/25 to-fuchsia-200/20", accent: "text-rose-700", ring: "ring-rose-200", bg: "bg-rose-50" },
  { gradient: "from-amber-300/40 via-yellow-200/25 to-orange-200/20", accent: "text-amber-700", ring: "ring-amber-200", bg: "bg-amber-50" },
];

export function visualForSlug(slug: string): Pick<TechMeta, "gradient" | "accent" | "ring" | "bg" | "glyph" | "category"> {
  const found = metaForSlug(slug);
  if (found) return found;
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const palette = FALLBACK_PALETTE[h % FALLBACK_PALETTE.length];
  return { ...palette, glyph: slug.slice(0, 2).toUpperCase(), category: "language" };
}
