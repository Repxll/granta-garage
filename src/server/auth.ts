import { verifyInitData, devUser, type TgUser } from "./telegram";
import { db } from "./db";

// Каждый запрос авторизуется заново: клиент шлёт initData в заголовке,
// сервер проверяет подпись и заводит пользователя, если тот пришёл впервые.
export async function authorize(req: Request): Promise<TgUser | null> {
  const initData = req.headers.get("x-telegram-init-data") ?? "";
  const token = process.env.TELEGRAM_BOT_TOKEN ?? "";

  const user = verifyInitData(initData, token) ?? devUser();
  if (!user) return null;

  const q = await db();
  await q(
    `insert into users (id, username, first_name) values ($1, $2, $3)
     on conflict (id) do update set username = excluded.username, first_name = excluded.first_name`,
    [user.id, user.username ?? null, user.first_name ?? null],
  );
  return user;
}

export function unauthorized() {
  return Response.json({ error: "Откройте приложение через Telegram" }, { status: 401 });
}
