import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API, _next, public files, /admin va /learn (uz only) yo'nalishlari
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/learn") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (isLocale(first)) {
    return NextResponse.next();
  }

  // Cookie / Accept-Language asosida tilni aniqlash
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const acceptLang = request.headers.get("accept-language") || "";
  const detected = pickLocale([cookieLocale, ...acceptLang.split(",").map((s) => s.split(";")[0].trim().toLowerCase())]);

  const target = detected || DEFAULT_LOCALE;
  const url = request.nextUrl.clone();
  url.pathname = `/${target}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function pickLocale(candidates: (string | undefined)[]): string | null {
  for (const c of candidates) {
    if (!c) continue;
    const short = c.slice(0, 2);
    if ((LOCALES as readonly string[]).includes(short)) return short;
  }
  return null;
}

export const config = {
  matcher: ["/((?!_next|api|admin|learn|.*\\..*).*)"],
};
