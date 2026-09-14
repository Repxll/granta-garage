"use client";

import Link from "next/link";
import {
  Squares2X2Icon,
  WrenchScrewdriverIcon,
  RectangleStackIcon,
  ArrowUpTrayIcon,
  PlusIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { useApp } from "@/lib/state";
import { bodies, modifications, parts } from "@/lib/data";
import { partName } from "@/lib/parts";
import { Screen, FadeIn } from "@/components/garage/screen";
import { GarageHero, StatusCard, QuickTiles, QuickTile, Sheet24 } from "@/components/garage/garage-hero";
import { VoteControl } from "@/components/garage/vote-control";
import { ListHeader } from "@/components/garage/list-header";
import { IconButton } from "@/components/garage/icon-button";
import { InstallCard } from "@/components/garage/install-card";
import { EmptyState } from "@/components/garage/empty-state";
import { ListSkeleton, Bone } from "@/components/garage/skeletons";
import { buttonVariants } from "@/components/ui/button";
import { plural } from "@/lib/format";

// Экран 7: гараж. Устроен как банковский экран «моя машина»: тёмный hero с именем машины,
// чипом модификации и силуэтом, карточка событий, белый лист с плитками и содержимым.
export default function ProfilePage() {
  const { state, loading, error, reload } = useApp();

  const body = bodies.find((b) => b.code === state?.car.body);
  const mod = modifications.find((m) => m.id === state?.car.modification);
  const garage = state?.garage ?? [];
  const total = garage.reduce((s, i) => s + i.price + i.work_price, 0);
  const pending = garage.filter((i) => !i.review_text).length;

  if (loading) {
    return (
      <Screen padded={false}>
        <div className="bg-[hsl(240_8%_5.1%)] px-4 pt-6 pb-10">
          <Bone className="mx-auto h-9 w-56 rounded-[76px] opacity-20" />
          <Bone className="mx-auto mt-3 h-8 w-40 rounded-[76px] opacity-20" />
          <Bone className="mx-auto mt-8 h-32 w-full max-w-[380px] opacity-10" />
        </div>
        <div className="px-4 pt-4">
          <ListSkeleton count={1} kind="card" />
        </div>
      </Screen>
    );
  }

  if (error || !state?.car.modification) {
    return (
      <Screen>
        <EmptyState
          icon={TruckIcon}
          title={error ? "Не получилось загрузить" : "Сначала выберите машину"}
          hint={error ?? "Гараж привязан к модификации — без неё нечего показывать."}
          action={
            error ? (
              <button type="button" onClick={reload} className={buttonVariants({ size: "xl" })}>
                Ещё раз
              </button>
            ) : (
              <Link href="/" className={buttonVariants({ size: "xl" })}>
                Выбрать Гранту
              </Link>
            )
          }
        />
      </Screen>
    );
  }

  const events =
    pending > 0
      ? { text: `Ждём отзыв по ${pending} ${plural(pending, "детали", "деталям", "деталям")}`, tone: "attention" as const }
      : state.respectsReceived > 0
        ? { text: `${state.respectsReceived} ${plural(state.respectsReceived, "респект", "респекта", "респектов")} получено`, tone: "idle" as const }
        : { text: "Событий нет", tone: "idle" as const };

  return (
    <Screen padded={false}>
      <GarageHero
        title="Lada Granta"
        chip={`${body?.name} · ${mod?.name}`}
        chipHref="/"
        body={state.car.body ?? "2190"}
      >
        <StatusCard icons={[WrenchScrewdriverIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon]} text={events.text} tone={events.tone} href="#installs" />
      </GarageHero>

      <Sheet24>
        <FadeIn>
          <QuickTiles>
            <QuickTile icon={WrenchScrewdriverIcon} label="Каталог" href="/catalog" color="green" />
            <QuickTile icon={RectangleStackIcon} label="Лента" href="/feed" color="blue" />
            <QuickTile icon={ArrowUpTrayIcon} label="Сборка" href="/build" color="teal" />
            <QuickTile icon={PlusIcon} label="Добавить" href="/catalog" color="yellow" badge={pending > 0 ? pending : undefined} />
            <QuickTile icon={Squares2X2Icon} label="Все Гранты" href="/feed" color="gray" />
          </QuickTiles>
        </FadeIn>

        <FadeIn index={1} className="pt-5">
          <div className="flex items-start justify-center gap-6 rounded-[20px] bg-card px-4 py-5">
            <VoteControl value={state.respectsReceived} label="Респект" />
            <VoteControl value={total} label="Вложено" chevrons={false} suffix="₽" />
          </div>
        </FadeIn>

        <FadeIn index={2} className="pt-3" >
          <div id="installs">
            <ListHeader
              title={`Все установки · ${garage.length}`}
              action={<IconButton icon={Squares2X2Icon} label="Вид" size="sm" muted />}
            />
          </div>

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
          <FadeIn index={3} className="pt-6">
            <div className="rounded-[20px] bg-card p-4">
              <div className="text-xl font-bold leading-tight text-text-primary">Через две недели спросим, как оно</div>
              <p className="pt-1.5 text-base leading-relaxed text-text-secondary">
                Придёт одно сообщение — «ну как, встало нормально?». Ответ станет отзывом для тех, кто выбирает то же самое.
              </p>
            </div>
          </FadeIn>
        )}
      </Sheet24>
    </Screen>
  );
}
