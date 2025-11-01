import React from 'react';
import { cn } from '@/lib/utils';

interface GeneralPanelProps {
  children: React.ReactNode;
  className?: string;
}

const GeneralPanel: React.FC<GeneralPanelProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "relative mt-10 border-8 border-[#9B6B4B] bg-[#4A3C32] shadow-[inset_0_0_0_3px_#E6B88A] p-5 min-h-[calc(100vh-18rem)]",
      className
    )}>
      <div className="absolute -top-[36px] left-4 bg-[#8B5A3C] text-white font-pixel text-xs uppercase px-4 py-2 border-t-4 border-x-4 border-[#9B6B4B]">
        Início
      </div>
      {children}
    </div>
  );
};

export default GeneralPanel;