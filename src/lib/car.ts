import { bodies, modifications } from "./data";

export function carLabel(body: string | null, modification: string | null) {
  if (!body || !modification) return null;
  const b = bodies.find((x) => x.code === body);
  const m = modifications.find((x) => x.id === modification);
  if (!b || !m) return null;
  return `${b.name}, ${m.name}`;
}
