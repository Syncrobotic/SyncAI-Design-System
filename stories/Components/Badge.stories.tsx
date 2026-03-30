import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../../src/components/Badge';

const figmaExamples =
  'https://www.figma.com/design/jn4iJVWAQ0rR9lme6IVaQD/Orbie-UI-KIT?node-id=9-7795';

/** Minimal 13×13 placeholders — swap for your icon set. */
function IconSmile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

function IconFrown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01" />
    </svg>
  );
}

const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
  alignItems: 'center',
};

const meta = {
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Healthy',
    tone: 'blue' as const,
    shape: 'rounded' as const,
    layout: 'default' as const,
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      grid: {
        // Helps match design-system docs where spacing/alignment is verified via a grid overlay.
        cellSize: 20,
        opacity: 0.5,
        cellAmount: 5,
      },
    },
    docs: {
      description: {
        component: [
          '## Imports',
          '```tsx',
          "import { Badge } from '@syncai/design-system';",
          '```',
          '## Usage',
          'Badges give quick, scannable information — typically a single word or number.',
          'Use `tone` for semantic color and `shape` for rounded or pill appearance.',
          '',
          `[Figma — Examples (node 9:7795)](${figmaExamples})`,
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'Healthy',
    tone: 'blue',
    shape: 'rounded',
    layout: 'default',
  },
  render: (args) => <Badge {...args} icon={<IconSmile />} />,
};

export const ToneVariants: Story = {
  args: {
    // Text-only (icon omitted) so users can focus on tone semantics.
    children: 'Degraded',
    tone: 'yellow',
    shape: 'rounded',
    layout: 'default',
  },
};

export const ShapePill: Story = {
  args: {
    children: '+12.5%',
    tone: 'green',
    shape: 'pill',
    layout: 'default',
  },
};

export const NumericDefault: Story = {
  args: {
    children: '23',
    tone: 'red',
    shape: 'rounded',
    layout: 'numeric',
  },
};

export const IconAndTextSingle: Story = {
  args: {
    children: 'Healthy',
    tone: 'blue',
    shape: 'rounded',
    layout: 'default',
  },
  render: (args) => <Badge {...args} icon={<IconSmile />} />,
};

/** Icon + text — rounded rectangles (semantic/rounded-lg). */
export const IconAndTextRounded: Story = {
  name: 'Pattern / Icon + text (rounded)',
  render: () => (
    <div style={rowStyle}>
      <Badge tone="blue" shape="rounded" icon={<IconSmile />}>
        Healthy
      </Badge>
      <Badge tone="yellow" shape="rounded" icon={<IconAlert />}>
        Degraded
      </Badge>
      <Badge tone="red" shape="rounded" icon={<IconFrown />}>
        Unhealthy
      </Badge>
    </div>
  ),
};

/** Text only — same padding tokens as icon row. */
export const TextOnly: Story = {
  name: 'Pattern / Text only',
  render: () => (
    <div style={rowStyle}>
      <Badge tone="green" shape="rounded">
        Online
      </Badge>
      <Badge tone="red" shape="rounded">
        System
      </Badge>
      <Badge tone="blue" shape="rounded">
        Device
      </Badge>
    </div>
  ),
};

/** Icon only — 13px icon slot, min-height 24. */
export const IconOnly: Story = {
  name: 'Pattern / Icon only',
  render: () => (
    <div style={rowStyle}>
      <Badge tone="blue" shape="rounded" icon={<IconSmile />} aria-label="Healthy" />
      <Badge tone="yellow" shape="rounded" icon={<IconAlert />} aria-label="Warning" />
      <Badge tone="red" shape="rounded" icon={<IconFrown />} aria-label="Unhealthy" />
    </div>
  ),
};

/** Numeric counter — .Tabs Counter: 16px min height, 4px horizontal padding, 10px radius. */
export const Numeric: Story = {
  name: 'Pattern / Numeric',
  render: () => (
    <div style={rowStyle}>
      <Badge tone="red" layout="numeric" shape="rounded">
        23
      </Badge>
    </div>
  ),
};

/** Pill shape — semantic/rounded-full (second column in Figma). */
export const IconAndTextPill: Story = {
  name: 'Pattern / Icon + text (pill)',
  render: () => (
    <div style={rowStyle}>
      <Badge tone="green" shape="pill" icon={<IconSmile />}>
        +12.5%
      </Badge>
      <Badge tone="red" shape="pill" icon={<IconFrown />}>
        -20%
      </Badge>
    </div>
  ),
};
