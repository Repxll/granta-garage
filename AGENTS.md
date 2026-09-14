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

## Стиль — светлый монохром

Визуальный язык снят с design30.club (референс выбрал Илья) и зафиксирован в токенах
`src/app/globals.css` (блок `:root`) и в стори `Foundations/Основы`. Взят именно язык —
палитра, ритм, характер; чужой код и ассеты не копировались.

Правила системы:
- тёплый серый фон `#F0F0F2`, белые карточки, **теней нет** — разделение цветом;
- основное действие — почти чёрная кнопка `#0C0C0E`: вес и форма вместо цвета;
- базовый радиус 14px, кнопки и бейджи — pill;
- цвет точечно: красный `--respect` как единственное живое пятно;
- ссылки обозначаются подчёркиванием, а не цветом — акцент занят чёрным;
- моноширинный для цен, вылетов и артикулов (наша функциональная добавка к референсу).

Тёмная тема описана в блоке `.dark` как вторичная, но продукт по умолчанию светлый.

Семантика вердикта о посадке живёт в токенах `--fit-ok` / `--fit-rework` / `--fit-no` /
`--fit-unknown`. Три состояния равноправны: «не подтверждено» не маскируется под «подходит».

## Кнопки-ссылки

Base UI Button не поддерживает `asChild`. Ссылка, выглядящая кнопкой, — это
`<Link className={buttonVariants({ ... })}>`, а не `<Button asChild>`.

## Анимации

Библиотека — `motion`. В клиентских компонентах импорт из `motion/react`
(`motion/react-client` — серверный вариант, в клиенте анимации зависают).
Анимации живут в компонентах, а не в экранах: входные появления, каскад списков,
пружины для акцентов, отклик на нажатие. `prefers-reduced-motion` уважается через
`MotionConfig reducedMotion="user"` в layout.

## Приёмка

Все состояния в Storybook, узкий экран 360px без горизонтального скролла,
тап-зоны ≥44px, видимый focus-visible, реальные данные вместо lorem,
`npm run build` проходит, консоль чистая.

## Продуктовые документы

Бриф и ресерч — уровнем выше: `../GRANTA_TUNING_PRODUCT_BRIEF.md`,
`../GRANTA_TUNING_RESEARCH.md`. Отложенное — `LATER.md`.
