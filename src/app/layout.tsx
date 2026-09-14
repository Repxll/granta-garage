import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { StateProvider } from "@/lib/state";

export const metadata: Metadata = {
  title: "Гараж — тюнинг Лады Гранты",
  description:
    "Встанет или нет и что ещё придётся купить — по опыту тех, кто уже поставил, а не по советам из треда.",
};

// Шрифт системный, как у референса. Тема светлая по умолчанию; .dark описан в токенах.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="font-sans">
      <body className="bg-background text-text-primary antialiased">
        {/* Mini App: грузим после гидратации — beforeInteractive правит style у <html>
            раньше React и ломает гидратацию. Каркас работает и в обычном браузере. */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
