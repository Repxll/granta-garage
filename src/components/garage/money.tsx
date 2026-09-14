import { cn } from "@/lib/utils";
import { money } from "@/lib/format";

// Цифры — моноширинным: цены, вылеты, артикулы читаются столбиком и не «прыгают».
export function Money({ value, className }: { value: number; className?: string }) {
  return <span className={cn("font-mono tabular-nums", className)}>{money(value)}</span>;
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
    <div
      className={cn(
        "rounded-lg border p-3",
        accent ? "border-primary/40 bg-primary/5" : "border-border bg-card",
        className,
      )}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <Money value={value} className={cn("block pt-0.5 text-xl font-semibold", accent && "text-primary")} />
      {hint && <div className="pt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
