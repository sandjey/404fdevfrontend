import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="uz">
      <body className="min-h-screen grid place-items-center bg-ink-50 px-6">
        <div className="text-center">
          <span className="font-mono text-7xl font-bold text-ink-900">404</span>
          <h1 className="mt-4 text-2xl font-bold text-ink-900">Sahifa topilmadi</h1>
          <p className="mt-2 text-ink-600">Bu havola endi mavjud emas yoki ko'chirilgan.</p>
          <Link href="/uz" className="btn btn-primary mt-6 inline-flex">
            Bosh sahifaga qaytish
          </Link>
        </div>
      </body>
    </html>
  );
}
