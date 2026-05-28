/**
 * Test prefix config — single source of truth for the CSS variable prefix in UI tests.
 *
 * WHY THIS EXISTS
 * ---------------
 * All component variant files (*.variants.ts) reference CSS variables using a
 * short brand prefix, e.g. `--lex-button-radius`. The actual prefix value lives
 * in packages/tokens/src/generators/generator.config.ts (cssVarPrefix).
 *
 * If we hardcoded the prefix string directly in every test assertion, a future
 * prefix rename (via `pnpm tokens:re-prefix --to <new>`) would silently break
 * all tests unless someone manually updated 40+ files. That's a trap.
 *
 * THE APPROACH
 * ------------
 * Instead of exporting cssVarPrefix from the tokens public API (unnecessary API
 * surface) or deep-importing across package boundaries (violates contracts), we
 * keep a single mirrored constant here that:
 *   1. Test files import and use in assertions via template literals.
 *   2. The rename script (`scripts/rebrand/rename-prefix.mjs`) updates
 *      automatically alongside the real config — so this stays in sync with
 *      zero manual work.
 *
 * HOW TO USE IN TESTS
 * -------------------
 * import { testCssVarPrefix as p } from "../../config/prefix.js"
 *
 * // Instead of:  expect(cls).toContain("bg-(--lex-button-radius)")
 * // Write:       expect(cls).toContain(`bg-(--${p}-button-radius)`)
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
