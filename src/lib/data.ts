// Данные каркаса. Засев взят из фазы 1 (GRANTA_TUNING_RESEARCH.md): реальные параметры,
// реальные диапазоны цен, реальные наблюдения из тредов granta-auto.ru и drive2.ru.
// Lorem запрещён — тексты здесь те же, что пойдут в продукт.

export type Body = {
  code: string;
  name: string;
  years: string;
  note: string;
};

export type Modification = {
  id: string;
  name: string;
  engine: string;
  power: string;
  gearbox: string;
  years: string;
};

export type Fitment = "fits" | "no" | "unknown";

export type Review = {
  author: string;
  modification: string;
  fitment: "clean" | "reworked";
  extra: string;
  partPrice: number;
  workPrice: number;
  longTerm: string;
  respects: number;
};

export type Part = {
  slug: string;
  category: string;
  name: string;
  spec: string;
  priceFrom: number;
  priceTo: number;
  installFrom: number;
  installTo: number;
  fitment: Record<string, Fitment>;
  alsoNeeded: string[];
  installedCount: number;
  reworkedCount: number;
  difficulty: string;
  time: string;
  shop: string;
  article: string;
  reviews: Review[];
};

export const bodies: Body[] = [
  { code: "2190", name: "Седан", years: "2011 — н.в.", note: "до 2018 — дорестайл, с 2018 — FL" },
  { code: "2191", name: "Лифтбек", years: "2014 — н.в.", note: "кузовные детали с седаном не взаимозаменяемы" },
  { code: "2192", name: "Хэтчбек", years: "2018 — н.в.", note: "только FL" },
  { code: "2194", name: "Универсал и Cross", years: "2018 — н.в.", note: "у Cross увеличенный клиренс" },
];

export const modifications: Modification[] = [
  { id: "8v", name: "1.6 8V", engine: "11183 / 11186", power: "87 л.с.", gearbox: "МКПП, АМТ", years: "2011 — н.в." },
  { id: "16v", name: "1.6 16V", engine: "21127", power: "106 л.с.", gearbox: "МКПП, АКПП", years: "2013 — н.в." },
  { id: "16v-sport", name: "1.6 16V Drive Active / Sport", engine: "21179", power: "122 л.с.", gearbox: "МКПП", years: "2018 — н.в." },
];

export const categories = [
  { slug: "wheels", name: "Диски и вылет", note: "Разболтовка 4×98, ЦО 58.6" },
  { slug: "suspension", name: "Занижение и подвеска", note: "" },
  { slug: "chip", name: "Прошивки и чип-тюнинг", note: "" },
  { slug: "exhaust", name: "Выхлоп", note: "" },
  { slug: "light", name: "Свет и линзы", note: "" },
  { slug: "body", name: "Обвес и бамперы", note: "" },
  { slug: "noise", name: "Шумоизоляция", note: "" },
  { slug: "brakes", name: "Тормоза", note: "" },
  { slug: "interior", name: "Салон", note: "" },
];

