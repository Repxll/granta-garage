import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { WrenchScrewdriverIcon, ChatBubbleOvalLeftEllipsisIcon, EyeIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { CommentsHeader, CommentItem, CommentComposer, Grabber } from "./comments";
import { ReactionRow, ReactionStat } from "./reaction-row";

// Тред отзывов — по устройству треда комментариев референса.
const meta = { title: "Components/Тред отзывов", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Thread = () => {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <CommentsHeader count={2} />
      <div className="flex flex-col gap-5">
        <CommentItem author="Artem" text="очень прикольно получилось!!" date="6 сент., 16:01" respects={1} respectActive={on} onRespect={() => setOn(!on)} tone="ok" />
        <CommentItem author="Артём Колодников" text="как я пропустил это…" date="9 сент., 18:37" respects={0} tone="rework" />
      </div>
      <CommentComposer placeholder="Как встало, что докупали, как ведёт себя через сезон…" onSubmit={async () => {}} />
    </div>
  );
};

export const Light: Story = { name: "Светлая тема", render: () => <Thread /> };

export const Dark: Story = {
  name: "Тёмная тема — как в скриншоте",
  render: () => (
    <div className="dark -m-4 rounded-[20px] bg-background p-4 text-text-primary">
      <Grabber />
      <Thread />
    </div>
  ),
};

export const Disabled: Story = {
  name: "Композер заблокирован — деталь не установлена",
  render: () => <CommentComposer disabled placeholder="Поставьте деталь, чтобы оставить отзыв" />,
};

export const Reactions: Story = {
  name: "Ряд реакций под медиа",
  render: () => (
    <ReactionRow>
      <ReactionStat count={29} icon={HeartOutline} label="Респект" onClick={() => {}} />
      <ReactionStat count={351} icon={EyeIcon} label="Просмотры" />
      <ReactionStat count={7} icon={WrenchScrewdriverIcon} label="Ставили" />
      <ReactionStat count={2} icon={ChatBubbleOvalLeftEllipsisIcon} label="Отзывы" />
    </ReactionRow>
  ),
};

export const Empty: Story = {
  name: "Пустой тред",
  render: () => (
    <div className="flex flex-col gap-4">
      <CommentsHeader count={0} />
      <p className="rounded-[14px] bg-surface-muted px-4 py-3 text-base text-text-secondary">Отзывов пока нет. Первый напишет тот, кто поставил и поездил.</p>
      <CommentComposer disabled placeholder="Поставьте деталь, чтобы оставить отзыв" />
    </div>
  ),
};
