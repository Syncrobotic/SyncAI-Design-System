import { Progress as UiProgress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export type ProgressProps = {
  /** 0 - 100 */
  value: number;
  className?: string;
  /** px or css size; Figma panel width is 342px */
  width?: number | string;
};

export function Progress({ value, className, width }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <UiProgress
      value={clamped}
      className={cn(className)}
      style={width != null ? { width } : undefined}
      data-sds-component="Progress"
    />
  );
}

