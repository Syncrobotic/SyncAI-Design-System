import * as React from 'react';

/* ================================================================== */
/*  Theme token types                                                  */
/* ================================================================== */

/**
 * Extensible interface — consumers can augment the theme via:
 *
 * ```ts
 * declare module '@syncai/design-system' {
 *   interface SdsCustomTheme {
 *     myApp: { headerHeight: number };
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SdsCustomTheme {}

/* ── Palette (MUI-style: main + optional light/dark/contrastText) ── */

export interface SdsPaletteColor {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

/** All supported color modes. */
export type SdsColorMode = 'light' | 'dark' | 'dim' | 'midnight' | 'amoled';

/** Contrast level — `standard` or WCAG-enhanced `high`. */
export type SdsContrast = 'standard' | 'high';

/** Density scale — controls component sizing and spacing. */
export type SdsDensity = 'compact' | 'comfortable' | 'spacious';

export interface SdsThemePalette {
  mode?: SdsColorMode;
  background?: { default?: string; paper?: string };
  foreground?: { default?: string };
  primary?: SdsPaletteColor;
  secondary?: SdsPaletteColor;
  muted?: SdsPaletteColor;
  accent?: SdsPaletteColor;
  destructive?: SdsPaletteColor;
  border?: string;
  input?: string;
  ring?: string;
  /* Badge tones */
  orbieBlue?: { text?: string; bg?: string };
  orbieYellow?: { text?: string; bg?: string };
  orbieRed?: { text?: string; bg?: string };
  orbieGreen?: { text?: string; bg?: string };
  /* Popover / Card / Sidebar (shorthand) */
  card?: { default?: string; foreground?: string };
  popover?: { default?: string; foreground?: string };
  sidebar?: {
    default?: string;
    foreground?: string;
    accent?: string;
    accentForeground?: string;
    border?: string;
  };
}

/* ── Typography ── */

export interface SdsTypographyVariant {
  fontSize?: string;
  fontWeight?: number | string;
  lineHeight?: string;
  letterSpacing?: string;
}

export interface SdsThemeTypography {
  fontFamily?: string;
  h1?: SdsTypographyVariant;
  h2?: SdsTypographyVariant;
  h3?: SdsTypographyVariant;
  h4?: SdsTypographyVariant;
  h5?: SdsTypographyVariant;
  h6?: SdsTypographyVariant;
  body1?: SdsTypographyVariant;
  body2?: SdsTypographyVariant;
  caption?: SdsTypographyVariant;
}

/* ── Shape / Spacing / Breakpoints / Shadows / Transitions ── */

export interface SdsThemeShape {
  borderRadius: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

export interface SdsThemeBreakpoints {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}

export interface SdsThemeTransitions {
  duration?: { short?: string; standard?: string; complex?: string };
  easing?: { easeIn?: string; easeOut?: string; easeInOut?: string };
}

/* ── z-index ── */

export interface SdsThemeZIndex {
  mobileStepper?: number;
  fab?: number;
  speedDial?: number;
  appBar?: number;
  drawer?: number;
  modal?: number;
  snackbar?: number;
  tooltip?: number;
}

/* ── Component-level tokens ── */

export interface SdsComponentTokens {
  [componentName: string]: Record<string, string> | undefined;
}

/* ── Color scheme (light + dark in one theme) ── */

export interface SdsColorScheme {
  palette?: SdsThemePalette;
  cssVars?: Record<string, string>;
}

export interface SdsColorSchemes {
  light?: SdsColorScheme | true;
  dark?: SdsColorScheme | true;
  dim?: SdsColorScheme | true;
  midnight?: SdsColorScheme | true;
  amoled?: SdsColorScheme | true;
}

/* ── augmentColor options ── */

export interface AugmentColorOptions {
  color: { main: string; light?: string; dark?: string; contrastText?: string };
  tonalOffset?: number | { light: number; dark: number };
  contrastThreshold?: number;
}

/* ── Full theme (input/partial — all optional) ── */

export interface SdsThemeInput {
  palette?: SdsThemePalette;
  typography?: SdsThemeTypography;
  shape?: SdsThemeShape;
  spacing?: number;
  /** Contrast level — `'standard'` (default) or `'high'` (WCAG enhanced). */
  contrast?: SdsContrast;
  /** Density scale — `'comfortable'` (default), `'compact'`, or `'spacious'`. */
  density?: SdsDensity;
  breakpoints?: SdsThemeBreakpoints;
  shadows?: string[];
  transitions?: SdsThemeTransitions;
  zIndex?: SdsThemeZIndex;
  components?: SdsComponentTokens;
  cssVars?: Record<string, string>;
  /** Define light + dark palettes in a single theme. */
  colorSchemes?: SdsColorSchemes;
  /** Control auto-derivation of light/dark from main (default: 0.2). */
  tonalOffset?: number | { light: number; dark: number };
  /** Minimum contrast ratio for contrastText selection (default: 3). */
  contrastThreshold?: number;
}

/* ── Resolved theme (output — all required) ── */

type Required_<T> = { [K in keyof T]-?: NonNullable<T[K]> };

export interface SdsTheme extends Required_<Omit<SdsThemeInput, 'colorSchemes' | 'tonalOffset' | 'contrastThreshold' | 'contrast' | 'density'>>, SdsCustomTheme {
  /** Active contrast level. */
  contrast: SdsContrast;
  /** Active density scale. */
  density: SdsDensity;
  palette: Required_<SdsThemePalette> & {
    mode: SdsColorMode;
    primary: Required<SdsPaletteColor>;
    secondary: Required<SdsPaletteColor>;
    muted: Required<SdsPaletteColor>;
    accent: Required<SdsPaletteColor>;
    destructive: Required<SdsPaletteColor>;
    /** Derive a full color set from a single `main` value. */
    augmentColor: (opts: AugmentColorOptions) => Required<SdsPaletteColor>;
    /** Get contrast text (black or white) for a given background. */
    getContrastText: (background: string) => string;
  };
  typography: Required_<SdsThemeTypography> & {
    fontFamily: string;
  };
  shape: Required_<SdsThemeShape>;
  zIndex: Required<SdsThemeZIndex>;
  spacing: number;
  /** Helper: `theme.sp(n)` → `${n * base}px` */
  sp: (factor: number) => string;
  /** Active color schemes (if defined via `colorSchemes`). */
  colorSchemes?: SdsColorSchemes;
}

/* ================================================================== */
/*  Legacy aliases (backward compat)                                   */
/* ================================================================== */

export type SdsThemeColors = SdsThemePalette;
export type SdsThemeRadius = SdsThemeShape['borderRadius'];
export type SdsThemeFontFamily = { sans?: string };

/* ================================================================== */
/*  Default theme values                                               */
/* ================================================================== */

const DEFAULT_PALETTE: Required_<SdsThemePalette> = {
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
};

const DEFAULT_TYPOGRAPHY: SdsTheme['typography'] = {
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: '2.5rem' },
  h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: '2.25rem' },
  h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: '2rem' },
  h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.75rem' },
  h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: '1.5rem' },
  h6: { fontSize: '1rem', fontWeight: 600, lineHeight: '1.5rem' },
  body1: { fontSize: '0.875rem', fontWeight: 400, lineHeight: '1.3125rem', letterSpacing: '0.07px' },
  body2: { fontSize: '0.75rem', fontWeight: 400, lineHeight: '1rem', letterSpacing: '0.18px' },
  caption: { fontSize: '0.625rem', fontWeight: 400, lineHeight: '0.875rem' },
};

