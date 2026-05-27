export const hasFlag = (args: string[], ...flags: string[]): boolean => {
  return flags.some((f) => args.includes(f))
}

export const removeFlags = (args: string[], flags: string[]): string[] => {
  return args.filter((arg) => !flags.includes(arg))
}

export const getFlagValue = (
  args: string[],
  ...flags: string[]
): string | undefined => {
  for (const flag of flags) {
    const index = args.indexOf(flag)
    if (index !== -1) return args[index + 1]
  }
  return undefined
}

export const removeFlagsWithValues = (
  args: string[],
  flags: string[],
): string[] => {
  const result: string[] = []

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]

    if (flags.includes(arg)) {
      index += 1
      continue
    }

    result.push(arg)
  }

  return result
}
