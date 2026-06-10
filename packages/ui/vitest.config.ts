import { defineProject } from "vitest/config";

export default defineProject({
  root: import.meta.dirname,
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["test/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["dist/**"],
    pool: "threads",
  },
});
