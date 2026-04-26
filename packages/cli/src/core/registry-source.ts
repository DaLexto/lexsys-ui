import { loadConfig } from "./config.js";

export const getRegistrySource = async (): Promise<string> => {
  const config = await loadConfig();

  return config.registryUrl ?? "local";
};