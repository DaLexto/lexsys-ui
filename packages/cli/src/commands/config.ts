import { loadConfig } from "../core/config.js";

export const runConfig = async (): Promise<void> => {
  const config = await loadConfig();

  console.log(JSON.stringify(config, null, 2));
};