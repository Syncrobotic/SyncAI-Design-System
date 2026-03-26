import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Switch } from '../../src/components/Switch';

const meta = {
  component: Switch,
  args: {
    checked: false,
    onCheckedChange: (_checked: boolean) => {},
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ color: 'var(--sds-color-muted)', fontFamily: 'var(--sds-font-sans)', fontSize: 12 }}>
          Off
        </span>
        <Switch checked={checked} onCheckedChange={setChecked} ariaLabel="switch" />
      </div>
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Switch checked={checked} onCheckedChange={setChecked} ariaLabel="switch-checked" />;
  },
};

export const Disabled: Story = {
  render: () => <Switch checked={true} disabled onCheckedChange={() => {}} ariaLabel="switch-disabled" />,
};

