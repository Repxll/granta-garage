import type { NextConfig } from "next";

// Mini App раздаётся статикой: статический экспорт с первого дня, чтобы позже
// тем же билдом включить публичный веб-слой с индексацией (см. раздел «Платформа» в брифе).
// Статический экспорт снят: появились серверные роуты (авторизация по Telegram initData,
// база, отправка пушей). Хостинг — Vercel, поэтому basePath не нужен.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ["@electric-sql/pglite"],
};

export default nextConfig;
