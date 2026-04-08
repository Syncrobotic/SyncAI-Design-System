import type { Meta, StoryObj } from 'storybook/react';
import { useLayoutEffect, useState } from 'react';

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

function readCssVarHex(varName: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

/** Read tokens from :root to avoid duplicating hex values between Story and tokens.css. */
function useOrbieHexGrid(): Record<string, string> | null {
  const [map, setMap] = useState<Record<string, string> | null>(null);
  useLayoutEffect(() => {
    const next: Record<string, string> = {};
    for (const row of scales) {
      for (const s of steps) {
        const key = `${row.prefix}-${s}`;
        next[key] = readCssVarHex(key);
      }
    }
    next['--orbie-bg-surface'] = readCssVarHex('--orbie-bg-surface');
    next['--orbie-bg-muted'] = readCssVarHex('--orbie-bg-muted');
    setMap(next);
  }, []);
  return map;
}

function ColorsTable() {
  const hexByVar = useOrbieHexGrid();

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
                const v = `var(${varName})`;
                const hex = hexByVar?.[varName] ?? '…';
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
                          background: v,
                          border: '1px solid var(--orbie-variant-10)',
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
              background: 'var(--orbie-bg-surface)',
              border: '1px solid var(--sds-color-border)',
            }}
          />
          <span>
            surface — <code>{(hexByVar?.['--orbie-bg-surface'] ?? '…').toUpperCase()}</code> —{' '}
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
              background: 'var(--orbie-bg-muted)',
              border: '1px solid var(--sds-color-border)',
            }}
          />
          <span>
            muted — <code>{(hexByVar?.['--orbie-bg-muted'] ?? '…').toUpperCase()}</code> —{' '}
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
