import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb } from '../../src/components/Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 對齊 Figma Examples（9:7675）：Home → … → Components → 目前頁。 */
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
      { label: '首頁', href: '#' },
      { label: '設定', href: '#' },
      { label: '帳號', current: true },
    ],
  },
};
