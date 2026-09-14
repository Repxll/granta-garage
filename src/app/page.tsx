"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { bodies } from "@/lib/data";
import { Screen, PageTitle, FadeIn } from "@/components/garage/screen";
import { Icon } from "@/components/garage/icon";

// Экран 1, шаг 1: кузов карточками с годами (паттерн Exist.ru — не абстрактный дропдаун «год»).
export default function BodyPage() {
  return (
    <Screen tabs={false}>
      <div className="pt-4">
        <PageTitle
          title="Какая у вас Гранта?"
          subtitle="Дальше вы увидите только то, что встаёт именно на неё, и сколько это стоило другим — вместе с тем, что пришлось докупить."
        />
      </div>

      <div className="pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">Шаг 1 из 2 — кузов</div>

      <div className="flex flex-col gap-2">
        {bodies.map((b, i) => (
          <FadeIn key={b.code} index={i}>
            <Link
              href={`/select/${b.code}`}
              className="motion-interactive motion-pressable flex items-center gap-3 rounded-[14px] bg-surface p-3 hover:bg-control-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-snug text-text-primary">
                  {b.name} <span className="font-mono text-xs font-normal text-text-secondary">{b.code}</span>
                </div>
                <div className="mt-0.5 font-mono text-xs text-text-secondary">{b.years}</div>
                <div className="mt-1 text-xs text-text-secondary">{b.note}</div>
              </div>
              <Icon icon={ChevronRightIcon} size={18} className="text-text-secondary/60" />
            </Link>
          </FadeIn>
        ))}
      </div>

      <p className="pt-5 text-xs leading-relaxed text-text-secondary">
        Кузовные детали дорестайла и FL между собой не взаимозаменяемы — поэтому спрашиваем сразу.
      </p>
    </Screen>
  );
}
