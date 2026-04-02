import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import { GLOBALS_UPDATED } from '@storybook/core-events';

import './manager.css';

/* ------------------------------------------------------------------ */
/*  Theme definitions                                                  */
/* ------------------------------------------------------------------ */

const fontBase =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans TC", "PingFang TC", sans-serif';
const fontCode =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const lightTheme = create({
  base: 'light',
  brandTitle: 'SyncAI Design System',
  brandUrl: '/',
  colorPrimary: '#0047c7',
  colorSecondary: '#4075d5',
  // UI
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,
  // Toolbar & tabs
  barBg: '#ffffff',
  barTextColor: '#334155',
  barHoverColor: '#0047c7',
  barSelectedColor: '#0047c7',
  // Text
  textColor: '#1e293b',
  textInverseColor: '#ffffff',
  textMutedColor: '#64748b',
  // Form
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#1e293b',
  inputBorderRadius: 6,
  // Fonts
  fontBase,
  fontCode,
});

const darkTheme = create({
  base: 'dark',
  brandTitle: 'SyncAI Design System',
  brandUrl: '/',
  colorPrimary: '#739ae0',
  colorSecondary: '#a6bfeb',
  // UI
  appBg: '#0f172a',
  appContentBg: '#1e293b',
  appPreviewBg: '#0f172a',
  appBorderColor: '#334155',
  appBorderRadius: 8,
  // Toolbar & tabs
  barBg: '#1e293b',
  barTextColor: '#94a3b8',
  barHoverColor: '#a6bfeb',
  barSelectedColor: '#a6bfeb',
  // Text
  textColor: '#f1f5f9',
  textInverseColor: '#0f172a',
  textMutedColor: '#94a3b8',
  // Form
  inputBg: '#1e293b',
  inputBorder: '#334155',
  inputTextColor: '#f1f5f9',
  inputBorderRadius: 6,
  // Fonts
  fontBase,
  fontCode,
});

/* ------------------------------------------------------------------ */
/*  Initial config                                                     */
/* ------------------------------------------------------------------ */

addons.setConfig({
  theme: lightTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});

/* ------------------------------------------------------------------ */
/*  Listen for theme changes from toolbar                              */
/* ------------------------------------------------------------------ */

addons.register('sds-theme-switcher', (api) => {
  const channel = api.getChannel();

  if (channel) {
    channel.on(GLOBALS_UPDATED, ({ globals }) => {
      const isDark = globals?.theme === 'dark';
      
      // Update Manager UI theme config (may require refresh for full effect)
      addons.setConfig({
        theme: isDark ? darkTheme : lightTheme,
      });
      
      // Toggle CSS class for instant visual update
      document.documentElement.classList.toggle('sds-dark', isDark);
    });
  }
});
