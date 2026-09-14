"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { parts, fitmentLabel, bodies, modifications } from "@/lib/data";
import { useApp } from "@/lib/state";
import { api, type FeedItem } from "@/lib/api";
import { carLabel } from "@/lib/car";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { FitBadge } from "@/components/garage/fit-badge";
import { InstallCounter } from "@/components/garage/install-counter";
import { RespectButton } from "@/components/garage/respect-button";
import { Money } from "@/components/garage/money";
import { ListSkeleton } from "@/components/garage/skeletons";
import { LoadingScreen } from "@/components/garage/load-state";
import { buttonVariants } from "@/components/ui/button";

const carOf = (r: FeedItem) => {
  const b = bodies.find((x) => x.code === r.body_code)?.name ?? "Гранта";
  const m = modifications.find((x) => x.id === r.modification)?.name ?? "";
  return `${b}${m ? `, ${m}` : ""}`;
};

// Экран 5: деталь на конкретной модификации. Счёт и отзывы приходят с сервера.
export default function PartView({ slug }: { slug: string }) {
  const { state, loading, toggleRespect } = useApp();
  const [data, setData] = useState<{ installed: number; reworked: number; reviews: FeedItem[] } | null>(null);

  useEffect(() => {
    if (!state) return;
    void api.part(slug).then(setData);
  }, [slug, state]);

  const part = parts.find((p) => p.slug === slug);
  if (loading) return <LoadingScreen title="Деталь" />;
  if (!part) return <Screen title="Деталь не найдена">—</Screen>;

  const fit = state?.car.modification ? part.fitment[state.car.modification] : "unknown";
  const inGarage = (state?.garage ?? []).some((g) => g.part_slug === part.slug);

  return (
    <Screen
      title={part.name}
      subtitle={part.spec}
      car={carLabel(state?.car.body ?? null, state?.car.modification ?? null)}
    >
      <div className="rounded-lg border border-border bg-card p-3">
        {data ? (
          <InstallCounter installed={data.installed} reworked={data.reworked} />
        ) : (
          <div className="h-9 animate-pulse rounded bg-muted" />
        )}
        <div className="pt-3">
          <FitBadge fitment={fit} />
        </div>
        {fit === "unknown" && (
          <p className="pt-2 text-xs text-muted-foreground">
            Никто пока не подтвердил установку на вашу модификацию. Мы не пишем «подходит», пока
            этого не знаем — на этом чаще всего и теряют деньги.
          </p>
        )}
      </div>

      <section className="pt-6">
        <h2 className="text-sm font-semibold">Что ещё придётся купить</h2>
        {part.alsoNeeded.length === 0 ? (
          <p className="pt-1.5 text-sm text-muted-foreground">Ничего сверх самой детали.</p>
        ) : (
          <ul className="flex flex-col gap-1.5 pt-2">
            {part.alsoNeeded.map((n) => (
              <li key={n} className="flex gap-2 text-sm">
                <span className="text-fit-rework">•</span>
                {n}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="pt-6">
        <h2 className="text-sm font-semibold">Сколько выходит</h2>
        <dl className="pt-2 text-sm">
          <div className="flex justify-between gap-2 border-b border-border py-1.5">
            <dt className="text-muted-foreground">Деталь</dt>
            <dd className="font-mono tabular-nums">
              <Money value={part.priceFrom} /> — <Money value={part.priceTo} />
            </dd>
          </div>
          <div className="flex justify-between gap-2 border-b border-border py-1.5">
            <dt className="text-muted-foreground">Установка</dt>
            <dd className="font-mono tabular-nums">
              <Money value={part.installFrom} /> — <Money value={part.installTo} />
            </dd>
          </div>
          <div className="flex justify-between gap-2 py-1.5">
            <dt className="text-muted-foreground">Сложность</dt>
            <dd>
              {part.difficulty} · {part.time}
            </dd>
          </div>
        </dl>
      </section>

      <section className="pt-6">
        <h2 className="text-sm font-semibold">Кто ещё ставил это на машину как у вас</h2>

        {data === null ? (
          <div className="pt-2">
            <ListSkeleton count={2} kind="feed" />
          </div>
        ) : data.reviews.length === 0 ? (
          <div className="mt-2 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
            Отзывов пока нет. Поставьте первым — и расскажите, как встало: это увидят те, кто
            выбирает то же самое.
          </div>
        ) : (
          <Stagger className="flex flex-col gap-2 pt-2">
            {data.reviews.map((r) => {
              const target = `install:${r.id}`;
              return (
                <StaggerItem key={r.id}>
                  <article className="rounded-lg border border-border bg-card p-3 text-sm">
                    <div className="font-semibold">{r.first_name ?? r.username ?? "Владелец"}</div>
                    <div className="text-xs text-muted-foreground">{carOf(r)}</div>
                    <p className="pt-2">
                      <span className={r.reworked ? "text-fit-rework" : "text-fit-ok"}>
                        {r.reworked ? "Пришлось дорабатывать." : "Встало без доработок."}
                      </span>{" "}
                      {r.review_text ?? "Отзыв ещё не написан."}
                    </p>
                    <p className="pt-1.5">
                      <Money value={r.price} />
                      {r.work_price > 0 ? (
                        <>
                          {" + работа "}
                          <Money value={r.work_price} />
                        </>
                      ) : (
                        <span className="text-muted-foreground"> · ставил сам</span>
                      )}
                    </p>
                    <div className="pt-3">
                      <RespectButton
                        count={r.respects}
                        active={state?.respects.includes(target)}
                        onToggle={() => toggleRespect(target)}
                      />
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>

      <section className="pt-6">
        <h2 className="text-sm font-semibold">Где купить</h2>
        <p className="pt-1.5 text-sm text-muted-foreground">
          {part.shop} · артикул <span className="font-mono">{part.article}</span>
        </p>
      </section>

      <div className="pt-6">
        <Link
          href={inGarage ? "/profile" : `/part/${part.slug}/add`}
          className={buttonVariants({ variant: inGarage ? "outline" : "default", className: "w-full" })}
        >
          {inGarage ? "Уже в гараже — открыть" : "Поставил себе — добавить в гараж"}
        </Link>
      </div>

      <p className="pt-3 text-xs text-muted-foreground">
        {fitmentLabel[fit]}
      </p>
    </Screen>
  );
}
