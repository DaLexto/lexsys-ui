import { registryItems } from "@neurex-ui/registry";
import { loadConfig } from "../core/config.js";

interface RunRegistryOptions {
  summary?: boolean;
}

export const runRegistry = async (
  options: RunRegistryOptions = {},
): Promise<void> => {
  if (options.summary) {
    const config = await loadConfig();
    const source = config.registryUrl ?? "local";

    console.log("Neurex UI registry summary\n");
    console.log(`Registry source: ${source}`);
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
