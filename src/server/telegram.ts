import { createHmac, timingSafeEqual } from "node:crypto";

// Проверка initData по алгоритму Telegram: подпись считается ключом, производным
// от токена бота. Без этой проверки любой мог бы прислать чужой user_id и писать
// в чужой гараж — поэтому она обязательна на каждом запросе, а не один раз при входе.
export type TgUser = { id: number; username?: string; first_name?: string };

export function verifyInitData(initData: string, botToken: string): TgUser | null {
  if (!initData || !botToken) return null;

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;

  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .map(([k, v]) => [k, v] as const)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  const secret = createHmac("sha256", "WebAppData").update(botToken).digest();
  const computed = createHmac("sha256", secret).update(dataCheckString).digest("hex");

  const a = Buffer.from(computed, "hex");
  const b = Buffer.from(hash, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  // Протухшая подпись: initData живёт долго, но не вечно — сутки достаточно.
  const authDate = Number(params.get("auth_date") ?? 0);
  if (!authDate || Date.now() / 1000 - authDate > 86400) return null;

  try {
    const user = JSON.parse(params.get("user") ?? "null");
    if (!user?.id) return null;
    return { id: Number(user.id), username: user.username, first_name: user.first_name };
  } catch {
    return null;
  }
}

// В разработке Telegram нет: initData подделать нечем, поэтому пускаем фиктивного
// пользователя — но только когда явно разрешено переменной окружения.
export function devUser(): TgUser | null {
  if (process.env.ALLOW_DEV_USER !== "1") return null;
  return { id: 1, username: "dev", first_name: "Разработчик" };
}
