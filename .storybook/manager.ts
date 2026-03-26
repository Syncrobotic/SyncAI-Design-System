import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

/**
 * Strapi Design System uses crisp brand colors and a documentation-style layout; here we adopt a similar
 * "design system documentation" look (light theme, brand primary color).
 * @see https://design-system.strapi.io/
 */
const theme = create({
  base: 'light',
  brandTitle: 'SyncAI Design System',
  brandUrl: '/',
  colorPrimary: '#4945ff',
  colorSecondary: '#7b61ff',
  appBg: '#f8fafc',
  barBg: '#ffffff',
  barTextColor: '#0f172a',
  fontBase:
    'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans TC", "PingFang TC", sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});
