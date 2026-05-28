/**
 * Test prefix config — single source of truth for the CSS variable prefix in tokens tests.
 *
 * WHY THIS EXISTS
 * ---------------
 * The tokens generator produces CSS variables prefixed with the value of
 * cssVarPrefix from generator.config.ts (currently "lex"), e.g. `--lex-color-blue-600`.
 * Integration tests in generator.test.ts assert against the actual generated output,
 * so they must reference the correct prefix.
 *
 * If we hardcoded the prefix in every assertion, a future prefix rename (via
 * `pnpm tokens:re-prefix --to <new>`) would silently break tests unless someone
 * manually updated all assertions. That's a trap.
 *
 * THE APPROACH
 * ------------
 * Rather than importing from the generator config directly (which ties test
 * setup to source internals) or exporting it as a public API (unnecessary API
 * surface), we keep a single mirrored constant here that:
 *   1. Test files import and use in assertions via template literals.
 *   2. The rename script (`scripts/rebrand/rename-prefix.mjs`) updates
 *      automatically alongside the real config — so this stays in sync with
 *      zero manual work.
 *
 * HOW TO USE IN TESTS
 * -------------------
 * import { testCssVarPrefix as p } from "./config/prefix.js"
 *
 * // Instead of:  expect(output).toContain("--lex-color-blue-600")
 * // Write:       expect(output).toContain(`--${p}-color-blue-600`)
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
