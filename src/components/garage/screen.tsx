"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, RectangleStackIcon, WrenchScrewdriverIcon, UserIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { IconButton } from "./icon-button";

// Шапка экрана с референса: sticky, h-12, белая, hairline снизу; назад слева,
// заголовок 16/600, действие справа.
export function AppHeader({
  title,
  back,
  action,
  className,
}: {
  title: string;
  back?: string | (() => void);
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-1">
        {back !== undefined &&
          (typeof back === "string" ? (
            <IconButton icon={ArrowLeftIcon} label="Назад" href={back} />
          ) : (
            <IconButton icon={ArrowLeftIcon} label="Назад" onClick={back} />
          ))}
        <h1 className={cn("truncate text-base font-semibold text-text-primary", back === undefined && "pl-1")}>{title}</h1>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-1">{action}</div> : <span className="size-10" />}
    </header>
  );
}

const tabs = [
  { href: "/feed", label: "Лента", icon: RectangleStackIcon },
  { href: "/catalog", label: "Каталог", icon: WrenchScrewdriverIcon },
  { href: "/profile", label: "Профиль", icon: UserIcon },
];

export function TabBar() {
  const path = usePathname();
  return (
    <nav className="sticky bottom-0 z-40 grid grid-cols-3 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      {tabs.map((t) => {
        const active = path.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "motion-interactive motion-icon-feedback motion-pressable flex min-h-[52px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              active ? "text-text-primary" : "text-text-secondary/70",
            )}
          >
            <Icon icon={t.icon} size={20} />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Каркас экрана: серый фон страницы, колонка 480, контент с полями 16.
export function Screen({
  children,
  header,
  tabs: withTabs = true,
  padded = true,
  className,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  tabs?: boolean;
  padded?: boolean;
  className?: string;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-background text-text-primary">
      {header}
      <main className={cn("flex-1", padded && "px-4 pt-4 pb-6", className)}>{children}</main>
      {withTabs && <TabBar />}
    </div>
  );
}

// Появление списка каскадом: их motion-fade-in с задержкой на элемент, потолок — 10 элементов.
export function FadeIn({ index = 0, children, className }: { index?: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("motion-fade-in", className)} style={{ animationDelay: `${Math.min(index, 10) * 28}ms` }}>
      {children}
    </div>
  );
}

// Заголовок страницы над контентом (там, где нет шапки): 32/700 как их display-sm, подзаголовок 16 вторичным
export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="motion-fade-in pb-4">
      <h1 className="text-[28px] font-bold leading-tight tracking-tight text-text-primary text-balance">{title}</h1>
      {subtitle && <p className="pt-2 text-base leading-6 text-text-secondary">{subtitle}</p>}
    </div>
  );
}
