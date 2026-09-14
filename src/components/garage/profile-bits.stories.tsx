import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TruckIcon, BoltIcon, AdjustmentsHorizontalIcon, ArrowLeftIcon, ArrowsUpDownIcon, EllipsisHorizontalIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { Chip } from "./chip";
import { VoteControl } from "./vote-control";
import { Avatar } from "./avatar";
import { AuthorRow } from "./author-row";
import { IconButton } from "./icon-button";
import { ListHeader } from "./list-header";
import { AppHeader } from "./screen";
import { EmptyState } from "./empty-state";
import { InstallCardSkeleton, RowSkeleton } from "./skeletons";

const meta = { title: "Components/Профиль и шапка", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileHead: Story = {
  name: "Голова профиля",
  render: () => (
    <div className="flex flex-col items-center text-center">
      <Avatar name="Илья Иванов" size={80} />
      <h2 className="pt-4 text-lg font-semibold">@ilyaivanov</h2>
      <p className="pt-1 text-base text-text-secondary">Илья Иванов</p>
      <p className="pt-0.5 text-base text-text-secondary">Седан, 1.6 16V</p>
      <div className="flex flex-wrap justify-center gap-2 pt-4">
        <Chip icon={TruckIcon}>Седан · 2190</Chip>
        <Chip icon={BoltIcon}>21127 · 106 л.с.</Chip>
        <Chip icon={AdjustmentsHorizontalIcon}>МКПП, АКПП</Chip>
      </div>
      <div className="flex gap-6 pt-7">
        <VoteControl value={318} label="Респект" />
        <VoteControl value={96400} label="Вложено" chevrons={false} suffix="₽" />
      </div>
    </div>
  ),
};

export const Header: Story = {
  name: "Шапка экрана",
  render: () => (
    <div className="-mx-4 flex flex-col gap-4">
      <AppHeader title="Yerlan Sandybayev" back="#" action={<IconButton icon={ArrowsUpDownIcon} label="Сортировка" />} />
      <AppHeader title="Что ставят" action={<IconButton icon={EllipsisHorizontalIcon} label="Ещё" muted />} />
      <AppHeader title="Очень длинное название детали, которое не влезает в шапку целиком" back="#" />
    </div>
  ),
};

export const Rows: Story = {
  name: "Строка автора и заголовок списка",
  render: () => (
    <div className="flex flex-col gap-3">
      <ListHeader title="Все работы" action={<IconButton icon={Squares2X2Icon} label="Вид" size="sm" muted />} />
      <AuthorRow name="Yerlan Sandybayev" meta="14 сент." href="#" />
      <AuthorRow name="Владелец с очень длинным именем" meta="Универсал и Cross, 1.6 16V Drive Active · 2 нед." />
      <div className="flex gap-2">
        <IconButton icon={ArrowLeftIcon} label="Назад" />
        <IconButton icon={EllipsisHorizontalIcon} label="Ещё" size="sm" muted />
      </div>
    </div>
  ),
};

export const States: Story = {
  name: "Пусто и загрузка",
  render: () => (
    <div className="flex flex-col gap-4">
      <EmptyState icon={TruckIcon} title="В гараже пока пусто" hint="Добавьте то, что уже стоит на машине — сумма посчитается сама." />
      <InstallCardSkeleton />
      <RowSkeleton />
    </div>
  ),
};
