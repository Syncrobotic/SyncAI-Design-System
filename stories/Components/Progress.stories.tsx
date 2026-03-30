import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from '../../src/components/Progress';

const meta = {
  component: Progress,
  args: {
    value: 0,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Determinate: Story = {
  render: () => {
    const steps = [0, 10, 25, 33, 50, 66, 75, 90, 100];
    return (
      <div style={{ padding: 16, fontFamily: 'var(--sds-font-sans)' }}>
        {steps.map((v) => (
          <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ width: 40, textAlign: 'right', color: 'var(--sds-color-muted)', fontSize: 12 }}>
              {v}%
            </span>
            <Progress value={v} width={342} />
          </div>
        ))}
      </div>
    );
  },
};

