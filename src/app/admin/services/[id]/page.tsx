"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApi } from "@/lib/admin/client";
import ServiceForm from "@/components/admin/ServiceForm";
import type { Service } from "@/lib/api";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const s = await adminApi.get<Service>(`/admin/services/${id}`);
        setService(s);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    })();
  }, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!service) return <div className="text-ink-500">Yuklanmoqda...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">Tahrirlash: {service.title}</h1>
      <ServiceForm mode="edit" initial={service} />
    </div>
  );
}
