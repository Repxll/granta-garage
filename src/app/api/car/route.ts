import { authorize, unauthorized } from "@/server/auth";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

const BODIES = ["2190", "2191", "2192", "2194"];
const MODS = ["8v", "16v", "16v-sport"];

export async function POST(req: Request) {
  const user = await authorize(req);
  if (!user) return unauthorized();

  const { body, modification } = await req.json();
  // Значения приходят от клиента, поэтому сверяем со списком, а не пишем как есть.
  if (!BODIES.includes(body) || !MODS.includes(modification)) {
    return Response.json({ error: "Неизвестная модификация" }, { status: 400 });
  }

  const q = await db();
  await q(`update users set body_code = $2, modification = $3 where id = $1`, [
    user.id,
    body,
    modification,
  ]);
  return Response.json({ ok: true });
}
