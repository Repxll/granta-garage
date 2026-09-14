import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

// Строка автора из футера карточки: аватар 32, имя 14/500, подпись 12 вторичным,
// вся строка — кликабельная область с подсветкой и радиусом 12.
export function AuthorRow({
  name,
  meta,
  href,
  className,
}: {
  name: string;
  meta: string;
  href?: string;
  className?: string;
}) {
  const cls = cn(
    "motion-interactive motion-pressable flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 -mx-2",
    href && "hover:bg-control-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  );
  const body = (
    <>
      <Avatar name={name} size={32} />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium leading-snug text-text-primary">{name}</span>
        <span className="mt-0.5 truncate text-xs leading-snug text-text-secondary">{meta}</span>
      </span>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
