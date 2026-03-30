import type { Meta, StoryObj } from '@storybook/react';

import { Field } from '../../src/components/Field';
import { Input } from '../../src/components/Input';

const meta = {
  component: Field,
  args: {
    label: 'Name',
    children: ' ',
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '## Imports',
          '```tsx',
          "import { Field } from '@syncai/design-system';",
          '```',
          '## Usage',
          'Wraps a form control with a label, optional description, and error message.',
          'Automatically injects `id` and `aria-describedby` into its child input.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithDescription: Story = {
  render: () => (
    <Field label="Name" description="Shown under the input as helper text">
      <Input placeholder="Enter your name..." />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field label="E-mail address" error="This field is required">
      <Input state="error" placeholder="Enter your e-mail address..." />
    </Field>
  ),
};

