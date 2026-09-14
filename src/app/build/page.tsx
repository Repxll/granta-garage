"use client";

import { Send } from "lucide-react";
import { useApp } from "@/lib/state";
import { carLabel } from "@/lib/car";
import { Screen, Stagger, StaggerItem } from "@/components/garage/screen";
import { MoneyStat, Money } from "@/components/garage/money";
import { RespectButton } from "@/components/garage/respect-button";
import { Button } from "@/components/ui/button";
import { plural } from "@/lib/format";

// Экран 8: публичная сборка. Своя сборка показывается в режиме превью —
// респект себе поставить нельзя, кнопки заблокированы осознанно.
export default function BuildPage() {
  const { state } = useApp();
  const total = state.garage.reduce((s, i) => s + i.price + i.workPrice, 0);
  const car = carLabel(state.body, state.modification);

  return (
    <Screen title="Сборка" subtitle="Так вашу сборку видят другие владельцы Гранты." car={car}>
      <MoneyStat
        label="Вложено"
        value={total}
        accent
        hint={`${state.garage.length} ${plural(state.garage.length, "доработка", "доработки", "доработок")}`}
      />

      {state.garage.length === 0 ? (
        <p className="pt-5 text-sm text-muted-foreground">В сборке пока ничего нет.</p>
      ) : (
        <Stagger className="flex flex-col gap-2 pt-5">
          {state.garage.map((i) => (
            <StaggerItem key={i.slug}>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="text-sm font-semibold">{i.name}</div>
                <div className="pt-1 text-sm">
                  <Money value={i.price + i.workPrice} />
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
