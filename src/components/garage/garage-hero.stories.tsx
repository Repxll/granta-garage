import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WrenchScrewdriverIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon, RectangleStackIcon, ArrowUpTrayIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { GarageHero, StatusCard, QuickTiles, QuickTile, Sheet24 } from "./garage-hero";
import { CarSilhouette } from "./car-silhouette";

// Гараж по мотивам банковского экрана «моя машина»: тёмный hero, карточка событий, белый лист с плитками.
const meta = { title: "Components/Гараж — hero", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = {
  name: "Hero + события + плитки",
  render: () => (
    <div className="mx-auto max-w-[480px] bg-background pb-6">
      <GarageHero title="Lada Granta" chip="Седан · 1.6 16V" chipHref="#" body="2190">
        <StatusCard icons={[WrenchScrewdriverIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon]} text="Событий нет" href="#" />
      </GarageHero>
      <Sheet24>
        <QuickTiles>
          <QuickTile icon={WrenchScrewdriverIcon} label="Каталог" href="#" color="green" />
          <QuickTile icon={RectangleStackIcon} label="Лента" href="#" color="blue" />
          <QuickTile icon={ArrowUpTrayIcon} label="Сборка" href="#" color="teal" />
          <QuickTile icon={PlusIcon} label="Добавить" href="#" color="yellow" badge={1} />
          <QuickTile icon={Squares2X2Icon} label="Все Гранты" href="#" color="gray" />
        </QuickTiles>
      </Sheet24>
    </div>
  ),
};

export const Attention: Story = {
  name: "Событие: ждём отзыв",
  render: () => (
    <div className="bg-[hsl(240_8%_5.1%)] p-4">
      <StatusCard icons={[WrenchScrewdriverIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon]} text="Ждём отзыв по 2 деталям" tone="attention" href="#" />
    </div>
  ),
};

export const Bodies: Story = {
  name: "Силуэты кузовов",
  render: () => (
    <div className="grid grid-cols-2 gap-4 bg-[hsl(240_8%_5.1%)] p-6">
      {(["2190", "2191", "2192", "2194"] as const).map((b) => (
        <div key={b}>
          <CarSilhouette body={b} />
          <div className="pt-1 text-center font-mono text-xs text-white/60">{b}</div>
        </div>
      ))}
    </div>
  ),
};
