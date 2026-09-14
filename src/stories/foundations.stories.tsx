import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeartIcon as HeartSolid, EyeIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { Icon } from "@/components/garage/icon";

// Источник правды. Стиль снят с design30.club: токены, радиусы, движение — как есть.
const meta = { title: "Foundations/Основы", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const swatch = (name: string, v: string, purpose: string) => (
  <div key={name} className="flex items-center gap-3">
    <div className="size-10 shrink-0 rounded-md border border-border" style={{ background: `var(${v})` }} />
    <div className="min-w-0">
      <div className="text-sm font-medium">{name}</div>
      <div className="font-mono text-xs text-text-secondary">{v}</div>
      <div className="text-xs text-text-secondary">{purpose}</div>
    </div>
  </div>
);

export const Colors: Story = {
  name: "Палитра — токены референса",
  render: () => (
    <div className="flex flex-col gap-5">
      <section>
        <h2 className="pb-3 text-sm font-semibold">Поверхности</h2>
        <div className="flex flex-col gap-3">
          {swatch("Фон", "--background", "hsl(240 7% 94.5%) — тёплый серый, не белый")}
          {swatch("Поверхность", "--surface", "Белая карточка. Теней нет — разделение цветом")}
          {swatch("Приглушённая", "--surface-muted", "hsl(240 8% 97%) — скелетоны, аватары без фото")}
          {swatch("Контрол", "--control-surface", "hsl(240 10% 99%) — чипы; граница control-border 10%")}
          {swatch("Подложка счётчика", "--vote-control", "hsl(240 8% 94.9% / .8) — пилюли реакций и большой счётчик")}
          {swatch("Граница", "--border", "hsl(240 8% 89.8%) — hairline шапки и разделители")}
        </div>
      </section>
      <section>
        <h2 className="pb-3 text-sm font-semibold">Текст и действие</h2>
        <div className="flex flex-col gap-3">
          {swatch("Основной", "--text-primary", "hsl(240 8% 5.1%) — и текст, и чёрная кнопка")}
          {swatch("Вторичный", "--text-secondary", "hsl(240 5% 36.5%)")}
        </div>
      </section>
      <section>
        <h2 className="pb-3 text-sm font-semibold">Семантика</h2>
        <div className="flex flex-col gap-3">
          {swatch("Встало / up", "--vote-up", "hsl(158 84% 39%) — их vote-up; подложка 12%")}
          {swatch("С доработкой", "--fit-rework", "Янтарь их трофея")}
          {swatch("Не подходит / down", "--vote-down", "hsl(0 84% 60%) — их vote-down; подложка 14%")}
          {swatch("Респект", "--respect", "Красный сердца, только в активном состоянии")}
        </div>
      </section>
    </div>
  ),
};

export const Typography: Story = {
  name: "Типографика — system-ui",
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        ["28–32 / 700 / tight", "text-[28px] font-bold leading-tight tracking-tight", "30 дней, чтобы стать сильнее"],
        ["22 / 700 — заголовок обложки", "text-[22px] font-bold leading-[1.15] tracking-tight", "Тормозные диски R14 вентилируемые"],
        ["18 / 600 — @handle, число счётчика", "text-lg font-semibold", "@uxame"],
        ["16 / 600 — заголовок шапки", "text-base font-semibold", "Yerlan Sandybayev"],
        ["16 / 400 — тело, вторичный", "text-base text-text-secondary", "Что-то на продуктовом тут должно быть написано"],
        ["14 / 500 — имя автора", "text-sm font-medium", "Yerlan Sandybayev"],
        ["14 / 700 — счётчик в пилюле", "text-sm font-bold tabular", "31"],
        ["12 / 700 — чип", "text-xs font-bold", "Telegram"],
        ["12 / 400 — дата, подпись", "text-xs text-text-secondary", "14 сент."],
        ["mono 12 — параметры и артикулы", "font-mono text-xs text-text-secondary", "6.5J × 16 · ЦО 58.6 · ET38"],
      ].map(([l, c, t]) => (
        <div key={l}>
          <div className="text-[11px] text-text-secondary">{l}</div>
          <p className={c}>{t}</p>
        </div>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  name: "Радиусы — 12 / 14 / 20 / pill",
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {[
        ["12", "rounded-md", "кнопки-иконки, поля"],
        ["14", "rounded-lg", "карточки"],
        ["20", "rounded-xl", "диалог, шторка"],
        ["pill", "rounded-full", "чипы, кнопки, счётчики"],
      ].map(([n, c, u]) => (
        <div key={n} className="text-center">
          <div className={`size-16 border border-border bg-surface ${c}`} />
          <div className="pt-1 font-mono text-[11px]">{n}</div>
          <div className="text-[11px] text-text-secondary">{u}</div>
        </div>
      ))}
    </div>
  ),
};

export const Motion: Story = {
  name: "Движение — длительности и кривые",
  render: () => (
    <div className="flex flex-col gap-4 text-sm">
      <div className="rounded-[14px] bg-surface p-4">
        <div className="font-mono text-xs text-text-secondary">--motion-duration: press .11s · fast .16s · base .22s · slow .3s</div>
        <div className="pt-1 font-mono text-xs text-text-secondary">--motion-ease-out: cubic-bezier(.23, 1, .32, 1)</div>
        <div className="font-mono text-xs text-text-secondary">--motion-ease-drawer: cubic-bezier(.32, .72, 0, 1)</div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="motion-interactive motion-pressable rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
          motion-pressable · scale .97
        </button>
        <button type="button" className="motion-interactive motion-icon-feedback motion-pressable inline-flex h-8 items-center gap-1 rounded-[76px] bg-vote-control px-2 text-sm font-bold">
          3 <Icon icon={HeartOutline} size={18} className="text-icon-primary/45" />
        </button>
      </div>
      <div className="motion-fade-in rounded-[14px] bg-surface p-4">motion-fade-in · 4px вверх, .22s, ease-out</div>
      <div className="shimmer h-16 rounded-[14px]" />
      <p className="text-xs text-text-secondary">Наведите и нажмите: иконка растёт до 1.06 и сжимается до .92, кнопка — до .97 за 110 мс.</p>
    </div>
  ),
};

export const Icons: Story = {
  name: "Иконки — Heroicons 24 solid на 18px",
  render: () => (
    <div className="flex items-center gap-4">
      {[EyeIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartSolid].map((I, i) => (
        <Icon key={i} icon={I} size={18} />
      ))}
      <Icon icon={HeartOutline} size={18} className="text-icon-primary/45" />
      <span className="text-xs text-text-secondary">Сердце неактивное — outline на 45%</span>
    </div>
  ),
};
