import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import useSound from "@/hooks/useSound";

const pixelButtonVariants = cva(
  "inline-flex items-center justify-center font-pixel text-xs uppercase tracking-wider transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 border-2 active:translate-y-0.5 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-[#7a5f3b] border-[#433a2d] text-[#f0e6d2] hover:bg-[#8c6d46]",
        secondary: "bg-[#433a2d] border-[#7a5f3b] text-[#f0e6d2] hover:bg-[#5a4f41]",
        accent: "bg-accent border-accent/80 text-accent-foreground hover:opacity-90",
        destructive: "bg-destructive border-destructive/80 text-destructive-foreground hover:bg-destructive/90",
        outline: "bg-transparent border-[#7a5f3b] text-[#f0e6d2] hover:bg-[#433a2d]",
        ghost: "border-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PixelButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {
      soundOnClick?: string;
    }

const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, soundOnClick = "/sounds/click.mp3", onClick, ...props }, ref) => {
    const playSound = useSound(soundOnClick);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playSound();
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        className={cn(pixelButtonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

PixelButton.displayName = "PixelButton";

export { PixelButton, pixelButtonVariants };