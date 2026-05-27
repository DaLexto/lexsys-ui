export class CliError extends Error {
  suggestion?: string

  constructor(message: string, suggestion?: string) {
    super(message)
    this.name = "CliError"
    this.suggestion = suggestion
  }
}

export const handleCliError = (error: unknown): never => {
  if (error instanceof CliError) {
    console.error(`\n✗  ${error.message}`)
    if (error.suggestion) {
      console.error(`   ${error.suggestion}`)
    }
    console.error(`   Run \`lexsys --help\` to see available commands.\n`)
  } else if (error instanceof Error) {
    console.error(`\n✗  ${error.message}\n`)
  } else {
    console.error(`\n✗  An unexpected error occurred.\n`)
  }
  process.exit(1)
}
