import { useEffect, useId, useRef, useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getCalendarGrid,
  isSameDay,
  startOfDay,
  startOfMonth,
  type CalendarCell,
} from './calendarGrid';
import './DatePicker.css';

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
    <div className={['sds-date-picker__calendar', className].filter(Boolean).join(' ')}>
      <div className="sds-date-picker__header">
        <button type="button" className="sds-date-picker__nav" onClick={onPrevMonth} aria-label="Previous month">
          <ChevronLeft strokeWidth={2} />
        </button>
        <p className="sds-date-picker__title">{title}</p>
        <button type="button" className="sds-date-picker__nav" onClick={onNextMonth} aria-label="Next month">
          <ChevronRight strokeWidth={2} />
        </button>
      </div>
      <div className="sds-date-picker__grid" role="grid" aria-label={title}>
        <div className="sds-date-picker__row" role="row">
          {WEEKDAYS.map((wd) => (
            <div key={wd} className="sds-date-picker__weekday" role="columnheader">
              {wd}
            </div>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, row) => (
          <div key={row} className="sds-date-picker__row" role="row">
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
  const classes = [
    'sds-date-picker__day',
    !cell.inCurrentMonth && 'sds-date-picker__day--outside',
    isSel && 'sds-date-picker__day--selected',
    isTo && 'sds-date-picker__day--today',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="gridcell"
      className={classes}
      onClick={() => onSelect(d)}
      aria-selected={isSel}
      aria-current={isTo ? 'date' : undefined}
    >
      <span className="sds-date-picker__day-inner">{d.getDate()}</span>
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

  const triggerClasses = [
    'sds-date-picker__trigger',
    display == null && 'sds-date-picker__trigger--placeholder',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={rootRef} className={['sds-date-picker', className].filter(Boolean).join(' ')} data-sds-component="DatePicker">
      <button
        type="button"
        id={id}
        className={triggerClasses}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sds-date-picker__trigger-icon" aria-hidden>
          <CalendarIcon strokeWidth={2} />
        </span>
        <span>{display ?? placeholder}</span>
      </button>

      {open ? (
        <div className="sds-date-picker__popover" role="dialog" aria-modal="true" aria-label="Select date">
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
