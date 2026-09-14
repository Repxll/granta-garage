"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useApp } from "@/lib/state";
import { bodies, modifications, parts } from "@/lib/data";
import { partName } from "@/lib/parts";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { VoteControl } from "@/components/garage/vote-control";
import { InstallCard } from "@/components/garage/install-card";
import { IconButton } from "@/components/garage/icon-button";
import { ListSkeleton } from "@/components/garage/skeletons";
import { Button } from "@/components/ui/button";
import { plural } from "@/lib/format";

// Экран 8: публичная сборка — так её видят другие. Респект себе заблокирован и на сервере.
export default function BuildPage() {
  const { state, loading } = useApp();
  const garage = state?.garage ?? [];
  const total = garage.reduce((s, i) => s + i.price + i.work_price, 0);
  const body = bodies.find((b) => b.code === state?.car.body);
  const mod = modifications.find((m) => m.id === state?.car.modification);

  return (
    <Screen
      header={<AppHeader title="Сборка" back="/profile" action={<IconButton icon={ArrowUpTrayIcon} label="Поделиться" />} />}
    >
      {loading ? (
        <ListSkeleton count={2} kind="card" />
      ) : (
        <>
          <FadeIn>
            <div className="flex flex-col items-center pt-2 text-center">
              <p className="text-sm text-text-secondary">Так вашу сборку видят другие владельцы Гранты</p>
              <p className="pt-1 text-base font-semibold text-text-primary">
                {body?.name}, {mod?.name}
              </p>
              <div className="pt-5">
                <VoteControl
                  value={total}
                  label={`${garage.length} ${plural(garage.length, "доработка", "доработки", "доработок")}`}
                  chevrons={false}
                  suffix="₽"
                />
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6 pt-6">
            {garage.length === 0 ? (
              <p className="text-center text-sm text-text-secondary">В сборке пока ничего нет.</p>
            ) : (
              garage.map((i, idx) => {
                const part = parts.find((p) => p.slug === i.part_slug);
                return (
                  <FadeIn key={i.part_slug} index={idx + 1}>
                    <InstallCard
                      partName={partName(i.part_slug)}
                      partSpec={part?.spec}
                      partHref={`/part/${i.part_slug}`}
                      total={i.price + i.work_price}
                      reworked={i.reworked}
                      author={state?.user.name ?? "Владелец"}
                      authorMeta={`${body?.name}, ${mod?.name}`}
                      respects={0}
                      respectLocked
                      note={i.review_text}
                    />
                  </FadeIn>
                );
              })
            )}
          </div>

          <div className="pt-6">
            <Button size="xl" className="w-full">
              Отправить в чат клуба
            </Button>
            <p className="px-1 pt-3 text-center text-xs text-text-secondary">
              Ссылка открывается внутри Telegram. Веб-страницу сборки включим вместе с публичным слоем.
            </p>
          </div>
        </>
      )}
    </Screen>
  );
}
