import type { PresetDefinition } from "../types"

export const lexsysPreset: PresetDefinition = {
  id: "lexsys",
  name: "Lexsys Default",
  brand: "lexsys",
  description:
    "Baseline Lexsys style preset for the initial token, theme, and component system.",
  themeModes: ["light", "dark"],
  defaultTheme: "light",
}

export const defaultPresetId = "lexsys" satisfies PresetDefinition["id"]
