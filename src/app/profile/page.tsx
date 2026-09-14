"use client";

import Link from "next/link";
import { Cog6ToothIcon, Squares2X2Icon, WrenchScrewdriverIcon, BoltIcon, TruckIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useApp } from "@/lib/state";
import { bodies, modifications, parts } from "@/lib/data";
import { partName } from "@/lib/parts";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { Avatar } from "@/components/garage/avatar";
import { Chip } from "@/components/garage/chip";
import { VoteControl } from "@/components/garage/vote-control";
import { ListHeader } from "@/components/garage/list-header";
import { IconButton } from "@/components/garage/icon-button";
import { InstallCard } from "@/components/garage/install-card";
import { EmptyState } from "@/components/garage/empty-state";
import { ListSkeleton } from "@/components/garage/skeletons";
import { buttonVariants } from "@/components/ui/button";
import { plural } from "@/lib/format";

// Экран 7: профиль — структура профиля референса: аватар 80, @handle, подпись,
// чипы, большой счётчик, заголовок списка и карточки работ.
export default function ProfilePage() {
  const { state, loading, error, reload } = useApp();

  const body = bodies.find((b) => b.code === state?.car.body);
  const mod = modifications.find((m) => m.id === state?.car.modification);
  const garage = state?.garage ?? [];
  const total = garage.reduce((s, i) => s + i.price + i.work_price, 0);
  const pending = garage.filter((i) => !i.review_text).length;
  const handle = state ? `@${state.user.name.replace(/\s+/g, "").toLowerCase()}` : "";

  return (
    <Screen header={<AppHeader title="Моя Гранта" action={<IconButton icon={Cog6ToothIcon} label="Сменить машину" href="/" />} />}>
      {loading ? (
        <div className="flex flex-col items-center gap-3 pt-6">
          <span className="shimmer size-20 rounded-full" />
          <span className="shimmer h-6 w-32 rounded-[76px]" />
          <span className="shimmer h-4 w-44 rounded-[76px]" />
          <div className="w-full pt-6">
            <ListSkeleton count={1} kind="card" />
          </div>
        </div>
      ) : error ? (
        <EmptyState icon={WrenchScrewdriverIcon} title="Не получилось загрузить" hint={error} action={<button type="button" onClick={reload} className={buttonVariants({ size: "xl" })}>Ещё раз</button>} />
      ) : !state?.car.modification ? (
        <EmptyState
          icon={TruckIcon}
          title="Сначала выберите машину"
          hint="Профиль и гараж привязаны к модификации."
          action={
            <Link href="/" className={buttonVariants({ size: "xl" })}>
              Выбрать Гранту
            </Link>
          }
        />
      ) : (
        <>
          <FadeIn>
            <div className="flex flex-col items-center pt-4 text-center">
              <Avatar name={state.user.name} size={80} />
              <h2 className="pt-4 text-lg font-semibold text-text-primary">{handle}</h2>
              <p className="pt-1 text-base text-text-secondary">{state.user.name}</p>
              <p className="pt-0.5 text-base text-text-secondary">
                {body?.name}, {mod?.name}
              </p>

              <div className="flex flex-wrap justify-center gap-2 pt-4">
                <Chip icon={TruckIcon}>{body?.name} · {body?.code}</Chip>
                <Chip icon={BoltIcon}>{mod?.engine.split(" / ")[0]} · {mod?.power}</Chip>
                <Chip icon={AdjustmentsHorizontalIcon}>{mod?.gearbox}</Chip>
              </div>

              <div className="flex items-start justify-center gap-6 pt-7">
                <VoteControl value={state.respectsReceived} label="Респект" />
                <VoteControl value={total} label="Вложено" chevrons={false} suffix="₽" />
              </div>
            </div>
          </FadeIn>

          <FadeIn index={1} className="pt-6">
            <ListHeader
              title={`Все установки · ${garage.length}`}
              action={<IconButton icon={Squares2X2Icon} label="Вид" size="sm" muted />}
            />

            {garage.length === 0 ? (
              <EmptyState
                icon={WrenchScrewdriverIcon}
                title="В гараже пока пусто"
                hint="Добавьте то, что уже стоит на машине — сумма посчитается сама, а другие владельцы увидят, как оно встало."
                action={
                  <Link href="/catalog" className={buttonVariants({ size: "xl" })}>
                    Открыть каталог
                  </Link>
                }
              />
            ) : (
              <div className="flex flex-col gap-6">
                {garage.map((i, idx) => {
                  const part = parts.find((p) => p.slug === i.part_slug);
                  return (
                    <FadeIn key={i.part_slug} index={idx}>
                      <InstallCard
                        partName={partName(i.part_slug)}
                        partSpec={part?.spec}
                        partHref={`/part/${i.part_slug}`}
                        total={i.price + i.work_price}
                        reworked={i.reworked}
                        author={state.user.name}
                        authorMeta={i.review_text ? "Отзыв написан" : "Отзыва пока нет"}
                        respects={0}
                        respectLocked
                        note={i.review_text}
                      />
                    </FadeIn>
                  );
                })}
              </div>
            )}
          </FadeIn>

          {garage.length > 0 && (
            <FadeIn index={2} className="pt-6">
              <Link href="/build" className={buttonVariants({ size: "xl", variant: "secondary", className: "w-full" })}>
                Показать сборку целиком
              </Link>
              {pending > 0 && (
                <p className="px-1 pt-3 text-center text-xs leading-relaxed text-text-secondary">
                  По {pending} {plural(pending, "детали", "деталям", "деталям")} через две недели придёт вопрос
                  «ну как, встало нормально?» — ответ станет отзывом.
                </p>
              )}
            </FadeIn>
          )}
        </>
      )}
    </Screen>
  );
}
