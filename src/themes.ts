import type { SdsTheme } from './components/ThemeProvider';

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
export const lightTheme: SdsTheme = {
  colors: {
    background: '#ffffff',
    foreground: '#515353',
    card: '#ffffff',
    cardForeground: '#515353',
    popover: '#ffffff',
    popoverForeground: '#515353',
    primary: '#0047c7',
    primaryForeground: '#ffffff',
    secondary: '#eeeeee',
    secondaryForeground: '#515353',
    muted: '#f6f6f6',
    mutedForeground: '#7d7e7e',
    accent: '#e5edf9',
    accentForeground: '#0047c7',
    destructive: '#ff6f63',
    destructiveForeground: '#ffffff',
    border: '#b5b6b6',
    input: '#e2e8f0',
    ring: '#4075d5',
    ghostMutedForeground: '#334155',
    /* Badge tones */
    orbieBlue: '#4a90e2',
    orbieBlueBg: '#edf4fc',
    orbieYellow: '#f0bf60',
    orbieYellowBg: '#fef9ef',
    orbieRed: '#ff6f63',
    orbieRedBg: '#fff1ef',
    orbieGreen: '#5cb85c',
    orbieGreenBg: '#eff8ef',
    /* Sidebar */
    sidebar: '#f6f6f6',
    sidebarForeground: '#515353',
    sidebarAccent: '#e5edf9',
    sidebarAccentForeground: '#0047c7',
    sidebarBorder: '#dadada',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },
  fontFamily: {
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
};

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
export const darkTheme: SdsTheme = {
  colors: {
    background: '#0f172a',
    foreground: '#f1f5f9',
    card: '#1e293b',
    cardForeground: '#f1f5f9',
    popover: '#1e293b',
    popoverForeground: '#f1f5f9',
    primary: '#739ae0',
    primaryForeground: '#0f172a',
    secondary: '#334155',
    secondaryForeground: '#f1f5f9',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
    accent: '#1e3a5f',
    accentForeground: '#a6bfeb',
    destructive: '#ff938a',
    destructiveForeground: '#1e293b',
    border: '#334155',
    input: '#334155',
    ring: '#739ae0',
    ghostMutedForeground: '#94a3b8',
    /* Badge tones — keep vibrant backgrounds, use dark text for contrast */
    orbieBlue: '#1e3a5f',       /* dark blue text */
    orbieBlueBg: '#9bc2ef',     /* light blue bg */
    orbieYellow: '#78540a',     /* dark brown text */
    orbieYellowBg: '#f7dca8',   /* light yellow bg */
    orbieRed: '#7f0f05',        /* dark red text */
    orbieRedBg: '#ffb0a9',      /* light red/pink bg */
    orbieGreen: '#1a4a1a',      /* dark green text */
    orbieGreenBg: '#a5d8a5',    /* light green bg */
    /* Sidebar */
    sidebar: '#1e293b',
    sidebarForeground: '#f1f5f9',
    sidebarAccent: '#1e3a5f',
    sidebarAccentForeground: '#a6bfeb',
    sidebarBorder: '#334155',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },
  fontFamily: {
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  cssVars: {
    /* Component-level tokens that need dark overrides */
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
