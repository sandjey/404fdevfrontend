"use client";

import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">Yangi blog yozuvi</h1>
      <BlogForm mode="create" />
    </div>
  );
}
