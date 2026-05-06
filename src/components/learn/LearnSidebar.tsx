"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ChevronRightIcon, MenuIcon, XIcon, CheckIcon } from "@/components/icons";

export type SidebarLesson = {
  id: string;
  title: string;
  slug: string;
};

export type SidebarSection = {
  id: string;
  title: string;
  slug: string;
  lessons: SidebarLesson[];
};

type Props = {
  techSlug: string;
  techName: string;
  techGlyph?: string;
  techBg?: string;
  techAccent?: string;
  techRing?: string;
  sections: SidebarSection[];
  activeSectionSlug?: string;
  activeLessonSlug?: string;
};

export default function LearnSidebar({
  techSlug,
  techName,
  techGlyph = "•",
  techBg = "bg-brand-50",
  techAccent = "text-brand-700",
  techRing = "ring-brand-200",
  sections,
  activeSectionSlug,
  activeLessonSlug,
}: Props) {
  // Active section auto-expanded; others collapsed by default to feel "compact".
  // Users can expand/collapse freely.
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const s of sections) {
      init[s.id] = activeSectionSlug ? s.slug === activeSectionSlug : true;
    }
    return init;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Re-expand active section when navigating to a different lesson
  useEffect(() => {
    if (!activeSectionSlug) return;
    setOpen((prev) => {
      const target = sections.find((s) => s.slug === activeSectionSlug);
      if (!target) return prev;
      if (prev[target.id]) return prev;
      return { ...prev, [target.id]: true };
    });
  }, [activeSectionSlug, sections]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [mobileOpen]);

  const totalLessons = useMemo(
    () => sections.reduce((acc, s) => acc + s.lessons.length, 0),
    [sections]
  );

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((s) => ({
        ...s,
        lessons: s.lessons.filter(
          (l) => l.title.toLowerCase().includes(q) || s.title.toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.lessons.length > 0 || s.title.toLowerCase().includes(q));
  }, [sections, query]);

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    for (const s of sections) all[s.id] = true;
    setOpen(all);
  };
  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    for (const s of sections) all[s.id] = false;
    setOpen(all);
  };

  const inner = (
    <div className="flex h-full flex-col">
      {/* Tech header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-ink-200/70">
        <Link
          href={`/learn/${techSlug}`}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${techBg} ${techAccent} ring-1 ${techRing} text-base font-bold`}
        >
          {techGlyph}
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-ink-500">Texnologiya</p>
          <Link
            href={`/learn/${techSlug}`}
            className="text-sm font-bold text-ink-900 truncate hover:text-brand-700 transition block"
          >
            {techName}
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-2 -mr-2 text-ink-500 hover:text-ink-900"
          aria-label="Yopish"
        >
          <XIcon size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="px-5 pt-4">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mavzularni qidirish..."
            className="w-full rounded-lg border border-ink-200 bg-cream-50 pl-9 pr-3 py-2 text-sm text-ink-900 placeholder-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            aria-label="Mavzularni qidirish"
          />
          <svg
            aria-hidden
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
            width="14"
            height="14"
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
      </div>

      {/* Stats + expand/collapse */}
      <div className="flex items-center justify-between px-5 py-3 text-[11px] text-ink-500">
        <span>
          {sections.length} bo'lim · {totalLessons} mavzu
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="hover:text-ink-900 transition"
          >
            Ochish
          </button>
          <span className="text-ink-300">·</span>
          <button
            type="button"
            onClick={collapseAll}
            className="hover:text-ink-900 transition"
          >
            Yopish
          </button>
        </div>
      </div>

      {/* Sections list */}
      <nav className="flex-1 overflow-y-auto pretty-scroll px-3 pb-6">
        {filteredSections.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-ink-500">
            Hech narsa topilmadi.
          </p>
        ) : (
          <ul className="space-y-1">
            {filteredSections.map((section, i) => {
              const isOpen = !!open[section.id];
              const isActiveSection = section.slug === activeSectionSlug;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpen((prev) => ({ ...prev, [section.id]: !prev[section.id] }))
                    }
                    className={
                      "w-full flex items-start gap-2 rounded-lg px-3 py-2.5 text-left transition-colors " +
                      (isActiveSection
                        ? "bg-ink-900 text-cream-50 hover:bg-ink-800"
                        : "text-ink-800 hover:bg-ink-50")
                    }
                    aria-expanded={isOpen}
                  >
                    <span
                      className={
                        "mt-0.5 font-mono text-[10px] font-bold tabular-nums w-5 shrink-0 " +
                        (isActiveSection ? "text-cream-50/60" : "text-ink-400")
                      }
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0 text-sm font-semibold leading-snug">
                      {section.title}
                    </span>
                    <ChevronRightIcon
                      size={14}
                      className={
                        "mt-1 shrink-0 transition-transform " +
                        (isOpen ? "rotate-90" : "") +
                        " " +
                        (isActiveSection ? "text-cream-50/70" : "text-ink-400")
                      }
                    />
                  </button>
                  {isOpen && section.lessons.length > 0 && (
                    <ul className="mt-1 ml-7 mr-1 mb-2 border-l border-ink-200/70 pl-3 space-y-0.5">
                      {section.lessons.map((lesson, idx) => {
                        const isActiveLesson =
                          isActiveSection && lesson.slug === activeLessonSlug;
                        return (
                          <li key={lesson.id}>
                            <Link
                              href={`/learn/${techSlug}/${section.slug}/${lesson.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className={
                                "flex items-start gap-2 rounded-md px-2.5 py-2 text-[13px] leading-snug transition-colors " +
                                (isActiveLesson
                                  ? "bg-brand-50 text-brand-700 font-semibold ring-1 ring-brand-100"
                                  : "text-ink-700 hover:bg-ink-50 hover:text-ink-900")
                              }
                            >
                              <span
                                className={
                                  "shrink-0 mt-0.5 font-mono text-[10px] tabular-nums " +
                                  (isActiveLesson ? "text-brand-600" : "text-ink-400")
                                }
                              >
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="flex-1 min-w-0">{lesson.title}</span>
                              {isActiveLesson && (
                                <CheckIcon size={12} className="text-brand-600 mt-1 shrink-0" />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {isOpen && section.lessons.length === 0 && (
                    <p className="ml-7 my-1 text-xs text-ink-400">Mavzular tez orada qo'shiladi.</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile toggle (sticky pill) */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 rounded-full bg-ink-900 text-cream-50 px-5 py-3 text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(15,15,15,.55)]"
        aria-label="Mavzular ro'yxatini ochish"
      >
        <MenuIcon size={16} />
        Mavzular ({totalLessons})
      </button>

      {/* Desktop sidebar — sticky column */}
      <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] rounded-2xl bg-cream-50 ring-1 ring-ink-200/70 shadow-soft overflow-hidden">
          {inner}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            aria-hidden
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[88%] max-w-sm bg-cream-50 shadow-xl animate-[slide-in_.25s_ease-out]">
            {inner}
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
