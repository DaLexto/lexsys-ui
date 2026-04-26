import { join } from "node:path";
import { fileExists } from "../core/fs.js";

export const runDoctor = async (): Promise<void> => {
  console.log("Neurex UI doctor\n");

  const checks = [
    {
      label: "package.json",
      path: join(process.cwd(), "package.json"),
    },
    {
      label: "components/ui",
      path: join(process.cwd(), "components", "ui"),
    },
    {
      label: "lib/neurex",
      path: join(process.cwd(), "lib", "neurex"),
    },
    {
      label: "styles/neurex",
      path: join(process.cwd(), "styles", "neurex"),
    },
  ];

  for (const check of checks) {
    const exists = await fileExists(check.path);
    console.log(`${exists ? "✓" : "×"} ${check.label}`);
  }
};