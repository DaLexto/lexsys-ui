import { registryItems } from "@neurex-ui/registry";
import { getRegistrySource } from "../core/registry-source.js";

interface RunRegistryOptions {
  summary?: boolean;
  source?: boolean;
  local?: boolean;
  remote?: boolean;
}

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

    console.log(`Remote registry fetch is not implemented yet.`);
    console.log(`Configured registry URL: ${registrySource}`);
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
