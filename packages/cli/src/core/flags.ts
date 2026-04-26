export const hasFlag = (args: string[], flag: string): boolean => {
  return args.includes(flag);
};

export const removeFlags = (args: string[], flags: string[]): string[] => {
  return args.filter((arg) => !flags.includes(arg));
};