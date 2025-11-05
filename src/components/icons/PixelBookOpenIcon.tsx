import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const PixelBookOpenIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    className={cn("w-4 h-4", className)}
    {...props}
  >
    <path fill="currentColor" d="M2 1h12v1H3v11H2V1zm2 1h9v11H4V2zm1 1v8h7V3H5zm1 1h5v1H6V4zm0 2h5v1H6V6zm0 2h3v1H6V8z"/>
  </svg>
);