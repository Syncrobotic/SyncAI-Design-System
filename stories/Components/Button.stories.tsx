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
      control: 'inline-radio',
      options: ['primary', 'secondary', 'danger'],
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
          '基礎按鈕；變體與尺寸對應設計 tokens。與 Strapi 類設計系統文件相同，建議在 Storybook 中維護 **Controls** 與 **Docs** 作為單一真相來源。',
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

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
