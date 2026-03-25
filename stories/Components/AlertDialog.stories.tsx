import type { Meta, StoryObj } from '@storybook/react';

import { AlertDialog } from '../../src/components/AlertDialog';

const meta = {
  title: 'Components/AlertDialog',
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

/** Figma `Type=Desktop`（9:8006）：次要鍵在左、主鍵在右；文案左對齊。 */
export const Desktop: Story = {
  args: {
    layout: 'desktop',
  },
};

/** Figma `Type=Mobile`（9:7999）：主鍵在上、次要鍵在下、全寬；標題與內文置中。 */
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
