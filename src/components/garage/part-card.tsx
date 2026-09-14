import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Part, Fitment } from "@/lib/data";
import { FitBadge } from "./fit-badge";
import { InstallCounter } from "./install-counter";
import { money } from "@/lib/format";

// Деталь в списке каталога. Показывает вердикт и счёт сразу — человек не должен
// открывать карточку, чтобы понять, встанет ли.
export function PartCard({ part, fitment, className }: { part: Part; fitment: Fitment; className?: string }) {
  return (
    <Link
      href={`/part/${part.slug}`}
      className={cn(
        "block rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        fitment === "no" && "opacity-60",
        className,
      )}
    >
      <div className="text-sm font-semibold leading-snug">{part.name}</div>
      <div className="pt-1 font-mono text-xs text-muted-foreground">{part.spec}</div>

      <div className="pt-2 font-mono text-sm tabular-nums">
        {money(part.priceFrom)} — {money(part.priceTo)}
      </div>

      <div className="pt-2">
        {fitment === "fits" ? (
          <InstallCounter installed={part.installedCount} reworked={part.reworkedCount} compact />
        ) : (
          <FitBadge fitment={fitment} size="sm" />
        )}
      </div>
    </Link>
  );
}
