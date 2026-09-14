import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, type HeroIcon } from "./icon";

// Чип профиля: h-8, pill, поверхность control-surface, тонкая граница, 12/700, иконка 16.
export function Chip({
  children,
  icon,
  href,
  className,
}: {
  children: React.ReactNode;
  icon?: HeroIcon;
  href?: string;
  className?: string;
}) {
  const cls = cn(
    "motion-interactive motion-icon-feedback motion-pressable inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-full",
    "border border-control-border bg-control-surface px-3 text-xs font-bold text-text-primary hover:bg-control-hover",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  );
  const body = (
    <>
      {icon && <Icon icon={icon} size={16} />}
      {children}
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <span className={cls}>{body}</span>
  );
}
