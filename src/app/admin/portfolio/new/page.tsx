import ProjectForm from "@/components/admin/ProjectForm";

export default function AdminProjectNew() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-ink-900">Yangi loyiha</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
