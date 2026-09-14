import { authorize, unauthorized } from "@/server/auth";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

// Деталь на модификации: счётчики и отзывы тех, у кого такая же машина.
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const { slug } = await params;
  const q = await db();
  const [me] = await q(`select modification from users where id = $1`, [user.id]);

  const [counts] = await q(
    `select count(*)::int as installed, count(*) filter (where i.reworked)::int as reworked
     from installs i join users u on u.id = i.user_id
     where i.part_slug = $1 and u.modification is not distinct from $2`,
    [slug, me?.modification ?? null],
  );

  const reviews = await q(
    `select i.id, i.price, i.work_price, i.reworked, i.review_text, i.created_at,
            u.first_name, u.username, u.body_code, u.modification,
            (select count(*)::int from respects r where r.target = 'install:' || i.id::text) as respects
     from installs i join users u on u.id = i.user_id
     where i.part_slug = $1 and i.user_id <> $2
     order by (i.review_text is not null) desc, i.created_at desc
     limit 20`,
    [slug, user.id],
  );

  return Response.json({
    installed: counts?.installed ?? 0,
    reworked: counts?.reworked ?? 0,
    reviews,
  });
}
