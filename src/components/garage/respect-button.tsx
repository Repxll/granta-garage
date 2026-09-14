"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Респект. Жест без текста — сознательно: комментарии тянут за собой модерацию,
// на которую на старте нет ресурса.
// Состояние `locked` — своя сборка: респект себе поставить нельзя.
export function RespectButton({
  count,
  active = false,
  locked = false,
  onToggle,
  className,
}: {
  count: number;
  active?: boolean;
  locked?: boolean;
  onToggle?: () => void;
  className?: string;
}) {
  if (locked) {
    return (
      <span
        className={cn(
          "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-border px-4 text-xs text-muted-foreground",
          className,
        )}
      >
        Респект · {count} — ставят другие
      </span>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "border-respect bg-respect text-primary-foreground"
          : "border-border text-foreground hover:border-respect/60 hover:text-respect",
        className,
      )}
    >
      Респект · <span className="font-mono tabular-nums">{count + (active ? 1 : 0)}</span>
    </motion.button>
  );
}
