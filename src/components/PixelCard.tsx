import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const PixelCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "pixel-border bg-card/80 backdrop-blur-sm p-8 shadow-pixel",
          className
        )}
        {...props}
      />
    );
  }
);
PixelCard.displayName = "PixelCard";

export { PixelCard };
