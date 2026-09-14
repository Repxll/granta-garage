import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { HeartIcon as HeartSolid, WrenchScrewdriverIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { CountPill } from "./count-pill";

const meta = { title: "Components/CountPill", component: CountPill, parameters: { layout: "padded" } } satisfies Meta<typeof CountPill>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { name: "Нейтральный — сколько ставили", args: { icon: WrenchScrewdriverIcon, count: 7, label: "Ставили", locked: true } };
export const RespectIdle: Story = { name: "Респект — не поставлен", args: { icon: HeartOutline, count: 18, label: "Респект", tone: "respect" } };
export const RespectActive: Story = { name: "Респект — поставлен", args: { icon: HeartSolid, count: 19, label: "Респект", tone: "respect", active: true } };
export const Zero: Story = { name: "Ноль", args: { icon: ChatBubbleOvalLeftEllipsisIcon, count: 0, label: "Отзывы" } };
export const Interactive: Story = {
  name: "Живое переключение",
  args: { icon: HeartOutline, count: 31, label: "Респект", tone: "respect" },
  render: (args) => {
    const [on, setOn] = useState(false);
    return <CountPill {...args} icon={on ? HeartSolid : HeartOutline} count={31 + (on ? 1 : 0)} active={on} onClick={() => setOn(!on)} />;
  },
};
