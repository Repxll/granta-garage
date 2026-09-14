"use client";

import Link from "next/link";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Icon, type HeroIcon } from "./icon";
import { CarSilhouette } from "./car-silhouette";

// Тёмный hero гаража: имя машины 32/700, чип с модификацией, силуэт, точки карусели.
export function GarageHero({
  title,
  chip,
  chipHref,
  body,
  children,
}: {
  title: string;
  chip: string;
  chipHref: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative bg-[hsl(240_8%_5.1%)] px-4 pt-6 pb-10 text-white">
      <h1 className="motion-fade-in text-center text-[32px] font-bold leading-tight tracking-tight text-balance">{title}</h1>
      <div className="motion-fade-in flex justify-center pt-2.5">
        <Link
          href={chipHref}
          className="motion-interactive motion-icon-feedback motion-pressable inline-flex h-8 items-center gap-1 rounded-full bg-white/12 pl-3 pr-2 text-sm font-semibold text-white/80 hover:bg-white/18"
        >
          {chip}
          <Icon icon={ChevronRightIcon} size={16} className="text-white/50" />
        </Link>
      </div>

      <div className="motion-fade-in mx-auto max-w-[400px] px-2 pt-6">
        <CarSilhouette body={body} />
      </div>

      <div className="flex items-center justify-center gap-2 pt-3">
        <span className="size-1.5 rounded-full bg-white" />
        <Link href={chipHref} aria-label="Другая машина" className="motion-pressable flex size-5 items-center justify-center rounded-full text-white/40 hover:text-white/70">
          <Icon icon={PlusIcon} size={16} />
        </Link>
      </div>

      {children && <div className="pt-6">{children}</div>}
    </section>
  );
}

// Карточка событий: три иконки и строка со стрелкой на тёмно-зелёном градиенте.
export function StatusCard({
  icons,
  text,
  href,
  tone = "idle",
}: {
  icons: HeroIcon[];
  text: string;
  href?: string;
  tone?: "idle" | "attention";
}) {
  const cls = cn(
    "motion-interactive motion-pressable flex w-full flex-col items-center rounded-[20px] px-4 py-5 text-white",
    tone === "idle"
      ? "bg-[linear-gradient(135deg,hsl(150_28%_20%),hsl(240_8%_15%)_70%)]"
      : "bg-[linear-gradient(135deg,hsl(38_60%_28%),hsl(240_8%_15%)_70%)]",
  );
  const body = (
    <>
      <div className="flex items-center gap-5 text-white/70">
        {icons.map((I, i) => (
          <Icon key={i} icon={I} size={24} />
        ))}
      </div>
      <div className="flex items-center gap-1 pt-3 text-lg font-medium">
        {text}
        <Icon icon={ChevronRightIcon} size={18} className="text-white/50" />
      </div>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

// Плитка быстрого действия: квадрат 64 радиусом 16 на пастельной подложке, подпись 14.
const tiles = {
  blue: "bg-[hsl(214_100%_94%)] text-[hsl(214_90%_52%)]",
  green: "bg-[hsl(150_60%_92%)] text-[hsl(152_55%_40%)]",
  gray: "bg-[hsl(240_8%_93%)] text-[hsl(240_6%_45%)]",
  teal: "bg-[hsl(168_70%_92%)] text-[hsl(170_70%_38%)]",
  yellow: "bg-[hsl(48_100%_90%)] text-[hsl(38_90%_45%)]",
  pink: "bg-[hsl(340_80%_94%)] text-[hsl(340_70%_55%)]",
};

export function QuickTile({
  icon,
  label,
  href,
  color = "blue",
  badge,
}: {
  icon: HeroIcon;
  label: string;
  href: string;
  color?: keyof typeof tiles;
  badge?: string | number;
}) {
  return (
    <Link
      href={href}
      className="motion-interactive motion-icon-feedback motion-pressable flex w-[84px] shrink-0 flex-col items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className={cn("relative flex size-16 items-center justify-center rounded-[16px]", tiles[color])}>
        <Icon icon={icon} size={24} />
        {badge !== undefined && (
          <span className="tabular absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-fit-rework px-1.5 text-[11px] font-bold text-white ring-2 ring-card">
            {badge}
          </span>
        )}
      </span>
      <span className="text-center text-sm leading-tight text-text-primary">{label}</span>
    </Link>
  );
}

export function QuickTiles({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-3 rounded-[20px] bg-card p-4">{children}</div>
    </div>
  );
}

// Белый лист, наезжающий на hero скруглением 24.
export function Sheet24({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("relative -mt-6 rounded-t-[24px] bg-background px-4 pt-4 pb-6", className)}>{children}</div>;
}
