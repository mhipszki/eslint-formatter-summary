import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['lib/*.spec.ts'],
    coverage: {
      include: ['lib/*.ts'],
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
  },
});
