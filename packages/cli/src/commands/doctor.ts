import { join } from "node:path";
import { loadConfig } from "../core/config.js";
import { fileExists } from "../core/fs.js";
import { findItem } from "../core/registry-resolver.js";
import { getCwd } from "../core/context.js";

export const runDoctor = async (): Promise<void> => {
  console.log("Neurex UI doctor\n");

  const config = await loadConfig();

  const checks = [
    {
      label: "package.json",
      path: join(getCwd(), "package.json"),
    },
    {
      label: config.componentsPath,
      path: join(getCwd(), config.componentsPath),
    },
    {
      label: config.utilitiesPath,
      path: join(getCwd(), config.utilitiesPath),
    },
    {
      label: config.stylesPath,
      path: join(getCwd(), config.stylesPath),
    },
  ];

  for (const check of checks) {
    const exists = await fileExists(check.path);
    console.log(`${exists ? "✓" : "×"} ${check.label}`);
  }

  const installed = config.installed ?? {};

  if (Object.keys(installed).length) {
    console.log("\nTracked components:");

    for (const [name, version] of Object.entries(installed)) {
      const item = findItem(name);

      if (!item) {
        console.log(`× ${name} v${version} (missing from registry)`);
        continue;
      }

      const componentPath = join(
        getCwd(),
        config.componentsPath,
        item.canonicalName,
      );

      const exists = await fileExists(componentPath);

      console.log(`${exists ? "✓" : "×"} ${item.canonicalName} v${version}`);
    }
  }
};
