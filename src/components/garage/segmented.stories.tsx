import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Segmented } from "./segmented";

// Один сегмент-контрол на весь продукт: фильтр ленты и выбор «как встало» — это он же.
const meta = {
  title: "Components/Segmented",
  component: Segmented,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Segmented<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedScope: Story = {
  name: "Фильтр ленты",
  args: {
    value: "mine",
    options: [
      { value: "mine", label: "Как у меня · Седан" },
      { value: "all", label: "Все Гранты" },
    ],
    onChange: () => {},
  },
  render: (args) => {
    const [v, setV] = useState("mine");
    return <Segmented {...args} value={v} onChange={setV} />;
  },
};

export const HowItFits: Story = {
  name: "Как встало — в форме",
  args: {
    value: "clean",
    options: [
      { value: "clean", label: "Без доработок" },
      { value: "reworked", label: "Дорабатывал" },
    ],
    onChange: () => {},
  },
  render: (args) => {
    const [v, setV] = useState("clean");
    return <Segmented {...args} value={v} onChange={setV} />;
  },
};

export const LongLabels: Story = {
  name: "Крайние данные — длинные подписи",
  args: {
    value: "a",
    options: [
      { value: "a", label: "Универсал и Cross" },
      { value: "b", label: "Все Гранты без исключения" },
    ],
    onChange: () => {},
  },
  render: (args) => {
    const [v, setV] = useState("a");
    return <Segmented {...args} value={v} onChange={setV} />;
  },
};
