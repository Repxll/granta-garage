"use client";

import { Send } from "lucide-react";
import { useApp } from "@/lib/state";
import { carLabel } from "@/lib/car";
import { partName } from "@/lib/parts";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { MoneyStat, Money } from "@/components/garage/money";
import { RespectButton } from "@/components/garage/respect-button";
import { LoadingScreen } from "@/components/garage/load-state";
import { Button } from "@/components/ui/button";
import { plural } from "@/lib/format";

// Экран 8: публичная сборка в режиме превью — респект себе поставить нельзя,
// это проверяет и сервер.
export default function BuildPage() {
  const { state, loading } = useApp();
  if (loading) return <LoadingScreen title="Сборка" />;

  const garage = state?.garage ?? [];
  const total = garage.reduce((s, i) => s + i.price + i.work_price, 0);

  return (
    <Screen
      title="Сборка"
      subtitle="Так вашу сборку видят другие владельцы Гранты."
      car={carLabel(state?.car.body ?? null, state?.car.modification ?? null)}
    >
      <MoneyStat
        label="Вложено"
        value={total}
        accent
        hint={`${garage.length} ${plural(garage.length, "доработка", "доработки", "доработок")}`}
      />

      {garage.length === 0 ? (
        <p className="pt-5 text-sm text-muted-foreground">В сборке пока ничего нет.</p>
      ) : (
        <Stagger className="flex flex-col gap-2 pt-5">
          {garage.map((i) => (
            <StaggerItem key={i.part_slug}>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="text-sm font-semibold">{partName(i.part_slug)}</div>
                <div className="pt-1 text-sm">
                  <Money value={i.price + i.work_price} />
                  <span className={i.reworked ? "text-fit-rework" : "text-fit-ok"}>
                    {" · "}
                    {i.reworked ? "с доработкой" : "встало как есть"}
                  </span>
                </div>
                <div className="pt-3">
                  <RespectButton count={0} locked />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <Button className="mt-6 w-full">
        <Send size={16} />
        Отправить в чат клуба
      </Button>

      <p className="pt-3 text-xs text-muted-foreground">
        Ссылка открывается внутри Telegram. Веб-страницу сборки включим вместе с публичным слоем.
      </p>
    </Screen>
  );
}
