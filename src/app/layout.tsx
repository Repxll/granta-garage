import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { StateProvider } from "@/lib/state";
import { MotionConfig } from "motion/react";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Гараж — тюнинг Лады Гранты",
  description:
    "Встанет или нет и что ещё придётся купить — по опыту тех, кто уже поставил, а не по советам из треда.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Продукт всегда тёмный: «тёмный гаражный» — фирменный стиль, а не системная тема
    <html lang="ru" className={cn("dark font-sans", geist.variable)}>
      <body className="bg-background text-foreground antialiased">
        {/* Mini App: грузим после гидратации — beforeInteractive правит style у <html>
            раньше React и ломает гидратацию. Каркас работает и в обычном браузере. */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
        <MotionConfig reducedMotion="user">
          <StateProvider>{children}</StateProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
