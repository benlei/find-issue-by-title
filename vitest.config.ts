import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    clearMocks: true,
    watch: false,
    coverage: {
      reporter: ['json-summary', 'text', 'lcov']
    }
  }
})
