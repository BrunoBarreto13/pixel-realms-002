import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const PixelChevronRightIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    className={cn("w-4 h-4", className)}
    {...props}
  >
    <path fill="currentColor" d="M6 3l1-1 5 5-5 5-1-1 4-4-4-4z"/>
  </svg>
);