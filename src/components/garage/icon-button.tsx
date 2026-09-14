"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, type HeroIcon } from "./icon";

// Кнопка-иконка: 40 или 32, радиус 12, без фона; подсветка на hover, сжатие на нажатии.
export function IconButton({
  icon,
  label,
  href,
  onClick,
  size = "md",
  muted = false,
  className,
}: {
  icon: HeroIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  size?: "md" | "sm";
  muted?: boolean;
  className?: string;
}) {
  const cls = cn(
    "motion-interactive motion-icon-feedback motion-pressable flex shrink-0 items-center justify-center rounded-md",
    "hover:bg-control-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    size === "md" ? "size-10" : "size-8",
    muted ? "text-text-secondary/75" : "text-icon-primary",
    className,
  );
  const body = <Icon icon={icon} size={size === "md" ? 18 : 16} />;
  return href ? (
    <Link href={href} aria-label={label} className={cls}>
      {body}
    </Link>
  ) : (
    <button type="button" aria-label={label} onClick={onClick} className={cls}>
      {body}
    </button>
  );
}
