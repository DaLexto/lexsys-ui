import {
  registryItems as localRegistry,
  registryVersion,
} from "@neurex-ui/registry";
import type { RegistryItem } from "@neurex-ui/registry";
import { validateRegistry } from "@neurex-ui/registry";
import { fetchRemoteRegistry } from "./remote-registry.js";
import { getRegistrySource } from "./registry-source.js";

export interface RegistryProviderResult {
  items: RegistryItem[];
  source: string;
  fallbackUsed: boolean;
  manifestVersion: string;
}

interface RegistryProviderOptions {
  fallback?: boolean;
}

let cachedRegistry: RegistryItem[] | null = null;
let cachedSource: string | null = null;
let cachedManifestVersion: string | null = null;
let fallbackWarningShown = false;

export const getRegistryItems = async (
  options: RegistryProviderOptions = {},
): Promise<RegistryItem[]> => {
  const fallback = options.fallback ?? true;
  const source = await getRegistrySource();

  if (cachedRegistry && cachedSource === source) {
    return cachedRegistry;
  }

  if (source === "local") {
    cachedRegistry = localRegistry;
    cachedSource = source;
    cachedManifestVersion = registryVersion;

    return localRegistry;
  }

  try {
    const remote = await fetchRemoteRegistry(source);

    cachedRegistry = remote.items;
    cachedSource = source;
    cachedManifestVersion = remote.version;

    return remote.items;
  } catch (error) {
    if (!fallback) {
      throw error;
    }

    if (!fallbackWarningShown) {
      console.log("Remote registry failed. Falling back to local registry.");
      fallbackWarningShown = true;
    }

    cachedRegistry = localRegistry;
    cachedSource = source;
    cachedManifestVersion = registryVersion;

    return localRegistry;
  }
};

export const getRegistryProviderResult = async (
  options: RegistryProviderOptions = {},
): Promise<RegistryProviderResult> => {
  const source = await getRegistrySource();
  const items = await getRegistryItems(options);
  validateRegistry(items);

  return {
    items,
    source,
    fallbackUsed: source !== "local" && items === localRegistry,
    manifestVersion: cachedManifestVersion ?? registryVersion,
  };
};