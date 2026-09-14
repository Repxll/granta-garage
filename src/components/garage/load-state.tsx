"use client";

import { AlertCircle } from "lucide-react";
import { Screen } from "./screen";
import { ListSkeleton } from "./skeletons";
import { EmptyState } from "./empty-state";

// Два состояния, которые раньше не существовали: данные едут по сети, и сеть падает.
export function LoadingScreen({ title }: { title: string }) {
  return (
    <Screen title={title}>
      <ListSkeleton count={3} kind="feed" />
    </Screen>
  );
}

export function ErrorScreen({ title, message, onRetry }: { title: string; message: string; onRetry?: () => void }) {
  return (
    <Screen title={title}>
      <EmptyState
        icon={AlertCircle}
        title="Не получилось загрузить"
        hint={message}
        action={
          onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="min-h-[44px] rounded-md border border-border px-4 text-xs"
            >
              Попробовать ещё раз
            </button>
          )
        }
      />
    </Screen>
  );
}
