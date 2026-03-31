import {
  Breadcrumb as UiBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

export type BreadcrumbEntry =
  | { label: string; href: string }
  | { label: string; current: true }
  | { ellipsis: true };

export type BreadcrumbProps = {
  items: BreadcrumbEntry[];
  /** `nav` aria-label */
  ariaLabel?: string;
  className?: string;
};

export function Breadcrumb({ items, ariaLabel = 'Breadcrumb', className }: BreadcrumbProps) {
  return (
    <UiBreadcrumb className={cn('min-h-9', className)} aria-label={ariaLabel} data-sds-component="Breadcrumb">
      <BreadcrumbList className="text-[14px] leading-[21px] tracking-[0.07px]">
        {items.map((item, index) => {
          const segment = (
            <BreadcrumbItem key={`item-${index}`}>
              <BreadcrumbSegment item={item} />
            </BreadcrumbItem>
          );
          if (index === 0) return segment;
          return [
            <BreadcrumbSeparator key={`sep-${index}`} />,
            segment,
          ];
        })}
      </BreadcrumbList>
    </UiBreadcrumb>
  );
}

function BreadcrumbSegment({ item }: { item: BreadcrumbEntry }) {
  if ('ellipsis' in item && item.ellipsis) {
    return <BreadcrumbEllipsis />;
  }
  if ('href' in item) {
    return <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>;
  }
  if ('current' in item && item.current) {
    return <BreadcrumbPage>{item.label}</BreadcrumbPage>;
  }
  return null;
}
