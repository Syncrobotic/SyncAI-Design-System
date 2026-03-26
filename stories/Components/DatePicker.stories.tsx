import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DatePicker, DatePickerCalendar, startOfMonth } from '../../src/components/DatePicker';

const meta = {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | null>(null);
    return <DatePicker value={value} onChange={setValue} placeholder="Pick a date" />;
  },
};

export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | null>(new Date(2025, 4, 15));
    return <DatePicker value={value} onChange={setValue} locale="en-US" />;
  },
};

/** Calendar-only panel (Figma `Months=1 Month` / 9:6764). */
export const CalendarOnly: Story = {
  render: function Render() {
    const [month, setMonth] = useState(() => startOfMonth(new Date(2025, 4, 1)));
    const [selected, setSelected] = useState<Date | null>(new Date(2025, 4, 15));
    return (
      <DatePickerCalendar
        month={month}
        selected={selected}
        onSelect={(d) => setSelected(d)}
        onPrevMonth={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
        onNextMonth={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
        locale="en-US"
      />
    );
  },
};