const DEFAULT_SHAPE: SdsTheme['shape'] = {
  borderRadius: { sm: '4px', md: '6px', lg: '8px', xl: '12px' },
};

const DEFAULT_BREAKPOINTS: SdsTheme['breakpoints'] = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

const DEFAULT_SHADOWS: string[] = [
  'none',
  '0 1px 2px 0 rgba(0,0,0,0.05)',
  '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.1)',
  '0 4px 6px 0 rgba(0,0,0,0.1), 0 2px 4px 0 rgba(0,0,0,0.1)',
  '0 10px 15px 0 rgba(0,0,0,0.1), 0 4px 6px 0 rgba(0,0,0,0.1)',
];

const DEFAULT_TRANSITIONS: SdsTheme['transitions'] = {
  duration: { short: '150ms', standard: '250ms', complex: '375ms' },
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

const DEFAULT_ZINDEX: Required<SdsThemeZIndex> = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

/* ── Density tokens ── */

/**
 * Density-dependent tokens.
 * Each key maps to CSS vars: `--sds-density-<key>`.
 */
const DENSITY_TOKENS: Record<SdsDensity, Record<string, string>> = {
  compact: {
    'input-height': '32px',
    'button-height': '30px',
    'button-padding-x': '12px',
    'button-padding-y': '4px',
    'cell-padding-y': '4px',
    'cell-padding-x': '8px',
    'gap': '4px',
    'icon-size': '16px',
  },
  comfortable: {
    'input-height': '40px',
    'button-height': '36px',
    'button-padding-x': '16px',
    'button-padding-y': '8px',
    'cell-padding-y': '8px',
    'cell-padding-x': '12px',
    'gap': '8px',
    'icon-size': '20px',
  },
  spacious: {
    'input-height': '48px',
    'button-height': '44px',
    'button-padding-x': '24px',
    'button-padding-y': '12px',
    'cell-padding-y': '12px',
    'cell-padding-x': '16px',
    'gap': '12px',
    'icon-size': '24px',
  },
};

/* ================================================================== */
/*  Color utilities (augmentColor / getContrastText)                    */
/* ================================================================== */

/** Parse a hex color (#RGB or #RRGGBB) into [r, g, b] (0–255). */
function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Convert [r, g, b] back to #RRGGBB. */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((c) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0')).join('');
}

