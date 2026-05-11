/**
 * group.types.ts
 *
 * @layer types
 * @description Token group contracts for primitive, semantic, and component tokens.
 */

export interface PrimitiveTokenGroup {
  name: string
  [key: string]: unknown
}

export interface SemanticTokenGroup {
  name: string
  [key: string]: unknown
}

export interface ComponentTokenGroup {
  component: string
  [key: string]: unknown
}
