import { registryItems as localRegistry } from "@neurex-ui/registry";
import { getRegistrySource } from "./registry-source.js";
import { fetchRemoteRegistry } from "./remote-registry.js";
import type { RegistryItem } from "@neurex-ui/registry";
import { error } from "node:console";

let cachedRegistry: RegistryItem[] | null = null;
let cachedSource: string | null = null;
let fallbackWarningShown = false;

export interface RegistryProviderResult {
  items: RegistryItem[];
  source: string;
  fallbackUsed: boolean;
}

interface RegistryProviderOptions {
  fallback?: boolean;
}

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
    return localRegistry;
  }

  try {
    const remote = await fetchRemoteRegistry(source);

    cachedRegistry = remote;
    cachedSource = source;

    return remote;
  } catch {
    if(!fallback){
      throw error;
    }

    if (!fallbackWarningShown) {
      console.log("Remote registry failed. Falling back to local registry.");
      fallbackWarningShown = true;
    }

    cachedRegistry = localRegistry;
    cachedSource = source;

    return localRegistry;
  }
};

export const getRegistryProviderResult =
  async (
    options:RegistryProviderOptions = {}
  ): Promise<RegistryProviderResult> => {
    const source = await getRegistrySource();

    const items = await getRegistryItems(options);

    return {
      items,
      source,
      fallbackUsed: source !== "local" && items === localRegistry,
    };
  };
