import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RectangleStackIcon } from "@heroicons/react/24/solid";
import { InstallCard } from "@/components/garage/install-card";
import { PartRow } from "@/components/garage/part-row";
import { ListSkeleton } from "@/components/garage/skeletons";
import { EmptyState } from "@/components/garage/empty-state";
import { Segmented } from "@/components/garage/segmented";
import { ListHeader } from "@/components/garage/list-header";
import { parts, feed } from "@/lib/data";

// Состояния экранов — standalone-композиции из библиотеки, без роутера и стора.
const meta = { title: "Screens/Состояния экранов", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const wheels = parts.find((p) => p.slug === "wheels-r16-195-50")!;
const adapters = parts.find((p) => p.slug === "wheels-4x100-adapters")!;
const spider = parts.find((p) => p.slug === "exhaust-4-2-1")!;

export const FeedWithData: Story = {
  name: "Лента · есть данные",
  render: () => (
    <div className="flex flex-col gap-5">
      <Segmented value="mine" onChange={() => {}} options={[{ value: "mine", label: "Как у меня · Седан" }, { value: "all", label: "Все Гранты" }]} />
      <div className="flex flex-col gap-6">
        {feed.slice(0, 2).map((f) => (
          <InstallCard key={f.id} partName={f.partName} partHref="#" total={f.total} reworked={f.fitment === "reworked"} author={f.author} authorMeta={`${f.car} · ${f.when}`} respects={f.respects} note={f.extra} />
        ))}
      </div>
    </div>
  ),
};
export const FeedLoading: Story = { name: "Лента · загрузка", render: () => <ListSkeleton count={2} kind="card" /> };
export const FeedEmpty: Story = {
  name: "Лента · пусто",
  render: () => <EmptyState icon={RectangleStackIcon} title="На такой кузов ещё ничего не ставили" hint="Поставьте первым и покажите, как встало." />,
};
export const CatalogRows: Story = {
  name: "Каталог · три вердикта",
  render: () => (
    <div>
      <ListHeader title="Диски и вылет" action={<span className="font-mono text-[11px] text-text-secondary">4×98 · ЦО 58.6</span>} />
      <div className="flex flex-col gap-2">
        <PartRow part={wheels} fitment="fits" installed={14} reworked={0} />
        <PartRow part={adapters} fitment="unknown" installed={0} reworked={0} />
        <PartRow part={spider} fitment="no" installed={6} reworked={2} />
      </div>
    </div>
  ),
};
export const CatalogLoading: Story = { name: "Каталог · загрузка", render: () => <ListSkeleton count={3} kind="row" /> };
export const Narrow: Story = {
  name: "Узкий экран 320",
  render: () => (
    <div className="w-[320px]">
      <InstallCard partName="Передний бампер, неоригинал, под окрас" partHref="#" total={9800} reworked author="Владелец с длинным именем" authorMeta="Универсал и Cross, 1.6 16V Drive Active · 2 нед." respects={22} note="Короче на 5–7 мм, пять часов подгонки напильником" />
    </div>
  ),
};
