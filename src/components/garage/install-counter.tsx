import { cn } from "@/lib/utils";
import { plural } from "@/lib/format";

// Главный сигнал доверия продукта: счёт, а не звёзды.
// «Ставили 14 раз, 3 дорабатывали» отвечает на вопрос, на который форум даёт шесть разных ответов.
export function InstallCounter({
  installed,
  reworked,
  compact = false,
  className,
}: {
  installed: number;
  reworked: number;
  compact?: boolean;
  className?: string;
}) {
  if (installed === 0) {
    return (
      <span className={cn("text-sm text-muted-foreground", className)}>
        Никто ещё не отмечал установку
      </span>
    );
  }

  const head = `Ставили ${installed} ${plural(installed, "раз", "раза", "раз")}`;
  const tail =
    reworked === 0
      ? "все без доработок"
      : `${reworked} ${plural(reworked, "дорабатывал", "дорабатывали", "дорабатывали")}`;

  if (compact) {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>
        {head}, {tail}
      </span>
    );
  }

  return (
    <div className={className}>
      <div className="text-sm font-semibold">{head} на такую же Гранту</div>
      <div
        className={cn("pt-0.5 text-sm", reworked === 0 ? "text-fit-ok" : "text-fit-rework")}
      >
        {reworked === 0 ? "Все — без доработок" : tail}
      </div>
    </div>
  );
}