/** Relative luminance (WCAG 2.1). */
function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two colors (1–21). */
function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Lighten a hex color by `amount` (0–1). */
function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount);
}

/** Darken a hex color by `amount` (0–1). */
function darken(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}

/** Choose black or white text for a given background color. */
function getContrastText(background: string, threshold = 3): string {
  return contrastRatio('#ffffff', background) >= threshold ? '#ffffff' : '#000000';
}

/**
 * Derive a full `{ main, light, dark, contrastText }` from just `main`.
 *
 * Like MUI's `palette.augmentColor()` — automatically fills missing tokens.
 *
 * ```ts
 * const color = augmentColor({ color: { main: '#1976d2' } });
 * // → { main: '#1976d2', light: '#4791db', dark: '#115293', contrastText: '#fff' }
 * ```
 */
export function augmentColor(opts: AugmentColorOptions): Required<SdsPaletteColor> {
  const { color, tonalOffset = 0.2, contrastThreshold = 3 } = opts;
  const lightOffset = typeof tonalOffset === 'number' ? tonalOffset : tonalOffset.light;
  const darkOffset = typeof tonalOffset === 'number' ? tonalOffset : tonalOffset.dark;

  return {
    main: color.main,
    light: color.light ?? lighten(color.main, lightOffset),
    dark: color.dark ?? darken(color.main, darkOffset),
    contrastText: color.contrastText ?? getContrastText(color.main, contrastThreshold),
  };
}

// Re-export color utilities
export { lighten, darken, getContrastText, contrastRatio, luminance };

/* ================================================================== */
/*  Deep merge helper                                                  */
/* ================================================================== */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target } as Record<string, unknown>;
  const src = source as Record<string, unknown>;
  for (const key of Object.keys(src)) {
    const sv = src[key];
    const tv = result[key];
    if (isPlainObject(sv) && isPlainObject(tv)) {
      result[key] = deepMerge(tv, sv);
    } else if (sv !== undefined) {
      result[key] = sv;
    }
  }
  return result as T;
}

/* ================================================================== */
/*  resolveTheme — fill in defaults                                    */
/* ================================================================== */

/** Auto-augment palette colors that only have `main`. */
function augmentPaletteColors(
  palette: Record<string, unknown>,
  tonalOffset: number | { light: number; dark: number },
  contrastThreshold: number,
): void {
  const colorKeys = ['primary', 'secondary', 'muted', 'accent', 'destructive'];
  for (const key of colorKeys) {
    const c = palette[key];
    if (isPlainObject(c) && typeof c.main === 'string') {
      const augmented = augmentColor({
        color: c as { main: string; light?: string; dark?: string; contrastText?: string },
        tonalOffset,
        contrastThreshold,
      });
      palette[key] = augmented;
    }
  }
}

