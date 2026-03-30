import type { ReactNode } from 'react';
import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  content: ReactNode;
  side?: TooltipSide;
  disabled?: boolean;
  className?: string;
  /** wrap children; tooltip shown on hover/focus */
  children: ReactNode;
};

export function Tooltip({ content, side = 'top', disabled, className, children }: TooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <UiTooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex" data-sds-component="Tooltip">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} className={cn(className)}>
          {content}
        </TooltipContent>
      </UiTooltip>
    </TooltipProvider>
  );
}

