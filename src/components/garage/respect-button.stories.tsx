import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { RespectButton } from "./respect-button";

// Респект — единственный социальный жест продукта. Без текста: комментарии тянут
// модерацию, на которую на старте нет ресурса.
const meta = {
  title: "Components/RespectButton",
  component: RespectButton,
  parameters: { layout: "padded" },
} satisfies Meta<typeof RespectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  name: "Не поставлен",
  args: { count: 18 },
};

export const Active: Story = {
  name: "Поставлен",
  args: { count: 18, active: true },
};

export const Locked: Story = {
  name: "Своя сборка — нельзя",
  args: { count: 0, locked: true },
};

export const Zero: Story = {
  name: "Ноль респектов",
  args: { count: 0 },
};

export const Interactive: Story = {
  name: "Живое переключение",
  args: { count: 31 },
  render: (args) => {
    const [on, setOn] = useState(false);
    return <RespectButton {...args} active={on} onToggle={() => setOn(!on)} />;
  },
};