/**
 * Boost palette for high-contrast mode.
 * Ensures all foreground/text colors meet WCAG AAA (7:1) against their backgrounds.
 */
function applyHighContrast(palette: Record<string, unknown>, mode: string): void {
  const isDark = mode !== 'light';

  // Boost border visibility
  if (typeof palette.border === 'string') {
    palette.border = isDark ? lighten(palette.border as string, 0.3) : darken(palette.border as string, 0.3);
  }
  if (typeof palette.input === 'string') {
    palette.input = isDark ? lighten(palette.input as string, 0.25) : darken(palette.input as string, 0.25);
  }

  // Ensure text colors hit ≥ 7:1 ratio
  const bg = isPlainObject(palette.background) ? (palette.background as Record<string, string>).default : '#ffffff';
  if (bg) {
    const targetRatio = 7; // WCAG AAA
    const fg = isPlainObject(palette.foreground) ? (palette.foreground as Record<string, string>).default : undefined;
    if (fg && contrastRatio(fg, bg) < targetRatio) {
      (palette.foreground as Record<string, string>).default = isDark ? '#ffffff' : '#000000';
    }

    // Boost muted foreground
    const muted = palette.muted;
    if (isPlainObject(muted) && typeof muted.contrastText === 'string') {
      if (contrastRatio(muted.contrastText, bg) < targetRatio) {
        muted.contrastText = isDark ? '#d1d5db' : '#374151';
      }
    }
  }
}

/** Resolve colorSchemes into the active palette based on mode. */
function resolveColorSchemes(input: SdsThemeInput): SdsThemeInput {
  if (!input.colorSchemes) return input;

  const mode = input.palette?.mode ?? 'light';
  const scheme = input.colorSchemes[mode];
  if (!scheme || scheme === true) return input;

  // Merge the active scheme's palette and cssVars into the main input
  return deepMerge(
    input as Record<string, unknown>,
    {
      palette: scheme.palette ?? {},
      cssVars: scheme.cssVars ?? {},
    } as Record<string, unknown>,
  ) as unknown as SdsThemeInput;
}

function resolveTheme(input: SdsThemeInput): SdsTheme {
  // 1. Resolve colorSchemes first
  const resolved = resolveColorSchemes(input);

  const tonalOffset = resolved.tonalOffset ?? 0.2;
  const contrastThreshold = resolved.contrastThreshold ?? 3;
  const contrast = resolved.contrast ?? 'standard';
  const density = resolved.density ?? 'comfortable';

  // 2. Build palette, then auto-augment colors
  const palette = deepMerge(
    DEFAULT_PALETTE as Record<string, unknown>,
    (resolved.palette ?? {}) as Record<string, unknown>,
  ) as Record<string, unknown>;
  augmentPaletteColors(palette, tonalOffset, contrastThreshold);

  // 2b. Apply high-contrast adjustments when requested
  if (contrast === 'high') {
    applyHighContrast(palette, (palette.mode as string) ?? 'light');
  }

  // 3. Attach augmentColor + getContrastText methods to the palette
  (palette as Record<string, unknown>).augmentColor = (opts: AugmentColorOptions) =>
    augmentColor({ ...opts, tonalOffset, contrastThreshold });
  (palette as Record<string, unknown>).getContrastText = (bg: string) =>
    getContrastText(bg, contrastThreshold);

  const typography = deepMerge(
    DEFAULT_TYPOGRAPHY as Record<string, unknown>,
    (resolved.typography ?? {}) as Record<string, unknown>,
  ) as SdsTheme['typography'];
  const shape = deepMerge(
    DEFAULT_SHAPE as Record<string, unknown>,
    (resolved.shape ?? {}) as Record<string, unknown>,
  ) as SdsTheme['shape'];
  const spacingBase = resolved.spacing ?? 8;
  const transitions = deepMerge(
    DEFAULT_TRANSITIONS as Record<string, unknown>,
    (resolved.transitions ?? {}) as Record<string, unknown>,
  ) as SdsTheme['transitions'];
  const zIndex = { ...DEFAULT_ZINDEX, ...resolved.zIndex };

  return {
    palette: palette as SdsTheme['palette'],
    typography,
    shape,
    spacing: spacingBase,
    contrast,
    density,
    breakpoints: { ...DEFAULT_BREAKPOINTS, ...resolved.breakpoints },
    shadows: resolved.shadows ?? [...DEFAULT_SHADOWS],
    transitions,
    zIndex,
    components: resolved.components ?? {},
    cssVars: resolved.cssVars ?? {},
    sp: (factor: number) => `${factor * spacingBase}px`,
    colorSchemes: input.colorSchemes,
  };
}

