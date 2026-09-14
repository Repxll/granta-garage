"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { bodies, modifications } from "@/lib/data";
import { useApp } from "@/lib/state";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { Icon } from "@/components/garage/icon";
import { cn } from "@/lib/utils";

// Экран 2, шаг 2: модификация строкой. Выбор уходит на сервер — машина привязана
// к Telegram-аккаунту, а не к браузеру.
export default function ModificationPicker({ body }: { body: string }) {
  const { setCar } = useApp();
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);
  const b = bodies.find((x) => x.code === body);

  return (
    <Screen tabs={false} header={<AppHeader title={`${b?.name ?? "Гранта"} · модификация`} back="/" />}>
      <div className="pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">Шаг 2 из 2 — двигатель и коробка</div>

      <div className="flex flex-col gap-2">
        {modifications.map((m, i) => (
          <FadeIn key={m.id} index={i}>
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
              className={cn(
                "motion-interactive motion-pressable flex w-full items-center gap-3 rounded-[14px] bg-surface p-3 text-left hover:bg-control-hover",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60",
                saving === m.id && "ring-2 ring-ring",
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-snug text-text-primary">{m.name}</div>
                <div className="mt-0.5 font-mono text-xs text-text-secondary">
                  {m.engine} · {m.power} · {m.gearbox}
                </div>
                <div className="font-mono text-xs text-text-secondary">{m.years}</div>
              </div>
              <Icon icon={ChevronRightIcon} size={18} className="text-text-secondary/60" />
            </button>
          </FadeIn>
        ))}
      </div>

      <p className="pt-5 text-xs leading-relaxed text-text-secondary">
        8 и 16 клапанов — главная развилка: половина деталей выпуска и впуска между ними не переставляется.
      </p>
    </Screen>
  );
}
