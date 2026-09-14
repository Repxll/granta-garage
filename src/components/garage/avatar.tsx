import { cn } from "@/lib/utils";

// Круглый аватар. Фото нет — инициалы на surface-muted; в профиле 80, в строке автора 32.
export function Avatar({ name, size = 32, className }: { name: string; size?: 32 | 40 | 80; className?: string }) {
  const initials = name
    .replace(/^@/, "")
    .split(/[\s_.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted font-semibold text-text-secondary ring-1 ring-black/5",
        className,
      )}
      style={{ width: size, height: size, fontSize: size >= 80 ? 26 : size >= 40 ? 14 : 12 }}
      aria-hidden
    >
      {initials || "Г"}
    </span>
  );
}
