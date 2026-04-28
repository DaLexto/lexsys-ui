export class CliError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CliError"
  }
}

export const handleCliError = (error: unknown): void => {
  if (error instanceof CliError) {
    console.error(`\nError: ${error.message}\n`)
    process.exit(1)
  }

  if (error instanceof Error) {
    console.error(`\nUnexpected error:\n${error.message}\n`)
    process.exit(1)
  }

  console.error("\nUnknown error occurred\n")
  process.exit(1)
}
