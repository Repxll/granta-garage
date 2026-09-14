import { authorize, unauthorized } from "@/server/auth";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

// Всё состояние пользователя одним запросом: машина, гараж, свои респекты.
// Клиенту незачем собирать экран из трёх round-trip'ов.
export async function GET(req: Request) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const q = await db();
  const [me] = await q(`select body_code, modification from users where id = $1`, [user.id]);
  const garage = await q(
    `select part_slug, price, work_price, reworked, has_photo, review_text, created_at
     from installs where user_id = $1 order by created_at desc`,
    [user.id],
  );
  const respects = await q(`select target from respects where user_id = $1`, [user.id]);
  const [received] = await q(
    `select count(*)::int as n from respects r
     join installs i on ('install:' || i.id::text) = r.target
     where i.user_id = $1`,
    [user.id],
  );

  return Response.json({
    user: { id: user.id, name: user.first_name ?? user.username ?? "Владелец" },
    car: { body: me?.body_code ?? null, modification: me?.modification ?? null },
    garage,
    respects: respects.map((r) => r.target),
    respectsReceived: received?.n ?? 0,
  });
}
