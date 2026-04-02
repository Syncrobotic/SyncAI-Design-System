import type { Meta, StoryObj } from 'storybook/react';
import { Sidebar } from '../../src/components/Sidebar';
import type { SidebarProps } from '../../src/components/Sidebar';

const meta = {
  component: Sidebar,
  args: {
    groups: [] as SidebarProps['groups'],
    collapsed: false,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '## Imports',
          '```tsx',
          "import { Sidebar } from '@syncai/design-system';",
          '```',
          '## Usage',
          'A vertical navigation panel with grouped menu items and optional icon-only collapsed mode.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseGroups: SidebarProps['groups'] = [
  {
    id: 'g1',
    label: 'Group A',
    items: [
      { id: 'i1', label: 'Dashboard', icon: 'layout-dashboard', active: true },
      { id: 'i2', label: 'Settings', icon: 'settings' },
      { id: 'i3', label: 'User', icon: 'user' },
    ],
  },
];

export const Expanded: Story = {
  render: () => <Sidebar groups={baseGroups} collapsed={false} />,
};

export const Collapsed: Story = {
  render: () => <Sidebar groups={baseGroups} collapsed />,
};

