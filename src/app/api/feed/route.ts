import { authorize, unauthorized } from "@/server/auth";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

// Лента — чужие установки. Фильтр по кузову, а не по подпискам: так контент
// релевантен с первого дня и не требует критической массы.
export async function GET(req: Request) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const scope = new URL(req.url).searchParams.get("scope") ?? "mine";
  const q = await db();
  const [me] = await q(`select body_code from users where id = $1`, [user.id]);

  const where =
    scope === "mine" && me?.body_code
      ? `where i.user_id <> $1 and u.body_code = $2`
      : `where i.user_id <> $1`;
  const params = scope === "mine" && me?.body_code ? [user.id, me.body_code] : [user.id];

  const rows = await q(
    `select i.id, i.part_slug, i.price, i.work_price, i.reworked, i.review_text, i.created_at,
            u.first_name, u.username, u.body_code, u.modification,
            (select count(*)::int from respects r where r.target = 'install:' || i.id::text) as respects
     from installs i join users u on u.id = i.user_id
     ${where}
     order by i.created_at desc
     limit 50`,
    params,
  );

  return Response.json({ items: rows });
}
