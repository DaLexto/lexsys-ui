import { registryItems as localRegistry } from "@neurex-ui/registry";
import { getRegistrySource } from "./registry-source.js";
import { fetchRemoteRegistry } from "./remote-registry.js";
import type { RegistryItem } from "@neurex-ui/registry";

export const getRegistryItems = async (): Promise<RegistryItem[]> => {
  const source = await getRegistrySource();

  if (source === "local") {
    return localRegistry;
  }

  try {
    return await fetchRemoteRegistry(source);
  } catch {
    console.log("Remote registry failed. Falling back to local registry.");
    return localRegistry;
  }
};