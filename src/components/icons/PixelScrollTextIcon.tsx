import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const PixelScrollTextIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    className={cn("w-4 h-4", className)}
    {...props}
  >
    <path fill="currentColor" d="M4 0H3v1H2v1H1v10h1v1h1v1h1v1h8v-1h1v-1h1V2h-1V1h-1V0H4zm0 1h8v1H4V1zm8 13H4v-1h8v1zM2 2h1v11H2V2zm11 0v11h-1V2h1zM5 4h6v1H5V4zm0 2h6v1H5V6zm0 2h4v1H5V8z"/>
  </svg>
);