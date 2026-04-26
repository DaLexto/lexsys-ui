import { getConfigPath, loadConfig, saveConfig } from "../core/config.js";
import { fileExists } from "../core/fs.js";

interface RunConfigOptions {
  path?: boolean;
  exists?: boolean;
  setRegistryUrl?: string;
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

  if (options.setRegistryUrl !== undefined) {
    const config = await loadConfig();

    await saveConfig({
      ...config,
      registryUrl: options.setRegistryUrl || null,
    });

    console.log(
      options.setRegistryUrl
        ? `Registry URL set to: ${options.setRegistryUrl}`
        : "Registry URL cleared.",
    );

    return;
  }

  const config = await loadConfig();

  console.log(JSON.stringify(config, null, 2));
};
