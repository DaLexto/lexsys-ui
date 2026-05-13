/**
 * group.types.ts
 *
 * @layer types
 * @description Token group contracts for primitive, semantic, and component tokens.
 */

import type { TokenNode } from "./token.types.js"

type TokenGroupProperty = TokenNode | string

export interface PrimitiveTokenGroup {
  name: string
  [key: string]: TokenGroupProperty
}

export interface SemanticTokenGroup {
  name: string
  [key: string]: TokenGroupProperty
}

export interface ComponentTokenGroup {
  component: string
  [key: string]: TokenGroupProperty
}
