export interface InstallResourceResult {
  created: string[]
  updated: string[]
  skipped: string[]
  conflicted: string[]
}

export interface UninstallResourceResult {
  removed: string[]
  skipped: string[]
  conflicted: string[]
  missing: string[]
}

export const createInstallResourceResult = (): InstallResourceResult => {
  return { created: [], updated: [], skipped: [], conflicted: [] }
}

export const createUninstallResourceResult = (): UninstallResourceResult => {
  return { removed: [], skipped: [], conflicted: [], missing: [] }
}

export const mergeInstallResults = (
  results: InstallResourceResult[],
): InstallResourceResult => {
  return results.reduce<InstallResourceResult>(
    (merged, result) => ({
      created: [...merged.created, ...result.created],
      updated: [...merged.updated, ...result.updated],
      skipped: [...merged.skipped, ...result.skipped],
      conflicted: [...merged.conflicted, ...result.conflicted],
    }),
    createInstallResourceResult(),
  )
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

export const hasInstallConflicts = (result: InstallResourceResult): boolean => {
  return result.conflicted.length > 0
}

export const hasUninstallConflicts = (
  result: UninstallResourceResult,
): boolean => {
  return result.conflicted.length > 0
}

const formatParts = (
  parts: Array<{ label: string; count: number }>,
): string[] => {
  return parts.filter((p) => p.count > 0).map((p) => `${p.count} ${p.label}`)
}

export const printResourceSummary = (
  label: string,
  result: InstallResourceResult,
): void => {
  const parts = formatParts([
    { label: "created", count: result.created.length },
    { label: "updated", count: result.updated.length },
    { label: "skipped", count: result.skipped.length },
    { label: "conflicted", count: result.conflicted.length },
  ])

  if (!parts.length) {
    console.log(`- ${label}: no changes`)
    return
  }

  console.log(`- ${label}: ${parts.join(", ")}`)
}

export const printUninstallSummary = (
  label: string,
  result: UninstallResourceResult,
): void => {
  const parts = formatParts([
    { label: "removed", count: result.removed.length },
    { label: "skipped", count: result.skipped.length },
    { label: "missing", count: result.missing.length },
    { label: "conflicted", count: result.conflicted.length },
  ])

  if (!parts.length) {
    console.log(`- ${label}: no changes`)
    return
  }

  console.log(`- ${label}: ${parts.join(", ")}`)
}
