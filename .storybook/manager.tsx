import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

import './manager.css';

/* ── Custom channel event (must match preview.tsx) ── */
const SDS_THEME_CHANGED = 'sds/theme-changed';

/* ── localStorage helpers ── */
const STORAGE_KEY = 'sds-storybook-theme';

type ColorMode = 'light' | 'dark' | 'dim' | 'midnight' | 'amoled';

function getStoredTheme(): ColorMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as ColorMode | null;
    if (v === 'dark' || v === 'dim' || v === 'midnight' || v === 'amoled') return v;
    return 'light';
  } catch {
    return 'light';
  }
}

function storeTheme(theme: ColorMode) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Manager theme definitions (one per mode)                           */
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
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,
  barBg: '#ffffff',
  barTextColor: '#334155',
  barHoverColor: '#0047c7',
  barSelectedColor: '#0047c7',
  textColor: '#1e293b',
  textInverseColor: '#ffffff',
  textMutedColor: '#64748b',
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#1e293b',
  inputBorderRadius: 6,
  fontBase,
  fontCode,
});

const darkTheme = create({
  base: 'dark',
  brandTitle: 'SyncAI Design System',
  brandUrl: '/',
  colorPrimary: '#739ae0',
  colorSecondary: '#a6bfeb',
  appBg: '#0f172a',
  appContentBg: '#1e293b',
  appPreviewBg: '#0f172a',
  appBorderColor: '#334155',
  appBorderRadius: 8,
  barBg: '#1e293b',
  barTextColor: '#94a3b8',
  barHoverColor: '#a6bfeb',
  barSelectedColor: '#a6bfeb',
  textColor: '#f1f5f9',
  textInverseColor: '#0f172a',
  textMutedColor: '#94a3b8',
  inputBg: '#1e293b',
  inputBorder: '#334155',
  inputTextColor: '#f1f5f9',
  inputBorderRadius: 6,
  fontBase,
  fontCode,
});

const dimTheme = create({
  base: 'dark',
  brandTitle: 'SyncAI Design System',
  brandUrl: '/',
  colorPrimary: '#539bf5',
  colorSecondary: '#6cb6ff',
  appBg: '#22272e',
  appContentBg: '#2d333b',
  appPreviewBg: '#22272e',
  appBorderColor: '#444c56',
  appBorderRadius: 8,
  barBg: '#2d333b',
  barTextColor: '#768390',
  barHoverColor: '#6cb6ff',
  barSelectedColor: '#6cb6ff',
  textColor: '#adbac7',
  textInverseColor: '#22272e',
  textMutedColor: '#768390',
  inputBg: '#2d333b',
  inputBorder: '#444c56',
  inputTextColor: '#adbac7',
  inputBorderRadius: 6,
  fontBase,
  fontCode,
});

const midnightTheme = create({
  base: 'dark',
  brandTitle: 'SyncAI Design System',
  brandUrl: '/',
  colorPrimary: '#5090d3',
  colorSecondary: '#7eb8f0',
  appBg: '#0a1929',
  appContentBg: '#0f2744',
  appPreviewBg: '#0a1929',
  appBorderColor: '#1e3a5f',
  appBorderRadius: 8,
  barBg: '#0f2744',
  barTextColor: '#7b8fa3',
  barHoverColor: '#7eb8f0',
  barSelectedColor: '#7eb8f0',
  textColor: '#b2bac2',
  textInverseColor: '#0a1929',
  textMutedColor: '#7b8fa3',
  inputBg: '#0f2744',
  inputBorder: '#1e3a5f',
  inputTextColor: '#b2bac2',
  inputBorderRadius: 6,
  fontBase,
  fontCode,
});

const amoledTheme = create({
  base: 'dark',
  brandTitle: 'SyncAI Design System',
  brandUrl: '/',
  colorPrimary: '#818cf8',
  colorSecondary: '#a5b4fc',
  appBg: '#000000',
  appContentBg: '#0a0a0a',
  appPreviewBg: '#000000',
  appBorderColor: '#27272a',
  appBorderRadius: 8,
  barBg: '#0a0a0a',
  barTextColor: '#71717a',
  barHoverColor: '#a5b4fc',
  barSelectedColor: '#a5b4fc',
  textColor: '#e4e4e7',
  textInverseColor: '#000000',
  textMutedColor: '#71717a',
  inputBg: '#0a0a0a',
  inputBorder: '#27272a',
  inputTextColor: '#e4e4e7',
  inputBorderRadius: 6,
  fontBase,
  fontCode,
});

const managerThemes: Record<string, ReturnType<typeof create>> = {
  light: lightTheme,
  dark: darkTheme,
  dim: dimTheme,
  midnight: midnightTheme,
  amoled: amoledTheme,
};

/* CSS class mapping for manager.css overrides */
const themeClasses = ['sds-dark', 'sds-dim', 'sds-midnight', 'sds-amoled'];

function applyManagerClass(mode: string) {
  document.documentElement.classList.remove(...themeClasses);
  if (mode !== 'light') {
    document.documentElement.classList.add(`sds-${mode}`);
  }
}

/* ------------------------------------------------------------------ */
/*  Initial config                                                     */
/* ------------------------------------------------------------------ */

const initialTheme = getStoredTheme();

addons.setConfig({
  theme: managerThemes[initialTheme] ?? lightTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});

applyManagerClass(initialTheme);

/* ------------------------------------------------------------------ */
/*  Sync Manager chrome when preview theme changes via addon-themes    */
/* ------------------------------------------------------------------ */

addons.register('sds-theme-sync', () => {
  try {
    const channel = addons.getChannel();
    channel.on(SDS_THEME_CHANGED, (mode: string) => {
      const m = (managerThemes[mode] ? mode : 'light') as ColorMode;
      addons.setConfig({ theme: managerThemes[m] });
      applyManagerClass(m);
      storeTheme(m);
    });
  } catch {
    /* channel not ready */
  }
});
