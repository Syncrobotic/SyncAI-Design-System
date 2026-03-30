import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      tone: {
        blue: 'bg-orbie-blue-bg text-orbie-blue',
        yellow: 'bg-orbie-yellow-bg text-orbie-yellow',
        red: 'bg-orbie-red-bg text-orbie-red',
        green: 'bg-orbie-green-bg text-orbie-green',
      },
      shape: {
        rounded: 'rounded-lg',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      tone: 'blue',
      shape: 'rounded',
    },
  },
);

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & BadgeVariantProps;

function Badge({ className, tone, shape, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ tone, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants, type BadgeProps };
