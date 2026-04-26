import { registryItems } from "@neurex-ui/registry";
import { getRegistrySource } from "../core/registry-source.js";

interface RunRegistryOptions {
  summary?: boolean;
  source?: boolean;
  local?: boolean;
  remote?: boolean;
}

const fetchJson = async (url: string): Promise<unknown> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Remote registry responded with HTTP ${response.status}`);
  }

  return response.json();
};

export const runRegistry = async (
  options: RunRegistryOptions = {},
): Promise<void> => {
  const registrySource = options.local ? "local" : await getRegistrySource();

  if (options.source) {
    console.log(registrySource);
    return;
  }

  if (options.remote) {
    if (registrySource === "local") {
      console.log("No remote registry URL configured.");
      return;
    }

    try {
      const data = await fetchJson(registrySource);

      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.log("Failed to fetch remote registry.");
      console.log(error instanceof Error ? error.message : String(error));
      console.log(
        "Local registry is still available via: neurex-ui registry --local",
      );
    }

    return;
  }

  if (options.summary) {
    console.log("Neurex UI registry summary\n");
    console.log(`Registry source: ${registrySource}`);
    console.log(`Items: ${registryItems.length}`);

    for (const item of registryItems) {
      console.log(
        `- ${item.canonicalName} v${item.version} (${item.type}/${item.category})`,
      );
    }

    return;
  }

  // default output
  console.log(JSON.stringify(registryItems, null, 2));
};
