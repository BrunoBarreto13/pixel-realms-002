import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const PixelShieldIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    className={cn("w-4 h-4", className)}
    {...props}
  >
    <path fill="currentColor" d="M8 0L1 2v5c0 5 7 8 7 8s7-3 7-8V2L8 0zM8 1.2L13 3v4c0 3.5-5 6-5 6s-5-2.5-5-6V3l5-1.8z"/>
  </svg>
);