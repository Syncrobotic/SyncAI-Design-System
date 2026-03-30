import type { LucideProps } from 'lucide-react';
import { orbieIconMap, type OrbieIconName } from '../../icons/orbieIconMap';
import { cn } from '@/lib/utils';

export type IconProps = {
  /** Orbie `icons` page slug (after `Icon / …`). */
  name: OrbieIconName;
  /** Pixel size; Figma artboard uses 24. */
  size?: number;
} & Omit<LucideProps, 'ref' | 'size'>;

export function Icon({ name, size = 24, className, strokeWidth = 2, ...rest }: IconProps) {
  const Cmp = orbieIconMap[name];
  return <Cmp size={size} className={cn(className)} strokeWidth={strokeWidth} aria-hidden focusable={false} {...rest} />;
}
