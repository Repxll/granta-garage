import type { NextConfig } from "next";

// Mini App раздаётся статикой: статический экспорт с первого дня, чтобы позже
// тем же билдом включить публичный веб-слой с индексацией (см. раздел «Платформа» в брифе).
// На GitHub Pages сайт живёт в подпапке /<repo>, поэтому в проде нужен basePath.
// Локально его нет — иначе дев-сервер отдаёт 404 на корне.
const repo = "granta-garage";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
