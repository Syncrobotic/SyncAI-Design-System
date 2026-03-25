import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../src/components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'ghostMuted', 'destructive', 'danger'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Orbie Button 頁（Figma）：Primary、Secondary（灰底）、Outline、Ghost、Ghost Muted、Destructive；`danger` 同 Destructive。尺寸 Regular / Small。',
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
