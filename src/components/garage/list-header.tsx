import { cn } from "@/lib/utils";

// Заголовок списка: текст 16/500 слева, действие справа (иконка-кнопка), h-12.
export function ListHeader({
  title,
  action,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex h-12 items-center justify-between", className)}>
      <h2 className="text-base font-medium text-text-primary">{title}</h2>
      {action}
    </div>
  );
}
