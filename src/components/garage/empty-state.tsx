import { cn } from "@/lib/utils";
import { Icon, type HeroIcon } from "./icon";

// Пустое состояние — белая карточка 14px, иконка 24, заголовок 16/600, подсказка 14 вторичным.
export function EmptyState({
  icon,
  title,
  hint,
  action,
  className,
}: {
  icon: HeroIcon;
  title: string;
  hint: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("motion-fade-in flex flex-col items-center rounded-[14px] bg-surface px-5 py-8 text-center", className)}>
      <span className="flex size-12 items-center justify-center rounded-full bg-surface-muted text-text-secondary">
        <Icon icon={icon} size={24} />
      </span>
      <div className="pt-3 text-base font-semibold text-text-primary">{title}</div>
      <p className="max-w-[280px] pt-1 text-sm text-text-secondary">{hint}</p>
      {action && <div className="pt-4">{action}</div>}
    </div>
  );
}
