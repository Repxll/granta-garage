import { cn } from "@/lib/utils";
import { money } from "@/lib/format";

// Деньги — sans с табличными цифрами и без переносов: у референса моно нет,
// а «₽» не должен уезжать на новую строку. Моно остаётся техническим подписям (вылет, ЦО, артикул).
export function Money({ value, className }: { value: number; className?: string }) {
  return <span className={cn("tabular whitespace-nowrap", className)}>{money(value)}</span>;
}

export function MoneyStat({
  label,
  value,
  hint,
  accent = false,
  className,
}: {
  label: string;
  value: number;
  hint?: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[14px] bg-surface p-3", accent && "ring-1 ring-control-border", className)}>
      <div className="text-xs text-text-secondary">{label}</div>
      <Money value={value} className="block pt-0.5 text-xl font-bold" />
      {hint && <div className="pt-1 text-xs text-text-secondary">{hint}</div>}
    </div>
  );
}
