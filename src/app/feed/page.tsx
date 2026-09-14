"use client";

import { useEffect, useState } from "react";
import { ArrowsUpDownIcon, RectangleStackIcon } from "@heroicons/react/24/solid";
import { bodies, modifications } from "@/lib/data";
import { useApp } from "@/lib/state";
import { api, type FeedItem } from "@/lib/api";
import { partName } from "@/lib/parts";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { Segmented } from "@/components/garage/segmented";
import { InstallCard } from "@/components/garage/install-card";
import { EmptyState } from "@/components/garage/empty-state";
import { ListSkeleton } from "@/components/garage/skeletons";
import { IconButton } from "@/components/garage/icon-button";
import { Button } from "@/components/ui/button";
import { parts } from "@/lib/data";

const ago = (iso: string) => {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days < 1) return "сегодня";
  if (days === 1) return "вчера";
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }).replace(".", "");
};

const carOf = (f: FeedItem) => {
  const b = bodies.find((x) => x.code === f.body_code)?.name ?? "Гранта";
  const m = modifications.find((x) => x.id === f.modification)?.name ?? "";
  return `${b}${m ? `, ${m}` : ""}`;
};

// Экран 3: лента установок — карточки работ с референса, фильтр по кузову.
export default function FeedPage() {
  const { state, loading, error, reload, toggleRespect } = useApp();
  const [scope, setScope] = useState<"mine" | "all">("mine");
  const [items, setItems] = useState<FeedItem[] | null>(null);

  useEffect(() => {
    if (!state) return;
    setItems(null);
    void api.feed(scope).then((r) => setItems(r.items));
  }, [scope, state]);

  const body = bodies.find((b) => b.code === state?.car.body);

  return (
    <Screen header={<AppHeader title="Что ставят" action={<IconButton icon={ArrowsUpDownIcon} label="Сортировка" />} />}>
      {loading ? (
        <ListSkeleton count={2} kind="card" />
      ) : error ? (
        <EmptyState
          icon={RectangleStackIcon}
          title="Не получилось загрузить"
          hint={error}
          action={
            <Button size="xl" onClick={reload}>
              Попробовать ещё раз
            </Button>
          }
        />
      ) : (
        <>
          <Segmented
            value={scope}
            onChange={setScope}
            options={[
              { value: "mine", label: body ? `Как у меня · ${body.name}` : "Как у меня" },
              { value: "all", label: "Все Гранты" },
            ]}
          />

          <div className="pt-5">
            {items === null ? (
              <ListSkeleton count={2} kind="card" />
            ) : items.length === 0 ? (
              <EmptyState
                icon={RectangleStackIcon}
                title={scope === "mine" ? "На такой кузов ещё ничего не ставили" : "Пока никто ничего не ставил"}
                hint="Поставьте первым и покажите, как встало — это увидят те, кто выбирает то же самое."
                action={
                  scope === "mine" ? (
                    <Button size="xl" variant="secondary" onClick={() => setScope("all")}>
                      Показать все Гранты
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <div className="flex flex-col gap-6">
                {items.map((f, i) => {
                  const target = `install:${f.id}`;
                  const part = parts.find((p) => p.slug === f.part_slug);
                  return (
                    <FadeIn key={f.id} index={i}>
                      <InstallCard
                        partName={partName(f.part_slug)}
                        partSpec={part?.spec}
                        partHref={`/part/${f.part_slug}`}
                        total={f.price + f.work_price}
                        reworked={f.reworked}
                        author={f.first_name ?? f.username ?? "Владелец"}
                        authorMeta={`${carOf(f)} · ${ago(f.created_at)}`}
                        respects={f.respects}
                        respectActive={state?.respects.includes(target)}
                        onRespect={() => toggleRespect(target)}
                        note={f.review_text}
                      />
                    </FadeIn>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </Screen>
  );
}
