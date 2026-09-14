import { parts } from "@/lib/data";
import PartView from "./view";

export function generateStaticParams() {
  return parts.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PartView slug={slug} />;
}
