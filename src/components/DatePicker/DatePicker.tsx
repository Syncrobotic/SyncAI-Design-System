import { useEffect, useId, useRef, useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getCalendarGrid,
  isSameDay,
  startOfDay,
  startOfMonth,
  type CalendarCell,
} from './calendarGrid';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export type DatePickerCalendarProps = {
  /** Any day in the current month (only year/month are used). */
  month: Date;
  selected: Date | null;
  onSelect: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  locale?: string;
  className?: string;
};

export function DatePickerCalendar({
  month,
  selected,
  onSelect,
  onPrevMonth,
  onNextMonth,
  locale,
  className,
}: DatePickerCalendarProps) {
  const title = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(month);
  const y = month.getFullYear();
  const m = month.getMonth();
  const grid = getCalendarGrid(y, m);
  const today = startOfDay(new Date());

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-accent"
          onClick={onPrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>
        <p className="text-sm font-semibold">{title}</p>
        <button
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-accent"
          onClick={onNextMonth}
          aria-label="Next month"
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
      <div className="grid grid-cols-7" role="grid" aria-label={title}>
        <div className="contents" role="row">
          {WEEKDAYS.map((wd) => (
            <div
              key={wd}
              className="flex size-[48px] items-center justify-center text-xs font-medium text-muted-foreground"
              role="columnheader"
            >
              {wd}
            </div>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, row) => (
          <div key={row} className="contents" role="row">
            {grid.slice(row * 7, row * 7 + 7).map((cell, i) => (
              <DatePickerDayCell
                key={`${cell.date.toISOString()}-${row}-${i}`}
                cell={cell}
                selected={selected}
                today={today}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DatePickerDayCell({
  cell,
  selected,
  today,
  onSelect,
}: {
  cell: CalendarCell;
  selected: Date | null;
  today: Date;
  onSelect: (d: Date) => void;
}) {
  const d = startOfDay(cell.date);
  const isSel = selected != null && isSameDay(d, startOfDay(selected));
  const isTo = isSameDay(d, today);

  return (
    <button
      type="button"
      role="gridcell"
      className={cn(
        'flex size-[48px] items-center justify-center rounded text-sm transition-colors',
        !cell.inCurrentMonth && 'text-muted-foreground opacity-50',
        cell.inCurrentMonth && 'hover:bg-accent',
        isSel && 'bg-primary text-primary-foreground hover:bg-primary',
        isTo && !isSel && 'font-bold text-primary',
      )}
      onClick={() => onSelect(d)}
      aria-selected={isSel}
      aria-current={isTo ? 'date' : undefined}
    >
      <span className="flex size-8 items-center justify-center">{d.getDate()}</span>
    </button>
  );
}

export type DatePickerProps = {
  value: Date | null;
  onChange: (value: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  locale?: string;
  className?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  disabled,
  locale,
  className,
}: DatePickerProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(value ?? new Date()));

  useEffect(() => {
    if (value) setViewMonth(startOfMonth(value));
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const display =
    value != null
      ? new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(value)
      : null;

  const goPrev = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  const goNext = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));

  const select = (d: Date) => {
    onChange(d);
    setOpen(false);
  };

  const triggerClasses = cn(
    'inline-flex min-h-8 items-center gap-2 rounded-lg border border-input bg-transparent px-2 py-[5.5px] text-sm shadow-xs transition-colors hover:bg-accent',
    display == null && 'text-muted-foreground',
    disabled && 'cursor-not-allowed opacity-50',
  );

  return (
    <div ref={rootRef} className={cn('relative', className)} data-sds-component="DatePicker">
      <button
        type="button"
        id={id}
        className={triggerClasses}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <CalendarIcon className="size-4" strokeWidth={2} aria-hidden />
        <span>{display ?? placeholder}</span>
      </button>

      {open ? (
        <div
          className="absolute top-full z-50 mt-1 min-w-[342px] rounded-xl border border-border bg-popover p-4 shadow-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Select date"
        >
          <DatePickerCalendar
            month={viewMonth}
            selected={value}
            onSelect={select}
            onPrevMonth={goPrev}
            onNextMonth={goNext}
            locale={locale}
          />
        </div>
      ) : null}
    </div>
  );
}
