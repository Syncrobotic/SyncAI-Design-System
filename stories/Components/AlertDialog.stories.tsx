import type { Meta, StoryObj } from '@storybook/react';

import { AlertDialog } from '../../src/components/AlertDialog';

const meta = {
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Title',
    description: 'Text',
    secondaryAction: { label: 'Label' },
    primaryAction: { label: 'Label' },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma `Type=Desktop` (9:8006): Secondary action on the left, primary action on the right; left-aligned copy. */
export const Desktop: Story = {
  args: {
    layout: 'desktop',
  },
};

/** Figma `Type=Mobile` (9:7999): Primary action on top, secondary action below, full width; title and body are centered. */
export const Mobile: Story = {
  args: {
    layout: 'mobile',
  },
};

export const WithoutDescription: Story = {
  args: {
    layout: 'desktop',
    description: undefined,
  },
};
