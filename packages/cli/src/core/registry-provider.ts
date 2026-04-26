import { registryItems as localRegistry } from "@neurex-ui/registry";
import { getRegistrySource } from "./registry-source.js";
import { fetchRemoteRegistry } from "./remote-registry.js";
import type { RegistryItem } from "@neurex-ui/registry";

let cachedRegistry: RegistryItem[] | null = null;
let cachedSource: string | null = null;

export interface RegistryProviderResult {
  items: RegistryItem[];
  source: string;
  fallbackUsed: boolean;
}

export const getRegistryItems = async (): Promise<RegistryItem[]> => {
  const source = await getRegistrySource();

  if (cachedRegistry && cachedSource === source) {
    return cachedRegistry;
  }

  if (source === "local") {
    cachedRegistry = localRegistry;
    cachedSource = source;
    return localRegistry;
  }

  try {
    const remote = await fetchRemoteRegistry(source);

    cachedRegistry = remote;
    cachedSource = source;

    return remote;
  } catch {
    console.log("Remote registry failed. Falling back to local registry.");

    cachedRegistry = localRegistry;
    cachedSource = source;

    return localRegistry;
  }
};

export const getRegistryProviderResult =
  async (): Promise<RegistryProviderResult> => {
    const source = await getRegistrySource();

    const items = await getRegistryItems();

    return {
      items,
      source,
      fallbackUsed: source !== "local" && items === localRegistry,
    };
  };
