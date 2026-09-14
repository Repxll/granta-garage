"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Money } from "./money";
import { RespectButton } from "./respect-button";

// Единица ленты — установка, а не пост. Из неё можно извлечь данные:
// деталь, цена, встало или дорабатывал. У Drive2 это свободный текст, из которого не извлечь ничего.
export function FeedCard({
  author,
  car,
  when,
  partName,
  partHref,
  reworked,
  extra,
  total,
  respects,
  active,
  onRespect,
  className,
}: {
  author: string;
  car: string;
  when: string;
  partName: string;
  partHref: string;
  reworked: boolean;
  extra: string;
  total: number;
  respects: number;
  active?: boolean;
  onRespect?: () => void;
  className?: string;
}) {
  return (
    <article className={cn("rounded-lg border border-border bg-card p-3", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">{author}</span>
        <span className="text-xs text-muted-foreground">{when}</span>
      </div>
      <div className="text-xs text-muted-foreground">{car}</div>

      <Link href={partHref} className="mt-2 block text-sm font-medium text-primary hover:underline">
        {partName}
      </Link>

      <p className="pt-1 text-sm">
        <span className={reworked ? "text-fit-rework" : "text-fit-ok"}>
          {reworked ? "Дорабатывал." : "Встало без доработок."}
        </span>{" "}
        {extra}
      </p>

      <Money value={total} className="block pt-1.5 text-sm font-semibold" />
      <span className="text-xs text-muted-foreground">с работой</span>

      <div className="pt-3">
        <RespectButton count={respects} active={active} onToggle={onRespect} />
      </div>
    </article>
  );
}
