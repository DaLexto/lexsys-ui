let currentWorkingDirectory = process.cwd()

export const setCwd = (cwd: string): void => {
  currentWorkingDirectory = cwd
}

export const getCwd = (): string => {
  return currentWorkingDirectory
}
