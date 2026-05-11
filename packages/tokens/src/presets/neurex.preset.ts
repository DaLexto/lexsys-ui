import type { PresetDefinition } from "../types/index.js"

export const neurexPreset: PresetDefinition = {
  id: "neurex",
  name: "Neurex Default",
  brand: "neurex",
  description:
    "Baseline Neurex style preset for the initial token, theme, and component system.",
  themeModes: ["light", "dark"],
  defaultTheme: "light",
}

export const defaultPresetId = "neurex" satisfies PresetDefinition["id"]
