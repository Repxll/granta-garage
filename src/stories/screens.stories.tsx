import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Layers, Wrench } from "lucide-react";
import { FeedCard } from "@/components/garage/feed-card";
import { PartCard } from "@/components/garage/part-card";
import { ListSkeleton } from "@/components/garage/skeletons";
import { EmptyState } from "@/components/garage/empty-state";
import { Segmented } from "@/components/garage/segmented";
import { MoneyStat } from "@/components/garage/money";
import { parts, feed } from "@/lib/data";

// Состояния экранов — standalone-композиции из библиотеки: данные через пропсы,
// без роутера и стора, чтобы стори не падали.
const meta = { title: "Screens/Состояния экранов", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const wheels = parts.find((p) => p.slug === "wheels-r16-195-50")!;
const adapters = parts.find((p) => p.slug === "wheels-4x100-adapters")!;
const spider = parts.find((p) => p.slug === "exhaust-4-2-1")!;

export const FeedWithData: Story = {
  name: "Лента · есть данные",
  render: () => (
    <div className="flex flex-col gap-4">
      <Segmented
        value="mine"
        onChange={() => {}}
        options={[
          { value: "mine", label: "Как у меня · Седан" },
          { value: "all", label: "Все Гранты" },
        ]}
      />
      <div className="flex flex-col gap-2">
        {feed.slice(0, 3).map((f) => (
          <FeedCard
            key={f.id}
            author={f.author}
            car={f.car}
            when={f.when}
            partName={f.partName}
            partHref="#"
            reworked={f.fitment === "reworked"}
            extra={f.extra}
            total={f.total}
            respects={f.respects}
          />
        ))}
      </div>
    </div>
  ),
};

export const FeedLoading: Story = {
  name: "Лента · загрузка",
  render: () => <ListSkeleton count={3} kind="feed" />,
};

export const FeedEmpty: Story = {
  name: "Лента · пусто",
  render: () => (
    <EmptyState
      icon={Layers}
      title="На такой кузов ещё ничего не ставили"
      hint="Посмотрите все Гранты — или поставьте первым и покажите, как встало."
      action={
        <button type="button" className="min-h-[44px] rounded-md border border-border px-4 text-xs">
          Показать все Гранты
        </button>
      }
    />
  ),
};

export const CatalogWithData: Story = {
  name: "Каталог · три вердикта рядом",
  render: () => (
    <div className="flex flex-col gap-2">
      <PartCard part={wheels} fitment="fits" />
      <PartCard part={adapters} fitment="unknown" />
      <PartCard part={spider} fitment="no" />
    </div>
  ),
};

export const CatalogLoading: Story = {
  name: "Каталог · загрузка",
  render: () => <ListSkeleton count={3} kind="part" />,
};

export const GarageEmpty: Story = {
  name: "Гараж · пусто (первый день)",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <MoneyStat label="Вложено" value={0} accent />
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Респектов получено</div>
          <div className="pt-0.5 font-mono text-xl font-semibold tabular-nums">0</div>
        </div>
      </div>
      <EmptyState
        icon={Wrench}
        title="В гараже пока пусто"
        hint="Добавьте то, что уже стоит на машине — сумма посчитается сама, а другие владельцы увидят, как оно встало."
      />
    </div>
  ),
};

export const GarageFilled: Story = {
  name: "Гараж · заполнен",
  render: () => (
    <div className="grid grid-cols-2 gap-2">
      <MoneyStat label="Вложено" value={96400} accent hint="7 доработок" />
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="text-xs text-muted-foreground">Респектов получено</div>
        <div className="pt-0.5 font-mono text-xl font-semibold tabular-nums">31</div>
      </div>
    </div>
  ),
};

export const NarrowScreen: Story = {
  name: "Узкий экран 320px",
  render: () => (
    <div className="w-[320px] border border-dashed border-border p-2">
      <PartCard part={wheels} fitment="fits" />
      <div className="pt-2">
        <FeedCard
          author="Владелец с длинным именем профиля"
          car="Универсал и Cross, 1.6 16V Drive Active / Sport"
          when="две недели назад"
          partName="Передний бампер, неоригинал, под окрас, с креплениями"
          partHref="#"
          reworked
          extra="Короче на 5–7 мм, пять часов подгонки напильником"
          total={9800}
          respects={22}
        />
      </div>
    </div>
  ),
};
