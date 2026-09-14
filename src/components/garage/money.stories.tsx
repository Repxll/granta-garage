import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MoneyStat, Money } from "./money";

// Цифры моноширинным: цены, вылеты и артикулы читаются столбиком и не «прыгают»
// при обновлении суммы.
const meta = {
  title: "Components/MoneyStat",
  component: MoneyStat,
  parameters: { layout: "padded" },
} satisfies Meta<typeof MoneyStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  name: "Вложено — акцентный",
  args: { label: "Вложено", value: 96400, accent: true, hint: "7 доработок" },
};

export const Plain: Story = {
  name: "Обычный",
  args: { label: "Респектов получено", value: 31 },
};

export const Zero: Story = {
  name: "Ноль — первый день",
  args: { label: "Вложено", value: 0, accent: true, hint: "0 доработок" },
};

export const Big: Story = {
  name: "Крайние данные — длинное число",
  args: { label: "Вложено", value: 1284500, accent: true },
};

export const Inline: Story = {
  name: "Инлайн в тексте",
  args: { label: "", value: 0 },
  render: () => (
    <p className="text-sm">
      Деталь <Money value={5200} /> + работа <Money value={3000} /> — итого{" "}
      <Money value={8200} className="font-semibold" />
    </p>
  ),
};
