import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

/**
 * Orbie Button page — Primary / Secondary (solid gray) / Outline / Ghost / Ghost Muted / Destructive.
 * `danger` is an alias for `destructive` (backwards compatible).
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'ghostMuted'
  | 'destructive'
  | 'danger';

/** `md` = Regular (min-height 36); `sm` = Small (min-height 32). */
export type ButtonSize = 'sm' | 'md';

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Left icon (about 13.25px in the design). */
  iconLeft?: ReactNode;
  /** Right icon. */
  iconRight?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

function resolveVariant(variant: ButtonVariant): string {
  return variant === 'danger' ? 'destructive' : variant;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  iconLeft,
  iconRight,
  ...rest
}: ButtonProps) {
  const v = resolveVariant(variant);
  const classes = ['sds-button', `sds-button--${v}`, `sds-button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} data-sds-component="Button" {...rest}>
      {iconLeft ? <span className="sds-button__icon">{iconLeft}</span> : null}
      <span className="sds-button__label">{children}</span>
      {iconRight ? <span className="sds-button__icon">{iconRight}</span> : null}
    </button>
  );
}
