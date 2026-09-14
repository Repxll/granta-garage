import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

// Большой счётчик профиля (у них — репутация): h-10, min-w-136, радиус 76,
// шевроны по бокам, число 18/700 по центру, подпись 14 под ним.
// chevrons=false — тот же контрол для суммы вложений.
export function VoteControl({
  value,
  label,
  chevrons = true,
  suffix,
  className,
}: {
  value: number;
  label: string;
  chevrons?: boolean;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="inline-flex h-10 min-w-[136px] items-center justify-center gap-3 rounded-[76px] bg-vote-control px-3.5">
        {chevrons && <Icon icon={ChevronDownIcon} size={18} className="text-text-secondary/60" />}
        <span className="tabular text-lg font-bold text-text-primary">
          {value.toLocaleString("ru-RU")}
          {suffix ? ` ${suffix}` : ""}
        </span>
        {chevrons && <Icon icon={ChevronUpIcon} size={18} className="text-text-secondary/60" />}
      </div>
      <span className="text-sm text-text-secondary/80">{label}</span>
    </div>
  );
}
