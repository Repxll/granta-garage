"use client";

import { useState } from "react";
import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon as HeartSolid, FaceSmileIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { Avatar } from "./avatar";
import { CountPill } from "./count-pill";

// Тред отзывов — по устройству треда комментариев референса: заголовок с иконкой
// и квадратным бейджем-счётчиком, комментарий с аватаром 40, именем 16/600, серым
// пузырём 14px и пилюлей-лайком справа, дата под пузырём, композер с круглой кнопкой.

export function CommentsHeader({ count, title = "Отзывы" }: { count: number; title?: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2.5">
        <Icon icon={ChatBubbleOvalLeftEllipsisIcon} size={24} className="text-text-secondary" />
        <span className="text-base font-semibold text-text-primary">{title}</span>
      </div>
      <span className="tabular inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-control-surface px-1.5 text-xs font-bold text-text-primary ring-1 ring-control-border">
        {count}
      </span>
    </div>
  );
}

export function CommentItem({
  author,
  text,
  meta,
  date,
  respects,
  respectActive,
  respectLocked,
  onRespect,
  tone,
}: {
  author: string;
  text: string;
  meta?: string;
  date: string;
  respects: number;
  respectActive?: boolean;
  respectLocked?: boolean;
  onRespect?: () => void;
  tone?: "ok" | "rework";
}) {
  return (
    <div className="motion-fade-in flex gap-3">
      <Avatar name={author} size={40} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-base font-semibold text-text-primary">{author}</span>
          {meta && <span className="truncate text-xs text-text-secondary">{meta}</span>}
        </div>
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <div className="min-w-0 rounded-[14px] bg-surface-muted px-4 py-3 text-base leading-relaxed text-text-primary">
            {tone && (
              <span className={cn("font-medium", tone === "ok" ? "text-fit-ok" : "text-fit-rework")}>
                {tone === "ok" ? "Встало без доработок. " : "Пришлось дорабатывать. "}
              </span>
            )}
            {text}
          </div>
          <CountPill
            icon={respectActive ? HeartSolid : HeartOutline}
            count={respects + (respectActive ? 1 : 0)}
            label="Респект"
            tone="respect"
            active={respectActive}
            locked={respectLocked}
            onClick={onRespect}
            className="mt-0.5 shrink-0"
          />
        </div>
        <div className="pt-1.5 pl-4 text-sm text-text-secondary">{date}</div>
      </div>
    </div>
  );
}

export function CommentComposer({
  disabled,
  placeholder,
  onSubmit,
}: {
  disabled?: boolean;
  placeholder: string;
  onSubmit?: (text: string) => Promise<void> | void;
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const canSend = !disabled && text.trim().length >= 3 && !busy;

  return (
    <div
      className={cn(
        "motion-interactive relative rounded-[20px] border border-content-border bg-card",
        disabled && "opacity-80",
      )}
    >
      <textarea
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="block w-full resize-none bg-transparent px-4 pt-3.5 pb-14 text-base leading-relaxed text-text-primary placeholder:text-text-secondary/70 focus:outline-none disabled:cursor-not-allowed"
      />
      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2">
        <span className="flex size-10 items-center justify-center text-text-secondary/60">
          <Icon icon={FaceSmileIcon} size={20} />
        </span>
        <button
          type="button"
          aria-label="Отправить"
          disabled={!canSend}
          onClick={async () => {
            if (!canSend) return;
            setBusy(true);
            try {
              await onSubmit?.(text.trim());
              setText("");
            } finally {
              setBusy(false);
            }
          }}
          className={cn(
            "motion-interactive motion-icon-feedback motion-pressable flex size-12 items-center justify-center rounded-full",
            canSend ? "bg-primary text-primary-foreground" : "bg-control-surface text-text-secondary/50 ring-1 ring-control-border",
          )}
        >
          <Icon icon={ArrowUpIcon} size={20} />
        </button>
      </div>
    </div>
  );
}

// Граббер шторки — та же полоска, что у их drawer
export function Grabber() {
  return <div className="mx-auto my-2 h-1.5 w-11 rounded-full bg-text-secondary/30" aria-hidden />;
}
