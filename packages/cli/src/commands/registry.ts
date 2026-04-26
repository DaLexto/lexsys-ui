import { registryItems } from "@neurex-ui/registry";

interface RunRegistryOptions {
  summary?: boolean;
}

export const runRegistry = (options: RunRegistryOptions = {}): void => {
  if (options.summary) {
    console.log("Neurex UI registry summary\n");
    console.log(`Items: ${registryItems.length}`);

    for (const item of registryItems) {
      console.log(`- ${item.canonicalName} v${item.version} (${item.type}/${item.category})`);
    }

    return;
  }

  console.log(JSON.stringify(registryItems, null, 2));
};