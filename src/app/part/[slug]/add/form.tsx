"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CameraIcon, CheckIcon } from "@heroicons/react/24/solid";
import { parts } from "@/lib/data";
import { useApp } from "@/lib/state";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { Segmented } from "@/components/garage/segmented";
import { Icon } from "@/components/garage/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Экран 6: добавление установки. Цена — обязательное число, а не строка в тексте поста.
const field =
  "h-11 w-full rounded-md border border-control-border bg-control-surface px-3 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-interactive";

export default function AddForm({ slug }: { slug: string }) {
  const part = parts.find((p) => p.slug === slug);
  const { addInstall } = useApp();
  const router = useRouter();
  const [price, setPrice] = useState("");
  const [work, setWork] = useState("");
  const [fit, setFit] = useState<"clean" | "reworked" | null>(null);
  const [photo, setPhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  if (!part) return <Screen header={<AppHeader title="Деталь не найдена" back="/catalog" />}>—</Screen>;

  const complete = price !== "" && fit !== null && photo;

  return (
    <Screen tabs={false} header={<AppHeader title="Что поставили" back={`/part/${part.slug}`} />}>
      <FadeIn>
        <div className="rounded-[14px] bg-surface p-4">
          <div className="text-base font-semibold text-text-primary">{part.name}</div>
          <div className="pt-0.5 font-mono text-xs text-text-secondary">{part.spec}</div>
        </div>
      </FadeIn>

      <FadeIn index={1}>
        <div className="mt-3 flex flex-col gap-4 rounded-[14px] bg-surface p-4">
          <label className="block">
            <span className="text-sm font-medium text-text-primary">Сколько отдали за деталь</span>
            <input
              inputMode="numeric"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
              placeholder="28400"
              className={cn(field, "mt-1.5 font-mono tabular")}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-text-primary">Сколько отдали за установку</span>
            <input
              inputMode="numeric"
              value={work}
              onChange={(e) => setWork(e.target.value.replace(/\D/g, ""))}
              placeholder="Ставили сами — оставьте пустым"
              className={cn(field, "mt-1.5 font-mono tabular")}
            />
          </label>

          <div>
            <span className="text-sm font-medium text-text-primary">Как встало</span>
            <Segmented
              className="mt-1.5"
              value={fit ?? ("" as "clean")}
              onChange={(v) => setFit(v as "clean" | "reworked")}
              options={[
                { value: "clean" as const, label: "Без доработок" },
                { value: "reworked" as const, label: "Дорабатывал" },
              ]}
            />
          </div>

          <button
            type="button"
            onClick={() => setPhoto(!photo)}
            className={cn(
              "motion-interactive motion-icon-feedback motion-pressable flex min-h-[52px] items-center justify-center gap-2 rounded-md border text-sm font-medium",
              photo
                ? "border-transparent bg-fit-ok-surface text-fit-ok"
                : "border-control-border bg-control-surface text-text-secondary hover:bg-control-hover",
            )}
          >
            <Icon icon={photo ? CheckIcon : CameraIcon} size={18} />
            {photo ? "Фото добавлено" : "Добавить фото на своей машине"}
          </button>
        </div>
      </FadeIn>

      <p className="px-1 pt-3 text-xs leading-relaxed text-text-secondary">
        Респекты можно получить только на заполненную установку: цена, фото и отметка о доработках.
        Так каталог наполняется сам, а не превращается в ленту красивых фото.
      </p>

      {failed && <p className="px-1 pt-2 text-sm text-fit-no">{failed}</p>}

      <div className="pt-4">
        <Button
          size="xl"
          className="w-full"
          disabled={!complete || saving}
          onClick={async () => {
            setSaving(true);
            setFailed(null);
            try {
              await addInstall({
                partSlug: part.slug,
                price: Number(price),
                workPrice: Number(work || 0),
                reworked: fit === "reworked",
              });
              router.push("/profile");
            } catch (e) {
              setFailed(e instanceof Error ? e.message : "Не получилось сохранить");
              setSaving(false);
            }
          }}
        >
          {saving ? "Сохраняем…" : complete ? "Добавить в гараж" : "Заполните цену, фото и как встало"}
        </Button>
      </div>
    </Screen>
  );
}
