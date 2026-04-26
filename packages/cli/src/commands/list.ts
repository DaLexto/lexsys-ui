import { registryItems } from "@neurex-ui/registry";

export const runList = (): void => {
  console.log("Available Neurex UI components:\n");

  for (const item of registryItems) {
    console.log(`- ${item.canonicalName} (${item.category})`);
  }
};