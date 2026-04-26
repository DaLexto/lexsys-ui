import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { defaultConfig, getConfigPath } from "../core/config.js";
import { writeFileIfMissing } from "../core/fs.js";

export const runInit = async (): Promise<void> => {
  console.log("Initializing Neurex UI...\n");

  await mkdir(join(process.cwd(), "components", "ui"), { recursive: true });
  await mkdir(join(process.cwd(), "lib", "neurex"), { recursive: true });
  await mkdir(join(process.cwd(), "styles", "neurex"), { recursive: true });

  await writeFileIfMissing(
    getConfigPath(),
    JSON.stringify(defaultConfig, null, 2) + "\n",
  );

  console.log("\nDone.");
};
