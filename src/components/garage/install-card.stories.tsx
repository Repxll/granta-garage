import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { InstallCard } from "./install-card";

const meta = { title: "Components/InstallCard", component: InstallCard, parameters: { layout: "padded" } } satisfies Meta<typeof InstallCard>;
export default meta;
type Story = StoryObj<typeof meta>;

const base = {
  partName: "Литые диски R16 4×98 ET38 + резина 195/50",
  partSpec: "6.5J × 16, ЦО 58.6, вылет 38",
  partHref: "#",
  total: 30200,
  reworked: false,
  author: "om777",
  authorMeta: "Седан, 1.6 16V · вчера",
  respects: 31,
  note: "Ничего не докупал",
};

export const Clean: Story = { name: "Встало без доработок", args: base };
export const Reworked: Story = {
  name: "Дорабатывал",
  args: { ...base, partName: "Тормозные диски R14 вентилируемые", partSpec: "Взамен штатных 13″", reworked: true, total: 8200, respects: 18, note: "Скобу суппорта R14 докупал отдельно" },
};
export const Own: Story = { name: "Своя — респект заблокирован", args: { ...base, respects: 0, respectLocked: true, author: "Илья", authorMeta: "Отзыва пока нет" } };
export const LongText: Story = {
  name: "Крайние данные",
  args: { ...base, partName: "Передний бампер, неоригинал, под окрас, с креплениями и клипсами", author: "Владелец с очень длинным именем профиля", authorMeta: "Универсал и Cross, 1.6 16V Drive Active / Sport · 2 нед.", note: "Короче на 5–7 мм, у фары щель 5–8 мм, пять часов подгонки напильником и шуруповёртом", total: 1284500 },
};
export const Interactive: Story = {
  name: "Живой респект",
  args: base,
  render: (args) => {
    const [on, setOn] = useState(false);
    return <InstallCard {...args} respectActive={on} onRespect={() => setOn(!on)} />;
  },
};
