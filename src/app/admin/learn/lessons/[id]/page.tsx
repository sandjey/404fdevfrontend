"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApi } from "@/lib/admin/client";
import LessonForm from "@/components/admin/LessonForm";
import type { Lesson } from "@/lib/api";

export default function EditLessonPage() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<(Lesson & { section_id: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const l = await adminApi.get<Lesson & { section_id: string }>(`/admin/lessons/${id}`);
        setLesson(l);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    })();
  }, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!lesson) return <div className="text-ink-500">Yuklanmoqda...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">Tahrirlash: {lesson.title}</h1>
      <LessonForm mode="edit" initial={lesson} />
    </div>
  );
}
