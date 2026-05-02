"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApi } from "@/lib/admin/client";
import BlogForm from "@/components/admin/BlogForm";
import type { BlogPost } from "@/lib/api";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const p = await adminApi.get<BlogPost>(`/admin/blog/${id}`);
        setPost(p);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    })();
  }, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!post) return <div className="text-ink-500">Yuklanmoqda...</div>;

  // Pick the first non-empty translation title for the heading.
  const heading =
    post.translations?.uz?.title ||
    post.translations?.ru?.title ||
    post.translations?.en?.title ||
    "—";

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">Tahrirlash: {heading}</h1>
      <BlogForm mode="edit" initial={post} />
    </div>
  );
}
