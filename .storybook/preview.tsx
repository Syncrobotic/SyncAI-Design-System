import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { DocsContainer } from '@storybook/blocks';
import { addons } from 'storybook/internal/preview-api';

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

/* ── ThemedDocsContainer ──
 * For Docs pages: syncs data-theme on mount and listens for changes.
 */
const ThemedDocsContainer: React.FC<
  React.ComponentProps<typeof DocsContainer>
> = (props) => {
  useEffect(() => {
    applyThemeAttribute(getStoredTheme());

    const channel = addons.getChannel();
    const onThemeChanged = (theme: string) => applyThemeAttribute(theme);
    channel.on(SDS_THEME_CHANGED, onThemeChanged);
    return () => {
      channel.off(SDS_THEME_CHANGED, onThemeChanged);
    };
  }, []);

  return <DocsContainer {...props} />;
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
