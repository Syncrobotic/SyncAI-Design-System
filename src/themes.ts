import { createTheme, type SdsThemeInput } from './components/ThemeProvider';

/* ------------------------------------------------------------------ */
/*  Light theme                                                        */
/* ------------------------------------------------------------------ */

/**
 * Default light theme — values match `tokens.css` / `globals.css` defaults.
 *
 * Use as the base theme at the app root:
 * ```tsx
 * <ThemeProvider theme={lightTheme} global>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const lightThemeInput: SdsThemeInput = {
  palette: {
    mode: 'light',
    background: { default: '#ffffff', paper: '#ffffff' },
    foreground: { default: '#515353' },
    primary: { main: '#0047c7', light: '#4075d5', dark: '#003399', contrastText: '#ffffff' },
    secondary: { main: '#eeeeee', light: '#f6f6f6', dark: '#c2c3c3', contrastText: '#515353' },
    muted: { main: '#f6f6f6', light: '#fafafa', dark: '#e0e0e0', contrastText: '#7d7e7e' },
    accent: { main: '#e5edf9', light: '#f0f5fc', dark: '#c5d5ef', contrastText: '#0047c7' },
    destructive: { main: '#ff6f63', light: '#ff938a', dark: '#cc5950', contrastText: '#ffffff' },
    border: '#b5b6b6',
    input: '#e2e8f0',
    ring: '#4075d5',
    orbieBlue: { text: '#4a90e2', bg: '#edf4fc' },
    orbieYellow: { text: '#f0bf60', bg: '#fef9ef' },
    orbieRed: { text: '#ff6f63', bg: '#fff1ef' },
    orbieGreen: { text: '#5cb85c', bg: '#eff8ef' },
    card: { default: '#ffffff', foreground: '#515353' },
    popover: { default: '#ffffff', foreground: '#515353' },
    sidebar: {
      default: '#f6f6f6',
      foreground: '#515353',
      accent: '#e5edf9',
      accentForeground: '#0047c7',
      border: '#dadada',
    },
  },
  cssVars: {
    '--sds-button-ghost-muted-fg': '#334155',
  },
};

export const lightTheme = createTheme(lightThemeInput);

/* ------------------------------------------------------------------ */
/*  Dark theme                                                         */
/* ------------------------------------------------------------------ */

/**
 * Dark theme — inverted palette derived from the Orbie token scales.
 *
 * ```tsx
 * <ThemeProvider theme={darkTheme} global>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const darkThemeInput: SdsThemeInput = {
  palette: {
    mode: 'dark',
    background: { default: '#0f172a', paper: '#1e293b' },
    foreground: { default: '#f1f5f9' },
    primary: { main: '#739ae0', light: '#a6bfeb', dark: '#4075d5', contrastText: '#0f172a' },
    secondary: { main: '#334155', light: '#475569', dark: '#1e293b', contrastText: '#f1f5f9' },
    muted: { main: '#1e293b', light: '#334155', dark: '#0f172a', contrastText: '#94a3b8' },
    accent: { main: '#1e3a5f', light: '#2d4a6f', dark: '#0f2a4f', contrastText: '#a6bfeb' },
    destructive: { main: '#ff938a', light: '#ffb0a9', dark: '#ff6f63', contrastText: '#1e293b' },
    border: '#334155',
    input: '#334155',
    ring: '#739ae0',
    orbieBlue: { text: '#1e3a5f', bg: '#9bc2ef' },
    orbieYellow: { text: '#78540a', bg: '#f7dca8' },
    orbieRed: { text: '#7f0f05', bg: '#ffb0a9' },
    orbieGreen: { text: '#1a4a1a', bg: '#a5d8a5' },
    card: { default: '#1e293b', foreground: '#f1f5f9' },
    popover: { default: '#1e293b', foreground: '#f1f5f9' },
    sidebar: {
      default: '#1e293b',
      foreground: '#f1f5f9',
      accent: '#1e3a5f',
      accentForeground: '#a6bfeb',
      border: '#334155',
    },
  },
  cssVars: {
    '--sds-input-border-default': '#334155',
    '--sds-input-border-focus': '#64748b',
    '--sds-input-ring-focus': '#475569',
    '--sds-input-text': '#f1f5f9',
    '--sds-input-placeholder': '#64748b',
    '--sds-button-ghost-muted-fg': '#94a3b8',
    '--sds-pagination-nav-fg': '#94a3b8',
    '--sds-pagination-border': '#334155',
    '--sds-progress-track': '#334155',
    '--sds-progress-fill': '#77ace9',
    '--sds-alert-dialog-shadow':
      '0 10px 15px 0 rgba(0, 0, 0, 0.3), 0 4px 6px 0 rgba(0, 0, 0, 0.3)',
  },
};

export const darkTheme = createTheme(darkThemeInput);

/* ------------------------------------------------------------------ */
/*  Dim theme — GitHub / Discord style soft dark                       */
/* ------------------------------------------------------------------ */

