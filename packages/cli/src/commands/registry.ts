import { registryItems } from "@neurex-ui/registry";
import { getRegistrySource } from "../core/registry-source.js";
import { fetchRemoteRegistry } from "../core/remote-registry.js";
import {
  getRegistryItems,
  getRegistryProviderResult,
} from "../core/registry-provider.js";

interface RunRegistryOptions {
  summary?: boolean;
  source?: boolean;
  local?: boolean;
  remote?: boolean;
  noFallback?: boolean;
}

export const runRegistry = async (
  options: RunRegistryOptions = {},
): Promise<void> => {
  const registrySource = options.local ? "local" : await getRegistrySource();
  const fallback = !options.noFallback;

  if (options.source) {
    const result = await getRegistryProviderResult({ fallback });

    if (result.fallbackUsed) {
      console.log(`${result.source} (fallback: local)`);
      return;
    }

    console.log(result.source);
    return;
  }

  if (options.remote) {
    if (registrySource === "local") {
      console.log("No remote registry URL configured.");
      return;
    }

    try {
      const items = await getRegistryItems({ fallback });

      console.log(JSON.stringify(items, null, 2));
      return;
    } catch (error) {
      console.log("Failed to fetch remote registry.");
      console.log(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
      return;
    }
  }

  if (options.summary) {
    try {
      const result = await getRegistryProviderResult({ fallback });

      console.log("Neurex UI registry summary\n");
      console.log(`Registry source: ${result.source}`);
      console.log(`Fallback used: ${result.fallbackUsed ? "yes" : "no"}`);
      console.log(`Items: ${result.items.length}`);

      for (const item of result.items) {
        const remoteFileCount = item.remoteFiles?.length ?? 0;

        console.log(
          `- ${item.canonicalName} v${item.version} (${item.type}/${item.category}, remote files: ${remoteFileCount})`,
        );
      }

      return;
    } catch (error) {
      console.log("Failed to resolve registry.");
      console.log(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
      return;
    }
  }

  try {
    const items = options.local
      ? registryItems
      : await getRegistryItems({ fallback });

    console.log(JSON.stringify(items, null, 2));
  } catch (error) {
    console.log("Failed to resolve registry.");
    console.log(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
};
