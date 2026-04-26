import { registryItems } from "@neurex-ui/registry";
import { loadConfig } from "../core/config.js";

interface RunRegistryOptions {
  summary?: boolean;
  source?: boolean;
}

export const runRegistry = async (
  options: RunRegistryOptions = {},
): Promise<void> => {
  const config = await loadConfig();
  const registrySource = config.registryUrl ?? "local";

  if (options.source) {
    console.log(registrySource);
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

  console.log(JSON.stringify(registryItems, null, 2));
};