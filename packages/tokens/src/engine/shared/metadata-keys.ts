/**
 * metadata-keys.ts
 *
 * @layer engine
 * @description Shared token tree metadata key sets for engine traversal.
 */

export const TOKEN_METADATA_KEYS = new Set([
  "$description",
  "$deprecated",
  "$extensions",
  "$type",
])

export const AUTHORING_GROUP_METADATA_KEYS = new Set([
  "name",
  "component",
  "selector",
  "colorScheme",
])

export const isTokenMetadataKey = (key: string): boolean => {
  return TOKEN_METADATA_KEYS.has(key)
}

export const isAuthoringGroupMetadataKey = (key: string): boolean => {
  return AUTHORING_GROUP_METADATA_KEYS.has(key)
}

export const shouldSkipTokenTreeKey = (
  key: string,
  options: { includeAuthoringKeys?: boolean } = {},
): boolean => {
  if (isTokenMetadataKey(key)) {
    return true
  }

  if (options.includeAuthoringKeys && isAuthoringGroupMetadataKey(key)) {
    return true
  }

  return false
}
