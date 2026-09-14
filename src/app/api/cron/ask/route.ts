import { db } from "@/server/db";
import { parts } from "@/lib/data";

export const dynamic = "force-dynamic";

// Тот самый пуш через две недели. На нём держится всё наполнение каталога отзывами:
// человек не пишет пост по своей воле — он отвечает на один вопрос.
const DAYS = 14;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (secret && auth !== `Bearer ${secret}`) {
    return Response.json({ error: "forbidden" }, { status: 401 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return Response.json({ error: "нет токена бота" }, { status: 500 });

  const q = await db();
  const due = await q(
    `select id, user_id, part_slug from installs
     where review_text is null
       and asked_at is null
       and created_at < now() - interval '${DAYS} days'
     limit 30`,
  );

  let sent = 0;
  for (const row of due) {
    const part = parts.find((p) => p.slug === row.part_slug);
    const name = part?.name ?? "деталь";
    const text = `Две недели назад вы поставили: ${name}.\n\nНу как, встало нормально? Ответьте одним сообщением — это станет отзывом для тех, кто выбирает то же самое.`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: row.user_id, text }),
    });

    // Пользователь мог заблокировать бота — помечаем всё равно, чтобы не долбиться каждый день.
    await q(`update installs set asked_at = now() where id = $1`, [row.id]);
    if (res.ok) sent++;
  }

  return Response.json({ due: due.length, sent });
}
