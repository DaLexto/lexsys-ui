/**
 * group.types.ts
 *
 * @layer types
 * @description Token group contracts for primitive, brand, semantic, and component tokens.
 */

import type { TokenTree } from "./token.types.js"

/**
 * Primitive token group.
 *
 * Primitive groups define raw source values such as colors, spacing, radius,
 * typography scales, and motion values.
 */
export interface PrimitiveTokenGroup extends TokenTree {
  name: string
}

/**
 * Semantic token group.
 *
 * Semantic groups map primitive values to product-level meaning.
 */
export interface SemanticTokenGroup extends TokenTree {
  name: string
}

/**
 * Component token group.
 *
 * Component groups map semantic values to component-level design decisions.
 */
export interface ComponentTokenGroup extends TokenTree {
  component: string
}

/**
 * Brand token group.
 *
 * Brand groups map primitive values to brand-level palette decisions.
 * They must not contain product usage or component-specific intent.
 */
export interface BrandTokenGroup extends TokenTree {
  name: string
}
