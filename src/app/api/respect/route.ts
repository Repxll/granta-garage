import { authorize, unauthorized } from "@/server/auth";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

// Респект — переключатель. Свой собственный поставить нельзя: цель проверяется
// на принадлежность чужой установке.
export async function POST(req: Request) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const { target } = await req.json();
  if (typeof target !== "string" || target.length > 120) {
    return Response.json({ error: "Некорректная цель" }, { status: 400 });
  }

  const q = await db();

  const installId = target.startsWith("install:") ? Number(target.slice(8)) : null;
  if (installId) {
    const [own] = await q(`select 1 as x from installs where id = $1 and user_id = $2`, [
      installId,
      user.id,
    ]);
    if (own) return Response.json({ error: "Респект себе не ставится" }, { status: 400 });
  }

  const [existing] = await q(`select 1 as x from respects where user_id = $1 and target = $2`, [
    user.id,
    target,
  ]);

  if (existing) {
    await q(`delete from respects where user_id = $1 and target = $2`, [user.id, target]);
  } else {
    await q(`insert into respects (user_id, target) values ($1, $2)`, [user.id, target]);
  }

  const [count] = await q(`select count(*)::int as n from respects where target = $1`, [target]);
  return Response.json({ active: !existing, count: count?.n ?? 0 });
}
