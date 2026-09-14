import { parts } from "./data";

export const partName = (slug: string) => parts.find((p) => p.slug === slug)?.name ?? slug;
export const partCategory = (slug: string) => parts.find((p) => p.slug === slug)?.category ?? "";
