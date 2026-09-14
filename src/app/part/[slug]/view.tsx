"use client";

import Link from "next/link";
import { parts } from "@/lib/data";
import { useApp } from "@/lib/state";
import { carLabel } from "@/lib/car";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { FitBadge } from "@/components/garage/fit-badge";
import { InstallCounter } from "@/components/garage/install-counter";
import { RespectButton } from "@/components/garage/respect-button";
import { Money } from "@/components/garage/money";
import { buttonVariants } from "@/components/ui/button";

// Экран 5: деталь на конкретной модификации. Сверху — счёт, а не звёзды.
export default function PartView({ slug }: { slug: string }) {
  const { state, toggleRespect } = useApp();
  const part = parts.find((p) => p.slug === slug);
  if (!part) return <Screen title="Деталь не найдена">—</Screen>;

  const fit = state.modification ? part.fitment[state.modification] : "unknown";
  const inGarage = state.garage.some((g) => g.slug === part.slug);

  return (
    <Screen title={part.name} subtitle={part.spec} car={carLabel(state.body, state.modification)}>
      <div className="rounded-lg border border-border bg-card p-3">
        <InstallCounter installed={part.installedCount} reworked={part.reworkedCount} />
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
        {part.reviews.length === 0 ? (
          <div className="mt-2 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
            Отзывов пока нет. Вот наша инструкция по установке с фото — чтобы страница была полезна
            до того, как появится первый отзыв.
          </div>
        ) : (
          <Stagger className="flex flex-col gap-2 pt-2">
            {part.reviews.map((r) => {
              const id = `${part.slug}:${r.author}`;
              return (
                <StaggerItem key={r.author}>
                  <article className="rounded-lg border border-border bg-card p-3 text-sm">
                    <div className="font-semibold">{r.author}</div>
                    <div className="text-xs text-muted-foreground">{r.modification}</div>
                    <p className="pt-2">
                      <span className={r.fitment === "clean" ? "text-fit-ok" : "text-fit-rework"}>
                        {r.fitment === "clean" ? "Встало без доработок." : "Пришлось дорабатывать."}
                      </span>{" "}
                      {r.extra}
                    </p>
                    <p className="pt-1.5">
                      <Money value={r.partPrice} />
                      {r.workPrice > 0 ? (
                        <>
                          {" + работа "}
                          <Money value={r.workPrice} />
                        </>
                      ) : (
                        <span className="text-muted-foreground"> · ставил сам</span>
                      )}
                    </p>
                    <p className="pt-1 text-xs text-muted-foreground">Через сезон: {r.longTerm}</p>
                    <div className="pt-3">
                      <RespectButton
                        count={r.respects}
                        active={state.respects.includes(id)}
                        onToggle={() => toggleRespect(id)}
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
    </Screen>
  );
}
