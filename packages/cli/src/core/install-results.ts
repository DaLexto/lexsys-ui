export interface InstallResourceResult {
  created: string[]
  updated: string[]
  skipped: string[]
  conflicted: string[]
}

export const createInstallResourceResult = (): InstallResourceResult => {
  return {
    created: [],
    updated: [],
    skipped: [],
    conflicted: [],
  }
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

export const hasInstallConflicts = (result: InstallResourceResult): boolean => {
  return result.conflicted.length > 0
}

export const printResourceSummary = (
  label: string,
  result: InstallResourceResult,
): void => {
  const total =
    result.created.length +
    result.updated.length +
    result.skipped.length +
    result.conflicted.length

  if (!total) {
    console.log(`- ${label}: no changes`)
    return
  }

  const parts = [
    result.created.length ? `${result.created.length} created` : undefined,
    result.updated.length ? `${result.updated.length} updated` : undefined,
    result.skipped.length ? `${result.skipped.length} skipped` : undefined,
    result.conflicted.length
      ? `${result.conflicted.length} conflicted`
      : undefined,
  ].filter((part): part is string => typeof part === "string")

  console.log(`- ${label}: ${parts.join(", ")}`)
}
