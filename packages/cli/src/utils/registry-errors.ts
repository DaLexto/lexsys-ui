export const formatRegistryResolveError = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error)
}

export const markRegistryResolveFailure = (): void => {
  process.exitCode = 1
}

export const printRegistryResolveFailure = (error: unknown): void => {
  console.log("Failed to resolve registry.")
  console.log(formatRegistryResolveError(error))
  markRegistryResolveFailure()
}

export const printRegistryResolveFailureChecklist = (
  error: unknown,
  options: { sectionHeading?: string } = {},
): void => {
  if (options.sectionHeading) {
    console.log(options.sectionHeading)
  }

  console.log("× failed to resolve registry")
  console.log(formatRegistryResolveError(error))
  markRegistryResolveFailure()
}
