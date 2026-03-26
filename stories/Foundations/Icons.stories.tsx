import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { ORBIE_ICON_NAMES, ORBIE_UI_KIT_FIGMA_FILE } from '../../src/icons';

function IconsGrid() {
  return (
    <div style={{ fontFamily: 'var(--sds-font-sans)', padding: 16 }}>
      <p style={{ color: 'var(--sds-color-muted)', marginBottom: 16, maxWidth: 640 }}>
        Source: Figma <code>icons</code> page (node <code>9:11137</code>). Components use{' '}
        <code>lucide-react</code> to match the same slugs; <code>gpu</code> has no matching Lucide icon, so we use{' '}
        <code>Cpu</code>.
      </p>
      <p style={{ marginBottom: 16, fontSize: 13 }}>
        <a href={ORBIE_UI_KIT_FIGMA_FILE} target="_blank" rel="noreferrer">
          Open Orbie UI KIT in Figma
        </a>
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
          maxWidth: 960,
        }}
      >
        {ORBIE_ICON_NAMES.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--sds-color-border)',
              background: 'var(--sds-color-bg)',
            }}
          >
            <Icon name={name} size={24} style={{ color: 'var(--sds-color-fg)' }} />
            <code style={{ fontSize: 10, textAlign: 'center', wordBreak: 'break-all', color: 'var(--sds-color-muted)' }}>
              {name}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  component: IconsGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconsGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OrbieSet: Story = {
  render: () => <IconsGrid />,
};
