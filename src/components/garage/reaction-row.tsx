"use client";

import { cn } from "@/lib/utils";
import { Icon, type HeroIcon } from "./icon";

// Ряд реакций под медиа работы: число 18/700 + иконка 20, без пилюль, выровнено вправо.
export function ReactionStat({
  count,
  icon,
  label,
  active,
  onClick,
  className,
}: {
  count: number;
  icon: HeroIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const cls = cn(
    "motion-interactive motion-icon-feedback motion-pressable inline-flex items-center gap-1.5 rounded-md px-1.5 py-1",
    "tabular text-lg font-bold text-text-primary",
    onClick && "hover:bg-control-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  );
  const body = (
    <>
      <span>{count.toLocaleString("ru-RU")}</span>
      <Icon icon={icon} size={20} className={cn(active ? "text-respect" : "text-icon-primary")} />
    </>
  );
  return onClick ? (
    <button type="button" aria-label={label} aria-pressed={active} onClick={onClick} className={cls}>
      {body}
    </button>
  ) : (
    <span aria-label={label} className={cls}>
      {body}
    </span>
  );
}

export function ReactionRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center justify-end gap-5 px-1 py-3", className)}>{children}</div>;
}
