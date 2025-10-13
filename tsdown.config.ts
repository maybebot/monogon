import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';

export default defineConfig({
  entry: [
    './src/monogon-code.ts',
    './src/frameworks/preact/MonogonCode.tsx',
    './src/frameworks/solid/MonogonCode.tsx',
    './src/frameworks/vue/MonogonCode.ts',
  ],
  plugins: [Vue({ isProduction: true })],
  platform: 'neutral',
  sourcemap: true,
  dts: { vue: true },
});
