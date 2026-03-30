import { ChevronRight, Ellipsis } from 'lucide-react';
import './Breadcrumb.css';

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

const iconProps = {
  size: 16,
  strokeWidth: 2,
  'aria-hidden': true as const,
  focusable: false as const,
};

export function Breadcrumb({ items, ariaLabel = 'Breadcrumb', className }: BreadcrumbProps) {
  const rootClass = ['sds-breadcrumb', className].filter(Boolean).join(' ');

  return (
    <nav className={rootClass} aria-label={ariaLabel} data-sds-component="Breadcrumb">
      <ol className="sds-breadcrumb__list">
        {items.map((item, index) => (
          <li key={index} className="sds-breadcrumb__segment">
            {index > 0 ? (
              <ChevronRight {...iconProps} className="sds-breadcrumb__chevron" />
            ) : null}
            <BreadcrumbSegment item={item} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

function BreadcrumbSegment({ item }: { item: BreadcrumbEntry }) {
  if ('ellipsis' in item && item.ellipsis) {
    return (
      <span className="sds-breadcrumb__ellipsis" title="Collapsed path" aria-label="Omitted intermediate segments">
        <Ellipsis {...iconProps} />
      </span>
    );
  }
  if ('href' in item) {
    return (
      <a className="sds-breadcrumb__link" href={item.href}>
        {item.label}
      </a>
    );
  }
  if ('current' in item && item.current) {
    return (
      <span className="sds-breadcrumb__current" aria-current="page">
        {item.label}
      </span>
    );
  }
  return null;
}
