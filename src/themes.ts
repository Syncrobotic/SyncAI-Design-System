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
