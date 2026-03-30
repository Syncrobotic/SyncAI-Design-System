import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb } from '../../src/components/Breadcrumb';

const meta = {
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Matches Figma Examples (9:7675): Home → … → Components → Current page. */
export const OrbieExample: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { ellipsis: true },
      { label: 'Components', href: '#' },
      { label: 'Breadcrumb', current: true },
    ],
  },
};

export const SimplePath: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Account', current: true },
    ],
  },
};
