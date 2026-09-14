<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Интерфейс собирается только из библиотеки

Источник правды по компонентам — Storybook (`npm run storybook`, порт 6007).
Макетов в Figma нет: компоненты и все их состояния живут в сторях.

Порядок при любой UI-задаче:

1. **Сначала ищем компонент** в `src/components/ui/**` (shadcn, Base UI) и в своей библиотеке
   `src/components/garage/**`. Есть подходящий — используем его, свою версию не пишем.
2. **Нет компонента** — сначала создаём его, проверяем визуально, **добавляем стори со всеми
   состояниями**, и только потом применяем на экране.
3. **Изменил компонент** — обнови стори. Расхождение витрины и прода = баг.
4. **Новый экран или состояние** — стори в `Screens/*` плюс узел в `Product/Карта экранов`.
   Экран без стори считается несделанным.

Одинаковых по смыслу сущностей быть не должно: одна primary-кнопка, один сегмент-контрол,
один способ показать вердикт о посадке, одно пустое состояние.

## Стиль — снят с design30.club один в один

Референс выбрал Илья, и взят не «по мотивам», а точно: токены (HSL-триплеты их системы,
свет и тёмная), радиусы, типографика, устройство компонентов и система движения.
Всё лежит в `src/app/globals.css` и в стори `Foundations/Основы`. Чужой код и ассеты
не копировались — снимались вычисленные стили и структура.

Опорные правила:
- фон `hsl(240 7% 94.5%)`, поверхности белые, **теней нет** — разделение цветом;
- радиусы: контролы и поля 12, карточки 14, диалог/шторка 20, чипы/кнопки/счётчики — pill (76);
- шрифт `system-ui`; заголовок обложки 22/700, @handle 18/600, шапка 16/600,
  имя автора 14/500, счётчик 14/700, чип 12/700, дата 12/400;
- иконки — **Heroicons 24 solid на 18px** через `<Icon>`; сердце неактивное — outline на 45%;
- primary-кнопка — почти чёрная pill h-10 px-6 14/600 (`Button size="xl"`);
- цвет точечно: vote-up/vote-down для вердикта, красный только на активном респекте.

## Движение — их система, не framer-motion

Утилиты в `globals.css`: `motion-interactive` (переходы .22s ease-out по цвету/фону/границе/
тени/трансформу), `motion-pressable` (:active → scale .97 за .11s), `motion-icon-feedback`
(иконка в `data-icon-container` растёт до 1.06 на hover, .92 на нажатии), `motion-fade-in`
(4px вверх, .22s, `both`). Список появляется каскадом через `<FadeIn index>` — задержка
28 мс на элемент, потолок 10. Шторка — `vaul` с `--motion-ease-drawer`.
`prefers-reduced-motion` гасит всё. Библиотеку `motion` в компонентах не использовать.

## Компоненты библиотеки (`src/components/garage`)

`AppHeader` (sticky h-12, назад/заголовок/действие) · `IconButton` (40/32, радиус 12) ·
`Chip` (h-8 pill, control-surface) · `CountPill` (h-8 min-w-54 радиус 76 — реакции) ·
`VoteControl` (h-10 min-w-136 — большой счётчик профиля) · `InstallCard` (карточка работы:
медиа 4/3 + оверлеи + футер с автором и пилюлями) · `PartRow` · `AuthorRow` · `Avatar` ·
`ListHeader` · `FitBadge` · `Segmented` · `Sheet` (vaul, граббер, без шапки если нет title) ·
`EmptyState` · скелетоны `shimmer` · **тред отзывов** (`comments.tsx`: `CommentsHeader` с
квадратным бейджем, `CommentItem` — аватар 40 / имя 16·600 / серый пузырь 14px / пилюля-лайк /
дата 14; `CommentComposer` — поле радиусом 20, смайлик, круглая кнопка 48) · `ReactionRow` +
`ReactionStat` (число 18·700 + иконка 20, справа под медиа) · `ReviewsThread` / `ReviewsSheet`.

Экран гаража (`/profile`) — по банковскому экрану «моя машина» (референс Ильи, Т-Банк Авто):
`GarageHero` (тёмный hero, имя 32/700, чип модификации, `CarSilhouette` по кузову, точки),
`StatusCard` (события, тёмно-зелёный/янтарный градиент), `Sheet24` (лист скруглением 24),
`QuickTiles`/`QuickTile` (плитки 64/16 на пастельных подложках). Картинка машины — свой SVG.

Тема следует `Telegram.WebApp.colorScheme` (класс `.dark` на html); в браузере — `?theme=dark`.
Отзывы = комментарии референса, но писать может только тот, кто деталь поставил.

## Кнопки-ссылки

Base UI Button не поддерживает `asChild`. Ссылка, выглядящая кнопкой, — это
`<Link className={buttonVariants({ ... })}>`, а не `<Button asChild>`.


## Приёмка

Все состояния в Storybook, узкий экран 360px без горизонтального скролла,
тап-зоны ≥44px, видимый focus-visible, реальные данные вместо lorem,
`npm run build` проходит, консоль чистая.

## Продуктовые документы

Бриф и ресерч — уровнем выше: `../GRANTA_TUNING_PRODUCT_BRIEF.md`,
`../GRANTA_TUNING_RESEARCH.md`. Отложенное — `LATER.md`.
