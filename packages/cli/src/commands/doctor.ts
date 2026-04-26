import { join } from "node:path";
import { loadConfig } from "../core/config.js";
import { fileExists } from "../core/fs.js";

export const runDoctor = async (): Promise<void> => {
  console.log("Neurex UI doctor\n");

  const config = await loadConfig();

  const checks = [
    {
      label: "package.json",
      path: join(process.cwd(), "package.json"),
    },
    {
      label: config.componentsPath,
      path: join(process.cwd(), config.componentsPath),
    },
    {
      label: config.utilitiesPath,
      path: join(process.cwd(), config.utilitiesPath),
    },
    {
      label: config.stylesPath,
      path: join(process.cwd(), config.stylesPath),
    },
  ];

  for (const check of checks) {
    const exists = await fileExists(check.path);
    console.log(`${exists ? "✓" : "×"} ${check.label}`);
  }
};