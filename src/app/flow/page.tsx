import Link from "next/link";

// Карта продукта: живёт в коде и обновляется вместе с экранами.
const screens = [
  {
    href: "/",
    name: "1. Выбор кузова",
    purpose: "Вход в Mini App. Ценность объясняется до любого ввода",
    next: "→ выбор модификации",
  },
  {
    href: "/select/2190",
    name: "2. Выбор модификации",
    purpose: "Таблица строк: двигатель, мощность, коробка, годы",
    next: "→ каталог",
  },
  {
    href: "/feed",
    name: "3. Лента",
    purpose: "Установки и сборки других. Фильтр «как у меня» по кузову — поэтому холодного старта нет",
    next: "→ карточка детали · каталог",
  },
  {
    href: "/catalog",
    name: "4. Каталог",
    purpose: "Категории по частоте обсуждений, диски впереди",
    next: "→ карточка детали",
  },
  {
    href: "/part/wheels-r16-195-50",
    name: "5. Деталь на модификации",
    purpose: "Счёт установок, что докупить, сколько выходит, кто ещё ставил",
    next: "→ добавить в гараж",
  },
  {
    href: "/part/wheels-r16-195-50/add",
    name: "6. Добавление установки",
    purpose: "Обязательная цена, фото, как встало. Целевое действие",
    next: "→ гараж",
  },
  {
    href: "/profile",
    name: "6. Гараж",
    purpose: "Автосумма вложений, обещание пуша через две недели",
    next: "→ сборка",
  },
  {
    href: "/build",
    name: "7. Публичная сборка",
    purpose: "Респекты на сборку и на каждую установку, шеринг в чат",
    next: "→ профиль",
  },
  {
    href: "/profile",
    name: "8. Профиль",
    purpose: "Вложено, респекты, место в недельном топе по своему кузову",
    next: "—",
  },
];

export default function FlowPage() {
  return (
    <main className="mx-auto w-full max-w-[760px] bg-white p-6 text-neutral-900">
      <h1 className="text-2xl font-semibold">Гараж — карта экранов</h1>
      <p className="pt-2 text-sm text-neutral-600">
        Фаза 2: каркасы. Вёрстка настоящая, тексты настоящие, отделки нет — визуал приходит
        в фазе 3 из библиотеки компонентов.
      </p>

      <h2 className="pt-6 text-sm font-semibold">Happy path</h2>
      <p className="pt-1 text-sm">
        Выбрал кузов → выбрал модификацию → увидел, что ставят на такие же → открыл деталь →
        понял, что встанет и что докупить → поставил себе → гараж посчитал сумму → поделился
        сборкой → получил респект → вернулся в ленту.
      </p>

      <div className="flex flex-col gap-2 pt-6">
        {screens.map((s) => (
          <Link key={s.href} href={s.href} className="border border-neutral-300 px-3 py-3">
            <div className="text-sm font-semibold">{s.name}</div>
            <div className="pt-1 text-xs text-neutral-600">{s.purpose}</div>
            <div className="pt-1 text-xs text-neutral-500">
              {s.href} · {s.next}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="pt-8 text-sm font-semibold">Чего здесь сознательно нет</h2>
      <ul className="list-disc pt-2 pl-5 text-sm">
        <li>Экрана регистрации — пользователя опознаёт Telegram</li>
        <li>Ленты подписок — лента есть, но фильтруется по кузову, а не по тем, на кого подписан</li>
        <li>Отдельной вкладки гаража — гараж живёт в профиле, это одна сущность «моя машина»</li>
        <li>Комментариев к чужим сборкам — только респект, жест без текста</li>
        <li>Звёздных рейтингов — вместо них счёт установок</li>
      </ul>
    </main>
  );
}
