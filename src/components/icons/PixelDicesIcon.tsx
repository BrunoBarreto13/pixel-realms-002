import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const PixelDicesIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    className={cn("w-4 h-4", className)}
    {...props}
  >
    <path fill="currentColor" d="M1 5h6v6H1V5zm1 1v4h4V6H2zm5-5h6v6H7V1zm1 1v4h4V2H8zM9 3h1v1H9V3zm-5 5h1v1H4V8zm1 1h1v1H5V9zm-1 1h1v1H4v-1zM3 8h1v1H3V8zm1-1h1v1H4V7z"/>
  </svg>
);