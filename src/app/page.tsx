"use client";

import { bodies } from "@/lib/data";
import { Screen, FadeIn } from "@/components/garage/screen";
import { Steps, BodyCard } from "@/components/garage/onboarding";

// Экран 1, шаг 1: кузов — картинкой. Силуэт меняется по кузову, код и годы — подписью.
export default function BodyPage() {
  return (
    <Screen tabs={false}>
      <div className="motion-fade-in pt-3 text-center">
        <Steps current={0} labels={["Кузов", "Мотор"]} />
        <h1 className="pt-5 text-[32px] font-bold leading-tight tracking-tight text-text-primary text-balance">
          Какая у вас Гранта?
        </h1>
        <p className="mx-auto max-w-[320px] pt-2 text-base leading-6 text-text-secondary">
          Дальше — только то, что встаёт именно на неё, и сколько это стоило другим.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-6">
        {bodies.map((b, i) => (
          <FadeIn key={b.code} index={i}>
            <BodyCard code={b.code} name={b.name} years={b.years} note={b.note} href={`/select/${b.code}`} />
          </FadeIn>
        ))}
      </div>

      <p className="px-2 pt-5 text-center text-xs leading-relaxed text-text-secondary">
        Кузовные детали дорестайла и FL не взаимозаменяемы — поэтому спрашиваем сразу.
      </p>
    </Screen>
  );
}
