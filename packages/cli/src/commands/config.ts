import { getConfigPath, loadConfig } from "../core/config.js";
import { fileExists } from "../core/fs.js";

interface RunConfigOptions {
  path?: boolean;
  exists?: boolean;
}

export const runConfig = async (
  options: RunConfigOptions = {},
): Promise<void> => {
  const configPath = getConfigPath();

  if (options.path) {
    console.log(configPath);
    return;
  }

  if (options.exists) {
    const exists = await fileExists(configPath);
    console.log(exists ? "Config exists." : "Config does not exist.");
    return;
  }

  const config = await loadConfig();

  console.log(JSON.stringify(config, null, 2));
};