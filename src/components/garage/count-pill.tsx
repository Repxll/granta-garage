"use client";

import { cn } from "@/lib/utils";
import { Icon, type HeroIcon } from "./icon";

// Счётчик-пилюля с карточки работы: h-8, min-w-54, радиус 76, подложка vote-control,
// 14/700, иконка 18. Активное состояние — цветная подложка и цветная иконка.
export function CountPill({
  icon,
  count,
  label,
  active = false,
  tone = "neutral",
  locked = false,
  onClick,
  className,
}: {
  icon: HeroIcon;
  count: number | string;
  label: string;
  active?: boolean;
  tone?: "neutral" | "respect" | "up" | "down";
  locked?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const toneCls = {
    neutral: "",
    respect: active ? "bg-respect-surface text-respect" : "",
    up: active ? "bg-fit-ok-surface text-fit-ok" : "",
    down: active ? "bg-fit-no-surface text-fit-no" : "",
  }[tone];

  const cls = cn(
    "motion-interactive motion-icon-feedback motion-pressable flex h-8 min-w-[54px] items-center justify-center gap-1 rounded-[76px] px-2 py-1",
    "bg-vote-control text-sm font-bold text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    !active && "hover:bg-control-hover",
    toneCls,
    locked && "cursor-default opacity-70",
    className,
  );

  const body = (
    <>
      <span className="tabular min-w-4 text-center">{count}</span>
      <Icon icon={icon} size={18} className={cn(!active && tone !== "neutral" && "text-icon-primary/45")} />
    </>
  );

  return locked ? (
    <span className={cls} aria-label={label}>
      {body}
    </span>
  ) : (
    <button type="button" aria-label={label} aria-pressed={active} onClick={onClick} className={cls}>
      {body}
    </button>
  );
}
