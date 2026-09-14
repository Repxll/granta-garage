"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Squares2X2Icon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { categories, parts } from "@/lib/data";
import { useApp } from "@/lib/state";
import { api } from "@/lib/api";
import { Screen, AppHeader, FadeIn } from "@/components/garage/screen";
import { ListHeader } from "@/components/garage/list-header";
import { PartRow } from "@/components/garage/part-row";
import { IconButton } from "@/components/garage/icon-button";
import { ListSkeleton } from "@/components/garage/skeletons";
import { EmptyState } from "@/components/garage/empty-state";
import { buttonVariants } from "@/components/ui/button";

// Экран 4: каталог. Счётчики приходят с сервера — реальные установки на такую же модификацию.
export default function CatalogPage() {
  const { state, loading } = useApp();
  const [stats, setStats] = useState<Record<string, { installed: number; reworked: number }>>({});

  useEffect(() => {
    if (!state?.car.modification) return;
    void api.stats().then((r) => setStats(r.stats));
  }, [state?.car.modification]);

  const mod = state?.car.modification;

  return (
    <Screen header={<AppHeader title="Что поставить" action={<IconButton icon={Squares2X2Icon} label="Вид" />} />}>
      {loading ? (
        <ListSkeleton count={4} kind="row" />
      ) : !mod ? (
        <EmptyState
          icon={WrenchScrewdriverIcon}
          title="Сначала выберите машину"
          hint="Без модификации нельзя показать, что встанет."
          action={
            <Link href="/" className={buttonVariants({ size: "xl" })}>
              Выбрать Гранту
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          {categories.map((c, ci) => {
            const list = parts.filter((p) => p.category === c.slug);
            return (
              <section key={c.slug}>
                <ListHeader
                  title={c.name}
                  action={c.note ? <span className="font-mono text-[11px] text-text-secondary">{c.note}</span> : undefined}
                />
                {list.length === 0 ? (
                  <p className="pb-2 text-xs text-text-secondary">Заполняем — в засеве этой категории пока нет.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {list.map((p, i) => (
                      <FadeIn key={p.slug} index={ci + i}>
                        <PartRow
                          part={p}
                          fitment={p.fitment[mod]}
                          installed={stats[p.slug]?.installed ?? 0}
                          reworked={stats[p.slug]?.reworked ?? 0}
                        />
                      </FadeIn>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </Screen>
  );
}
