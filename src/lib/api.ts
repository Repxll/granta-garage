// Клиент API. initData Telegram уходит в заголовке на каждом запросе — сервер
// проверяет подпись заново, поэтому подделать чужой id нельзя.
type TG = { initData?: string; ready?: () => void; expand?: () => void; colorScheme?: string };

export function tg(): TG | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { Telegram?: { WebApp?: TG } }).Telegram?.WebApp ?? null;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Telegram-Init-Data": tg()?.initData ?? "",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Ошибка сети" }));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export type ServerInstall = {
  part_slug: string;
  price: number;
  work_price: number;
  reworked: boolean;
  has_photo: boolean;
  review_text: string | null;
  created_at: string;
};

export type AppState = {
  user: { id: number; name: string };
  car: { body: string | null; modification: string | null };
  garage: ServerInstall[];
  respects: string[];
  respectsReceived: number;
};

export type FeedItem = {
  id: number;
  part_slug: string;
  price: number;
  work_price: number;
  reworked: boolean;
  review_text: string | null;
  created_at: string;
  first_name: string | null;
  username: string | null;
  body_code: string | null;
  modification: string | null;
  respects: number;
};

export const api = {
  state: () => call<AppState>("/api/state"),
  setCar: (body: string, modification: string) =>
    call<{ ok: true }>("/api/car", { method: "POST", body: JSON.stringify({ body, modification }) }),
  addInstall: (i: { partSlug: string; price: number; workPrice: number; reworked: boolean; hasPhoto: boolean }) =>
    call<{ ok: true; id: number }>("/api/install", { method: "POST", body: JSON.stringify(i) }),
  respect: (target: string) =>
    call<{ active: boolean; count: number }>("/api/respect", {
      method: "POST",
      body: JSON.stringify({ target }),
    }),
  feed: (scope: "mine" | "all") => call<{ items: FeedItem[] }>(`/api/feed?scope=${scope}`),
  stats: () =>
    call<{ stats: Record<string, { installed: number; reworked: number }>; modification: string | null }>(
      "/api/stats",
    ),
  part: (slug: string) =>
    call<{ installed: number; reworked: number; reviews: FeedItem[] }>(`/api/part/${slug}`),
  review: (partSlug: string, text: string) =>
    call<{ ok: true }>("/api/review", { method: "POST", body: JSON.stringify({ partSlug, text }) }),
};
