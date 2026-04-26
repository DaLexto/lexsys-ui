import type { RegistryItem } from "@neurex-ui/registry";

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
};

const isRegistryItem = (value: unknown): value is RegistryItem => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Partial<RegistryItem>;

  return (
    typeof item.name === "string" &&
    typeof item.canonicalName === "string" &&
    typeof item.version === "string" &&
    typeof item.type === "string" &&
    typeof item.category === "string" &&
    Array.isArray(item.aliases) &&
    isStringArray(item.files) &&
    isStringArray(item.dependencies) &&
    isStringArray(item.registryDependencies) &&
    isStringArray(item.utilities) &&
    isStringArray(item.styles) &&
    typeof item.target === "string"
  );
};

const parseRemoteRegistry = (value: unknown): RegistryItem[] => {
  if (!Array.isArray(value)) {
    throw new Error("Remote registry must be a JSON array.");
  }

  if (!value.every(isRegistryItem)) {
    throw new Error("Remote registry contains invalid registry items.");
  }

  return value;
};

export const fetchRemoteRegistry = async (
  url: string,
): Promise<RegistryItem[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Remote registry responded with HTTP ${response.status}`);
  }

  const data = await response.json();

  return parseRemoteRegistry(data);
};