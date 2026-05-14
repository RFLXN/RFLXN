import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";

type TooltipProviderProps = { children: ReactNode, delay?: number, closeDelay?: number };
type TooltipProps = { children: ReactNode, open?: boolean, triggerId?: string | null };
type TooltipTriggerProps = { children: ReactNode, render: ReactElement, id?: string };
type TooltipContentProps = { children: ReactNode, side?: "top" | "right" | "bottom" | "left" };

function TooltipProvider({
  children,
  delay = 0,
  closeDelay = 0
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delay={delay}
      closeDelay={closeDelay}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}

function Tooltip({ children, open, triggerId }: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      triggerId={triggerId}
    >
      {children}
    </TooltipPrimitive.Root>
  );
}

function TooltipTrigger({ children, render, id }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      id={id}
      render={render}
    >
      {children}
    </TooltipPrimitive.Trigger>
  );
}

function TooltipContent({
  children,
  side = "top"
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        sideOffset={8}
      >
        <TooltipPrimitive.Popup className="z-50 rounded-md border border-app-border-strong bg-app-header px-2.5 py-1.5 text-xs font-medium tracking-[0.02em] text-app-text shadow-[0_10px_30px_rgb(0_0_0_/_0.25)] backdrop-blur-md">
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
