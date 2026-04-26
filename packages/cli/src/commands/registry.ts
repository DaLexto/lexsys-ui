import { registryItems } from "@neurex-ui/registry";

export const runRegistry = (): void => {
  console.log(JSON.stringify(registryItems, null, 2));
};