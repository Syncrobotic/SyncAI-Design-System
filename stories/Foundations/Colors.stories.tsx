import type { Meta, StoryObj } from 'storybook/react';

/**
 * Static Orbie palette — always shows the canonical design-token colours
 * regardless of light/dark theme.  Source: tokens.css / Figma node 9:11646.
 */
const ORBIE_PALETTE: Record<string, Record<string, string>> = {
  '--orbie-primary-violet':   { '100': '#0047C7', '75': '#4075D5', '55': '#739AE0', '35': '#A6BFEB', '10': '#E5EDF9' },
  '--orbie-primary-gray':     { '100': '#515353', '75': '#7D7E7E', '55': '#9FA0A0', '35': '#C2C3C3', '10': '#EEEEEE' },
  '--orbie-secondary-violet': { '100': '#6D63B5', '75': '#918AC7', '55': '#AFA9D6', '35': '#CCC8E5', '10': '#F0EFF8' },
  '--orbie-secondary-yellow': { '100': '#F0BF60', '75': '#F4CF88', '55': '#F7DCA8', '35': '#FAE9C8', '10': '#FEF9EF' },
  '--orbie-secondary-green':  { '100': '#5CB85C', '75': '#85CA85', '55': '#A5D8A5', '35': '#C6E6C6', '10': '#EFF8EF' },
  '--orbie-secondary-blue':   { '100': '#4A90E2', '75': '#77ACE9', '55': '#9BC2EF', '35': '#C0D8F5', '10': '#EDF4FC' },
  '--orbie-secondary-red':    { '100': '#FF6F63', '75': '#FF938A', '55': '#FFB0A9', '35': '#FFCDC8', '10': '#FFF1EF' },
  '--orbie-variant':          { '100': '#333535', '75': '#717272', '55': '#929393', '35': '#B5B6B6', '10': '#DADADA' },
};

const ORBIE_BG = {
  surface: '#FFFFFF',
  muted:   '#F6F6F6',
};

const scales = [
  { label: 'Primary-Violet', prefix: '--orbie-primary-violet' },
  { label: 'Primary-Gray', prefix: '--orbie-primary-gray' },
  { label: 'Secondary-Violet', prefix: '--orbie-secondary-violet' },
  { label: 'Secondary-Yellow', prefix: '--orbie-secondary-yellow' },
  { label: 'Secondary-Green', prefix: '--orbie-secondary-green' },
  { label: 'Secondary-Blue', prefix: '--orbie-secondary-blue' },
  { label: 'Secondary-Red', prefix: '--orbie-secondary-red' },
  { label: 'Variant', prefix: '--orbie-variant' },
] as const;

const steps = ['100', '75', '55', '35', '10'] as const;

function ColorsTable() {

  return (
    <div style={{
      fontFamily: 'var(--sds-font-sans)',
      padding: 16,
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-foreground)',
      minHeight: '100%',
    }}>
      <p style={{ color: 'var(--sds-color-muted)', marginBottom: 16, maxWidth: 560 }}>
        Source: Figma Orbie UI KIT — <code>colors</code> (node <code>9:11646</code>). Synchronized into{' '}
        <code>tokens.css</code> as <code>--orbie-*</code> variables.
      </p>
      <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 720 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--sds-color-border)' }} />
            {steps.map((s) => (
              <th
                key={s}
                style={{
                  padding: 8,
                  borderBottom: '1px solid var(--sds-color-border)',
                  color: 'var(--sds-color-muted)',
                  fontWeight: 600,
                }}
              >
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scales.map((row) => (
            <tr key={row.label}>
              <td
                style={{
                  padding: '12px 8px',
                  borderBottom: '1px solid var(--sds-color-border)',
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                }}
              >
                {row.label}
              </td>
              {steps.map((s) => {
                const varName = `${row.prefix}-${s}`;
                const hex = ORBIE_PALETTE[row.prefix]?.[s] ?? '';
                return (
                  <td
                    key={s}
                    style={{
                      padding: 8,
                      borderBottom: '1px solid var(--sds-color-border)',
                      verticalAlign: 'top',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div
                        title={`${varName}\n${hex}`}
                        style={{
                          width: 72,
                          height: 44,
                          borderRadius: 6,
                          background: hex,
                          border: '1px solid var(--sds-color-border)',
                        }}
                      />
                      <code
                        style={{
                          fontSize: 10,
                          lineHeight: 1.2,
                          color: 'var(--sds-color-muted)',
                          textAlign: 'center',
                          wordBreak: 'break-all',
                        }}
                      >
                        {hex.toUpperCase()}
                      </code>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--sds-color-muted)' }}>Background</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12,
            color: 'var(--sds-color-muted)',
          }}
        >
          <div
            style={{
              width: 48,
              height: 36,
              borderRadius: 6,
              background: ORBIE_BG.surface,
              border: '1px solid var(--sds-color-border)',
            }}
          />
          <span>
            surface — <code>{ORBIE_BG.surface}</code> —{' '}
            <code style={{ fontSize: 11 }}>--orbie-bg-surface</code>
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12,
            color: 'var(--sds-color-muted)',
          }}
        >
          <div
            style={{
              width: 48,
              height: 36,
              borderRadius: 6,
              background: ORBIE_BG.muted,
              border: '1px solid var(--sds-color-border)',
            }}
          />
          <span>
            muted — <code>{ORBIE_BG.muted}</code> —{' '}
            <code style={{ fontSize: 11 }}>--orbie-bg-muted</code>
          </span>
        </div>
      </div>
    </div>
  );
}

const meta = {
  component: ColorsTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorsTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OrbiePalette: Story = {
  render: () => <ColorsTable />,
};
