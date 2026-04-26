export const hasFlag = (args: string[], flag: string): boolean => {
  return args.includes(flag);
};

export const removeFlags = (args: string[], flags: string[]): string[] => {
  return args.filter((arg) => !flags.includes(arg));
};

export const getFlagValue = (
  args: string[],
  flag: string,
): string | undefined => {
  const index = args.indexOf(flag);

  if (index === -1) {
    return undefined;
  }

  return args[index + 1];
};

export const removeFlagsWithValues = (
  args: string[],
  flags: string[],
): string[] => {
  const result: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (flags.includes(arg)) {
      index += 1;
      continue;
    }

    result.push(arg);
  }

  return result;
};