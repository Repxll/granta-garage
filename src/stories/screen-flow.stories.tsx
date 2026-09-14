import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// Карта продукта: единственное место, где виден весь happy path целиком.
const meta = { title: "Product/Карта экранов", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const screens = [
  { n: 1, name: "Выбор кузова", route: "/", purpose: "Вход в Mini App, ценность до любого ввода", next: "модификация" },
  { n: 2, name: "Выбор модификации", route: "/select/[body]", purpose: "Таблица строк: двигатель, мощность, коробка", next: "лента" },
  { n: 3, name: "Лента", route: "/feed", purpose: "Установки и сборки, фильтр «как у меня» по кузову", next: "деталь · каталог" },
  { n: 4, name: "Каталог", route: "/catalog", purpose: "Категории по частоте обсуждений, диски впереди", next: "деталь" },
  { n: 5, name: "Деталь на модификации", route: "/part/[slug]", purpose: "Счёт установок, вердикт, что докупить, сколько выходит", next: "добавление" },
  { n: 6, name: "Добавление установки", route: "/part/[slug]/add", purpose: "Обязательная цена, фото, как встало. Целевое действие", next: "профиль" },
  { n: 7, name: "Профиль с гаражом", route: "/profile", purpose: "Моя Гранта: вложено, респекты, список, топ по кузову", next: "сборка" },
  { n: 8, name: "Публичная сборка", route: "/build", purpose: "Превью «так видят другие», шеринг в чат клуба", next: "—" },
];

export const Flow: Story = {
  name: "Happy path",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
        Выбрал кузов → выбрал модификацию → увидел, что ставят на такие же → открыл деталь →
        понял, что встанет и что докупить → поставил себе → гараж посчитал сумму → поделился
        сборкой → получил респект → вернулся в ленту.
      </div>

      <div className="flex flex-col gap-2">
        {screens.map((s) => (
          <div key={s.n} className="flex gap-3 rounded-lg border border-border bg-card p-3">
            <span className="font-mono text-sm text-primary">{s.n}</span>
            <div className="min-w-0">
              <div className="text-sm font-semibold">{s.name}</div>
              <div className="font-mono text-[11px] text-muted-foreground">{s.route}</div>
              <div className="pt-1 text-xs text-muted-foreground">{s.purpose}</div>
              <div className="pt-1 text-xs text-primary">→ {s.next}</div>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-border p-3">
        <h2 className="text-sm font-semibold">Чего здесь нет — сознательно</h2>
        <ul className="flex flex-col gap-1 pt-2 text-xs text-muted-foreground">
          <li>• Экрана регистрации — пользователя опознаёт Telegram</li>
          <li>• Ленты подписок — лента фильтруется по кузову, а не по подпискам</li>
          <li>• Отдельной вкладки гаража — он живёт в профиле, это одна сущность «моя машина»</li>
          <li>• Комментариев к чужим сборкам — только респект, жест без текста</li>
          <li>• Звёздных рейтингов — вместо них счёт установок</li>
        </ul>
      </section>
    </div>
  ),
};
