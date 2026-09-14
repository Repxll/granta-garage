"use client";

import { cn } from "@/lib/utils";

// Сегмент-контрол в их языке: подложка vote-control, активный сегмент — белая pill, 12/700.
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 rounded-[76px] bg-vote-control p-1", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={cn(
              "motion-interactive motion-pressable min-h-[36px] flex-1 rounded-[76px] px-3 text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "bg-surface text-text-primary shadow-[0_1px_2px_hsl(240_8%_8%/0.06)]" : "text-text-secondary hover:text-text-primary",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
