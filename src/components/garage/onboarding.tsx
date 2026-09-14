"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { CarSilhouette } from "./car-silhouette";
import { Icon } from "./icon";

// Онбординг — визуальный выбор, а не форма: кузов картинкой, мотор крупной цифрой.

// Индикатор шагов — две pill, активная чёрная
export function Steps({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {labels.map((l, i) => (
        <span
          key={l}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-bold",
            i === current ? "bg-primary text-primary-foreground" : "bg-vote-control text-text-secondary",
          )}
        >
          <span className="tabular">{i + 1}</span>
          {l}
        </span>
      ))}
    </div>
  );
}

// Карточка кузова: тёмная панель с силуэтом сверху, имя и код ниже
export function BodyCard({
  code,
  name,
  years,
  note,
  href,
}: {
  code: string;
  name: string;
  years: string;
  note: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="motion-interactive motion-pressable group flex flex-col overflow-hidden rounded-[20px] bg-card p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative overflow-hidden rounded-[14px] bg-[hsl(240_8%_5.1%)] px-3 pt-5 pb-3">
        <CarSilhouette body={code} />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/12 px-2 py-0.5 font-mono text-[11px] font-semibold text-white/80">
          {code}
        </span>
      </div>
      <div className="flex items-start justify-between gap-2 px-2 pt-3 pb-1.5">
        <div className="min-w-0">
          <div className="text-base font-semibold leading-tight text-text-primary">{name}</div>
          <div className="pt-0.5 text-xs text-text-secondary">{years}</div>
          <div className="pt-1 text-xs leading-snug text-text-secondary">{note}</div>
        </div>
        <Icon icon={ChevronRightIcon} size={18} className="mt-0.5 shrink-0 text-text-secondary/50 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

// Карточка модификации: тёмный квадрат с «8V / 16V», справа мощность крупно и детали
export function ModificationCard({
  valves,
  name,
  power,
  engine,
  gearbox,
  years,
  onClick,
  busy,
  disabled,
}: {
  valves: string;
  name: string;
  power: string;
  engine: string;
  gearbox: string;
  years: string;
  onClick: () => void;
  busy?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "motion-interactive motion-pressable flex w-full items-center gap-4 rounded-[20px] bg-card p-3 text-left hover:bg-control-hover",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60",
        busy && "ring-2 ring-ring",
      )}
    >
      <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-[16px] bg-[hsl(240_8%_5.1%)] text-white">
        <span className="text-xl font-bold leading-none tracking-tight">{valves}</span>
        <span className="pt-1 text-[10px] font-semibold uppercase tracking-wide text-white/60">клап.</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="tabular shrink-0 whitespace-nowrap text-[22px] font-bold leading-none tracking-tight text-text-primary">{power}</span>
          <span className="min-w-0 truncate text-sm font-medium text-text-secondary">{name}</span>
        </span>
        <span className="block pt-1.5 text-xs text-text-secondary">
          Двигатель <span className="font-mono">{engine}</span>
        </span>
        <span className="block text-xs text-text-secondary">
          {gearbox} · {years}
        </span>
      </span>
      <Icon icon={ChevronRightIcon} size={18} className="shrink-0 text-text-secondary/50" />
    </button>
  );
}
