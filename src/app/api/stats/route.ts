import { authorize, unauthorized } from "@/server/auth";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

// Счётчики для каталога: сколько раз деталь ставили на ту же модификацию и сколько
// человек дорабатывали. Это главный сигнал доверия продукта, поэтому он считается
// из реальных установок, а не берётся из константы.
export async function GET(req: Request) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const q = await db();
  const [me] = await q(`select modification from users where id = $1`, [user.id]);

  const rows = await q(
    `select i.part_slug,
            count(*)::int as installed,
            count(*) filter (where i.reworked)::int as reworked
     from installs i join users u on u.id = i.user_id
     where u.modification is not distinct from $1
     group by i.part_slug`,
    [me?.modification ?? null],
  );

  const stats: Record<string, { installed: number; reworked: number }> = {};
  for (const r of rows) {
    stats[String(r.part_slug)] = { installed: Number(r.installed), reworked: Number(r.reworked) };
  }
  return Response.json({ stats, modification: me?.modification ?? null });
}
