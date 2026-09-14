import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FitBadge } from "./fit-badge";

// Вердикт о посадке — самый нагруженный смыслом элемент продукта.
const meta = {
  title: "Components/FitBadge",
  component: FitBadge,
  parameters: { layout: "padded" },
} satisfies Meta<typeof FitBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fits: Story = {
  name: "Подходит",
  args: { fitment: "fits" },
};

export const DoesNotFit: Story = {
  name: "Не подходит",
  args: { fitment: "no" },
};

export const Unknown: Story = {
  name: "Не подтверждено",
  args: { fitment: "unknown" },
};

export const AllThree: Story = {
  name: "Все три состояния",
  args: { fitment: "fits" },
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <FitBadge fitment="fits" />
      <FitBadge fitment="no" />
      <FitBadge fitment="unknown" />
      <p className="pt-2 text-xs text-muted-foreground">
        Третье состояние равноправно и не маскируется под «подходит»: у Autodoc и Exist подборщик
        молча ошибается, и пользователь узнаёт об этом при установке.
      </p>
    </div>
  ),
};

export const SmallSize: Story = {
  name: "Мелкий размер — в списке",
  args: { fitment: "unknown", size: "sm" },
};
