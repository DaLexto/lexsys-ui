import { defineProject } from "vitest/config"

export default defineProject({
  root: import.meta.dirname,
  test: {
    environment: "node",
    include: ["test/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["dist/**"],
    pool: "threads",
  },
})
