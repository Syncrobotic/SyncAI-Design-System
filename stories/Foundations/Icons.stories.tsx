import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { ORBIE_ICON_NAMES, ORBIE_UI_KIT_FIGMA_FILE } from '../../src/icons';

function IconsGrid() {
  return (
    <div style={{ fontFamily: 'var(--sds-font-sans)', padding: 16 }}>
      <p style={{ color: 'var(--sds-color-muted)', marginBottom: 16, maxWidth: 640 }}>
        來源：Figma <code>icons</code> 頁（node <code>9:11137</code>）。元件以{' '}
        <code>lucide-react</code> 對應相同 slug；<code>gpu</code> 在 Lucide 無同名圖示，使用 <code>Cpu</code>。
      </p>
      <p style={{ marginBottom: 16, fontSize: 13 }}>
        <a href={ORBIE_UI_KIT_FIGMA_FILE} target="_blank" rel="noreferrer">
          在 Figma 中開啟 Orbie UI KIT
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
  title: 'Foundations/Icons',
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
