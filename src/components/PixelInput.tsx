import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PixelInput = forwardRef<HTMLInputElement, PixelInputProps>(
  ({ className, label, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="font-pixel text-xs uppercase text-foreground">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full border-2 border-border bg-input px-3 py-2 font-pixel text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 rounded-lg", // Adicionado rounded-lg
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

PixelInput.displayName = "PixelInput";

export { PixelInput };