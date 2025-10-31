import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const PixelCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rpg-panel",
          className
        )}
        {...props}
      />
    );
  }
);
PixelCard.displayName = "PixelCard";

export { PixelCard };