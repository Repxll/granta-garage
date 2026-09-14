"use client";

import Link from "next/link";
import { Wrench } from "lucide-react";
import { useApp } from "@/lib/state";
import { bodies } from "@/lib/data";
import { carLabel } from "@/lib/car";
import { partName } from "@/lib/parts";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { MoneyStat, Money } from "@/components/garage/money";
import { EmptyState } from "@/components/garage/empty-state";
import { LoadingScreen, ErrorScreen } from "@/components/garage/load-state";
import { buttonVariants } from "@/components/ui/button";
import { plural } from "@/lib/format";

// Экран 7: профиль. Гараж живёт здесь же — одна сущность «моя машина».
export default function ProfilePage() {
  const { state, loading, error, reload } = useApp();

  if (loading) return <LoadingScreen title="Моя Гранта" />;
  if (error) return <ErrorScreen title="Моя Гранта" message={error} onRetry={reload} />;

  if (!state?.car.modification) {
    return (
      <Screen title="Сначала выберите машину">
        <Link href="/" className={buttonVariants({ className: "w-full" })}>
          Выбрать Гранту
        </Link>
      </Screen>
    );
  }

  const body = bodies.find((b) => b.code === state.car.body);
  const total = state.garage.reduce((s, i) => s + i.price + i.work_price, 0);
  const pending = state.garage.filter((i) => !i.review_text).length;

  return (
    <Screen
      title="Моя Гранта"
      subtitle={carLabel(state.car.body, state.car.modification) ?? undefined}
      car={carLabel(state.car.body, state.car.modification)}
    >
      <div className="grid grid-cols-2 gap-2">
        <MoneyStat label="Вложено" value={total} accent />
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Респектов получено</div>
          <div className="pt-0.5 font-mono text-xl font-semibold tabular-nums">
            {state.respectsReceived}
          </div>
        </div>
      </div>

      <section className="pt-6">
        <h2 className="text-sm font-semibold">
          Гараж · {state.garage.length} {plural(state.garage.length, "деталь", "детали", "деталей")}
        </h2>

        {state.garage.length === 0 ? (
          <EmptyState
            className="mt-2"
            icon={Wrench}
            title="В гараже пока пусто"
            hint="Добавьте то, что уже стоит на машине — сумма посчитается сама, а другие владельцы увидят, как оно встало."
            action={
              <Link href="/catalog" className={buttonVariants({ size: "sm" })}>
                Открыть каталог
              </Link>
            }
          />
        ) : (
          <>
            <Stagger className="flex flex-col gap-2 pt-2">
              {state.garage.map((i) => (
                <StaggerItem key={i.part_slug}>
                  <Link
                    href={`/part/${i.part_slug}`}
                    className="block rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <div className="text-sm font-semibold">{partName(i.part_slug)}</div>
                    <div className="pt-1 text-sm">
                      <Money value={i.price} />
                      {i.work_price > 0 ? (
                        <>
                          {" + работа "}
                          <Money value={i.work_price} />
                        </>
                      ) : (
                        <span className="text-muted-foreground"> · ставил сам</span>
                      )}
                    </div>
                    <div className="pt-1 text-xs">
                      <span className={i.reworked ? "text-fit-rework" : "text-fit-ok"}>
                        {i.reworked ? "Дорабатывал" : "Встало без доработок"}
                      </span>
                      {i.review_text ? (
                        <span className="text-muted-foreground"> · отзыв написан</span>
                      ) : (
                        <span className="text-muted-foreground"> · отзыва пока нет</span>
                      )}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>

            <Link href="/build" className={buttonVariants({ variant: "outline", className: "mt-3 w-full" })}>
              Показать мою сборку
            </Link>

            {pending > 0 && (
              <div className="mt-4 rounded-lg border border-border bg-card p-3 text-sm">
                <div className="font-semibold">Через две недели спросим, как оно</div>
                <p className="pt-1 text-muted-foreground">
                  По {pending} {plural(pending, "детали", "деталям", "деталям")} придёт сообщение
                  «ну как, встало нормально?» — ответ станет отзывом для тех, кто выбирает то же самое.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </Screen>
  );
}
