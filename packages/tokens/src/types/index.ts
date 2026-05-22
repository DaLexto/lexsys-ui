/**
 * index.ts
 *
 * @layer types
 * @description Public type exports for the Neurex token system.
 */

/* Token values and tree */
export type {
  TokenMetadata,
  TokenMetadataValue,
  TokenLeaf,
  TokenBranch,
  TokenNode,
  TokenReference,
  TokenScalarValue,
  TokenColorValue,
  TokenStructuredValue,
  TokenType,
  TokenTree,
  TokenUnitValue,
  TokenValue,
  ScalarTokenType,
  CompositeTokenType,
} from "./token.types"

/* Source groups */
export type {
  ComponentTokenGroupMeta,
  NamedTokenGroupMeta,
  ComponentTokenGroup,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
  BrandTokenGroup,
  TokenGroupBase,
} from "./group.types"

export type { TokenSourceGroup } from "./source-group.utils"

export {
  getTokenTreeFromSourceGroup,
  getNamedGroupNamespace,
  getComponentGroupNamespace,
} from "./source-group.utils"

export type { ThemeConfig } from "./theme.types"

/* Theme and preset */
export type {
  BrandId,
  PresetDefinition,
  PresetId,
  ThemeDefinition,
  ThemeModeId,
  ThemeTokenMap,
} from "./theme.types"

/* Output */
export type { TokenBuildArtifacts } from "./output.types"
