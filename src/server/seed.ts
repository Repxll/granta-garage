import { feed } from "@/lib/data";

type Q = (sql: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;

// Засев из фазы 1: реальные наблюдения из тредов granta-auto.ru и drive2.ru,
// разложенные по фиктивным владельцам. Нужен, чтобы первый пользователь увидел
// заполненный каталог, а не пустой экран — классический cold start каталога.
const owners = [
  { id: -1001, name: "om777", body: "2190", mod: "16v" },
  { id: -1002, name: "nikei007", body: "2190", mod: "8v" },
  { id: -1003, name: "ДенисDS", body: "2190", mod: "8v" },
  { id: -1004, name: "Бортжурнал на Drive2", body: "2190", mod: "16v" },
  { id: -1005, name: "Лифтбек 16V", body: "2191", mod: "16v" },
];

const byAuthor: Record<string, number> = {
  om777: -1001,
  nikei007: -1002,
  "ДенисDS": -1003,
  "Бортжурнал на Drive2": -1004,
  "Лифтбек 16V": -1005,
};

export async function seed(q: Q) {
  const [existing] = await q(`select count(*)::int as n from users where id < 0`);
  if (Number(existing?.n ?? 0) > 0) return;

  for (const o of owners) {
    await q(
      `insert into users (id, first_name, body_code, modification) values ($1, $2, $3, $4)
       on conflict (id) do nothing`,
      [o.id, o.name, o.body, o.mod],
    );
  }

  for (const f of feed) {
    const uid = byAuthor[f.author];
    if (!uid) continue;
    await q(
      `insert into installs (user_id, part_slug, price, work_price, reworked, has_photo, review_text, review_at, asked_at)
       values ($1, $2, $3, 0, $4, true, $5, now(), now())
       on conflict (user_id, part_slug) do nothing`,
      [uid, f.partSlug, f.total, f.fitment === "reworked", f.extra],
    );
  }
}
