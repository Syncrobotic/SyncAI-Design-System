import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../src/components/Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '## Imports',
          '```tsx',
          "import { Button } from '@syncai/design-system';",
          '```',
          '## Usage',
          'Triggers an action or event. Variants: **Primary**, **Secondary**, **Outline**, **Ghost**, **Ghost Muted**, **Destructive**.',
          '`danger` is an alias for `destructive`. Sizes: `md` (default) / `sm`.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const GhostMuted: Story = {
  args: { variant: 'ghostMuted', children: 'Ghost muted' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete (alias)' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
