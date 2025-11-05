import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const PixelLogOutIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    className={cn("w-4 h-4", className)}
    {...props}
  >
    <path fill="currentColor" d="M6 0H1v16h5v-1H2V1h4V0zm4 3l-1 1 2 2H5v2h6l-2 2 1 1 4-4-4-4z"/>
  </svg>
);