"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bodies, modifications } from "@/lib/data";
import { useApp } from "@/lib/state";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { Steps, ModificationCard } from "@/components/garage/onboarding";
import { CarSilhouette } from "@/components/garage/car-silhouette";

// Экран 2, шаг 2: мотор — крупной цифрой мощности и числом клапанов.
export default function ModificationPicker({ body }: { body: string }) {
  const { setCar } = useApp();
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);
  const b = bodies.find((x) => x.code === body);

  return (
    <Screen tabs={false} header={<AppHeader title={b?.name ?? "Гранта"} back="/" />}>
      <div className="motion-fade-in pt-1 text-center">
        <Steps current={1} labels={["Кузов", "Мотор"]} />
        <div className="relative mx-auto mt-4 max-w-[300px] overflow-hidden rounded-[20px] bg-[hsl(240_8%_5.1%)] px-4 pt-5 pb-3">
          <CarSilhouette body={body} />
        </div>
        <h1 className="pt-5 text-[28px] font-bold leading-tight tracking-tight text-text-primary text-balance">
          Какой мотор?
        </h1>
        <p className="mx-auto max-w-[320px] pt-2 text-base leading-6 text-text-secondary">
          8 и 16 клапанов — главная развилка: половина деталей выпуска между ними не переставляется.
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-6">
        {modifications.map((m, i) => (
          <FadeIn key={m.id} index={i}>
            <ModificationCard
              valves={m.id === "8v" ? "8V" : "16V"}
              name={m.name}
              power={m.power}
              engine={m.engine}
              gearbox={m.gearbox}
              years={m.years}
              busy={saving === m.id}
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
            />
          </FadeIn>
        ))}
      </div>
    </Screen>
  );
}
