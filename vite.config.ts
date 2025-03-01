import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: ['src/monogon-code.ts'],
      formats: ['es'],
      name: 'monogon',
    },
  },
  plugins: [dts()],
});
