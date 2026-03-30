import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import './Pagination.css';

type PageToken = number | 'ellipsis';

function getPaginationTokens(opts: {
  page: number;
  pageCount: number;
  boundaryCount?: number;
  siblingCount?: number;
}): PageToken[] {
  const { page, pageCount, boundaryCount = 1, siblingCount = 1 } = opts;
  const clampedPage = Math.min(Math.max(page, 1), pageCount);

  const minFull = boundaryCount * 2 + siblingCount * 2 + 3; // first, last, current window, plus 2 ellipses
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

  // Deduplicate while keeping order
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
  // Ensure last exists
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
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      className="sds-pagination__nav"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      <Icon strokeWidth={2} />
      {label ? (
        <span style={{ fontSize: 'var(--sds-button-font-size)', fontWeight: 600 }}>{label}</span>
      ) : null}
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
    <div className={['sds-pagination', className].filter(Boolean).join(' ')} data-sds-component="Pagination">
      <NavButton
        disabled={navPrevDisabled}
        direction="prev"
        label={showNavLabel ? 'Previous' : ''}
        onClick={() => onPageChange(safePage - 1)}
      />

      {tokens.map((t, idx) => {
        if (t === 'ellipsis') {
          return (
            <span key={`e-${idx}`} className="sds-pagination__ellipsis" aria-hidden>
              <Ellipsis strokeWidth={2} />
            </span>
          );
        }

        const active = t === safePage;
        const content: ReactNode = t;

        return (
          <button
            key={t}
            type="button"
            className={['sds-pagination__page', active && 'sds-pagination__page--active'].filter(Boolean).join(' ')}
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

