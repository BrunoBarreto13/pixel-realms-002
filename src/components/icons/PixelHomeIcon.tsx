import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const PixelHomeIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    className={cn("w-4 h-4", className)}
    {...props}
  >
    <path fill="currentColor" d="M8 1L1 7v8h5v-4h4v4h5V7L8 1z"/>
  </svg>
);