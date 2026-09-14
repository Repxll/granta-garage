"use client";

import { Drawer } from "vaul";
import { cn } from "@/lib/utils";

// Нижняя шторка на vaul с их кривой (--motion-ease-drawer) и радиусом 20 — как их диалоги.
export function Sheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[999] bg-black/40" />
        <Drawer.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-[1000] mx-auto flex max-h-[92dvh] w-full max-w-[480px] flex-col rounded-t-[20px] border border-content-border bg-surface text-text-primary outline-none",
            "shadow-[var(--popover-shadow)]",
          )}
          style={{ transitionTimingFunction: "var(--motion-ease-drawer)" }}
        >
          <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-surface-muted" aria-hidden />
          <header className="flex h-14 items-center justify-between px-3">
            <span className="size-9" />
            <Drawer.Title className="text-base font-semibold">{title}</Drawer.Title>
            <Drawer.Close
              className="motion-interactive motion-icon-feedback motion-pressable flex size-9 items-center justify-center rounded-md hover:bg-control-hover"
              aria-label="Закрыть"
            >
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
                <path d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </Drawer.Close>
          </header>
          <div className="overflow-y-auto px-4 pb-[max(16px,env(safe-area-inset-bottom))]">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
