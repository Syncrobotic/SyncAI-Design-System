import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Figma Secondary-* palette on the Examples frame. */
export type BadgeTone = 'blue' | 'yellow' | 'red' | 'green';

/** `rounded` = 8px (semantic/rounded-lg); `pill` = capsule (semantic/rounded-full). */
export type BadgeShape = 'rounded' | 'pill';

/**
 * `default` — standard badge (min-height 24px).
 * `numeric` — counter chip (.Tabs Counter): 16×16 min, radius 10px, horizontal padding 4px.
 */
export type BadgeLayout = 'default' | 'numeric';

export type BadgeProps = {
  /** Label text; omit for icon-only when `icon` is set. */
  children?: ReactNode;
  /** Leading icon (target visual size 13×13px per Figma). */
  icon?: ReactNode;
  tone?: BadgeTone;
  shape?: BadgeShape;
  layout?: BadgeLayout;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

const toneClasses: Record<BadgeTone, string> = {
  blue: 'bg-orbie-blue-bg text-orbie-blue',
  yellow: 'bg-orbie-yellow-bg text-orbie-yellow',
  red: 'bg-orbie-red-bg text-orbie-red',
  green: 'bg-orbie-green-bg text-orbie-green',
};

export function Badge({
  children,
  icon,
  tone = 'blue',
  shape = 'rounded',
  layout = 'default',
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[6px] text-[12px] font-bold leading-[16px] tracking-[0.18px]',
        toneClasses[tone],
        shape === 'rounded' ? 'rounded-lg' : 'rounded-full',
        layout === 'numeric'
          ? 'min-h-4 min-w-4 justify-center rounded-[10px] px-1'
          : 'min-h-6 px-2 py-[3px]',
        className,
      )}
      data-sds-component="Badge"
      {...rest}
    >
      {icon ? (
        <span className="inline-flex size-[13px] shrink-0 items-center justify-center [&>svg]:size-[13px]" aria-hidden={!!children}>
          {icon}
        </span>
      ) : null}
      {children != null && children !== false ? (
        <span>{children}</span>
      ) : null}
    </span>
  );
}
