import type { ButtonHTMLAttributes, ReactNode } from 'react';
import {
  Button as UiButton,
  type ButtonProps as UiButtonProps,
} from '@/components/ui/button';

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

function resolveVariant(variant: ButtonVariant): UiButtonProps['variant'] {
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
  return (
    <UiButton
      type={type}
      variant={resolveVariant(variant)}
      size={size}
      className={className}
      data-sds-component="Button"
      {...rest}
    >
      {iconLeft ? (
        <span className="inline-flex size-[13.25px] shrink-0 items-center justify-center [&>svg]:size-[13.25px]">
          {iconLeft}
        </span>
      ) : null}
      <span>{children}</span>
      {iconRight ? (
        <span className="inline-flex size-[13.25px] shrink-0 items-center justify-center [&>svg]:size-[13.25px]">
          {iconRight}
        </span>
      ) : null}
    </UiButton>
  );
}
