// API client (server- va client-side ishlaydi).

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type FetchOpts = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

async function request<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    next: opts.next ?? { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  const json = await res.json().catch(() => null);
  // Backend may envelope as { data: ... } or return the value directly.
  // Some endpoints return data: null when empty — surface that as-is so callers can guard.
  if (json && typeof json === "object" && "data" in (json as Record<string, unknown>)) {
    return (json as { data: T }).data as T;
  }
  return json as T;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const api = {
  get: <T>(path: string, opts?: FetchOpts) => request<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body: unknown, opts?: FetchOpts) =>
    request<T>(path, { ...opts, method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown, opts?: FetchOpts) =>
    request<T>(path, { ...opts, method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown, opts?: FetchOpts) =>
    request<T>(path, { ...opts, method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string, opts?: FetchOpts) => request<T>(path, { ...opts, method: "DELETE" }),
  raw: request,
};

// ===== Public domain types =====

export type BlogImage = { url: string; alt?: string; caption?: string };
export type BlogLink = { url: string; title?: string };

export type BlogTranslation = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
};

// Admin-facing — full multilingual blog post (matches backend domain.BlogPost).
export type BlogPost = {
  id: string;
  cover_image: string;
  images: BlogImage[];
  links: BlogLink[];
  category: string;
  tags: string[];
  status: "draft" | "published";
  author_id?: string;
  published_at?: string | null;
  translations: Partial<Record<"uz" | "ru" | "en", BlogTranslation>>;
  created_at: string;
  updated_at: string;
};

// Public-facing — flattened to a single language (matches backend BlogPostView).
export type BlogPostView = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
  cover_image: string;
  images: BlogImage[];
  links: BlogLink[];
  category: string;
  tags: string[];
  language: "uz" | "ru" | "en";
  status: "draft" | "published";
  published_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  icon?: string;
  cover_image?: string;
  language: "uz" | "ru" | "en";
  order: number;
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
};

export type Technology = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  order: number;
  status: "draft" | "published";
};

export type Section = {
  id: string;
  technology_id: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
  status: "draft" | "published";
};

export type Lesson = {
  id: string;
  section_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  order: number;
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
};

export type LessonView = Lesson & {
  technology_name: string;
  technology_slug: string;
  section_title: string;
  section_slug: string;
};

export type TechnologyTree = Technology & {
  sections: (Section & { lessons: Lesson[] })[];
};

export type ProjectImage = { url: string; alt?: string; caption?: string };
export type ProjectLink = { url: string; title?: string };
export type ProjectTranslation = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
};

// Admin/raw shape — har 3 til ham translations ichida.
export type Project = {
  id: string;
  cover_image: string;
  images: ProjectImage[];
  links: ProjectLink[];
  category: string;
  tags: string[];
  status: "draft" | "published";
  order: number;
  translations: Partial<Record<"uz" | "ru" | "en", ProjectTranslation>>;
  created_at: string;
  updated_at: string;
};

// Public — bitta tilga "yoyilgan" view.
export type ProjectView = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
  cover_image: string;
  images: ProjectImage[];
  links: ProjectLink[];
  category: string;
  tags: string[];
  language: "uz" | "ru" | "en";
  order: number;
  created_at: string;
  updated_at: string;
};

export type Paged<T> = {
  data: T[];
  meta: { total: number; page: number; page_size: number };
};

// Note: api.get<T> returns the data field directly. For paged endpoints
// we need to read raw response (so we use rawPaged below).
export async function rawPaged<T>(path: string, opts?: FetchOpts): Promise<Paged<T>> {
  const res = await fetch(`${API_URL}${path}`, {
    ...(opts || {}),
    method: "GET",
    headers: { "Content-Type": "application/json", ...(opts?.headers || {}) },
    next: opts?.next ?? { revalidate: 60 },
  });
  if (!res.ok) throw new ApiError(res.status, await res.text().catch(() => res.statusText));
  const json = (await res.json().catch(() => null)) as Partial<Paged<T>> | null;
  return {
    data: Array.isArray(json?.data) ? (json!.data as T[]) : [],
    meta: json?.meta ?? { total: 0, page: 1, page_size: 0 },
  };
}
