import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { FeedCard } from "./feed-card";

// Единица ленты — установка, а не пост: из неё извлекаются деталь, цена и вердикт.
const meta = {
  title: "Components/FeedCard",
  component: FeedCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof FeedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const base = {
  author: "om777",
  car: "Седан, 1.6 16V",
  when: "вчера",
  partName: "Литые диски R16 4×98 ET38 + резина 195/50",
  partHref: "#",
  total: 30200,
  respects: 31,
};

export const Clean: Story = {
  name: "Встало без доработок",
  args: { ...base, reworked: false, extra: "Ничего не докупал" },
};

export const Reworked: Story = {
  name: "Дорабатывал",
  args: {
    ...base,
    author: "nikei007",
    partName: "Тормозные диски R14 вентилируемые",
    reworked: true,
    extra: "Скобу суппорта R14 докупал отдельно",
    total: 8200,
    respects: 18,
  },
};

export const LongText: Story = {
  name: "Крайние данные — длинный текст",
  args: {
    ...base,
    author: "Владелец с очень длинным именем профиля",
    partName: "Передний бампер, неоригинал, под окрас, с креплениями и клипсами",
    reworked: true,
    extra:
      "Короче на 5–7 мм, у фары щель 5–8 мм, пять часов подгонки напильником и шуруповёртом вместо получаса",
    total: 9800,
    respects: 22,
  },
};

export const Interactive: Story = {
  name: "Живой респект",
  args: { ...base, reworked: false, extra: "Ничего не докупал" },
  render: (args) => {
    const [on, setOn] = useState(false);
    return <FeedCard {...args} active={on} onRespect={() => setOn(!on)} />;
  },
};
