import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Tabs, type TabsItem } from '../../src/components/Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<any>;

const items: TabsItem[] = [
  { id: 'label', label: 'Label', counter: 1 },
  { id: 'icon', icon: 'search' },
  { id: 'icon+label', icon: 'chevron-right', label: 'Icon + Label' },
  { id: 'disabled', label: 'Disabled', disabled: true },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('label');
    return <Tabs items={items} value={value} onValueChange={setValue} />;
  },
};

