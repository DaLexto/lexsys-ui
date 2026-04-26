import { loadConfig } from "../core/config.js";
import { findItem } from "../core/registry-resolver.js";

export const runStatus = async (): Promise<void> => {
  const config = await loadConfig();
  const installed = config.installed ?? {};

  if (!Object.keys(installed).length) {
    console.log("No Neurex UI components are currently tracked.");
    return;
  }

  console.log("Installed Neurex UI components:\n");

  for (const [name, installedVersion] of Object.entries(installed)) {
    const item = await findItem(name);

    if (!item) {
      console.log(`- ${name} v${installedVersion} (missing from registry)`);
      continue;
    }

    const status =
      item.version === installedVersion
        ? "up to date"
        : `update available: v${installedVersion} → v${item.version}`;

    console.log(`- ${item.canonicalName} v${installedVersion} (${status})`);
  }
};