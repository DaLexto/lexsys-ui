import { registryItems } from "@neurex-ui/registry";

interface RunListOptions {
  json?: boolean;
}

export const runList = (options: RunListOptions = {}): void => {
  if (options.json) {
    console.log(JSON.stringify(registryItems, null, 2));
    return;
  }

  console.log("Available Neurex UI components:\n");

  for (const item of registryItems) {
    console.log(`- ${item.canonicalName} v${item.version} (${item.category})`);
  }
};