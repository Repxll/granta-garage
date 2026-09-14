import { authorize, unauthorized } from "@/server/auth";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

// Отзыв приходит ответом на пуш «ну как, встало?» — то есть спустя время,
// когда человек уже поездил. Поэтому это отдельное действие, а не поле при добавлении.
export async function POST(req: Request) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const { partSlug, text } = await req.json();
  if (typeof text !== "string" || text.trim().length < 3 || text.length > 2000) {
    return Response.json({ error: "Напишите пару слов" }, { status: 400 });
  }

  const q = await db();
  await q(
    `update installs set review_text = $3, review_at = now()
     where user_id = $1 and part_slug = $2`,
    [user.id, partSlug, text.trim()],
  );
  return Response.json({ ok: true });
}
