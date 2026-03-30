import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';

type PageToken = number | 'ellipsis';

function getPaginationTokens(opts: {
  page: number;
  pageCount: number;
  boundaryCount?: number;
  siblingCount?: number;
}): PageToken[] {
  const { page, pageCount, boundaryCount = 1, siblingCount = 1 } = opts;
  const clampedPage = Math.min(Math.max(page, 1), pageCount);

  const minFull = boundaryCount * 2 + siblingCount * 2 + 3;
  if (pageCount <= minFull) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(clampedPage - siblingCount, boundaryCount + 2);
  const rightSibling = Math.min(clampedPage + siblingCount, pageCount - boundaryCount - 1);

  const showLeftEllipsis = leftSibling > boundaryCount + 2;
  const showRightEllipsis = rightSibling < pageCount - boundaryCount - 1;

  const tokens: PageToken[] = [];
  tokens.push(1);

  if (!showLeftEllipsis) {
    for (let i = 2; i <= boundaryCount + siblingCount + 1; i++) tokens.push(i);
  } else {
    tokens.push('ellipsis');
    for (let i = leftSibling; i <= rightSibling; i++) tokens.push(i);
  }

  if (!showRightEllipsis) {
    for (let i = pageCount - boundaryCount - siblingCount; i <= pageCount - 1; i++) tokens.push(i);
  } else {
    tokens.push('ellipsis');
    tokens.push(pageCount);
  }

  const seen = new Set<number>();
  const out: PageToken[] = [];
  for (const t of tokens) {
    if (typeof t === 'number') {
      if (!seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
    } else {
      out.push(t);
    }
  }
  if (!out.includes(pageCount)) out.push(pageCount);
  return out;
}

export type PaginationProps = {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
  boundaryCount?: number;
  siblingCount?: number;
  /** Whether to show the Previous/Next labels. */
  showNavLabel?: boolean;
};

function NavButton({
  disabled,
  direction,
  label,
  onClick,
}: {
  disabled: boolean;
  direction: 'prev' | 'next';
  label: string;
  onClick: () => void;
}) {
  const IconCmp = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      className={cn(
        'inline-flex min-h-9 items-center gap-1 rounded-lg border border-[var(--sds-pagination-border)] px-4 py-[7.5px] text-sm font-semibold transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
      )}
      disabled={disabled}
      onClick={onClick}
      aria-label={label || (direction === 'prev' ? 'Previous page' : 'Next page')}
    >
      <IconCmp className="size-4" strokeWidth={2} />
      {label ? <span>{label}</span> : null}
    </button>
  );
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  boundaryCount,
  siblingCount,
  showNavLabel = true,
}: PaginationProps) {
  const safePageCount = Math.max(1, pageCount);
  const safePage = Math.min(Math.max(page, 1), safePageCount);

  const tokens = getPaginationTokens({
    page: safePage,
    pageCount: safePageCount,
    boundaryCount,
    siblingCount,
  });

  const navPrevDisabled = safePage <= 1;
  const navNextDisabled = safePage >= safePageCount;

  return (
    <div
      className={cn('flex items-center gap-2', className)}
      data-sds-component="Pagination"
    >
      <NavButton
        disabled={navPrevDisabled}
        direction="prev"
        label={showNavLabel ? 'Previous' : ''}
        onClick={() => onPageChange(safePage - 1)}
      />

      {tokens.map((t, idx) => {
        if (t === 'ellipsis') {
          return (
            <span key={`e-${idx}`} className="flex size-9 items-center justify-center" aria-hidden>
              <Ellipsis className="size-4" strokeWidth={2} />
            </span>
          );
        }

        const active = t === safePage;
        const content: ReactNode = t;

        return (
          <button
            key={t}
            type="button"
            className={cn(
              'inline-flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground',
            )}
            data-sds-page={t}
            aria-current={active ? 'page' : undefined}
            onClick={() => {
              if (!active) onPageChange(t);
            }}
          >
            {content}
          </button>
        );
      })}

      <NavButton
        disabled={navNextDisabled}
        direction="next"
        label={showNavLabel ? 'Next' : ''}
        onClick={() => onPageChange(safePage + 1)}
      />
    </div>
  );
}

