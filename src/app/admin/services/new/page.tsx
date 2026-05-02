"use client";

import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">Yangi xizmat</h1>
      <ServiceForm mode="create" />
    </div>
  );
}
