import { loadConfig } from "../core/config.js";

export const runUpdate = async (args: string[]): Promise<void> => {
  const config = await loadConfig();
  const installed = config.installed ?? {};

  if (!Object.keys(installed).length) {
    console.log("No Neurex UI components are currently tracked.");
    return;
  }

  if (args.includes("--all")) {
    console.log("Installed Neurex UI components:\n");

    for (const [name, version] of Object.entries(installed)) {
      console.log(`- ${name} v${version}`);
    }

    return;
  }

  if (!args.length) {
    console.log("Please specify components to update or use --all.");
    return;
  }

  for (const name of args) {
    const version = installed[name];

    if (!version) {
      console.log(`Component "${name}" is not tracked as installed.`);
      continue;
    }

    console.log(`${name} is currently installed at v${version}`);
  }
};