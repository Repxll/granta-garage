import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PartCard } from "./part-card";
import { parts } from "@/lib/data";

const wheels = parts.find((p) => p.slug === "wheels-r16-195-50")!;
const adapters = parts.find((p) => p.slug === "wheels-4x100-adapters")!;
const spider = parts.find((p) => p.slug === "exhaust-4-2-1")!;

const meta = {
  title: "Components/PartCard",
  component: PartCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof PartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fits: Story = {
  name: "Подходит — со счётом",
  args: { part: wheels, fitment: "fits" },
};

export const Unknown: Story = {
  name: "Совместимость не подтверждена",
  args: { part: adapters, fitment: "unknown" },
};

export const DoesNotFit: Story = {
  name: "Не подходит — приглушена",
  args: { part: spider, fitment: "no" },
};

export const InList: Story = {
  name: "В списке каталога",
  args: { part: wheels, fitment: "fits" },
  render: () => (
    <div className="flex flex-col gap-2">
      <PartCard part={wheels} fitment="fits" />
      <PartCard part={adapters} fitment="unknown" />
      <PartCard part={spider} fitment="no" />
    </div>
  ),
};