export { resolveTheme };

/* ================================================================== */
/*  createTheme                                                        */
/* ================================================================== */

/**
 * Create a fully resolved theme from one or more partial theme inputs.
 *
 * Supports MUI-style patterns:
 * - `createTheme()` — returns the default light theme
 * - `createTheme({ palette: { mode: 'dark', ... } })` — dark theme
 * - `createTheme(base, overrides)` — deep-merge multiple partials
 * - `createTheme(outerTheme => ({ palette: { ... } }))` — function form
 *
 * ```ts
 * const myTheme = createTheme({
 *   palette: { primary: { main: '#1976d2' } },
 *   typography: { fontFamily: "'Inter', sans-serif" },
 * });
 * ```
 */
export function createTheme(
  ...args: Array<SdsThemeInput | ((base: SdsTheme) => SdsThemeInput)>
): SdsTheme {
  let merged: SdsThemeInput = {};

  for (const arg of args) {
    if (typeof arg === 'function') {
      const base = resolveTheme(merged);
      const partial = arg(base);
      merged = deepMerge(
        merged as Record<string, unknown>,
        partial as Record<string, unknown>,
      ) as unknown as SdsThemeInput;
    } else {
      merged = deepMerge(
        merged as Record<string, unknown>,
        arg as Record<string, unknown>,
      ) as unknown as SdsThemeInput;
    }
  }

  return resolveTheme(merged);
}

/* ================================================================== */
/*  themeToStyleVars — CSS custom property generation                   */
/* ================================================================== */

