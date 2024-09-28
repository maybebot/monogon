import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: ['src/monogon-el.ts'],
      formats: ['es'],
      name: 'monogon',
    },
  },
});
