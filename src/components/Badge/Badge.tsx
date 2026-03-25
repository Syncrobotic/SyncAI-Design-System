import type { HTMLAttributes, ReactNode } from 'react';
import './Badge.css';

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

export function Badge({
  children,
  icon,
  tone = 'blue',
  shape = 'rounded',
  layout = 'default',
  className,
  ...rest
}: BadgeProps) {
  const classes = [
    'sds-badge',
    `sds-badge--${tone}`,
    `sds-badge--${shape}`,
    layout === 'numeric' && 'sds-badge--numeric',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} data-sds-component="Badge" {...rest}>
      {icon ? <span className="sds-badge__icon" aria-hidden={!!children}>{icon}</span> : null}
      {children != null && children !== false ? (
        <span className="sds-badge__label">{children}</span>
      ) : null}
    </span>
  );
}
