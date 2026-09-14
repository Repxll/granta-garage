import { cn } from "@/lib/utils";

// Скелетоны в форме будущего контента, с бегущим бликом — как у референса.
export function Bone({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-[14px]", className)} aria-hidden />;
}

export function InstallCardSkeleton() {
  return (
    <div className="space-y-2">
      <Bone className="aspect-[4/3] w-full" />
      <div className="flex h-8 items-center justify-between">
        <div className="flex items-center gap-2">
          <Bone className="size-8 rounded-full" />
          <div className="space-y-1">
            <Bone className="h-3.5 w-28 rounded-[76px]" />
            <Bone className="h-3 w-20 rounded-[76px]" />
          </div>
        </div>
        <Bone className="h-8 w-[60px] rounded-[76px]" />
      </div>
    </div>
  );
}

export function RowSkeleton() {
  return <Bone className="h-[76px] w-full" />;
}

export function ListSkeleton({ count = 3, kind = "card" }: { count?: number; kind?: "card" | "row" }) {
  const Item = kind === "card" ? InstallCardSkeleton : RowSkeleton;
  return (
    <div className={cn("flex flex-col", kind === "card" ? "gap-6" : "gap-2")}>
      {Array.from({ length: count }).map((_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
}
