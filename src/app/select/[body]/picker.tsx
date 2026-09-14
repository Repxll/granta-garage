"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";
import { bodies, modifications } from "@/lib/data";
import { useApp } from "@/lib/state";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";

// Экран 2, шаг 2: модификация строкой таблицы. Выбор уходит на сервер —
// машина привязана к Telegram-аккаунту, а не к браузеру.
export default function ModificationPicker({ body }: { body: string }) {
  const { setCar } = useApp();
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);
  const b = bodies.find((x) => x.code === body);

  return (
    <Screen
      title={`${b?.name}: какая модификация?`}
      subtitle="Шаг 2 из 2. Дальше всё будет отфильтровано под неё."
      tabs={false}
    >
      <Stagger className="flex flex-col gap-2">
        {modifications.map((m) => (
          <StaggerItem key={m.id}>
            <button
              type="button"
              disabled={saving !== null}
              onClick={async () => {
                setSaving(m.id);
                try {
                  await setCar(body, m.id);
                  router.push("/feed");
                } finally {
                  setSaving(null);
                }
              }}
              className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/50 disabled:opacity-60"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="pt-1 font-mono text-xs text-muted-foreground">
                  {m.engine} · {m.power} · {m.gearbox}
                </div>
                <div className="font-mono text-xs text-muted-foreground">{m.years}</div>
              </div>
              {saving === m.id ? (
                <Loader2 size={18} className="shrink-0 animate-spin text-primary" />
              ) : (
                <ChevronRight size={18} className="shrink-0 text-muted-foreground" />
              )}
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="pt-6 text-xs text-muted-foreground">
        8 и 16 клапанов — главная развилка: половина деталей выпуска и впуска между ними
        не переставляется.
      </p>
    </Screen>
  );
}
