import { bodies } from "@/lib/data";
import ModificationPicker from "./picker";

export function generateStaticParams() {
  return bodies.map((b) => ({ body: b.code }));
}

export default async function Page({ params }: { params: Promise<{ body: string }> }) {
  const { body } = await params;
  return <ModificationPicker body={body} />;
}
