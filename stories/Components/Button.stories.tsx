import type { Meta, StoryObj } from 'storybook/react';

import { Button } from '../../src/components/Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Button label text.' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outline', 'ghost', 'ghostMuted', 'destructive', 'danger'],
    },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
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

export const Primary: Story = {
  render: () => <Button variant="primary">Button</Button>,
};

export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
};

export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
};

export const Ghost: Story = {
  render: () => <Button variant="ghost">Ghost</Button>,
};

export const GhostMuted: Story = {
  render: () => <Button variant="ghostMuted">Ghost muted</Button>,
};

export const Destructive: Story = {
  render: () => <Button variant="destructive">Delete</Button>,
};

export const Danger: Story = {
  render: () => <Button variant="danger">Delete (alias)</Button>,
};

export const Small: Story = {
  render: () => <Button size="sm">Small</Button>,
};

export const Disabled: Story = {
  render: () => <Button disabled>Button</Button>,
};
