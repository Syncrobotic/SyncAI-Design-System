# SyncAI Design System

A React component library and documentation site powered by [Storybook](https://storybook.js.org/docs/?renderer=react). The information architecture follows common design-system conventions—**Getting Started** and **Components**—similar in spirit to references such as the [Strapi Design System](https://design-system.strapi.io/?path=/docs/getting-started-welcome--docs).

---

## Requirements

| Requirement | Version / notes |
|-------------|-----------------|
| [Node.js](https://nodejs.org/) | **18.x or later** (LTS recommended) |
| Package manager | **npm** (this repository includes `package-lock.json` for reproducible installs). If you use pnpm or Yarn, translate the commands accordingly. |

Verify your environment:

```bash
node -v   # expect v18.x or higher
npm -v
```

---

## Clone and install

```bash
git clone <repository-url>
cd SyncAI-Frontend-Lib-DesignSystem
npm install
```

`npm install` resolves dependencies from `package-lock.json`, which helps keep dependency versions aligned across machines and CI.

---

## Local development

Run Storybook for interactive development and documentation (default port **6006**):

```bash
npm run dev
```

Open <http://localhost:6006> in your browser.

---

## Build

### Library build (`dist/`)

Produces the publishable package consumed by applications:

```bash
npm run build
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
npm run build-storybook
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
| `npm run dev` | Start Storybook in development mode |
| `npm run build` | Build the library to `dist/` |
| `npm run build-storybook` | Build static documentation to `storybook-static/` |
| `npm run typecheck` | Run the TypeScript compiler in check-only mode (no emit) |

---

## Troubleshooting

| Issue | Recommendation |
|-------|----------------|
| `npm install` fails | Confirm Node ≥ 18. Remove `node_modules` and run `npm install` again. |
| Port 6006 in use | Free the port or change the `-p` value in the `dev` script in `package.json`. |
| Build errors after dependency changes | Prefer the locked versions in this repo; avoid upgrading major versions without validation. |

---

## Consuming the package

After installing `@syncai/design-system` via your workspace, `npm link`, or a private registry:

```tsx
import { Button } from '@syncai/design-system';
import '@syncai/design-system/styles.css';
```

Adjust the package name and import paths to match your distribution setup.
