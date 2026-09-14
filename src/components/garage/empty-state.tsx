import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Пустое состояние: иконка, что случилось и что делать. Один компонент на весь продукт —
// второго способа показать пустоту в библиотеке нет.
export function EmptyState({
  icon: Icon,
  title,
  hint,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  hint: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border border-dashed border-border px-4 py-8 text-center",
        className,
      )}
    >
      <Icon size={28} className="text-muted-foreground" strokeWidth={1.6} />
      <div className="pt-3 text-sm font-semibold">{title}</div>
      <p className="max-w-[260px] pt-1 text-xs text-muted-foreground">{hint}</p>
      {action && <div className="pt-4">{action}</div>}
    </div>
  );
}
