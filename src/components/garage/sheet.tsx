"use client";

import { Drawer } from "vaul";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

// Нижняя шторка на vaul с их кривой (--motion-ease-drawer), радиус 20, граббер сверху.
// Без title шапка не рисуется — контент сам ставит свой заголовок (как тред комментариев).
export function Sheet({
  open,
  onOpenChange,
  title,
  ariaTitle,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title?: string;
  ariaTitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[999] bg-black/50" />
        <Drawer.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-[1000] mx-auto flex max-h-[92dvh] w-full max-w-[480px] flex-col rounded-t-[20px] border border-content-border bg-background text-text-primary outline-none",
            "shadow-[var(--popover-shadow)]",
          )}
          style={{ transitionTimingFunction: "var(--motion-ease-drawer)" }}
        >
          <div className="mx-auto mt-2 h-1.5 w-11 shrink-0 rounded-full bg-text-secondary/30" aria-hidden />
          {title ? (
            <header className="flex h-14 shrink-0 items-center justify-between px-3">
              <span className="size-9" />
              <Drawer.Title className="text-base font-semibold">{title}</Drawer.Title>
              <Drawer.Close
                className="motion-interactive motion-icon-feedback motion-pressable flex size-9 items-center justify-center rounded-md hover:bg-control-hover"
                aria-label="Закрыть"
              >
                <Icon icon={XMarkIcon} size={18} />
              </Drawer.Close>
            </header>
          ) : (
            <Drawer.Title className="sr-only">{ariaTitle ?? "Шторка"}</Drawer.Title>
          )}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">{children}</div>
          {footer && (
            <div className="shrink-0 border-t border-border bg-background px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
              {footer}
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
