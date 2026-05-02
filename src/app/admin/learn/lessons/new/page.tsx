"use client";

import { useSearchParams } from "next/navigation";
import LessonForm from "@/components/admin/LessonForm";

export default function NewLessonPage() {
  const params = useSearchParams();
  const section = params.get("section") || "";

  if (!section) {
    return <div className="text-red-600">Bo'lim ID yo'q. /admin/learn dan boshlang.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">Yangi mavzu</h1>
      <LessonForm mode="create" sectionId={section} />
    </div>
  );
}
