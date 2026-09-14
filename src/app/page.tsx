"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { bodies } from "@/lib/data";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";

// Экран 1, шаг 1: кузов карточками с годами (паттерн Exist.ru — не абстрактный дропдаун «год»).
export default function BodyPage() {
  return (
    <Screen
      title="Какая у вас Гранта?"
      subtitle="Дальше вы увидите только то, что встаёт именно на неё, и сколько это стоило другим — вместе с тем, что пришлось докупить."
      tabs={false}
    >
      <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Шаг 1 из 2 — кузов
      </h2>

      <Stagger className="flex flex-col gap-2 pt-3">
        {bodies.map((b) => (
          <StaggerItem key={b.code}>
            <Link
              href={`/select/${b.code}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">
                  {b.name} <span className="font-mono text-xs text-muted-foreground">{b.code}</span>
                </div>
                <div className="pt-0.5 font-mono text-xs text-muted-foreground">{b.years}</div>
                <div className="pt-1 text-xs text-muted-foreground">{b.note}</div>
              </div>
              <ChevronRight size={18} className="shrink-0 text-muted-foreground" />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="pt-6 text-xs text-muted-foreground">
        Кузовные детали дорестайла и FL между собой не взаимозаменяемы — поэтому спрашиваем сразу.
      </p>
    </Screen>
  );
}