export const dimThemeInput: SdsThemeInput = {
  palette: {
    mode: 'dim',
    background: { default: '#22272e', paper: '#2d333b' },
    foreground: { default: '#adbac7' },
    primary: { main: '#539bf5', light: '#6cb6ff', dark: '#316dca', contrastText: '#22272e' },
    secondary: { main: '#373e47', light: '#444c56', dark: '#2d333b', contrastText: '#adbac7' },
    muted: { main: '#2d333b', light: '#373e47', dark: '#22272e', contrastText: '#768390' },
    accent: { main: '#263c57', light: '#2d4a6f', dark: '#1c2d41', contrastText: '#6cb6ff' },
    destructive: { main: '#e5534b', light: '#f47067', dark: '#c93c37', contrastText: '#22272e' },
    border: '#444c56',
    input: '#444c56',
    ring: '#539bf5',
    orbieBlue: { text: '#6cb6ff', bg: '#1c3a5c' },
    orbieYellow: { text: '#daaa3f', bg: '#3d2e00' },
    orbieRed: { text: '#f47067', bg: '#5c211e' },
    orbieGreen: { text: '#57ab5a', bg: '#1b4721' },
    card: { default: '#2d333b', foreground: '#adbac7' },
    popover: { default: '#2d333b', foreground: '#adbac7' },
    sidebar: {
      default: '#2d333b',
      foreground: '#adbac7',
      accent: '#263c57',
      accentForeground: '#6cb6ff',
      border: '#444c56',
    },
  },
  cssVars: {
    '--sds-input-border-default': '#444c56',
    '--sds-input-border-focus': '#539bf5',
    '--sds-input-ring-focus': '#316dca',
    '--sds-input-text': '#adbac7',
    '--sds-input-placeholder': '#636e7b',
    '--sds-button-ghost-muted-fg': '#768390',
    '--sds-pagination-nav-fg': '#768390',
    '--sds-pagination-border': '#444c56',
    '--sds-progress-track': '#373e47',
    '--sds-progress-fill': '#539bf5',
    '--sds-alert-dialog-shadow':
      '0 10px 15px 0 rgba(0, 0, 0, 0.3), 0 4px 6px 0 rgba(0, 0, 0, 0.3)',
  },
};

export const dimTheme = createTheme(dimThemeInput);

/* ------------------------------------------------------------------ */
/*  Midnight theme — deep blue brand feel (Slack / Telegram style)     */
/* ------------------------------------------------------------------ */

