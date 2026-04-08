import React, { useEffect, useState } from 'react';
import type { Preview } from '@storybook/react-vite';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { addons } from 'storybook/internal/preview-api';
import { create } from 'storybook/theming/create';

import '../src/globals.css';
import './preview.css';

/* ── Custom channel event (must match manager.tsx) ── */
const SDS_THEME_CHANGED = 'sds/theme-changed';

/* ── Helpers ── */
const STORAGE_KEY = 'sds-storybook-theme';

function applyThemeAttribute(theme: string) {
  document.documentElement.setAttribute('data-theme', theme || 'light');
}

function getStoredTheme(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  } catch {
    return 'light';
  }
}

/* ── Global listener (runs once on preview iframe load) ──
 * Handles Canvas mode — no React component needed.
 */
applyThemeAttribute(getStoredTheme());

try {
  const channel = addons.getChannel();
  channel.on(SDS_THEME_CHANGED, (theme: string) => {
    applyThemeAttribute(theme);
  });
} catch {
  /* channel not ready yet — ThemedDocsContainer will handle it */
}

/* ── Storybook Docs themes (controls inputs, tables, etc.) ── */
const docsLightTheme = create({
  base: 'light',
  colorPrimary: '#1976d2',
  colorSecondary: '#1976d2',
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e0e0',
  textColor: '#212121',
  textMutedColor: '#757575',
  inputBg: '#ffffff',
  inputBorder: '#e0e0e0',
  inputTextColor: '#212121',
  inputBorderRadius: 6,
});

const docsDarkTheme = create({
  base: 'dark',
  colorPrimary: '#90caf9',
  colorSecondary: '#90caf9',
  appBg: '#121212',
  appContentBg: '#121212',
  appBorderColor: '#333333',
  textColor: '#ffffff',
  textMutedColor: '#b0b0b0',
  inputBg: '#1e1e1e',
  inputBorder: '#333333',
  inputTextColor: '#ffffff',
  inputBorderRadius: 6,
});

/* ── ThemedDocsContainer ──
 * For Docs pages: syncs data-theme on mount and listens for changes.
 * Passes Storybook theme to DocsContainer so Controls inputs get styled.
 */
const ThemedDocsContainer: React.FC<
  React.ComponentProps<typeof DocsContainer>
> = (props) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => getStoredTheme() as 'light' | 'dark',
  );

  useEffect(() => {
    applyThemeAttribute(getStoredTheme());

    const channel = addons.getChannel();
    const onThemeChanged = (t: string) => {
      applyThemeAttribute(t);
      setTheme(t === 'dark' ? 'dark' : 'light');
    };
    channel.on(SDS_THEME_CHANGED, onThemeChanged);
    return () => {
      channel.off(SDS_THEME_CHANGED, onThemeChanged);
    };
  }, []);

  return (
    <DocsContainer
      {...props}
      theme={theme === 'dark' ? docsDarkTheme : docsLightTheme}
    />
  );
};

/* ── Preview config ──
 * No globalTypes, no initialGlobals, no theme decorator.
 * Theme switching is 100% CSS-driven via channel events.
 */
const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      container: ThemedDocsContainer,
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};

export default preview;
