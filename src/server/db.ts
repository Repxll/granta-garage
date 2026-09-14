// Один слой данных на две среды: на проде — Neon (Postgres по HTTP, дружит с serverless),
// локально — PGlite (тот же Postgres, скомпилированный в WASM, без отдельного сервера).
// SQL один и тот же, поэтому локальная разработка не расходится с продом.

type Row = Record<string, unknown>;
type Query = (sql: string, params?: unknown[]) => Promise<Row[]>;

let queryImpl: Query | null = null;
let ready: Promise<void> | null = null;

async function createQuery(): Promise<Query> {
  const url = process.env.DATABASE_URL;
  // Vercel кладёт продовый DATABASE_URL и в локальный .env.local. Без этой проверки
  // разработка писала бы в боевую базу: локально всегда PGlite, если не попросили иначе.
  const useRemote = Boolean(url) && (process.env.NODE_ENV === "production" || process.env.USE_REMOTE_DB === "1");

  if (useRemote) {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(url!);
    return async (text, params = []) => (await sql.query(text, params)) as Row[];
  }

  const { PGlite } = await import("@electric-sql/pglite");
  const { mkdirSync } = await import("node:fs");
  // Файл, а не память: между перезапусками дев-сервера данные сохраняются.
  // PGlite не создаёт родительскую папку сам.
  mkdirSync(".data", { recursive: true });
  const pg = new PGlite(".data/granta");
  return async (text, params = []) => (await pg.query(text, params)).rows as Row[];
}

const schema = `
create table if not exists users (
  id bigint primary key,
  username text,
  first_name text,
  body_code text,
  modification text,
  created_at timestamptz not null default now()
);

create table if not exists installs (
  id bigserial primary key,
  user_id bigint not null references users(id) on delete cascade,
  part_slug text not null,
  price integer not null,
  work_price integer not null default 0,
  reworked boolean not null,
  has_photo boolean not null default false,
  -- Отзыв приезжает позже, по пушу «ну как, встало?»
  review_text text,
  review_at timestamptz,
  asked_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, part_slug)
);

create table if not exists respects (
  user_id bigint not null references users(id) on delete cascade,
  target text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, target)
);

create index if not exists installs_user on installs(user_id);
create index if not exists installs_part on installs(part_slug);
create index if not exists respects_target on respects(target);
`;

export async function db(): Promise<Query> {
  if (!ready) {
    ready = (async () => {
      queryImpl = await createQuery();
      for (const stmt of schema.split(";").map((s) => s.trim()).filter(Boolean)) {
        await queryImpl(stmt);
      }
      const { seed } = await import("./seed");
      await seed(queryImpl);
    })();
  }
  await ready;
  return queryImpl!;
}
