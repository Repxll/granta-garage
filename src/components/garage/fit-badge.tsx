import { cn } from "@/lib/utils";
import type { Fitment } from "@/lib/data";

// Вердикт о посадке. Три состояния равноправны: «не подтверждено» не маскируется
// под «подходит» — на этом у конкурентов люди теряют деньги.
const map: Record<Fitment, { label: string; cls: string }> = {
  fits: { label: "Подходит вашей Гранте", cls: "border-fit-ok/40 bg-fit-ok/10 text-fit-ok" },
  no: { label: "Не подходит вашей модификации", cls: "border-fit-no/40 bg-fit-no/10 text-fit-no" },
  unknown: {
    label: "Совместимость не подтверждена",
    cls: "border-fit-unknown/40 bg-fit-unknown/10 text-fit-unknown",
  },
};

export function FitBadge({
  fitment,
  size = "md",
  className,
}: {
  fitment: Fitment;
  size?: "sm" | "md";
  className?: string;
}) {
  const s = map[fitment];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-medium",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        s.cls,
        className,
      )}
    >
      {s.label}
    </span>
  );
}
