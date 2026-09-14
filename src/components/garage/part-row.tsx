import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import type { Part, Fitment } from "@/lib/data";
import { FitBadge } from "./fit-badge";
import { Money } from "./money";
import { Icon } from "./icon";
import { plural } from "@/lib/format";

// Строка каталога: белая карточка 14px, имя 14/500, параметры mono 12, цена 14/700,
// справа вердикт-пилюля и шеврон. Список строк — с зазором 8, как их список.
export function PartRow({
  part,
  fitment,
  installed,
  reworked,
  className,
}: {
  part: Part;
  fitment: Fitment;
  installed: number;
  reworked: number;
  className?: string;
}) {
  return (
    <Link
      href={`/part/${part.slug}`}
      className={cn(
        "motion-interactive motion-pressable flex items-center gap-3 rounded-[14px] bg-surface p-3 hover:bg-control-hover",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        fitment === "no" && "opacity-60",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium leading-snug text-text-primary">{part.name}</div>
        <div className="mt-0.5 truncate font-mono text-xs text-text-secondary">{part.spec}</div>
        <div className="mt-2 whitespace-nowrap text-sm font-bold text-text-primary">
          <Money value={part.priceFrom} /> — <Money value={part.priceTo} />
        </div>
        {fitment === "fits" && installed > 0 && (
          <div className="mt-0.5 truncate text-xs text-text-secondary">
            {installed} {plural(installed, "установка", "установки", "установок")}
            {reworked > 0 ? `, ${reworked} с доработкой` : ", все без доработок"}
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <FitBadge fitment={fitment} size="sm" />
        <Icon icon={ChevronRightIcon} size={16} className="text-text-secondary/60" />
      </div>
    </Link>
  );
}
