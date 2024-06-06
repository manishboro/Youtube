import * as React from "react";
import { twMerge } from "tailwind-merge";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-[1500] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export interface TooltipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  asChild?: boolean;
}

const Tooltip = React.forwardRef<HTMLButtonElement, TooltipProps>(({ title, children, asChild }, ref) => {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger
          className={twMerge(!asChild && "bg-transparent border-none cursor-pointer font-inherit text-base")}
          asChild={asChild}
        >
          {children}
        </TooltipTrigger>
        
        <TooltipContent className="bg-background h-max border border-solid border-border" >
          <p className="m-0">{title}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
