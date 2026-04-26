import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { writeFileIfMissing } from "../core/fs.js";

export const runInit = async (): Promise<void> => {
  console.log("Initializing Neurex UI...\n");

  await mkdir(join(process.cwd(), "components", "ui"), { recursive: true });
  await mkdir(join(process.cwd(), "lib", "neurex"), { recursive: true });
  await mkdir(join(process.cwd(), "styles", "neurex"), { recursive: true });

  await writeFileIfMissing(
    join(process.cwd(), "neurex.config.json"),
    JSON.stringify(
      {
        componentsPath: "components/ui",
        utilitiesPath: "lib/neurex",
        stylesPath: "styles/neurex",
      },
      null,
      2,
    ) + "\n",
  );

  console.log("\nDone.");
};