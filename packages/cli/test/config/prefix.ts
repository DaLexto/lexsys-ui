/**
 * Test prefix config — single source of truth for the CSS variable prefix in CLI tests.
 *
 * WHY THIS EXISTS
 * ---------------
 * CLI integration tests assert against the actual content of installed files —
 * CSS variable names (e.g. `--lex-button-radius`) and variant class strings
 * (e.g. `bg-(--lex-card-background)`) that come from registry templates.
 *
 * Those templates are generated from packages/ui/src, which in turn uses the
 * prefix defined by cssVarPrefix in generator.config.ts. If we hardcode the
 * prefix directly in test assertions, a future prefix rename (via
 * `pnpm tokens:re-prefix --to <new>`) silently breaks every CLI test.
 *
 * THE APPROACH
 * ------------
 * Same pattern as packages/ui/test/config/prefix.ts and
 * packages/tokens/test/config/prefix.ts — a single mirrored constant that:
 *   1. Test files import and use in assertions via template literals.
 *   2. The rename script (`scripts/rebrand/rename-prefix.mjs`) updates
 *      automatically alongside the real config — zero manual work.
 *
 * HOW TO USE IN TESTS
 * -------------------
 * import { testCssVarPrefix as p } from "../config/prefix.js"
 *
 * // Instead of:  expect(result).toContain("--lex-button-radius")
 * // Write:       expect(result).toContain(`--${p}-button-radius`)
 *
 * KEEP IN SYNC
 * ------------
 * This value must always match cssVarPrefix in:
 *   packages/tokens/src/generators/generator.config.ts
 *
 * The rename script handles this automatically. Do NOT change this manually
 * without also running `pnpm tokens:re-prefix --to <prefix>`.
 */

export const testCssVarPrefix = "lex"
