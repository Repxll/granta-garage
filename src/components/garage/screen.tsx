"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Wrench, User } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Каркас экрана Mini App: чип машины сверху, таб-бар снизу, колонка под телефон.

export function CarChip({ car, className }: { car: string | null; className?: string }) {
  if (!car) return null;
  return (
    <div
      className={cn(
        "sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur",
        className,
      )}
    >
      <span className="truncate text-xs text-muted-foreground">
        Ваша Гранта: <span className="font-medium text-foreground">{car}</span>
      </span>
      <Link href="/" className="shrink-0 text-xs underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground">
        Изменить
      </Link>
    </div>
  );
}

const tabs = [
  { href: "/feed", label: "Лента", icon: Layers },
  { href: "/catalog", label: "Каталог", icon: Wrench },
  { href: "/profile", label: "Профиль", icon: User },
];

export function TabBar() {
  const path = usePathname();
  return (
    <nav className="sticky bottom-0 z-20 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur">
      {tabs.map((t) => {
        const active = path.startsWith(t.href);
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "flex min-h-[52px] flex-col items-center justify-center gap-0.5 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Screen({
  title,
  subtitle,
  car,
  children,
  tabs: withTabs = true,
}: {
  title: string;
  subtitle?: string;
  car?: string | null;
  children: React.ReactNode;
  tabs?: boolean;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-background text-foreground">
      <CarChip car={car ?? null} />
      <main className="flex-1 px-4 pt-5 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="pt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </motion.div>
        <div className="pt-5">{children}</div>
      </main>
      {withTabs && <TabBar />}
    </div>
  );
}

// Каскад появления списка: 24 мс на элемент с потолком, чтобы длинный список
// не превращался в ожидание.
export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.024, delayChildren: 0.04 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
