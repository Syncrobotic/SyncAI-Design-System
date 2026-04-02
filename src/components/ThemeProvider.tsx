import * as React from 'react';

/* ------------------------------------------------------------------ */
/*  Theme token types                                                  */
/* ------------------------------------------------------------------ */

/** Semantic color tokens — keys map to `--color-*` CSS custom properties. */
export interface SdsThemeColors {
  background?: string;
  foreground?: string;
  card?: string;
  cardForeground?: string;
  popover?: string;
  popoverForeground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  muted?: string;
  mutedForeground?: string;
  accent?: string;
  accentForeground?: string;
  destructive?: string;
  destructiveForeground?: string;
  border?: string;
  input?: string;
  ring?: string;
  ghostMutedForeground?: string;
  /* Badge tones */
  orbieBlue?: string;
  orbieBlueBg?: string;
  orbieYellow?: string;
  orbieYellowBg?: string;
  orbieRed?: string;
  orbieRedBg?: string;
  orbieGreen?: string;
  orbieGreenBg?: string;
  /* Sidebar */
  sidebar?: string;
  sidebarForeground?: string;
  sidebarAccent?: string;
  sidebarAccentForeground?: string;
  sidebarBorder?: string;
}

/** Border-radius tokens — keys map to `--radius-*` CSS custom properties. */
export interface SdsThemeRadius {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

/** Font-family tokens — keys map to `--font-*` CSS custom properties. */
export interface SdsThemeFontFamily {
  sans?: string;
}

/**
 * Full theme definition.
 *
 * `colors`, `radius`, and `fontFamily` map to the `@theme inline` variables in
 * `globals.css`.  Use `cssVars` as an escape-hatch to override **any** CSS
 * custom property (include the `--` prefix).
 */
export interface SdsTheme {
  colors?: SdsThemeColors;
  radius?: SdsThemeRadius;
  fontFamily?: SdsThemeFontFamily;
  /** Escape-hatch: arbitrary CSS custom properties (use full `--name` keys). */
  cssVars?: Record<string, string>;
}

/* ------------------------------------------------------------------ */
/*  createTheme                                                        */
/* ------------------------------------------------------------------ */

/** Convert camelCase → kebab-case (e.g. `primaryForeground` → `primary-foreground`). */
function camelToKebab(s: string): string {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/** Flatten an `SdsTheme` into a `Record<cssVarName, value>` (only defined keys). */
function themeToStyleVars(theme: SdsTheme): Record<string, string> {
  const vars: Record<string, string> = {};

  if (theme.colors) {
    for (const [key, value] of Object.entries(theme.colors)) {
      if (value != null) vars[`--color-${camelToKebab(key)}`] = value;
    }
  }

  if (theme.radius) {
    for (const [key, value] of Object.entries(theme.radius)) {
      if (value != null) vars[`--radius-${camelToKebab(key)}`] = value;
    }
  }

  if (theme.fontFamily) {
    for (const [key, value] of Object.entries(theme.fontFamily)) {
      if (value != null) vars[`--font-${camelToKebab(key)}`] = value;
    }
  }

  if (theme.cssVars) {
    for (const [key, value] of Object.entries(theme.cssVars)) {
      if (value != null) vars[key] = value;
    }
  }

  return vars;
}

/**
 * Deep-merge multiple partial themes (left-to-right, later wins).
 *
 * ```ts
 * const dark = createTheme(
 *   { colors: { background: '#0f172a', foreground: '#f8fafc' } },
 *   { colors: { primary: '#818cf8' } },
 * );
 * ```
 */
export function createTheme(...themes: SdsTheme[]): SdsTheme {
  const result: SdsTheme = {};

  for (const t of themes) {
    if (t.colors) result.colors = { ...result.colors, ...t.colors };
    if (t.radius) result.radius = { ...result.radius, ...t.radius };
    if (t.fontFamily)
      result.fontFamily = { ...result.fontFamily, ...t.fontFamily };
    if (t.cssVars) result.cssVars = { ...result.cssVars, ...t.cssVars };
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const ThemeContext = React.createContext<SdsTheme | null>(null);

/** Access the closest `<ThemeProvider>`'s theme. Returns `null` when none. */
export function useTheme(): SdsTheme | null {
  return React.useContext(ThemeContext);
}

/* ------------------------------------------------------------------ */
/*  ThemeProvider                                                       */
/* ------------------------------------------------------------------ */

export interface ThemeProviderProps {
  /** The theme to apply.  Use `createTheme()` to compose themes. */
  theme: SdsTheme;
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

/**
 * Inject a theme into the component tree via CSS custom properties.
 *
 * CSS variable inheritance ensures every child component automatically picks up
 * the overridden tokens — **no prop drilling or additional context reads needed
 * for styling**.
 *
 * ```tsx
 * const dark = createTheme({
 *   colors: { background: '#0f172a', foreground: '#f8fafc', primary: '#818cf8' },
 * });
 *
 * <ThemeProvider theme={dark}>
 *   <Button variant="primary">Themed</Button>
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme,
  children,
  className,
  global = false,
}: ThemeProviderProps) {
  const vars = React.useMemo(() => themeToStyleVars(theme), [theme]);

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
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={className}
        style={vars as React.CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
