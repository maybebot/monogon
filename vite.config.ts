import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: ['src/monogon-el.ts'],
      formats: ['es'],
      name: 'monogon',
    },
  },
  plugins: [dts()],
});
