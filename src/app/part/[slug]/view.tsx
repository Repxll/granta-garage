"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EllipsisHorizontalIcon, WrenchScrewdriverIcon, HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { parts, bodies, modifications } from "@/lib/data";
import { useApp } from "@/lib/state";
import { api, type FeedItem } from "@/lib/api";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { FitBadge, fitmentText } from "@/components/garage/fit-badge";
import { CountPill } from "@/components/garage/count-pill";
import { AuthorRow } from "@/components/garage/author-row";
import { IconButton } from "@/components/garage/icon-button";
import { ListHeader } from "@/components/garage/list-header";
import { Money } from "@/components/garage/money";
import { ListSkeleton } from "@/components/garage/skeletons";
import { buttonVariants } from "@/components/ui/button";
import { plural } from "@/lib/format";
import { cn } from "@/lib/utils";

const carOf = (r: FeedItem) => {
  const b = bodies.find((x) => x.code === r.body_code)?.name ?? "Гранта";
  const m = modifications.find((x) => x.id === r.modification)?.name ?? "";
  return `${b}${m ? `, ${m}` : ""}`;
};

// Экран 5: деталь на модификации. Обложка как медиа карточки работы, ниже — секции белыми
// карточками, отзывы — строками автора, как в их комментариях.
export default function PartView({ slug }: { slug: string }) {
  const { state, loading, toggleRespect } = useApp();
  const [data, setData] = useState<{ installed: number; reworked: number; reviews: FeedItem[] } | null>(null);

  useEffect(() => {
    if (!state) return;
    void api.part(slug).then(setData);
  }, [slug, state]);

  const part = parts.find((p) => p.slug === slug);
  const fit = state?.car.modification && part ? part.fitment[state.car.modification] : "unknown";
  const inGarage = !!part && (state?.garage ?? []).some((g) => g.part_slug === part.slug);

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
        <div className="flex flex-col gap-4">
          {/* Обложка */}
          <FadeIn>
            <div className="relative overflow-hidden rounded-[14px] bg-surface p-4">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(240_8%_97%),transparent)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <FitBadge fitment={fit} size="sm" />
                  {data ? (
                    <CountPill icon={WrenchScrewdriverIcon} count={data.installed} label="Сколько раз ставили" locked />
                  ) : (
                    <span className="shimmer h-8 w-[54px] rounded-[76px]" />
                  )}
                </div>
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

          {/* Счёт — главный сигнал */}
          <FadeIn index={1}>
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

          {/* Что ещё купить */}
          <FadeIn index={2}>
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
            </div>
          </FadeIn>

          {/* Отзывы — строки автора, как комментарии */}
          <FadeIn index={3}>
            <ListHeader title="Кто ещё ставил на такую же" />
            {data === null ? (
              <ListSkeleton count={2} kind="row" />
            ) : data.reviews.length === 0 ? (
              <div className="rounded-[14px] bg-surface p-4 text-sm text-text-secondary">
                Отзывов пока нет. Поставьте первым — и расскажите, как встало: это увидят те, кто выбирает то же самое.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {data.reviews.map((r, i) => {
                  const target = `install:${r.id}`;
                  const active = state?.respects.includes(target);
                  return (
                    <FadeIn key={r.id} index={i}>
                      <article className="rounded-[14px] bg-surface p-3">
                        <div className="flex items-center justify-between gap-2">
                          <AuthorRow name={r.first_name ?? r.username ?? "Владелец"} meta={carOf(r)} />
                          <CountPill
                            icon={active ? HeartSolid : HeartOutline}
                            count={r.respects + (active ? 1 : 0)}
                            label="Респект"
                            tone="respect"
                            active={active}
                            onClick={() => toggleRespect(target)}
                          />
                        </div>
                        <p className="pt-2 text-sm leading-relaxed text-text-primary">
                          <span className={cn("font-medium", r.reworked ? "text-fit-rework" : "text-fit-ok")}>
                            {r.reworked ? "Пришлось дорабатывать." : "Встало без доработок."}
                          </span>{" "}
                          {r.review_text ?? "Отзыв ещё не написан."}
                        </p>
                        <p className="pt-1.5 text-xs text-text-secondary">
                          <Money value={r.price} />
                          {r.work_price > 0 ? (
                            <>
                              {" + работа "}
                              <Money value={r.work_price} />
                            </>
                          ) : (
                            " · ставил сам"
                          )}
                        </p>
                      </article>
                    </FadeIn>
                  );
                })}
              </div>
            )}
          </FadeIn>

          <FadeIn index={4}>
            <div className="rounded-[14px] bg-surface p-4">
              <h3 className="text-sm font-semibold text-text-primary">Где купить</h3>
              <p className="pt-1.5 text-sm text-text-secondary">
                {part.shop} · артикул <span className="font-mono">{part.article}</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn index={5}>
            <Link
              href={inGarage ? "/profile" : `/part/${part.slug}/add`}
              className={buttonVariants({ size: "xl", variant: inGarage ? "secondary" : "default", className: "w-full" })}
            >
              {inGarage ? "Уже в гараже — открыть" : "Поставил себе — добавить в гараж"}
            </Link>
          </FadeIn>
        </div>
      )}
    </Screen>
  );
}
