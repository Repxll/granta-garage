"use client";

import Link from "next/link";
import { EllipsisHorizontalIcon, WrenchScrewdriverIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { parts } from "@/lib/data";
import { useApp } from "@/lib/state";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { FitBadge, fitmentText } from "@/components/garage/fit-badge";
import { IconButton } from "@/components/garage/icon-button";
import { Money } from "@/components/garage/money";
import { ListSkeleton } from "@/components/garage/skeletons";
import { ReactionRow, ReactionStat } from "@/components/garage/reaction-row";
import { ReviewsThread, useReviews } from "@/components/garage/reviews-thread";
import { buttonVariants } from "@/components/ui/button";
import { plural } from "@/lib/format";
import { cn } from "@/lib/utils";

// Экран 5: деталь на модификации — как открытая работа у референса: медиа-обложка,
// ряд реакций справа, ниже тред отзывов с композером.
export default function PartView({ slug }: { slug: string }) {
  const { state, loading } = useApp();
  const { data, reload } = useReviews(state ? slug : null);

  const part = parts.find((p) => p.slug === slug);
  const fit = state?.car.modification && part ? part.fitment[state.car.modification] : "unknown";
  const inGarage = !!part && (state?.garage ?? []).some((g) => g.part_slug === part.slug);
  const reviewCount = (data?.reviews ?? []).filter((r) => r.review_text).length;

  return (
    <Screen
      header={
        <AppHeader
          title={part?.name ?? "Деталь"}
          back="/catalog"
          action={<IconButton icon={EllipsisHorizontalIcon} label="Действия" muted />}
        />
      }
    >
      {!part ? (
        <p className="text-sm text-text-secondary">Деталь не найдена.</p>
      ) : loading ? (
        <ListSkeleton count={1} kind="card" />
      ) : (
        <div className="flex flex-col gap-2">
          {/* Обложка — медиа работы */}
          <FadeIn>
            <div className="relative overflow-hidden rounded-[14px] bg-surface p-4">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(120%_80%_at_50%_0%,var(--surface-muted),transparent)]" />
              <div className="relative">
                <FitBadge fitment={fit} size="sm" />
                <div className="pt-6 text-[22px] font-bold leading-[1.15] tracking-tight text-text-primary text-balance">
                  {part.name}
                </div>
                <div className="pt-1.5 font-mono text-xs text-text-secondary">{part.spec}</div>
                <div className="pt-5 text-[22px] font-bold leading-none tracking-tight">
                  <Money value={part.priceFrom} /> — <Money value={part.priceTo} />
                </div>
                <div className="pt-1.5 text-sm text-text-secondary">
                  + установка <Money value={part.installFrom} className="font-medium text-text-primary" /> —{" "}
                  <Money value={part.installTo} className="font-medium text-text-primary" />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Ряд реакций — как под работой у референса */}
          <FadeIn index={1}>
            <ReactionRow>
              <ReactionStat count={data?.installed ?? 0} icon={WrenchScrewdriverIcon} label="Сколько раз ставили" />
              <ReactionStat count={reviewCount} icon={ChatBubbleOvalLeftEllipsisIcon} label="Отзывы" />
            </ReactionRow>
          </FadeIn>

          {/* Счёт и вердикт */}
          <FadeIn index={2}>
            <div className="rounded-[14px] bg-surface p-4">
              {data ? (
                <>
                  <div className="text-base font-semibold text-text-primary">
                    {data.installed === 0
                      ? "На вашу модификацию ещё никто не ставил"
                      : `Ставили ${data.installed} ${plural(data.installed, "раз", "раза", "раз")} на такую же Гранту`}
                  </div>
                  {data.installed > 0 && (
                    <div className={cn("pt-1 text-sm font-medium", data.reworked === 0 ? "text-fit-ok" : "text-fit-rework")}>
                      {data.reworked === 0
                        ? "Все — без доработок"
                        : `${data.reworked} ${plural(data.reworked, "дорабатывал", "дорабатывали", "дорабатывали")}`}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  <span className="shimmer block h-5 w-2/3 rounded-[76px]" />
                  <span className="shimmer block h-4 w-1/3 rounded-[76px]" />
                </div>
              )}
              <p className="pt-2 text-xs leading-relaxed text-text-secondary">{fitmentText(fit)}.</p>
              {fit === "unknown" && (
                <p className="pt-1 text-xs leading-relaxed text-text-secondary">
                  Мы не пишем «подходит», пока этого не знаем — на этом чаще всего и теряют деньги.
                </p>
              )}
            </div>
          </FadeIn>

          <FadeIn index={3}>
            <div className="rounded-[14px] bg-surface p-4">
              <h3 className="text-sm font-semibold text-text-primary">Что ещё придётся купить</h3>
              {part.alsoNeeded.length === 0 ? (
                <p className="pt-1.5 text-sm text-text-secondary">Ничего сверх самой детали.</p>
              ) : (
                <ul className="flex flex-col gap-2 pt-2">
                  {part.alsoNeeded.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-sm text-text-primary">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-fit-rework" />
                      {n}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="text-text-secondary">Сложность</span>
                <span className="font-medium">
                  {part.difficulty} · {part.time}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-text-secondary">Где купить</span>
                <span className="font-medium">
                  {part.shop} · <span className="font-mono">{part.article}</span>
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn index={4}>
            <Link
              href={inGarage ? "/profile" : `/part/${part.slug}/add`}
              className={buttonVariants({ size: "xl", variant: inGarage ? "secondary" : "default", className: "mt-2 w-full" })}
            >
              {inGarage ? "Уже в гараже — открыть" : "Поставил себе — добавить в гараж"}
            </Link>
          </FadeIn>

          {/* Тред отзывов — комментарии работы */}
          <FadeIn index={5} className="pt-4">
            <div className="border-t border-border pt-3">
              <ReviewsThread slug={part.slug} data={data} onPosted={reload} />
            </div>
          </FadeIn>
        </div>
      )}
    </Screen>
  );
}
