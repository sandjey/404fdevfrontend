"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/admin/auth-store";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/learn", label: "Darslar" },
  { href: "/admin/services", label: "Xizmatlar" },
  { href: "/admin/contact", label: "Murojaatlar" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, email, logout } = useAuth();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!isLogin && !token) router.replace("/admin/login");
  }, [isLogin, token, router]);

  if (isLogin) return <>{children}</>;
  if (!token) return null;

  return (
    <div className="min-h-screen bg-ink-50 flex">
      <aside className="w-64 shrink-0 bg-ink-900 text-white min-h-screen sticky top-0">
        <div className="p-5 border-b border-ink-800">
          <Link href="/admin" className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 font-mono text-sm">404</span>
            Admin
          </Link>
        </div>
        <nav className="p-3 space-y-1">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  active ? "bg-brand-600 text-white" : "text-ink-300 hover:bg-ink-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-3 right-3 text-xs text-ink-400">
          <div className="px-3 py-2 rounded-lg bg-ink-800/50 truncate">{email}</div>
          <button onClick={logout} className="mt-2 w-full text-left rounded-lg px-3 py-2 hover:bg-ink-800 text-ink-300 hover:text-white">
            Chiqish
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="px-6 py-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
