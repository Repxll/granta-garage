"use client";

import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import { bodies, modifications } from "@/lib/data";
import { useApp } from "@/lib/state";
import { api, type FeedItem } from "@/lib/api";
import { carLabel } from "@/lib/car";
import { partName } from "@/lib/parts";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { Segmented } from "@/components/garage/segmented";
import { FeedCard } from "@/components/garage/feed-card";
import { EmptyState } from "@/components/garage/empty-state";
import { ListSkeleton } from "@/components/garage/skeletons";
import { LoadingScreen, ErrorScreen } from "@/components/garage/load-state";

const ago = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "сегодня";
  if (days === 1) return "вчера";
  if (days < 7) return `${days} дня назад`;
  if (days < 30) return `${Math.floor(days / 7)} нед. назад`;
  return `${Math.floor(days / 30)} мес. назад`;
};

const carOf = (f: FeedItem) => {
  const b = bodies.find((x) => x.code === f.body_code)?.name ?? "Гранта";
  const m = modifications.find((x) => x.id === f.modification)?.name ?? "";
  return `${b}${m ? `, ${m}` : ""}`;
};

// Экран 3: лента. Установки других владельцев из базы, фильтр по кузову.
export default function FeedPage() {
  const { state, loading, error, reload, toggleRespect } = useApp();
  const [scope, setScope] = useState<"mine" | "all">("mine");
  const [items, setItems] = useState<FeedItem[] | null>(null);

  useEffect(() => {
    if (!state) return;
    setItems(null);
    void api.feed(scope).then((r) => setItems(r.items));
  }, [scope, state]);

  if (loading) return <LoadingScreen title="Что ставят" />;
  if (error) return <ErrorScreen title="Что ставят" message={error} onRetry={reload} />;

  const body = bodies.find((b) => b.code === state?.car.body);

  return (
    <Screen
      title="Что ставят"
      subtitle="Установки других владельцев — с ценами и без пересказов."
      car={carLabel(state?.car.body ?? null, state?.car.modification ?? null)}
    >
      <Segmented
        value={scope}
        onChange={setScope}
        options={[
          { value: "mine", label: body ? `Как у меня · ${body.name}` : "Как у меня" },
          { value: "all", label: "Все Гранты" },
        ]}
      />

      <section className="pt-6">
        <h2 className="text-sm font-semibold">Свежие установки</h2>

        {items === null ? (
          <div className="pt-2">
            <ListSkeleton count={3} kind="feed" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            className="mt-2"
            icon={Layers}
            title={scope === "mine" ? "На такой кузов ещё ничего не ставили" : "Пока никто ничего не ставил"}
            hint="Поставьте первым и покажите, как встало — это увидят те, кто выбирает то же самое."
            action={
              scope === "mine" ? (
                <button
                  type="button"
                  onClick={() => setScope("all")}
                  className="min-h-[44px] rounded-md border border-border px-4 text-xs"
                >
                  Показать все Гранты
                </button>
              ) : undefined
            }
          />
        ) : (
          <Stagger className="flex flex-col gap-2 pt-2">
            {items.map((f) => {
              const target = `install:${f.id}`;
              return (
                <StaggerItem key={f.id}>
                  <FeedCard
                    author={f.first_name ?? f.username ?? "Владелец"}
                    car={carOf(f)}
                    when={ago(f.created_at)}
                    partName={partName(f.part_slug)}
                    partHref={`/part/${f.part_slug}`}
                    reworked={f.reworked}
                    extra={f.review_text ?? "Отзыв ещё не написан"}
                    total={f.price + f.work_price}
                    respects={f.respects}
                    active={state?.respects.includes(target)}
                    onRespect={() => toggleRespect(target)}
                  />
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>
    </Screen>
  );
}
