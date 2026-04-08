import React, { useCallback, useState } from 'react';
import { addons, types } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import { IconButton } from 'storybook/internal/components';

import './manager.css';

/* ── Custom channel event (bypasses globals → no story re-render) ── */
export const SDS_THEME_CHANGED = 'sds/theme-changed';

/* ── localStorage helpers ── */
const STORAGE_KEY = 'sds-storybook-theme';

function getStoredTheme(): 'light' | 'dark' {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function storeTheme(theme: 'light' | 'dark') {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

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

const initialTheme = getStoredTheme();

addons.setConfig({
  theme: initialTheme === 'dark' ? darkTheme : lightTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});

if (initialTheme === 'dark') {
  document.documentElement.classList.add('sds-dark');
}

/* ------------------------------------------------------------------ */
/*  Sun / Moon SVG icons (inline to avoid extra dependency)            */
/* ------------------------------------------------------------------ */

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Custom toolbar button — emits channel event, NOT globals           */
/* ------------------------------------------------------------------ */

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getStoredTheme);

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    storeTheme(next);

    // Emit custom event → preview listens via channel (no globals, no re-render)
    const channel = addons.getChannel();
    channel.emit(SDS_THEME_CHANGED, next);

    // Update Manager UI chrome
    addons.setConfig({ theme: next === 'dark' ? darkTheme : lightTheme });
    document.documentElement.classList.toggle('sds-dark', next === 'dark');
  }, [theme]);

  return (
    <IconButton
      key="sds-theme-toggle"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      onClick={toggle}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

/* ------------------------------------------------------------------ */
/*  Register addon                                                     */
/* ------------------------------------------------------------------ */

addons.register('sds-theme-switcher', () => {
  addons.add('sds-theme-switcher/tool', {
    type: types.TOOL,
    title: 'Theme Switcher',
    match: ({ viewMode }) => true,
    render: () => <ThemeSwitcher />,
  });
});
