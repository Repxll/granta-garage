import { Skeleton } from "@/components/ui/skeleton";

// Загрузка — скелетоном в форме будущего контента, а не спиннером поверх экрана:
// человек видит, что именно грузится, и не гадает.
export function PartCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-3 h-4 w-2/5" />
      <Skeleton className="mt-3 h-3 w-3/5" />
    </div>
  );
}

export function FeedCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex justify-between gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="mt-2 h-3 w-28" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-3 w-4/5" />
      <Skeleton className="mt-3 h-5 w-24" />
      <Skeleton className="mt-3 h-9 w-28 rounded-md" />
    </div>
  );
}

export function ListSkeleton({ count = 3, kind = "feed" }: { count?: number; kind?: "feed" | "part" }) {
  const Item = kind === "feed" ? FeedCardSkeleton : PartCardSkeleton;
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
}
