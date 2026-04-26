export const compareVersions = (a: string, b: string): number => {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);

  const length = Math.max(pa.length, pb.length);

  for (let i = 0; i < length; i++) {
    const va = pa[i] ?? 0;
    const vb = pb[i] ?? 0;

    if (va > vb) return 1;
    if (va < vb) return -1;
  }

  return 0;
};

export const isUpdateAvailable = (
  installed: string,
  latest: string,
): boolean => {
  return compareVersions(latest, installed) === 1;
};