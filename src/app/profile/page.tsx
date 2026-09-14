"use client";

import Link from "next/link";
import { useApp } from "@/lib/state";
import { bodies } from "@/lib/data";
import { carLabel } from "@/lib/car";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { EmptyState } from "@/components/garage/empty-state";
import { Wrench } from "lucide-react";
import { MoneyStat, Money } from "@/components/garage/money";
import { buttonVariants } from "@/components/ui/button";
import { plural } from "@/lib/format";
import { cn } from "@/lib/utils";

// Экран 7: профиль. Гараж живёт здесь же — это одна сущность «моя машина»,
// незачем разносить её по двум вкладкам.
export default function ProfilePage() {
  const { state, reset } = useApp();
  const body = bodies.find((b) => b.code === state.body);
  const total = state.garage.reduce((s, i) => s + i.price + i.workPrice, 0);
  // Полученные респекты: на старте их честно ноль — cold start видно сразу,
  // а не прячется за бодрым числом.
  const respects = 0;

  if (!state.modification) {
    return (
      <Screen title="Сначала выберите машину">
        <Link href="/" className={buttonVariants({ className: "w-full" })}>
          Выбрать Гранту
        </Link>
      </Screen>
    );
  }

  const top = [
    { place: 1, name: "om777", sum: 96400, r: 31 },
    { place: 2, name: "Бортжурнал на Drive2", sum: 74100, r: 22 },
    { place: 3, name: "nikei007", sum: 41200, r: 18 },
  ];

  return (
    <Screen
      title="Моя Гранта"
      subtitle={carLabel(state.body, state.modification) ?? undefined}
      car={carLabel(state.body, state.modification)}
    >
      <div className="grid grid-cols-2 gap-2">
        <MoneyStat label="Вложено" value={total} accent />
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Респектов получено</div>
          <div className="pt-0.5 font-mono text-xl font-semibold tabular-nums">{respects}</div>
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
                <StaggerItem key={i.slug}>
                  <Link
                    href={`/part/${i.slug}`}
                    className="block rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <div className="text-sm font-semibold">{i.name}</div>
                    <div className="pt-1 text-sm">
                      <Money value={i.price} />
                      {i.workPrice > 0 ? (
                        <>
                          {" + работа "}
                          <Money value={i.workPrice} />
                        </>
                      ) : (
                        <span className="text-muted-foreground"> · ставил сам</span>
                      )}
                    </div>
                    <div className="pt-1 text-xs">
                      <span className={i.reworked ? "text-fit-rework" : "text-fit-ok"}>
                        {i.reworked ? "Дорабатывал" : "Встало без доработок"}
                      </span>
                      {i.photo && <span className="text-muted-foreground"> · фото есть</span>}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>

            <Link href="/build" className={buttonVariants({ variant: "outline", className: "mt-3 w-full" })}>
              Показать мою сборку
            </Link>

            <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
              <div className="font-semibold text-primary">Через две недели спросим, как оно</div>
              <p className="pt-1 text-muted-foreground">
                Придёт одно сообщение: «ну как, встало нормально?» — ответ станет отзывом для тех,
                кто выбирает то же самое.
              </p>
            </div>
          </>
        )}
      </section>

      <section className="pt-6">
        <h2 className="text-sm font-semibold">Топ сборок недели · {body?.name}</h2>
        <p className="pt-1 text-xs text-muted-foreground">
          Отдельный зачёт для каждого кузова — чтобы сравнивать себя с похожими машинами, а не
          с чужими проектами.
        </p>
        <div className="flex flex-col gap-2 pt-3">
          {top.map((x) => (
            <div key={x.place} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <span className="font-mono text-sm text-muted-foreground">{x.place}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{x.name}</div>
                <div className="text-xs text-muted-foreground">
                  <Money value={x.sum} /> · {x.r} {plural(x.r, "респект", "респекта", "респектов")}
                </div>
              </div>
            </div>
          ))}
          <div className={cn("flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/5 p-3")}>
            <span className="font-mono text-sm text-primary">—</span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-primary">Вы</div>
              <div className="text-xs text-muted-foreground">
                <Money value={total} /> · {respects} {plural(respects, "респект", "респекта", "респектов")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={reset}
        className="mt-6 w-full rounded-lg border border-border py-2 text-xs text-muted-foreground"
      >
        Сбросить каркас
      </button>
    </Screen>
  );
}