export const parts: Part[] = [
  {
    slug: "wheels-r16-195-50",
    category: "wheels",
    name: "Литые диски R16 4×98 ET38 + резина 195/50",
    spec: "6.5J × 16, ЦО 58.6, вылет 38",
    priceFrom: 24000,
    priceTo: 36600,
    installFrom: 1200,
    installTo: 2500,
    fitment: { "8v": "fits", "16v": "fits", "16v-sport": "fits" },
    alsoNeeded: [],
    installedCount: 14,
    reworkedCount: 0,
    difficulty: "Шиномонтаж",
    time: "1 час",
    shop: "Маркетплейс",
    article: "—",
    reviews: [
      {
        author: "om777",
        modification: "2190 седан · 1.6 16V",
        fitment: "clean",
        extra: "Ничего не докупал",
        partPrice: 28400,
        workPrice: 1800,
        longTerm: "Идеально, нигде не задевает, ничего не шоркает",
        respects: 31,
      },
    ],
  },
  {
    slug: "wheels-r15-195-60",
    category: "wheels",
    name: "Литые диски R15 4×98 ET35 + резина 195/60",
    spec: "6J × 15, ЦО 58.6, вылет 35",
    priceFrom: 16000,
    priceTo: 22000,
    installFrom: 1200,
    installTo: 2500,
    fitment: { "8v": "fits", "16v": "fits", "16v-sport": "unknown" },
    alsoNeeded: ["Проставки, если задевает при полном повороте"],
    installedCount: 9,
    reworkedCount: 4,
    difficulty: "Шиномонтаж",
    time: "1 час",
    shop: "Маркетплейс",
    article: "—",
    reviews: [
      {
        author: "ДенисDS",
        modification: "2190 седан · 1.6 8V",
        fitment: "reworked",
        extra: "Задевает при полном повороте — на 185/60 проблема уходит",
        partPrice: 19200,
        workPrice: 1600,
        longTerm: "Если хоть немного задевает — потом вышаркает крылья",
        respects: 12,
      },
    ],
  },
  {
    slug: "wheels-4x100-adapters",
    category: "wheels",
    name: "Проставки-адаптеры 4×98 → 4×100",
    spec: "Толщина 15 мм, с удлинёнными шпильками",
    priceFrom: 3400,
    priceTo: 6900,
    installFrom: 1000,
    installTo: 2000,
    fitment: { "8v": "unknown", "16v": "unknown", "16v-sport": "unknown" },
    alsoNeeded: ["Удлинённые шпильки", "Проверка вылета после установки"],
    installedCount: 3,
    reworkedCount: 2,
    difficulty: "Средняя",
    time: "2 часа",
    shop: "Профильный магазин",
    article: "—",
    reviews: [],
  },
  {
    slug: "brakes-r14",
    category: "brakes",
    name: "Тормозные диски R14 вентилируемые",
    spec: "Взамен штатных 13″",
    priceFrom: 3800,
    priceTo: 7400,
    installFrom: 2500,
    installTo: 4500,
    fitment: { "8v": "fits", "16v": "fits", "16v-sport": "fits" },
    alsoNeeded: ["Скоба суппорта R14 — штатная R13 не подойдёт", "Направляющая колодок", "Колёса R15 и больше"],
    installedCount: 7,
    reworkedCount: 1,
    difficulty: "Нужен сервис",
    time: "3 часа",
    shop: "Профильный магазин",
    article: "—",
    reviews: [
      {
        author: "nikei007",
        modification: "2190 седан · 1.6 8V",
        fitment: "reworked",
        extra: "Скобу суппорта R14 докупал отдельно — узнал про неё уже после покупки дисков",
        partPrice: 5200,
        workPrice: 3000,
        longTerm: "Тормозит заметно лучше, вопросов нет",
        respects: 18,
      },
    ],
  },
  {
    slug: "springs-70-50",
    category: "suspension",
    name: "Пружины занижения −70 перед / −50 зад",
    spec: "Комплект на круг",
    priceFrom: 6000,
    priceTo: 12000,
    installFrom: 4000,
    installTo: 7000,
    fitment: { "8v": "fits", "16v": "fits", "16v-sport": "unknown" },
    alsoNeeded: ["Отбойники укороченные", "Развал-схождение после установки"],
    installedCount: 11,
    reworkedCount: 3,
    difficulty: "Нужен сервис",
    time: "4 часа",
    shop: "Профильный магазин",
    article: "—",
    reviews: [],
  },
  {
    slug: "exhaust-4-2-1",
    category: "exhaust",
    name: "Паук 4-2-1 нержавейка, 16 клапанов",
    spec: "Под 21127 / 21179",
    priceFrom: 3190,
    priceTo: 7290,
    installFrom: 3000,
    installTo: 6000,
    fitment: { "8v": "no", "16v": "fits", "16v-sport": "fits" },
    alsoNeeded: ["Гофра", "Прокладки выпускного коллектора", "Прошивка под изменённый выпуск"],
    installedCount: 6,
    reworkedCount: 2,
    difficulty: "Нужен сервис",
    time: "4 часа",
    shop: "Профильный магазин",
    article: "—",
    reviews: [],
  },
  {
    slug: "front-bumper-fl",
    category: "body",
    name: "Передний бампер, неоригинал",
    spec: "Под окрас, крепления штатные",
    priceFrom: 6500,
    priceTo: 14000,
    installFrom: 2000,
    installTo: 5000,
    fitment: { "8v": "unknown", "16v": "unknown", "16v-sport": "unknown" },
    alsoNeeded: ["Покраска", "Крепёж и клипсы", "Запас времени на подгонку"],
    installedCount: 4,
    reworkedCount: 4,
    difficulty: "Средняя",
    time: "5 часов",
    shop: "Профильный магазин",
    article: "—",
    reviews: [
      {
        author: "Бортжурнал на Drive2",
        modification: "2190 седан · 1.6 16V",
        fitment: "reworked",
        extra: "Короче на 5–7 мм, у фары щель 5–8 мм. Подгонял напильником и шуруповёртом",
        partPrice: 9800,
        workPrice: 0,
        longTerm: "Пять часов вместо получаса. Заголовок своего поста автор назвал «как купить геморрой»",
        respects: 22,
      },
    ],
  },
];

