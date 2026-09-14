import type { Preview } from "@storybook/nextjs-vite";
import { MotionConfig } from "motion/react";
import React from "react";
import "../src/app/globals.css";

// Витрина живёт в той же теме, что и продукт: «тёмный гаражный» — фирменный стиль,
// а не системная тема пользователя.
const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <MotionConfig reducedMotion="user">
        <div className="dark">
          <div className="bg-background text-foreground font-sans min-h-[120px] p-4">
            <div className="mx-auto max-w-[420px]">
              <Story />
            </div>
          </div>
        </div>
      </MotionConfig>
    ),
  ],
};

export default preview;
