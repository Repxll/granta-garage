import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

// Иконки — Heroicons 24 solid, как у референса: заливка, скруглённые штрихи,
// рендер на 18px. Обёртка даёт data-icon-container, чтобы работал motion-icon-feedback.
export type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

export function Icon({
  icon: Cmp,
  size = 18,
  className,
}: {
  icon: HeroIcon;
  size?: 16 | 18 | 20 | 24;
  className?: string;
}) {
  return (
    <span
      data-icon-container
      className={cn("inline-flex shrink-0 items-center justify-center leading-none", className)}
      style={{ width: size, height: size }}
    >
      <Cmp className="block size-full" aria-hidden />
    </span>
  );
}
