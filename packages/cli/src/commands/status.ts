import { loadConfig } from "../config/config.js";
import { findItem } from "../registry/resolver.js";
import { getRegistryProviderResult } from "../registry/provider.js";
import { getComponentDriftStatus } from "../install/component-drift.js";
import { printRegistryResolveFailure } from "../utils/registry-errors.js";

interface RunStatusOptions {
  json?: boolean;
  noFallback?: boolean;
}

export interface StatusEntry {
  name: string;
  canonicalName: string;
  drift: "synced" | "drift" | "missing";
}

export const runStatus = async (
  options: RunStatusOptions = {},
): Promise<void> => {
  const config = await loadConfig();
  const installed = config.installed ?? [];

  if (!installed.length) {
    if (options.json) {
      console.log(JSON.stringify({ installed: [] }, null, 2));
      return;
    }

    console.log("No Lexsys components are currently tracked.");
    return;
  }

  try {
    await getRegistryProviderResult({
      fallback: !options.noFallback,
    });
  } catch (error) {
    if (options.json) {
      console.log(
        JSON.stringify(
          {
            error: error instanceof Error ? error.message : String(error),
          },
          null,
          2,
        ),
      );
      process.exitCode = 1;
      return;
    }

    printRegistryResolveFailure(error);
    return;
  }

  const entries: StatusEntry[] = [];

  for (const name of installed) {
    const item = await findItem(name);

    if (!item) {
      entries.push({
        name,
        canonicalName: name,
        drift: "missing",
      });
      continue;
    }

    const driftStatus = await getComponentDriftStatus(name);

    entries.push({
      name: item.name,
      canonicalName: item.canonicalName,
      drift: driftStatus === "drift" ? "drift" : "synced",
    });
  }

  if (options.json) {
    console.log(JSON.stringify({ installed: entries }, null, 2));
    return;
  }

  console.log("Installed Lexsys components:\n");

  for (const entry of entries) {
    if (entry.drift === "missing") {
      console.log(`- ${entry.name} (missing from registry)`);
      continue;
    }

    const status =
      entry.drift === "drift"
        ? "out of sync with registry"
        : "up to date with registry";

    console.log(`- ${entry.canonicalName} (${status})`);
  }
};
