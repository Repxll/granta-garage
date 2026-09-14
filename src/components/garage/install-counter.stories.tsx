import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InstallCounter } from "./install-counter";

// Счёт вместо звёзд: «ставили 14 раз, 3 дорабатывали» отвечает на вопрос,
// на который форумный тред даёт шесть взаимоисключающих ответов.
const meta = {
  title: "Components/InstallCounter",
  component: InstallCounter,
  parameters: { layout: "padded" },
} satisfies Meta<typeof InstallCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clean: Story = {
  name: "Все без доработок",
  args: { installed: 14, reworked: 0 },
};

export const WithRework: Story = {
  name: "Часть дорабатывала",
  args: { installed: 9, reworked: 4 },
};

export const SingleRework: Story = {
  name: "Один дорабатывал — склонение",
  args: { installed: 7, reworked: 1 },
};

export const Empty: Story = {
  name: "Пусто — никто не ставил",
  args: { installed: 0, reworked: 0 },
};

export const CompactRow: Story = {
  name: "Компактный — в списке",
  args: { installed: 11, reworked: 3, compact: true },
};

export const BigNumbers: Story = {
  name: "Крайние данные",
  args: { installed: 132, reworked: 21 },
};
