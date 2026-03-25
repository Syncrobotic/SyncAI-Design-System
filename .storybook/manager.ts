import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

/**
 * Strapi Design System 使用清晰的品牌色與文件風格；此處採相近的「設計系統文件」基調（亮色、品牌主色）。
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
