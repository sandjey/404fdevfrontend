"use client";

import { API_URL } from "@/lib/api";
import { useAuth } from "./auth-store";

export class AdminApiError extends Error {
  status: number;
  constructor(status: number, msg: string) {
    super(msg);
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuth.getState().token;
  const headers: Record<string, string> = {
    ...((init.headers as Record<string, string>) || {}),
  };
  if (!(init.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
  }
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
  if (res.status === 401) {
    useAuth.getState().logout();
    throw new AdminApiError(401, "unauthorized");
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new AdminApiError(res.status, text || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  const data = await res.json();
  return (data?.data ?? data) as T;
}

export const adminApi = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body == null ? null : JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) => request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: async <T>(path: string, file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return request<T>(path, { method: "POST", body: fd });
  },
  rawJson: async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const token = useAuth.getState().token;
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...((init.headers as Record<string, string>) || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new AdminApiError(res.status, text || res.statusText);
    }
    return (await res.json()) as T;
  },
};
