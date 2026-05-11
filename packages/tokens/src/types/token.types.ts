/**
 * token.types.ts
 *
 * @layer types
 * @description Core token tree authoring contracts.
 */

export type TokenPrimitive = string | number | boolean | null

export interface TokenLeaf {
  value: TokenPrimitive
  description?: string
}

export type TokenNode = TokenLeaf | TokenTree

export interface TokenTree {
  [key: string]: TokenNode
}

export interface TokenEntry {
  name: string
  value: string
}

export type TokenGroupProperty = unknown
