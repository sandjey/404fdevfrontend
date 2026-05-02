import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

// `/` ga kelganlarda — middleware odatda til prefiksiga yo'naltiradi.
// Lekin SSG/edge fallback uchun bu sahifa default lokal'ga redirect qiladi.
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
