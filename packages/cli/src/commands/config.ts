import { getConfigPath, loadConfig } from "../core/config.js";

interface RunConfigOptions {
  path?: boolean;
}

export const runConfig = async (
  options: RunConfigOptions = {},
): Promise<void> => {
  if (options.path) {
    console.log(getConfigPath());
    return;
  }

  const config = await loadConfig();

  console.log(JSON.stringify(config, null, 2));
};