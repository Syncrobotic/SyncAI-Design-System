import React, { useEffect, useState } from 'react';
import type { Preview } from '@storybook/react-vite';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { addons } from 'storybook/internal/preview-api';
import { create } from 'storybook/theming/create';

import '../src/globals.css';
import './preview.css';

/* ── Custom channel event (must match manager.tsx) ── */
export const SDS_THEME_CHANGED = 'sds/theme-changed';

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

function storeTheme(theme: string) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

/* ── Apply initial theme immediately ── */
applyThemeAttribute(getStoredTheme());

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

const docsDimTheme = create({
  base: 'dark',
  colorPrimary: '#539bf5',
  colorSecondary: '#539bf5',
  appBg: '#22272e',
  appContentBg: '#22272e',
  appBorderColor: '#444c56',
  textColor: '#adbac7',
  textMutedColor: '#768390',
  inputBg: '#2d333b',
  inputBorder: '#444c56',
  inputTextColor: '#adbac7',
  inputBorderRadius: 6,
});

const docsMidnightTheme = create({
  base: 'dark',
  colorPrimary: '#5090d3',
  colorSecondary: '#5090d3',
  appBg: '#0a1929',
  appContentBg: '#0a1929',
  appBorderColor: '#1e3a5f',
  textColor: '#b2bac2',
  textMutedColor: '#7b8fa3',
  inputBg: '#0f2744',
  inputBorder: '#1e3a5f',
  inputTextColor: '#b2bac2',
  inputBorderRadius: 6,
});

const docsAmoledTheme = create({
  base: 'dark',
  colorPrimary: '#818cf8',
  colorSecondary: '#818cf8',
  appBg: '#000000',
  appContentBg: '#000000',
  appBorderColor: '#27272a',
  textColor: '#e4e4e7',
  textMutedColor: '#71717a',
  inputBg: '#0a0a0a',
  inputBorder: '#27272a',
  inputTextColor: '#e4e4e7',
  inputBorderRadius: 6,
});

const docsThemes: Record<string, ReturnType<typeof create>> = {
  light: docsLightTheme,
  dark: docsDarkTheme,
  dim: docsDimTheme,
  midnight: docsMidnightTheme,
  amoled: docsAmoledTheme,
};

/* ── ThemedDocsContainer ──
 * For Docs pages: syncs data-theme on mount and listens for changes.
 * Passes Storybook theme to DocsContainer so Controls inputs get styled.
 */
const ThemedDocsContainer: React.FC<
  React.ComponentProps<typeof DocsContainer>
> = (props) => {
  const [theme, setTheme] = useState<string>(getStoredTheme);

  useEffect(() => {
    applyThemeAttribute(getStoredTheme());

    let channel: ReturnType<typeof addons.getChannel> | null = null;
    try {
      channel = addons.getChannel();
    } catch {
      return;
    }

    // Listen for our custom event (fired by story decorators)
    const onThemeChanged = (t: string) => {
      applyThemeAttribute(t);
      setTheme(t);
    };
    channel.on(SDS_THEME_CHANGED, onThemeChanged);

    // Also listen for Storybook's built-in globals update
    // (fires even on pure docs pages with no stories)
    const onGlobalsUpdated = (args: { globals?: Record<string, unknown> }) => {
      const t = args?.globals?.theme;
      if (typeof t === 'string' && t !== theme) {
        applyThemeAttribute(t);
        storeTheme(t);
        setTheme(t);
        // Sync manager chrome as well
        try {
          channel!.emit(SDS_THEME_CHANGED, t);
        } catch { /* */ }
      }
    };
    channel.on('globalsUpdated', onGlobalsUpdated);

    return () => {
      channel!.off(SDS_THEME_CHANGED, onThemeChanged);
      channel!.off('globalsUpdated', onGlobalsUpdated);
    };
  }, []);

  return (
    <DocsContainer
      {...props}
      theme={docsThemes[theme] ?? docsLightTheme}
    />
  );
};

/* ── Preview config ──
 * addon-themes provides the toolbar dropdown + sets data-theme on <html>.
 * Custom decorator syncs localStorage + emits channel event for Manager chrome.
 */
const preview: Preview = {
  initialGlobals: {
    theme: getStoredTheme(),
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
        dim: 'dim',
        midnight: 'midnight',
        amoled: 'amoled',
      },
      defaultTheme: getStoredTheme(),
      attributeName: 'data-theme',
    }),
    (Story, context) => {
      const theme = (context.globals.theme as string) || 'light';

      applyThemeAttribute(theme);
      storeTheme(theme);

      useEffect(() => {
        try {
          addons.getChannel().emit(SDS_THEME_CHANGED, theme);
        } catch {
          /* channel not ready */
        }
      }, [theme]);

      return <Story />;
    },
  ],
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