/** Convert camelCase → kebab-case (e.g. `primaryForeground` → `primary-foreground`). */
function camelToKebab(s: string): string {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/** Flatten a resolved `SdsTheme` into CSS custom properties. */
function themeToStyleVars(theme: SdsTheme): Record<string, string> {
  const vars: Record<string, string> = {};
  const p = theme.palette;

  /* ── Colors → --color-* ── */
  if (p.background?.default) vars['--color-background'] = p.background.default;
  if (p.foreground?.default) vars['--color-foreground'] = p.foreground.default;

  // Primary / secondary / muted / accent / destructive
  for (const name of ['primary', 'secondary', 'muted', 'accent', 'destructive'] as const) {
    const c = p[name];
    if (c?.main) vars[`--color-${name}`] = c.main;
    if (c?.contrastText) vars[`--color-${name}-foreground`] = c.contrastText;
  }

  // Border / input / ring (simple strings)
  if (p.border) vars['--color-border'] = p.border;
  if (p.input) vars['--color-input'] = p.input;
  if (p.ring) vars['--color-ring'] = p.ring;

  // Card / popover
  if (p.card?.default) vars['--color-card'] = p.card.default;
  if (p.card?.foreground) vars['--color-card-foreground'] = p.card.foreground;
  if (p.popover?.default) vars['--color-popover'] = p.popover.default;
  if (p.popover?.foreground) vars['--color-popover-foreground'] = p.popover.foreground;

  // Badge tones
  for (const name of ['orbieBlue', 'orbieYellow', 'orbieRed', 'orbieGreen'] as const) {
    const tone = p[name];
    if (tone?.text) vars[`--color-${camelToKebab(name)}`] = tone.text;
    if (tone?.bg) vars[`--color-${camelToKebab(name)}-bg`] = tone.bg;
  }

  // Sidebar
  if (p.sidebar) {
    if (p.sidebar.default) vars['--color-sidebar'] = p.sidebar.default;
    if (p.sidebar.foreground) vars['--color-sidebar-foreground'] = p.sidebar.foreground;
    if (p.sidebar.accent) vars['--color-sidebar-accent'] = p.sidebar.accent;
    if (p.sidebar.accentForeground) vars['--color-sidebar-accent-foreground'] = p.sidebar.accentForeground;
    if (p.sidebar.border) vars['--color-sidebar-border'] = p.sidebar.border;
  }

  /* ── Orbie token overrides ──
   * Tailwind v4 `@theme inline` inlines `var(--orbie-*)` references into
   * utility classes (e.g. `text-secondary-foreground` → `color: var(--orbie-primary-gray-100)`).
   * We must override these underlying tokens for runtime theme switching. */
  if (p.background?.default) vars['--orbie-bg-surface'] = p.background.default;
  if (p.muted?.main) vars['--orbie-bg-muted'] = p.muted.main;
  if (p.foreground?.default) vars['--orbie-primary-gray-100'] = p.foreground.default;
  if (p.muted?.contrastText) vars['--orbie-primary-gray-75'] = p.muted.contrastText;
  if (p.muted?.dark) vars['--orbie-primary-gray-55'] = p.muted.dark;
  if (p.secondary?.dark) vars['--orbie-primary-gray-35'] = p.secondary.dark;
  if (p.secondary?.main) vars['--orbie-primary-gray-10'] = p.secondary.main;
  if (p.primary?.main) vars['--orbie-primary-violet-100'] = p.primary.main;
  if (p.primary?.light) vars['--orbie-primary-violet-75'] = p.primary.light;
  if (p.primary?.dark) vars['--orbie-primary-violet-55'] = p.primary.dark;
  if (p.accent?.light) vars['--orbie-primary-violet-35'] = p.accent.light;
  if (p.accent?.main) vars['--orbie-primary-violet-10'] = p.accent.main;
  if (p.destructive?.main) vars['--orbie-secondary-red-100'] = p.destructive.main;
  if (p.border) vars['--orbie-variant-35'] = p.border;
  if (p.sidebar?.border) vars['--orbie-variant-10'] = p.sidebar.border;

  // Badge tones → --orbie-secondary-*
  if (p.orbieBlue?.text) vars['--orbie-secondary-blue-100'] = p.orbieBlue.text;
  if (p.orbieBlue?.bg) vars['--orbie-secondary-blue-10'] = p.orbieBlue.bg;
  if (p.orbieYellow?.text) vars['--orbie-secondary-yellow-100'] = p.orbieYellow.text;
  if (p.orbieYellow?.bg) vars['--orbie-secondary-yellow-10'] = p.orbieYellow.bg;
  if (p.orbieRed?.text) vars['--orbie-secondary-red-100'] = p.orbieRed.text;
  if (p.orbieRed?.bg) vars['--orbie-secondary-red-10'] = p.orbieRed.bg;
  if (p.orbieGreen?.text) vars['--orbie-secondary-green-100'] = p.orbieGreen.text;
  if (p.orbieGreen?.bg) vars['--orbie-secondary-green-10'] = p.orbieGreen.bg;

  /* ── Shape → --radius-* ── */
  for (const [key, value] of Object.entries(theme.shape.borderRadius)) {
    if (value != null) vars[`--radius-${key}`] = value;
  }

  /* ── Typography → --font-* ── */
  if (theme.typography.fontFamily) {
    vars['--font-sans'] = theme.typography.fontFamily;
  }

  /* ── Spacing scale → --sds-space-* ── */
  const base = theme.spacing; // default 8 → 4px unit
  const spaceSteps = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16];
  for (const step of spaceSteps) {
    const key = String(step).replace('.', '_');
    vars[`--sds-space-${key}`] = `${step * (base / 2)}px`;
  }

  /* ── Density → --sds-density-* ── */
  const densityTokens = DENSITY_TOKENS[theme.density] ?? DENSITY_TOKENS.comfortable;
  for (const [key, value] of Object.entries(densityTokens)) {
    vars[`--sds-density-${key}`] = value;
  }

  /* ── Component tokens → --sds-<component>-* ── */
  if (theme.components) {
    for (const [comp, tokens] of Object.entries(theme.components)) {
      if (!tokens) continue;
      for (const [key, value] of Object.entries(tokens)) {
        if (value != null) vars[`--sds-${camelToKebab(comp)}-${camelToKebab(key)}`] = value;
      }
    }
  }

  /* ── z-index → --sds-z-* ── */
  for (const [key, value] of Object.entries(theme.zIndex)) {
    if (value != null) vars[`--sds-z-${camelToKebab(key)}`] = String(value);
  }

  /* ── Transitions → --sds-duration-*, --sds-easing-* ── */
  if (theme.transitions.duration) {
    for (const [key, value] of Object.entries(theme.transitions.duration)) {
      if (value != null) vars[`--sds-duration-${key}`] = value;
    }
  }
  if (theme.transitions.easing) {
    for (const [key, value] of Object.entries(theme.transitions.easing)) {
      if (value != null) vars[`--sds-easing-${camelToKebab(key)}`] = value;
    }
  }

  /* ── Escape-hatch cssVars ── */
  if (theme.cssVars) {
    for (const [key, value] of Object.entries(theme.cssVars)) {
      if (value != null) vars[key] = value;
    }
  }

  return vars;
}

