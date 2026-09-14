"use client";

import { useCallback, useEffect, useState } from "react";
import { api, type FeedItem } from "@/lib/api";
import { useApp } from "@/lib/state";
import { CommentsHeader, CommentItem, CommentComposer } from "./comments";
import { Sheet } from "./sheet";
import { Bone } from "./skeletons";

const when = (iso: string | null | undefined) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }).replace(".", "")}, ${d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}`;
};

// Тред отзывов по детали. Писать могут только те, кто деталь поставил — это и есть
// защита от токсичности: у каждого комментария за спиной реальная установка.
export function useReviews(slug: string | null) {
  const [data, setData] = useState<{ installed: number; reworked: number; reviews: FeedItem[] } | null>(null);
  const load = useCallback(async () => {
    if (!slug) return;
    setData(await api.part(slug));
  }, [slug]);
  useEffect(() => {
    setData(null);
    void load();
  }, [load]);
  return { data, reload: load };
}

export function ReviewsThread({
  slug,
  data,
  onPosted,
  title = "Отзывы",
  composer = true,
}: {
  slug: string;
  data: { reviews: FeedItem[] } | null;
  onPosted?: () => void;
  title?: string;
  composer?: boolean;
}) {
  const { state, toggleRespect, reload } = useApp();
  const comments = (data?.reviews ?? []).filter((r) => r.review_text);
  const mine = state?.garage.find((g) => g.part_slug === slug);
  const already = !!mine?.review_text;

  return (
    <div className="flex flex-col gap-4">
      <CommentsHeader count={comments.length} title={title} />

      {data === null ? (
        <div className="flex flex-col gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-3">
              <Bone className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Bone className="h-4 w-28 rounded-[76px]" />
                <Bone className="h-12 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="rounded-[14px] bg-surface-muted px-4 py-3 text-base leading-relaxed text-text-secondary">
          Отзывов пока нет. Первый напишет тот, кто поставил и поездил.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {comments.map((r) => {
            const target = `install:${r.id}`;
            const own = r.user_id === state?.user.id;
            return (
              <CommentItem
                key={r.id}
                author={r.first_name ?? r.username ?? "Владелец"}
                text={r.review_text!}
                date={when(r.review_at ?? r.created_at)}
                tone={r.reworked ? "rework" : "ok"}
                respects={r.respects}
                respectActive={state?.respects.includes(target)}
                respectLocked={own}
                onRespect={() => toggleRespect(target)}
              />
            );
          })}
        </div>
      )}

      {composer && (
        <CommentComposer
          disabled={!mine || already}
          placeholder={
            !mine
              ? "Поставьте деталь, чтобы оставить отзыв"
              : already
                ? "Ваш отзыв уже в треде"
                : "Как встало, что докупали, как ведёт себя через сезон…"
          }
          onSubmit={async (text) => {
            await api.review(slug, text);
            await reload();
            onPosted?.();
          }}
        />
      )}
    </div>
  );
}

// Шторка с тредом — открывается с карточки в ленте, как их комментарии с работы.
export function ReviewsSheet({
  slug,
  open,
  onOpenChange,
}: {
  slug: string | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { data, reload } = useReviews(open ? slug : null);
  return (
    <Sheet open={open} onOpenChange={onOpenChange} ariaTitle="Отзывы">
      {slug && <div className="pt-1"><ReviewsThread slug={slug} data={data} onPosted={reload} /></div>}
    </Sheet>
  );
}
