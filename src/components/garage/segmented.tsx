"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Сегмент-контрол с скользящим индикатором. Один на весь продукт — второго способа
// переключать режим в библиотеке нет.
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
    <div className={cn("flex gap-1 rounded-lg border border-border bg-muted p-1", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className="relative min-h-[44px] flex-1 rounded-md px-3 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {active && (
              <motion.span
                layoutId="segmented-active"
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
                className="absolute inset-0 rounded-md bg-card shadow-sm ring-1 ring-border"
              />
            )}
            <span className={cn("relative z-10", active ? "text-foreground" : "text-muted-foreground")}>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
