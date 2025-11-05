import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const PixelSettingsIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    className={cn("w-4 h-4", className)}
    {...props}
  >
    <path fill="currentColor" d="M6 0h4v1h1v1h1v2h1v4h-1v2h-1v1h-1v1H6v-1H5v-1H4V6H3V2h1V1h1V0zM8 5a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4z"/>
  </svg>
);