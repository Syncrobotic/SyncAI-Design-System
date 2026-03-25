import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/Button';
import { Tooltip } from '../../src/components/Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<any>;

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tooltip content="Tooltip text" side="top">
        <Button variant="secondary" size="sm">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Tooltip text" side="bottom">
        <Button variant="secondary" size="sm">
          Bottom
        </Button>
      </Tooltip>
      <Tooltip content="Tooltip text" side="left">
        <Button variant="secondary" size="sm">
          Left
        </Button>
      </Tooltip>
      <Tooltip content="Tooltip text" side="right">
        <Button variant="secondary" size="sm">
          Right
        </Button>
      </Tooltip>
    </div>
  ),
};