export const fitmentLabel: Record<Fitment, string> = {
  fits: "Подходит вашей Гранте",
  no: "Не подходит вашей модификации",
  unknown: "Совместимость не подтверждена",
};

// Лента. Единица ленты — не пост, а установка: деталь, цена, встало или дорабатывал, фото.
// Это и отличает нас от Drive2, где пост — свободный текст, из которого ничего не извлечь.
export type FeedItem = {
  id: string;
  author: string;
  car: string;
  bodyCode: string;
  partSlug: string;
  partName: string;
  category: string;
  fitment: "clean" | "reworked";
  extra: string;
  total: number;
  respects: number;
  when: string;
};

export const feed: FeedItem[] = [
  {
    id: "f1",
    author: "om777",
    car: "Седан, 1.6 16V",
    bodyCode: "2190",
    partSlug: "wheels-r16-195-50",
    partName: "Литые диски R16 4×98 ET38 + резина 195/50",
    category: "wheels",
    fitment: "clean",
    extra: "Ничего не докупал",
    total: 30200,
    respects: 31,
    when: "вчера",
  },
  {
    id: "f2",
    author: "nikei007",
    car: "Седан, 1.6 8V",
    bodyCode: "2190",
    partSlug: "brakes-r14",
    partName: "Тормозные диски R14 вентилируемые",
    category: "brakes",
    fitment: "reworked",
    extra: "Скобу суппорта R14 докупал отдельно",
    total: 8200,
    respects: 18,
    when: "3 дня назад",
  },
  {
    id: "f3",
    author: "ДенисDS",
    car: "Седан, 1.6 8V",
    bodyCode: "2190",
    partSlug: "wheels-r15-195-60",
    partName: "Литые диски R15 4×98 ET35 + резина 195/60",
    category: "wheels",
    fitment: "reworked",
    extra: "Задевает при полном повороте, ушёл на 185/60",
    total: 20800,
    respects: 12,
    when: "неделю назад",
  },
  {
    id: "f4",
    author: "Бортжурнал на Drive2",
    car: "Седан, 1.6 16V",
    bodyCode: "2190",
    partSlug: "front-bumper-fl",
    partName: "Передний бампер, неоригинал",
    category: "body",
    fitment: "reworked",
    extra: "Короче на 5–7 мм, пять часов подгонки",
    total: 9800,
    respects: 22,
    when: "две недели назад",
  },
  {
    id: "f5",
    author: "Лифтбек 16V",
    car: "Лифтбек, 1.6 16V",
    bodyCode: "2191",
    partSlug: "springs-70-50",
    partName: "Пружины занижения −70 перед / −50 зад",
    category: "suspension",
    fitment: "clean",
    extra: "Отбойники укорачивал, развал делал сразу",
    total: 14500,
    respects: 9,
    when: "две недели назад",
  },
];

// Сборки целиком — вторая сущность ленты: не одна деталь, а машина как проект.
export type Build = {
  id: string;
  author: string;
  car: string;
  bodyCode: string;
  total: number;
  count: number;
  respects: number;
  highlights: string[];
};

export const builds: Build[] = [
  {
    id: "b1",
    author: "om777",
    car: "Седан, 1.6 16V",
    bodyCode: "2190",
    total: 96400,
    count: 7,
    respects: 31,
    highlights: ["Диски R16 195/50", "Паук 4-2-1", "Шумоизоляция"],
  },
  {
    id: "b2",
    author: "Бортжурнал на Drive2",
    car: "Седан, 1.6 16V",
    bodyCode: "2190",
    total: 74100,
    count: 5,
    respects: 22,
    highlights: ["Передний бампер", "Свет", "Салон"],
  },
  {
    id: "b3",
    author: "nikei007",
    car: "Седан, 1.6 8V",
    bodyCode: "2190",
    total: 41200,
    count: 4,
    respects: 18,
    highlights: ["Тормоза R14", "Занижение −70", "Диски R15"],
  },
];
