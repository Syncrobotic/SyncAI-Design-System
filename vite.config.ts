import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

/** Storybook 會共用此 Vite 設定；函式庫專用的 d.ts 只在「函式庫 build」時啟用。 */
const isLibraryBuild =
  process.env.npm_lifecycle_event === 'build' &&
  !process.argv.some((arg) => arg.includes('storybook'));

export default defineConfig({
  plugins: [
    react(),
    ...(isLibraryBuild
      ? [
          dts({
            rollupTypes: true,
            include: ['src'],
            exclude: ['**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx'],
          }),
        ]
      : []),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'styles.css';
          return '[name][extname]';
        },
      },
    },
    cssCodeSplit: false,
  },
});
