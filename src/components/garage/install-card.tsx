"use client";

import Link from "next/link";
import { EllipsisHorizontalIcon, HeartIcon as HeartSolid, WrenchScrewdriverIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { Fitment } from "@/lib/data";
import { FitBadge } from "./fit-badge";
import { CountPill } from "./count-pill";
import { AuthorRow } from "./author-row";
import { IconButton } from "./icon-button";
import { Money } from "./money";

// Карточка установки — структура карточки работы с референса один в один:
// article.space-y-2 → медиа 4/3 в белой карточке 14px с оверлеями (слева пилюля, справа «…»),
// футер h-8: автор слева, счётчики-пилюли справа.
// Фото у нас пока нет, поэтому медиа — типографская обложка: деталь, параметры, цена.
export function InstallCard({
  partName,
  partSpec,
  partHref,
  total,
  fitment,
  reworked,
  installedCount,
  author,
  authorMeta,
  authorHref,
  respects,
  respectActive,
  respectLocked,
  onRespect,
  reviewCount,
  onComments,
  note,
  className,
}: {
  partName: string;
  partSpec?: string;
  partHref: string;
  total: number;
  fitment?: Fitment;
  reworked: boolean;
  installedCount?: number;
  author: string;
  authorMeta: string;
  authorHref?: string;
  respects: number;
  respectActive?: boolean;
  respectLocked?: boolean;
  onRespect?: () => void;
  reviewCount?: number;
  onComments?: () => void;
  note?: string | null;
  className?: string;
}) {
  return (
    <article className={cn("w-full min-w-0 space-y-2", className)}>
      <div className="motion-interactive relative aspect-[4/3] overflow-hidden rounded-[14px] border border-transparent bg-surface">
        <Link
          href={partHref}
          className="motion-pressable relative block h-full w-full overflow-hidden rounded-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          aria-label={`Открыть: ${partName}`}
        >
          {/* Обложка */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(240_8%_97%),transparent)]" />
            <div className="relative">
              <div className="text-[22px] font-bold leading-[1.15] tracking-tight text-text-primary text-balance">{partName}</div>
              {partSpec && <div className="pt-1.5 font-mono text-xs text-text-secondary">{partSpec}</div>}
              <div className="flex items-end justify-between gap-3 pt-4">
                <Money value={total} className="font-sans text-[28px] font-bold leading-none tracking-tight" />
                {note && <p className="max-w-[55%] text-right text-xs leading-snug text-text-secondary line-clamp-2">{note}</p>}
              </div>
            </div>
          </div>
        </Link>

        {/* Оверлеи как у референса: слева — статус, справа — действия */}
        <div className="pointer-events-none absolute left-2 top-2 z-10 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex h-6 items-center gap-1 rounded-full px-2 text-[11px] font-bold",
              reworked ? "bg-fit-rework-surface text-fit-rework" : "bg-fit-ok-surface text-fit-ok",
            )}
          >
            {reworked ? "Дорабатывал" : "Встало как есть"}
          </span>
          {fitment && fitment !== "fits" && <FitBadge fitment={fitment} size="sm" />}
        </div>
        <div className="absolute right-1.5 top-1.5 z-10">
          <IconButton icon={EllipsisHorizontalIcon} label="Действия с установкой" size="sm" muted />
        </div>
      </div>

      <footer className="flex h-8 items-center justify-between">
        <AuthorRow name={author} meta={authorMeta} href={authorHref} />
        <div className="flex items-center gap-2">
          {installedCount !== undefined && (
            <CountPill icon={WrenchScrewdriverIcon} count={installedCount} label="Сколько раз ставили" locked />
          )}
          {reviewCount !== undefined && (
            <CountPill icon={ChatBubbleOvalLeftEllipsisIcon} count={reviewCount} label="Показать отзывы" onClick={onComments} locked={!onComments} />
          )}
          <CountPill
            icon={respectActive ? HeartSolid : HeartOutline}
            count={respects + (respectActive ? 1 : 0)}
            label="Респект"
            tone="respect"
            active={respectActive}
            locked={respectLocked}
            onClick={onRespect}
          />
        </div>
      </footer>
    </article>
  );
}
