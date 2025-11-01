import React from 'react';
import { cn } from '@/lib/utils';

interface PagePanelProps {
  children: React.ReactNode;
  className?: string;
  title: string;
}

const PagePanel: React.FC<PagePanelProps> = ({ children, className, title }) => {
  return (
    <div className={cn(
      "relative mt-10 border-8 border-[#8B6E46] bg-[#4A3C32] shadow-[inset_0_0_0_3px_#E6B88A] p-5 min-h-[calc(100vh-18rem)]",
      className
    )}>
      <div className="absolute -top-[36px] left-4 bg-[#7A5F3B] text-white font-pixel text-xs uppercase px-4 py-2 border-t-4 border-x-4 border-[#8B6E46] rounded-t-lg">
        {title}
      </div>
      {children}
    </div>
  );
};

export default PagePanel;