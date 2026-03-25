import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Field } from '../../src/components/Field';
import { Icon } from '../../src/components/Icon';
import { Input } from '../../src/components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Field label="Name">
        <Input
          placeholder="Enter your name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
    );
  },
};

export const WithStartAdornment: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Field label="E-mail address">
        <Input
          placeholder="Enter your e-mail address..."
          startAdornment={<Icon name="user" size={16} />}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
    );
  },
};

export const Textarea: Story = {
  render: () => {
    const [value, setValue] = useState('Type your message here.');
    return (
      <Field label="Message">
        <Input
          as="textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [value, setValue] = useState('Please enter a valid value');
    return (
      <Field label="E-mail address" error="This field is required">
        <Input
          state="error"
          placeholder="Enter your e-mail address..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Field label="Disabled">
      <Input placeholder="Disabled" disabled value="" onChange={() => {}} />
    </Field>
  ),
};

