export type CalendarCell = {
  date: Date;
  inCurrentMonth: boolean;
};

/** Fixed 42 cells (6 weeks x 7 days), starting on Sunday — aligned with the Figma calendar. */
export function getCalendarGrid(year: number, monthIndex: number): CalendarCell[] {
  const cells: CalendarCell[] = [];
  const first = new Date(year, monthIndex, 1);
  const startPad = first.getDay();
  const daysThis = new Date(year, monthIndex + 1, 0).getDate();
  const daysPrev = new Date(year, monthIndex, 0).getDate();

  for (let i = 0; i < startPad; i++) {
    const day = daysPrev - startPad + i + 1;
    cells.push({ date: new Date(year, monthIndex - 1, day), inCurrentMonth: false });
  }
  for (let d = 1; d <= daysThis; d++) {
    cells.push({ date: new Date(year, monthIndex, d), inCurrentMonth: true });
  }
  let next = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, monthIndex + 1, next), inCurrentMonth: false });
    next++;
  }
  return cells;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