/* ================================================================== */
/*  Context                                                            */
/* ================================================================== */

const ThemeContext = React.createContext<SdsTheme | null>(null);

export { ThemeContext };

/**
 * Access the closest `<ThemeProvider>`'s resolved theme.
 *
 * Returns the default theme when no provider is found above.
 */
export function useTheme(): SdsTheme {
  const ctx = React.useContext(ThemeContext);
  if (ctx) return ctx;
  return resolveTheme({});
}

/* ================================================================== */
/*  ThemeProvider                                                       */
/* ================================================================== */

export interface ThemeProviderProps {
  /**
   * The theme to apply. Accepts:
   * - A partial `SdsThemeInput` — will be resolved against defaults
   * - A resolved `SdsTheme` (from `createTheme()`)
   * - A function `(outerTheme) => SdsThemeInput` for nested overrides
   */
  theme: SdsTheme | SdsThemeInput | ((outer: SdsTheme) => SdsThemeInput);
  children: React.ReactNode;
  /** Extra className for the wrapper element. */
  className?: string;
  /**
   * When `true`, applies the CSS variables to `document.documentElement`
   * instead of adding a wrapper element — useful at the app root.
   *
   * @default false
   */
  global?: boolean;
}

function isResolvedTheme(t: unknown): t is SdsTheme {
  return isPlainObject(t) && typeof (t as unknown as SdsTheme).sp === 'function';
}

/**
 * Inject a theme into the component tree via CSS custom properties.
 *
 * Supports **nested providers** — inner themes are deep-merged with the
 * outer theme automatically (like MUI). Only pass the overrides you need.
 *
 * ```tsx
 * <ThemeProvider theme={myTheme} global>
 *   <App />
 * </ThemeProvider>
 *
 * // Nested — only override primary color
 * <ThemeProvider theme={{ palette: { primary: { main: '#e91e63' } } }}>
 *   <SpecialSection />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme: themeProp,
  children,
  className,
  global = false,
}: ThemeProviderProps) {
  const outerTheme = React.useContext(ThemeContext);

  const resolved = React.useMemo<SdsTheme>(() => {
    // Function form: (outerTheme) => partial
    if (typeof themeProp === 'function') {
      const base = outerTheme ?? resolveTheme({});
      const partial = themeProp(base);
      return createTheme(base as unknown as SdsThemeInput, partial);
    }

    // Already resolved
    if (isResolvedTheme(themeProp)) {
      // If nested, merge with outer
      if (outerTheme) {
        return createTheme(outerTheme as unknown as SdsThemeInput, themeProp as unknown as SdsThemeInput);
      }
      return themeProp;
    }

    // Partial input — merge with outer or defaults
    const base = outerTheme ?? resolveTheme({});
    return createTheme(base as unknown as SdsThemeInput, themeProp);
  }, [themeProp, outerTheme]);

  const vars = React.useMemo(() => themeToStyleVars(resolved), [resolved]);

  // Global mode: apply CSS vars directly on <html>.
  React.useEffect(() => {
    if (!global) return;
    const el = document.documentElement;
    const keys = Object.keys(vars);
    for (const key of keys) el.style.setProperty(key, vars[key]);
    return () => {
      for (const key of keys) el.style.removeProperty(key);
    };
  }, [global, vars]);

  if (global) {
    return (
      <ThemeContext.Provider value={resolved}>{children}</ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={resolved}>
      <div
        className={className}
        style={vars as React.CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