export const midnightThemeInput: SdsThemeInput = {
  palette: {
    mode: 'midnight',
    background: { default: '#0a1929', paper: '#0f2744' },
    foreground: { default: '#b2bac2' },
    primary: { main: '#5090d3', light: '#7eb8f0', dark: '#3a6ea5', contrastText: '#0a1929' },
    secondary: { main: '#1a2b42', light: '#243b55', dark: '#0f2035', contrastText: '#b2bac2' },
    muted: { main: '#0f2744', light: '#1a2b42', dark: '#0a1929', contrastText: '#7b8fa3' },
    accent: { main: '#132f4c', light: '#1a3d5c', dark: '#0a2340', contrastText: '#7eb8f0' },
    destructive: { main: '#f06292', light: '#f48fb1', dark: '#c2185b', contrastText: '#0a1929' },
    border: '#1e3a5f',
    input: '#1e3a5f',
    ring: '#5090d3',
    orbieBlue: { text: '#7eb8f0', bg: '#132f4c' },
    orbieYellow: { text: '#ffb74d', bg: '#3e2723' },
    orbieRed: { text: '#f48fb1', bg: '#4a1a2e' },
    orbieGreen: { text: '#66bb6a', bg: '#1b3a1b' },
    card: { default: '#0f2744', foreground: '#b2bac2' },
    popover: { default: '#0f2744', foreground: '#b2bac2' },
    sidebar: {
      default: '#0f2035',
      foreground: '#b2bac2',
      accent: '#132f4c',
      accentForeground: '#7eb8f0',
      border: '#1e3a5f',
    },
  },
  cssVars: {
    '--sds-input-border-default': '#1e3a5f',
    '--sds-input-border-focus': '#5090d3',
    '--sds-input-ring-focus': '#3a6ea5',
    '--sds-input-text': '#b2bac2',
    '--sds-input-placeholder': '#5a6f83',
    '--sds-button-ghost-muted-fg': '#7b8fa3',
    '--sds-pagination-nav-fg': '#7b8fa3',
    '--sds-pagination-border': '#1e3a5f',
    '--sds-progress-track': '#1a2b42',
    '--sds-progress-fill': '#5090d3',
    '--sds-alert-dialog-shadow':
      '0 10px 15px 0 rgba(0, 0, 0, 0.4), 0 4px 6px 0 rgba(0, 0, 0, 0.4)',
  },
};

export const midnightTheme = createTheme(midnightThemeInput);

/* ------------------------------------------------------------------ */
/*  AMOLED theme — pure black for OLED screens                         */
/* ------------------------------------------------------------------ */

export const amoledThemeInput: SdsThemeInput = {
  palette: {
    mode: 'amoled',
    background: { default: '#000000', paper: '#0a0a0a' },
    foreground: { default: '#e4e4e7' },
    primary: { main: '#818cf8', light: '#a5b4fc', dark: '#6366f1', contrastText: '#000000' },
    secondary: { main: '#18181b', light: '#27272a', dark: '#09090b', contrastText: '#e4e4e7' },
    muted: { main: '#0a0a0a', light: '#18181b', dark: '#000000', contrastText: '#71717a' },
    accent: { main: '#1e1b4b', light: '#312e81', dark: '#0f0d2e', contrastText: '#a5b4fc' },
    destructive: { main: '#fb7185', light: '#fda4af', dark: '#e11d48', contrastText: '#000000' },
    border: '#27272a',
    input: '#27272a',
    ring: '#818cf8',
    orbieBlue: { text: '#93c5fd', bg: '#172554' },
    orbieYellow: { text: '#fcd34d', bg: '#422006' },
    orbieRed: { text: '#fda4af', bg: '#4c0519' },
    orbieGreen: { text: '#86efac', bg: '#052e16' },
    card: { default: '#0a0a0a', foreground: '#e4e4e7' },
    popover: { default: '#0a0a0a', foreground: '#e4e4e7' },
    sidebar: {
      default: '#000000',
      foreground: '#e4e4e7',
      accent: '#1e1b4b',
      accentForeground: '#a5b4fc',
      border: '#27272a',
    },
  },
  cssVars: {
    '--sds-input-border-default': '#27272a',
    '--sds-input-border-focus': '#818cf8',
    '--sds-input-ring-focus': '#6366f1',
    '--sds-input-text': '#e4e4e7',
    '--sds-input-placeholder': '#52525b',
    '--sds-button-ghost-muted-fg': '#71717a',
    '--sds-pagination-nav-fg': '#71717a',
    '--sds-pagination-border': '#27272a',
    '--sds-progress-track': '#18181b',
    '--sds-progress-fill': '#818cf8',
    '--sds-alert-dialog-shadow':
      '0 10px 15px 0 rgba(0, 0, 0, 0.5), 0 4px 6px 0 rgba(0, 0, 0, 0.5)',
  },
};

export const amoledTheme = createTheme(amoledThemeInput);
