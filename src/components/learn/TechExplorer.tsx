"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  TECH_CATEGORIES,
  type TechCategory,
  visualForSlug,
} from "@/lib/learn-catalog";
import { ArrowUpRightIcon } from "@/components/icons";

type AvailableTech = {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  sectionsCount: number;
  lessonsCount: number;
};

type Props = { available: AvailableTech[] };

export default function TechExplorer({ available }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | TechCategory>("all");

  const enriched = useMemo(
    () =>
      available.map((t) => {
        const visual = visualForSlug(t.slug);
        return { ...t, visual };
      }),
    [available]
  );

  const visibleCategories = useMemo(() => {
    const present = new Set<TechCategory>();
    for (const t of enriched) present.add(t.visual.category);
    return TECH_CATEGORIES.filter((c) => present.has(c.id));
  }, [enriched]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enriched.filter((t) => {
      const matchesQuery =
        !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || t.visual.category === filter;
      return matchesQuery && matchesFilter;
    });
  }, [enriched, query, filter]);

  if (available.length === 0) {
    return (
      <section className="section-tight">
        <div className="container">
          <div className="rounded-2xl border border-dashed border-ink-200 bg-cream-50 p-14 text-center">
            <p className="text-ink-500">Tez orada birinchi darsliklar paydo bo'ladi.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-7 md:py-10">
      <div className="container">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="relative w-full lg:w-96">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Texnologiya nomi yoki kalit so'z..."
              className="w-full rounded-lg border border-ink-200 bg-cream-50 pl-10 pr-3 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900/10 transition"
              aria-label="Texnologiyani qidirish"
            />
            <svg
              aria-hidden
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>

          {visibleCategories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 -mx-1 overflow-x-auto no-scrollbar">
              <Chip active={filter === "all"} onClick={() => setFilter("all")} label="Barchasi" />
              {visibleCategories.map((c) => (
                <Chip
                  key={c.id}
                  active={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  label={c.label}
                />
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-cream-50 p-14 text-center">
            <p className="text-ink-500">"{query}" bo'yicha hech narsa topilmadi.</p>
          </div>
        ) : (
          <div className="grid gap-px bg-ink-200/70 rounded-2xl overflow-hidden ring-1 ring-ink-200/70 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tech, i) => (
              <TechCard key={tech.slug} tech={tech} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center rounded-md px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors whitespace-nowrap " +
        (active
          ? "bg-ink-900 text-cream-50"
          : "text-ink-600 hover:bg-ink-100 hover:text-ink-900")
      }
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function TechCard({
  tech,
  index,
}: {
  tech: AvailableTech & { visual: ReturnType<typeof visualForSlug> };
  index: number;
}) {
  return (
    <Link
      href={`/learn/${tech.slug}`}
      className="group relative bg-cream-50 p-7 md:p-8 transition-colors hover:bg-cream-100/60 flex flex-col"
    >
      {/* Index badge — magazine number in corner */}
      <span className="absolute top-5 right-5 font-mono text-[10px] tabular-nums text-ink-300 tracking-wider">
        T-{String(index).padStart(2, "0")}
      </span>

      {/* Glyph */}
      <span
        className={`grid h-14 w-14 place-items-center rounded-xl ${tech.visual.bg} ${tech.visual.accent} ring-1 ${tech.visual.ring} text-lg font-bold mb-6 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105`}
      >
        {tech.icon ? <span className="text-2xl">{tech.icon}</span> : tech.visual.glyph}
      </span>

      {/* Title */}
      <h3 className="text-2xl md:text-[26px] font-bold text-ink-900 tracking-tight leading-tight">
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_2px] bg-[position:0_100%] group-hover:bg-[length:100%_2px] transition-[background-size] duration-500 text-ink-900 group-hover:text-brand-700">
          {tech.name}
        </span>
      </h3>

      {/* Description */}
      {tech.description && (
        <p className="mt-3 text-sm text-ink-600 leading-relaxed line-clamp-3">
          {tech.description}
        </p>
      )}

      {/* Footer meta */}
      <div className="mt-6 pt-5 border-t border-ink-200/70 flex items-center justify-between">
        <span className="font-mono text-[11px] tabular-nums text-ink-500">
          {tech.sectionsCount} bo'lim · {tech.lessonsCount} mavzu
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-500 group-hover:text-brand-700 transition">
          O'rganish
          <ArrowUpRightIcon
            size={12}
            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
          />
        </span>
      </div>

      {/* Coral hairline reveal at top */}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-[2px] w-0 bg-brand-500 group-hover:w-full transition-[width] duration-500"
      />
    </Link>
  );
}
