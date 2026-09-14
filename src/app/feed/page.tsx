"use client";

import { useState } from "react";
import { feed, builds, bodies } from "@/lib/data";
import { useApp } from "@/lib/state";
import { carLabel } from "@/lib/car";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { EmptyState } from "@/components/garage/empty-state";
import { Layers } from "lucide-react";
import { Segmented } from "@/components/garage/segmented";
import { FeedCard } from "@/components/garage/feed-card";
import { RespectButton } from "@/components/garage/respect-button";
import { Money } from "@/components/garage/money";
import { plural } from "@/lib/format";

// Экран 3: лента. Не лента подписок — фильтр по кузову, поэтому холодного старта нет:
// даже на полусотне пользователей человек видит машины, похожие на свою.
export default function FeedPage() {
  const { state, toggleRespect } = useApp();
  const [scope, setScope] = useState<"mine" | "all">("mine");
  const body = bodies.find((b) => b.code === state.body);

  const mine = scope === "mine" && state.body;
  const items = mine ? feed.filter((f) => f.bodyCode === state.body) : feed;
  const list = mine ? builds.filter((b) => b.bodyCode === state.body) : builds;

  return (
    <Screen
      title="Что ставят"
      subtitle="Установки и сборки других владельцев — с ценами и без пересказов."
      car={carLabel(state.body, state.modification)}
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

        {items.length === 0 ? (
          <EmptyState
            className="mt-2"
            icon={Layers}
            title="На такой кузов ещё ничего не ставили"
            hint="Посмотрите все Гранты — или поставьте первым и покажите, как встало."
            action={
              <button
                type="button"
                onClick={() => setScope("all")}
                className="min-h-[44px] rounded-md border border-border px-4 text-xs"
              >
                Показать все Гранты
              </button>
            }
          />
        ) : (
          <Stagger className="flex flex-col gap-2 pt-2">
            {items.map((f) => (
              <StaggerItem key={f.id}>
                <FeedCard
                  author={f.author}
                  car={f.car}
                  when={f.when}
                  partName={f.partName}
                  partHref={`/part/${f.partSlug}`}
                  reworked={f.fitment === "reworked"}
                  extra={f.extra}
                  total={f.total}
                  respects={f.respects}
                  active={state.respects.includes(`feed:${f.id}`)}
                  onRespect={() => toggleRespect(`feed:${f.id}`)}
                />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      <section className="pt-6">
        <h2 className="text-sm font-semibold">Сборки целиком</h2>
        {list.length === 0 && (
          <p className="pt-2 text-sm text-muted-foreground">
            Собранных машин на этом кузове пока нет — ваша может стать первой.
          </p>
        )}
        <Stagger className="flex flex-col gap-2 pt-2">
          {list.map((b) => (
            <StaggerItem key={b.id}>
              <article className="rounded-lg border border-border bg-card p-3">
                <div className="text-sm font-semibold">{b.author}</div>
                <div className="text-xs text-muted-foreground">{b.car}</div>
                <p className="pt-2 text-sm text-muted-foreground">{b.highlights.join(" · ")}</p>
                <p className="pt-1.5 text-sm">
                  <Money value={b.total} className="font-semibold" />
                  <span className="text-muted-foreground">
                    {" "}
                    · {b.count} {plural(b.count, "доработка", "доработки", "доработок")}
                  </span>
                </p>
                <div className="pt-3">
                  <RespectButton
                    count={b.respects}
                    active={state.respects.includes(`build:${b.id}`)}
                    onToggle={() => toggleRespect(`build:${b.id}`)}
                  />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </Screen>
  );
}
