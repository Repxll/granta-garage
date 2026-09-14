import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// Палитра и шкала — источник правды. Стиль, попавший сюда, дальше работает сам:
// следующая сессия собирает экраны из этих токенов, а не придумывает свои.
const meta = { title: "Foundations/Основы", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const swatch = (name: string, varName: string, purpose: string) => (
  <div key={name} className="flex items-center gap-3">
    <div
      className="size-10 shrink-0 rounded-md border border-border"
      style={{ background: `var(${varName})` }}
    />
    <div className="min-w-0">
      <div className="text-sm font-medium">{name}</div>
      <div className="font-mono text-xs text-muted-foreground">{varName}</div>
      <div className="text-xs text-muted-foreground">{purpose}</div>
    </div>
  </div>
);

export const Colors: Story = {
  name: "Палитра — тёмный гаражный",
  render: () => (
    <div className="flex flex-col gap-5">
      <section>
        <h2 className="pb-3 text-sm font-semibold">Поверхности</h2>
        <div className="flex flex-col gap-3">
          {swatch("Фон", "--background", "Графит, не чёрный: на OLED чёрный проваливается, графит держит форму карточек")}
          {swatch("Карточка", "--card", "Всё содержимое лежит на ней")}
          {swatch("Граница", "--border", "Вместо теней: на тёмном фоне тени не читаются")}
          {swatch("Приглушённый", "--muted", "Подложка сегмент-контрола")}
        </div>
      </section>

      <section>
        <h2 className="pb-3 text-sm font-semibold">Акцент</h2>
        <div className="flex flex-col gap-3">
          {swatch("Янтарь", "--primary", "Свет лампы в боксе. Единственный акцент — им подсвечивается только действие")}
          {swatch("Респект", "--respect", "Тот же янтарь: социальный жест и есть действие")}
        </div>
      </section>

      <section>
        <h2 className="pb-3 text-sm font-semibold">Вердикт о посадке</h2>
        <div className="flex flex-col gap-3">
          {swatch("Встало", "--fit-ok", "Без доработок")}
          {swatch("С доработкой", "--fit-rework", "Встало, но пришлось допиливать или докупать")}
          {swatch("Не подходит", "--fit-no", "На эту модификацию не встаёт")}
          {swatch("Не подтверждено", "--fit-unknown", "Никто не проверял. Полноправное состояние, а не спрятанное")}
        </div>
      </section>
    </div>
  ),
};

export const Typography: Story = {
  name: "Типографика",
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-xs text-muted-foreground">text-xl font-semibold — заголовок экрана</div>
        <p className="text-xl font-semibold tracking-tight">Тормозные диски R14 вентилируемые</p>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">text-sm font-semibold — заголовок блока</div>
        <p className="text-sm font-semibold">Что ещё придётся купить</p>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">text-sm — основной текст</div>
        <p className="text-sm">Скоба суппорта R14 — штатная R13 не подойдёт</p>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">text-xs text-muted-foreground — подпись</div>
        <p className="text-xs text-muted-foreground">Через сезон: тормозит заметно лучше, вопросов нет</p>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">font-mono tabular-nums — цифры и параметры</div>
        <p className="font-mono tabular-nums">6.5J × 16, ЦО 58.6, вылет 38 · 24 000 ₽ — 36 600 ₽</p>
        <p className="pt-1 text-xs text-muted-foreground">
          Моноширинный для цен, вылетов и артикулов: столбиком читается, при обновлении не прыгает.
        </p>
      </div>
    </div>
  ),
};

export const Radii: Story = {
  name: "Радиусы и плотность",
  render: () => (
    <div className="flex items-end gap-3">
      {["rounded-md", "rounded-lg", "rounded-xl"].map((r) => (
        <div key={r} className="text-center">
          <div className={`size-16 border border-border bg-card ${r}`} />
          <div className="pt-1 font-mono text-[11px] text-muted-foreground">{r}</div>
        </div>
      ))}
      <p className="pb-1 text-xs text-muted-foreground">
        Радиусы небольшие — техничность важнее мягкости.
      </p>
    </div>
  ),
};
