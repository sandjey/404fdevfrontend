"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApi } from "@/lib/admin/client";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project } from "@/lib/api";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [proj, setProj] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const p = await adminApi.get<Project>(`/admin/projects/${id}`);
        setProj(p);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    })();
  }, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!proj) return <div className="text-ink-500">Yuklanmoqda...</div>;

  const title =
    proj.translations?.uz?.title ||
    proj.translations?.ru?.title ||
    proj.translations?.en?.title ||
    "Loyiha";

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">Tahrirlash: {title}</h1>
      <ProjectForm mode="edit" initial={proj} />
    </div>
  );
}
