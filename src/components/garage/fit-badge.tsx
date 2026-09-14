import { cn } from "@/lib/utils";
import type { Fitment } from "@/lib/data";

// Вердикт о посадке — pill на цветной подложке, как активная реакция у референса.
// Три состояния равноправны: «не подтверждено» не маскируется под «подходит».
const map: Record<Fitment, { label: string; short: string; cls: string }> = {
  fits: { label: "Подходит вашей Гранте", short: "Встаёт", cls: "bg-fit-ok-surface text-fit-ok" },
  no: { label: "Не подходит вашей модификации", short: "Не встаёт", cls: "bg-fit-no-surface text-fit-no" },
  unknown: { label: "Совместимость не подтверждена", short: "Не проверено", cls: "bg-fit-unknown-surface text-fit-unknown" },
};

export const fitmentText = (f: Fitment) => map[f].label;

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
        "inline-flex items-center rounded-full font-bold whitespace-nowrap",
        size === "sm" ? "h-6 px-2 text-[11px]" : "h-8 px-3 text-xs",
        s.cls,
        className,
      )}
    >
      {size === "sm" ? s.short : s.label}
    </span>
  );
}

// Компактная подпись «встало / дорабатывал» для строк и подписей
export function ReworkLabel({ reworked, className }: { reworked: boolean; className?: string }) {
  return (
    <span className={cn("font-medium", reworked ? "text-fit-rework" : "text-fit-ok", className)}>
      {reworked ? "Дорабатывал" : "Встало без доработок"}
    </span>
  );
}
