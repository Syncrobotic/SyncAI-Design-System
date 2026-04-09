# SyncAI Design System

A React component library and documentation site powered by [Storybook](https://storybook.js.org/docs/?renderer=react). The information architecture follows common design-system conventions—**Getting Started** and **Components**—similar in spirit to references such as the [Strapi Design System](https://design-system.strapi.io/?path=/docs/getting-started-welcome--docs).

---

## Tech stack

| Layer | Technology |
|-------|------------|
| UI framework | [React](https://react.dev/) 18 |
| Component primitives | [shadcn/ui](https://ui.shadcn.com/) (New York style) + [Radix UI](https://www.radix-ui.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 · design tokens in `src/tokens.css` |
| Build tool | [Vite](https://vite.dev/) 6 · library output via `vite-plugin-dts` |
| Documentation | [Storybook](https://storybook.js.org/) 10 (`@storybook/react-vite`) |
| AI integration | [`@storybook/addon-mcp`](https://storybook.js.org/addons/@storybook/addon-mcp) (Model Context Protocol) |

---

## Theme Architecture

The design system implements a **3-layer token architecture** with comprehensive theming capabilities:

```
tokens.css (Orbie palette :root)
  → globals.css (@theme inline for Tailwind v4)
    → ThemeProvider.tsx (runtime CSS var injection)
```

### Color Modes

Six theme modes available via the Storybook toolbar dropdown (powered by `@storybook/addon-themes`):

| Mode | Style | Background |
|------|-------|------------|
| **Light** | Default bright | `#f8fafc` |
| **Dark** | Slate deep dark | `#0f172a` |
| **Dim** | GitHub-style soft dark | `#22272e` |
| **Midnight** | Deep blue brand feel | `#0a1929` |
| **AMOLED** | Pure black OLED-friendly | `#000000` |
| **System** | Auto-detect from OS `prefers-color-scheme` | — |

Theme switching synchronises three isolated environments:

| Environment | Mechanism |
|-------------|-----------|
| **Preview iframe** | `data-theme` attribute + CSS vars in `preview.css` |
| **Docs container** | `ThemedDocsContainer` listens to channel events + `globalsUpdated` |
| **Manager chrome** | `sds-theme-sync` addon listens via channel, applies Storybook theme + CSS class |

### Orthogonal Axes

In addition to color modes, the theme engine supports two independent axes:

| Axis | Values | How it works |
|------|--------|-------------|
| **Contrast** | `standard` · `high` | `createTheme({ contrast: 'high' })` — auto-boosts borders and text to WCAG AAA 7:1 |
| **Density** | `compact` · `comfortable` · `spacious` | Emits `--sds-density-*` CSS vars (input-height, button-height, padding, gap, icon-size) |

### Spacing Scale

A complete 17-step spacing scale based on a 4px unit:

```
--sds-space-0_5 (2px) → --sds-space-16 (64px)
```

Defined in `src/tokens.css` and also emitted dynamically by `themeToStyleVars()` based on `theme.spacing`.

### CSS Accessibility

`src/globals.css` includes four `@media` queries:

| Query | Effect |
|-------|--------|
| `prefers-reduced-motion: reduce` | Disables all animations and transitions |
| `prefers-contrast: more` | Boosts border and muted text contrast |
| `forced-colors: active` | Maps to Windows High Contrast system colors |
| `print` | Hides navigation, removes shadows, B&W output |

### Type Extensibility (`declare module`)

Consumers can augment the theme type:

```ts
declare module '@syncai/design-system' {
  interface SdsCustomTheme {
    myApp: { headerHeight: number };
  }
}

const theme = createTheme({ ... });
theme.myApp.headerHeight; // ✅ TypeScript recognises this
```

### Using Themes in Applications

```tsx
import {
  ThemeProvider,
  createTheme,
  lightTheme,
  darkTheme,
  dimTheme,
  midnightTheme,
  amoledTheme,
} from '@syncai/design-system';
import '@syncai/design-system/styles.css';

// Use a built-in theme
<ThemeProvider theme={darkTheme} global>
  <App />
</ThemeProvider>

// Or customise
const myTheme = createTheme({
  palette: { primary: { main: '#e91e63' } },
  contrast: 'high',
  density: 'compact',
});
```

### Exported Theme Types

| Type | Purpose |
|------|---------|
| `SdsColorMode` | `'light' \| 'dark' \| 'dim' \| 'midnight' \| 'amoled'` |
| `SdsContrast` | `'standard' \| 'high'` |
| `SdsDensity` | `'compact' \| 'comfortable' \| 'spacious'` |
| `SdsTheme` | Fully resolved theme object |
| `SdsThemeInput` | Partial input for `createTheme()` |
| `SdsCustomTheme` | Extensible interface for `declare module` augmentation |

---

## Requirements

| Requirement | Version / notes |
|-------------|------------------|
| [Node.js](https://nodejs.org/) | **20.19 +** or **22.12 +** (required by Storybook 10) |
| Package manager | [**pnpm**](https://pnpm.io/) (this repository includes `pnpm-lock.yaml` for reproducible installs) |

Verify your environment:

```bash
node -v   # expect v20.19+ or v22.12+
pnpm -v
```

---

## Clone and install

```bash
git clone <repository-url>
cd SyncAI-Frontend-Lib-DesignSystem
pnpm install
```

`pnpm install` resolves dependencies from `pnpm-lock.yaml`, which helps keep dependency versions aligned across machines and CI.

---

## Local development

Run Storybook for interactive development and documentation (default port **6006**):

```bash
pnpm dev
```

Open <http://localhost:6006> in your browser.

---

## Build

### Library build (`dist/`)

Produces the publishable package consumed by applications:

```bash
pnpm build
```

Artifacts:

| Output | Description |
|--------|-------------|
| `dist/index.js` | ESM entry |
| `dist/index.d.ts` | TypeScript declarations |
| `dist/styles.css` | Design tokens and component styles |

### Static Storybook (`storybook-static/`)

Generates a static documentation site suitable for hosting (e.g. GitHub Pages, object storage, or an internal static host):

```bash
pnpm build-storybook
```

Preview locally with any static file server, for example:

```bash
npx --yes serve storybook-static -p 5050
```

Then open <http://localhost:5050>.

> **Note:** The `build-storybook` script uses `cross-env` to set `STORYBOOK_DISABLE_TELEMETRY=1`, so it runs consistently on macOS, Linux, and Windows and avoids writing Storybook global settings as a side effect.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Storybook in development mode |
| `pnpm build` | Build the library to `dist/` |
| `pnpm build-storybook` | Build static documentation to `storybook-static/` |
| `pnpm typecheck` | Run the TypeScript compiler in check-only mode (no emit) |

---

## Troubleshooting

| Issue | Recommendation |
|-------|----------------|
| `pnpm install` fails | Confirm Node ≥ 20.19 (or ≥ 22.12). Remove `node_modules` and run `pnpm install` again. |
| Port 6006 in use | Free the port or change the `-p` value in the `dev` script in `package.json`. |
| Build errors after dependency changes | Prefer the locked versions in this repo; avoid upgrading major versions without validation. |

---

## Consuming the package

After installing `@syncai/design-system` via your workspace, `pnpm link`, or a private registry:

```tsx
import { Button, ThemeProvider, darkTheme } from '@syncai/design-system';
import '@syncai/design-system/styles.css';

<ThemeProvider theme={darkTheme} global>
  <Button variant="primary">Click me</Button>
</ThemeProvider>
```

Available theme presets: `lightTheme`, `darkTheme`, `dimTheme`, `midnightTheme`, `amoledTheme`.

Adjust the package name and import paths to match your distribution setup.

---

## AI Integration (MCP)

This project includes [`@storybook/addon-mcp`](https://storybook.js.org/addons/@storybook/addon-mcp), which exposes component documentation through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/). AI agents (e.g. GitHub Copilot, Cursor) can query component props, variants, and usage examples directly from a running Storybook instance.

### Prerequisites

- Storybook dev server must be running (`pnpm dev` → `http://localhost:6006`)

### MCP endpoint

Once Storybook is running, the MCP server is available at:

```
http://localhost:6006/mcp
```

### VS Code configuration

Add the following entry to your **workspace** `.vscode/mcp.json` (create the file if it doesn't exist). Note that `.vscode/` is gitignored, so each developer adds this locally:

```jsonc
{
  "servers": {
    "syncai-design-system": {
      "type": "http",
      "url": "http://localhost:6006/mcp"
    }
  }
}
```

Alternatively, run:

```bash
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```

### Available MCP tools

| Tool | Description |
|------|-------------|
| `list-all-documentation` | List all documented components, foundations, and docs pages |
| `get-documentation` | Get full props, usage examples, and stories for a component by ID |
| `get-documentation-for-story` | Get additional docs from a specific story variant |
| `get-storybook-story-instructions` | Get framework-specific story-writing conventions |
| `preview-stories` | Preview stories after changes |

### Quick test

After starting Storybook, open VS Code Copilot Chat and ask:

> List all documented components in the design system.

The agent will use the MCP tools to retrieve component information from Storybook.
