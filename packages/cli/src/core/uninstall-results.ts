export interface UninstallResourceResult {
  removed: string[]
  skipped: string[]
  conflicted: string[]
  missing: string[]
}

export const createUninstallResourceResult = (): UninstallResourceResult => {
  return {
    removed: [],
    skipped: [],
    conflicted: [],
    missing: [],
  }
}

export const mergeUninstallResults = (
  results: UninstallResourceResult[],
): UninstallResourceResult => {
  return results.reduce<UninstallResourceResult>(
    (merged, result) => ({
      removed: [...merged.removed, ...result.removed],
      skipped: [...merged.skipped, ...result.skipped],
      conflicted: [...merged.conflicted, ...result.conflicted],
      missing: [...merged.missing, ...result.missing],
    }),
    createUninstallResourceResult(),
  )
}

export const hasUninstallConflicts = (
  result: UninstallResourceResult,
): boolean => {
  return result.conflicted.length > 0
}

export const printUninstallSummary = (
  label: string,
  result: UninstallResourceResult,
): void => {
  const total =
    result.removed.length +
    result.skipped.length +
    result.conflicted.length +
    result.missing.length

  if (!total) {
    console.log(`- ${label}: no changes`)
    return
  }

  const parts = [
    result.removed.length ? `${result.removed.length} removed` : undefined,
    result.skipped.length ? `${result.skipped.length} skipped` : undefined,
    result.missing.length ? `${result.missing.length} missing` : undefined,
    result.conflicted.length
      ? `${result.conflicted.length} conflicted`
      : undefined,
  ].filter((part): part is string => typeof part === "string")

  console.log(`- ${label}: ${parts.join(", ")}`)
}
