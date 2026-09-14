"use client";

import Link from "next/link";
import { categories, parts } from "@/lib/data";
import { useApp } from "@/lib/state";
import { carLabel } from "@/lib/car";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { PartCard } from "@/components/garage/part-card";
import { buttonVariants } from "@/components/ui/button";

// Экран 4: каталог. Порядок категорий — по частоте обсуждений из фазы 1:
// диски и вылет впереди всего, впуск вырезан вовсе.
export default function CatalogPage() {
  const { state } = useApp();

  if (!state.modification) {
    return (
      <Screen title="Сначала выберите машину" subtitle="Без модификации нельзя показать, что встанет.">
        <Link href="/" className={buttonVariants({ className: "w-full" })}>
          Выбрать Гранту
        </Link>
      </Screen>
    );
  }

  return (
    <Screen
      title="Что поставить"
      subtitle="Категории — в порядке того, о чём чаще всего спрашивают."
      car={carLabel(state.body, state.modification)}
    >
      <div className="flex flex-col gap-6">
        {categories.map((c) => {
          const list = parts.filter((p) => p.category === c.slug);
          return (
            <section key={c.slug}>
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold">{c.name}</h2>
                {c.note && <span className="font-mono text-[11px] text-muted-foreground">{c.note}</span>}
              </div>

              {list.length === 0 ? (
                <p className="pt-1.5 text-xs text-muted-foreground">
                  Заполняем — в засеве этой категории пока нет.
                </p>
              ) : (
                <Stagger className="flex flex-col gap-2 pt-2">
                  {list.map((p) => (
                    <StaggerItem key={p.slug}>
                      <PartCard part={p} fitment={p.fitment[state.modification!]} />
                    </StaggerItem>
                  ))}
                </Stagger>
              )}
            </section>
          );
        })}
      </div>
    </Screen>
  );
}
