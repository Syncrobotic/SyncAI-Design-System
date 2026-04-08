import type { Meta, StoryObj } from 'storybook/react';

import { AlertDialog } from '../../src/components/AlertDialog';
import { Button } from '../../src/components/Button';

const meta = {
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '## Imports',
          '```tsx',
          "import { AlertDialog } from '@syncai/design-system';",
          '```',
          '## Usage',
          'A modal dialog that interrupts the user with important content and expects a response.',
          'Supports **desktop** (side-by-side actions) and **mobile** (stacked actions) layouts.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Dialog title text.' },
    description: { control: 'text', description: 'Dialog body text.' },
    layout: { control: 'inline-radio', options: ['desktop', 'mobile'] },
    secondaryAction: { control: 'object', description: 'Secondary (cancel) action config.' },
    primaryAction: { control: 'object', description: 'Primary (confirm) action config.' },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma `Type=Desktop` (9:8006): Secondary action on the left, primary action on the right; left-aligned copy. */
export const Desktop: Story = {
  render: () => (
    <AlertDialog
      title="Title"
      description="Text"
      layout="desktop"
      secondaryAction={{ label: 'Label' }}
      primaryAction={{ label: 'Label' }}
      trigger={<Button variant="outline">Show Dialog</Button>}
    />
  ),
};

/** Figma `Type=Mobile` (9:7999): Primary action on top, secondary action below, full width; title and body are centered. */
export const Mobile: Story = {
  render: () => (
    <AlertDialog
      title="Title"
      description="Text"
      layout="mobile"
      secondaryAction={{ label: 'Label' }}
      primaryAction={{ label: 'Label' }}
      trigger={<Button variant="outline">Show Dialog</Button>}
    />
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <AlertDialog
      title="Title"
      layout="desktop"
      secondaryAction={{ label: 'Label' }}
      primaryAction={{ label: 'Label' }}
      trigger={<Button variant="outline">Show Dialog</Button>}
    />
  ),
};
