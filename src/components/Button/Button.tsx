import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md';

export type ButtonProps = {
  /** Visible label */
  children: ReactNode;
  /** Visual style */
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const classes = ['sds-button', `sds-button--${variant}`, `sds-button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} data-sds-component="Button" {...rest}>
      {children}
    </button>
  );
}
