import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import './Tooltip.css';

type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

const arrowTop =
  'https://www.figma.com/api/mcp/asset/33a70099-e747-4559-a101-a8496738313e';
const arrowBottom =
  'https://www.figma.com/api/mcp/asset/2d7662ee-6d4d-44b5-b1be-6247bffce2a0';
const arrowLeft =
  'https://www.figma.com/api/mcp/asset/8b07b861-1308-465f-9074-3b8510cc5ba9';
const arrowRight =
  'https://www.figma.com/api/mcp/asset/3729c885-9070-4c38-8b6c-5d33fa7c56eb';

export type TooltipProps = {
  content: ReactNode;
  side?: TooltipSide;
  disabled?: boolean;
  className?: string;
  /** wrap children; tooltip shown on hover/focus */
  children: ReactNode;
};

export function Tooltip({ content, side = 'top', disabled, className, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const tooltipId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const arrowSrc =
    side === 'top' ? arrowTop : side === 'bottom' ? arrowBottom : side === 'left' ? arrowLeft : arrowRight;

  return (
    <span
      ref={triggerRef}
      className="sds-tooltip__wrapper"
      onMouseEnter={() => !disabled && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => !disabled && setOpen(true)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && triggerRef.current && triggerRef.current.contains(next)) return;
        setOpen(false);
      }}
      aria-describedby={open ? tooltipId : undefined}
    >
      {children}
      {open ? (
        <div
          id={tooltipId}
          role="tooltip"
          className={['sds-tooltip', `sds-tooltip--${side}`, className].filter(Boolean).join(' ')}
        >
          <span>{content}</span>
          <span className="sds-tooltip__arrow" aria-hidden>
            <img src={arrowSrc} alt="" />
          </span>
        </div>
      ) : null}
    </span>
  );
}

