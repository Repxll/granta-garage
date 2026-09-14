"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Check } from "lucide-react";
import { parts } from "@/lib/data";
import { useApp } from "@/lib/state";
import { carLabel } from "@/lib/car";
import { Screen } from "@/components/garage/screen";
import { Segmented } from "@/components/garage/segmented";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Экран 6: добавление установки. Цена — обязательное число, а не строка в тексте поста,
// иначе гараж не отвечает на вопрос «сколько вложено» (болезнь Drive2).
export default function AddForm({ slug }: { slug: string }) {
  const part = parts.find((p) => p.slug === slug);
  const { state, addItem } = useApp();
  const router = useRouter();
  const [price, setPrice] = useState("");
  const [work, setWork] = useState("");
  const [fit, setFit] = useState<"clean" | "reworked" | null>(null);
  const [photo, setPhoto] = useState(false);

  if (!part) return <Screen title="Деталь не найдена">—</Screen>;

  const complete = price !== "" && fit !== null && photo;

  return (
    <Screen title="Что поставили" subtitle={part.name} car={carLabel(state.body, state.modification)}>
      <div className="flex flex-col gap-5">
        <div>
          <Label htmlFor="price">Сколько отдали за деталь</Label>
          <Input
            id="price"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
            placeholder="28400"
            className="mt-1.5 font-mono tabular-nums"
          />
        </div>

        <div>
          <Label htmlFor="work">Сколько отдали за установку</Label>
          <Input
            id="work"
            inputMode="numeric"
            value={work}
            onChange={(e) => setWork(e.target.value.replace(/\D/g, ""))}
            placeholder="Ставили сами — оставьте пустым"
            className="mt-1.5 font-mono tabular-nums"
          />
        </div>

        <div>
          <Label>Как встало</Label>
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
            "flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-dashed text-sm transition-colors",
            photo
              ? "border-fit-ok/50 bg-fit-ok/10 text-fit-ok"
              : "border-border text-muted-foreground hover:border-primary/50",
          )}
        >
          {photo ? <Check size={16} /> : <Camera size={16} />}
          {photo ? "Фото добавлено" : "Добавить фото на своей машине"}
        </button>

        <p className="text-xs text-muted-foreground">
          Респекты можно получить только на заполненную установку: цена, фото и отметка о доработках.
          Так каталог наполняется сам, а не превращается в ленту красивых фото.
        </p>

        <Button
          className="w-full"
          disabled={!complete}
          onClick={() => {
            addItem({
              slug: part.slug,
              name: part.name,
              price: Number(price),
              workPrice: Number(work || 0),
              photo,
              reworked: fit === "reworked",
              addedAt: new Date().toISOString(),
            });
            router.push("/profile");
          }}
        >
          {complete ? "Добавить в гараж" : "Заполните цену, фото и как встало"}
        </Button>
      </div>
    </Screen>
  );
}
