import { authorize, unauthorized } from "@/server/auth";
import { db } from "@/server/db";
import { parts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const { partSlug, price, workPrice, reworked, hasPhoto } = await req.json();

  if (!parts.some((p) => p.slug === partSlug)) {
    return Response.json({ error: "Неизвестная деталь" }, { status: 400 });
  }
  // Цена, фото и отметка о доработках обязательны — на этом держится и сумма вложений,
  // и право получать респекты. Незаполненную установку в базу не пускаем.
  if (typeof price !== "number" || price < 0 || price > 10_000_000) {
    return Response.json({ error: "Укажите цену детали" }, { status: 400 });
  }
  if (typeof reworked !== "boolean" || hasPhoto !== true) {
    return Response.json({ error: "Нужны фото и отметка, как встало" }, { status: 400 });
  }

  const q = await db();
  const [row] = await q(
    `insert into installs (user_id, part_slug, price, work_price, reworked, has_photo)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (user_id, part_slug) do update set
       price = excluded.price, work_price = excluded.work_price,
       reworked = excluded.reworked, has_photo = excluded.has_photo
     returning id`,
    [user.id, partSlug, Math.round(price), Math.round(Number(workPrice) || 0), reworked, true],
  );

  return Response.json({ ok: true, id: row?.id });
}

export async function DELETE(req: Request) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const { partSlug } = await req.json();
  const q = await db();
  await q(`delete from installs where user_id = $1 and part_slug = $2`, [user.id, partSlug]);
  return Response.json({ ok: true });
}
